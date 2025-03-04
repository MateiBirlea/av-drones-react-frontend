import React, { useEffect, useState } from 'react';
import './Styles/popup_change_password.css'; 
import Axios from 'axios';
const ChangePasswordPopup = ({ onClose }) => {
    const [pass1,setPass1]=useState("");
    const [pass2,setPass2]=useState("");
    const [pass3,setPass3]=useState("");
    const [error,setError]=useState("");
    const [error1,setError1]=useState("");
    const [confirmed,setConfirmed]=useState("");
    const [id,setId]=useState("");
    const changePass=(e)=>{
        e.preventDefault();
        if(pass1===pass2)
        {
            setError("");
            Axios.post('https://av-drones-react-backend-production.up.railway.app/verify_password',{
                id:id,
                pass:pass3
            }).then((response)=>{
                if(response.data.message)
                {
                    Axios.post('https://av-drones-react-backend-production.up.railway.app/change_password',{
                        id:id,
                        pass:pass2
                    }).then((response)=>{
                        if(response.data.message)
                        {
                            console.log(response.data);
                            setConfirmed("Password updated");
                        }
                    })
                }
            }).catch((error)=>{
              if (error.response.status === 401) {
                setError1("Wrong Password");
              }
            })
        }
        else
        {
            
            setError("New password didn't match");
            setPass1(""); 
            setPass2(""); 
        }
    }
    useEffect(()=>{
        const local_profile=localStorage.getItem('user');
        const parseduser=JSON.parse(local_profile);
       if(local_profile)
        {
        setId(parseduser.id);
       }
    })
  return (
    <div className="popup-change-name-overlay">
      <div className="popup-change-name-content" onClick={(e) => e.stopPropagation()}>
        <h2 className='popup-change-name-header'>Change Password</h2>
        <form className="popup-change-password-form">
          <label className="popup-change-password-label">
            Current Password:
            <input type="password" 
            className="popup-change-password-input" 
            required
            value={pass3}
            onChange={(e)=>setPass3(e.target.value)}
            />
          </label>
          {error1 && (
            <p className="popup-change-password-error">{error1}</p>
          )}
          <label className="popup-change-password-label">
            New Password:
            <input type="password" 
            className="popup-change-password-input" 
            required
            value={pass1}
            onChange={(e)=>setPass1(e.target.value)}
            />
          </label>
          {error && (
            <p className="popup-change-password-error">{error}</p>
          )}
          <label className="popup-change-password-label">
            Confirm New Password:
            <input type="password" 
            className="popup-change-password-input" 
            required
            value={pass2}
            onChange={(e)=>setPass2(e.target.value)}
            />
          </label>
          {error && (
            <p className="popup-change-password-error">{error}</p>
          )}
          {confirmed && (
            <p className="valid-message">{confirmed}</p>
          )}
          <div className="popup-buttons-container">
            <button
              type="button"
              className="popup-change-name-btn-confirm"
              onClick={changePass}
            >
              Change Password
            </button>
            <button
              type="button"
              className="popup-change-name-btn-close1"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
