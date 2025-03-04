import React, { useEffect, useState,useContext} from 'react';
import './Styles/popup_email.css';
import Axios from 'axios';
import { CounterContext } from '../Context/CounterContext';
const EmailPopup = ({ onClose }) => {
    const [email,setEmail]=useState("");
    const [id,setId]=useState("");
    const [error,setError]=useState("");
    const {counter,setCounter}=useContext(CounterContext);
    const [valid,setValid]=useState("");
    const counterUp=()=>{
      setCounter(counter+1);
      onClose();
    }
    useEffect(()=>{
      const local_profile=localStorage.getItem('user');
      const parseduser=JSON.parse(local_profile);
      if(local_profile)
      {
        setId(parseduser.id);
      }
    },[])
  const changeEmail=(e)=>{
   if(email)
   {
    e.preventDefault();
    Axios.post('https://av-drones-react-backend-production.up.railway.app/change_email',{
        id:id,
        email:email
    }).then((response)=>{
        if(response.data.message)
        {
            console.log(response.data);
            let stored=JSON.parse(localStorage.getItem('user'));
            if(stored)
            {
                stored.email=email;
                localStorage.setItem('user',JSON.stringify(stored));
                setValid("Email updated");
                //onClose();
            }
        }
    });
   }
   else
   {
     setError("Enter an email");
   }
  }

  return (
    <div className="popup-change-name-overlay">
      <div className="popup-change-name-content" onClick={(e) => e.stopPropagation()} >
        <h2 className='popup-change-name-header'>Change Email</h2>
        <form className="email-popup-form">
          <label className="popup-change-name-label">
            New Email:
            <input 
            type="email" 
            name="email" 
            className="email-popup-input" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            />
          </label>
          {error && <p className='error-message-email'>{error}</p>}
          {valid && <p className='valid-message-email'>{valid}</p>}
        </form>
        <div  className="popup-buttons-container">
           <button type="submit" className="popup-change-name-btn-confirm" onClick={changeEmail}>Save</button>
           <button onClick={counterUp} className="popup-change-name-btn-close1">Close</button>
        </div>
        
      </div>
    </div>
  );
};

export default EmailPopup;
