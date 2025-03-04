import React, { useEffect, useState,useContext } from "react";
import "./Styles/PopupChangeName.css";
import Axios from 'axios';
import { CounterContext } from "../Context/CounterContext";
const PopupChangeNameUnique = ({ onClose, onChangeName }) => {
  const [name, setName] = useState("");
  const [email,setEmail]=useState("");
  const [error,setError]=useState("");
  const [valid,setValid]=useState("");
  const {counter,setCounter}=useContext(CounterContext);
  const counterClick=(e)=>{
    changeName(e);
  }
  const popClose=()=>{
    setCounter(counter+1);
    console.log("Counterul este",counter);
    onClose();
  }
  useEffect(()=>{
    const local_profile=localStorage.getItem('user');
    const parseduser=JSON.parse(local_profile);
    if(local_profile)
    {
        setEmail(parseduser.email);
        
    }
  })
  const changeName=(e)=>{
        if(name)
        {
          e.preventDefault();
          Axios.post('https://av-drones-react-backend-production.up.railway.app/change_name',{
              name:name,
              email:email
          }).then((response)=>{
              if(response.data.message)
              {
                  console.log(response.data);
                  let stored=JSON.parse(localStorage.getItem('user'));
                  if(stored)
                  {
                      stored.name=name;
                      localStorage.setItem("user",JSON.stringify(stored));
                      setValid("Name updated")
                      //onClose();
                  }
              }
          }).catch((error)=>{
            if(error.response.status===401)
            {
              setError("Username already exists");
            }
          })
        }
        else
        {
          setError("Enter a name");
        }
  }
  return (
    <div className="popup-change-name-overlay" onClick={onClose}>
      <div
        className="popup-change-name-content"
        onClick={(e) => e.stopPropagation()} 
      >
        <h3 className="popup-change-name-header">Change Name</h3>
        <label className="popup-change-name-label" htmlFor="nameInput">
          New Name:
        </label>
       
        <input
          className="popup-change-name-input"
          id="nameInput"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your new name"
          required
        />
         {valid && <p className="valid-message">{valid}</p>}
         {error && <p className="error-message">{error}</p>}
        <div className="popup-buttons-container">
          <button
            className="popup-change-name-btn-confirm"
            onClick=
              {counterClick}
          >
            Change Name
          </button>
          <button
            className="popup-change-name-btn-close1"
            onClick={ popClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupChangeNameUnique;
