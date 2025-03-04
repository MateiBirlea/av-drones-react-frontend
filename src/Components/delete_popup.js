import React, { useEffect ,useState} from "react";
import "./Styles/delete_account_popup.css"; 
import Axios from 'axios';
import { Navigate,useNavigate } from "react-router-dom";

const DeleteAccountPopup = ({ onClose }) => {
    const [id,setId]=useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const local_profile=localStorage.getItem('user');
        const parseduser=JSON.parse(local_profile);
        if(local_profile)
        {
          setId(parseduser.id);
        }
      },[])
    const delete_account=(e)=>{
        e.preventDefault(); 
        Axios.post('https://av-drones-react-backend-production.up.railway.app/delete_account',{
           id:id
        }).then((response)=>{
            if(response.data.message)
            {
                console.log(response.data);
                localStorage.removeItem('user');
                onClose();
            }
        })
    }
    const pr=()=>{
      navigate('/');
    }
  return (
    <div className="popup-delete-account-overlay">
      <div className="popup-delete-account-content" onClick={(e) => e.stopPropagation()}>
        <h2>Are you sure you want to delete your account?</h2>
        <div className="popup-delete-account-buttons">
          <button
            type="button"
            className="popup-delete-account-btn-confirm"
            onClick={pr}
          >
            Delete
          </button>
          <button
            type="button"
            className="popup-delete-account-btn-close"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountPopup;
