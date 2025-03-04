import React,{useEffect,useState,useContext} from 'react';
import Axios from 'axios';
import { CounterContext } from "../Context/CounterContext";
const Popup_username = ({ onClose }) => {
    const [username,setUsername]=useState("");
    const [id,setId]=useState("");
    const {counter,setCounter}=useContext(CounterContext);
    const [error,setError]=useState("");
    const [valid,setValid]=useState("");
    const closeUsername=()=>{
        setCounter(counter+1);
        onClose();
    }
    const stopClick=(e)=>{
        e.stopPropagation();
    }
   const Change_Username=(e)=>{
   if(username)
   {
      e.preventDefault();
      Axios.post('https://av-drones-react-backend-production.up.railway.app/verify_username',{
        username:username
      }).then((response)=>{
        if(response.data.message)
        {
            console.log("Username valid");
            Axios.post('https://av-drones-react-backend-production.up.railway.app/change_username',{
                id:id,
                username:username
            }).then((response)=>{
                if(response.data.message)
                {
                
                  const stored=JSON.parse(localStorage.getItem('user'));
                  if(stored)
                  {
                      stored.username=username;
                      localStorage.setItem("user",JSON.stringify(stored));
                      setValid("Username updated");
                  }
                }
            })
        }
      }).catch((error)=>{
        setError("Username already exists");
         console.log(error);

      })
   }
   else
   {
     setError("Write an username");
   }
}
useEffect(()=>{
   const user=localStorage.getItem('user');
   const parsed_user=JSON.parse(user);
   if(user)
   {
    setId(parsed_user.id);
   }
},[])
  return (
    <div className="popup-change-name-overlay" onClick={onClose}>
  <div className="popup-change-name-content" onClick={(e) => e.stopPropagation()}>
    <h3 className="popup-change-name-header">Change Username</h3>
    <input
      className="popup-change-name-input"
      type="text"
      placeholder="Enter new username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      //required
    />
    {error && <p className="error-message">{error}</p>}
    {valid && <p className="valid-message">{valid}</p>}
    <div className="popup-buttons-container">
      <button className="popup-change-name-btn-confirm" onClick={Change_Username}>
        Change
      </button>
      <button className="popup-change-name-btn-close1" onClick={closeUsername}>
        Close
      </button>
    </div>
  </div>
</div>

  );
};

export default Popup_username;
