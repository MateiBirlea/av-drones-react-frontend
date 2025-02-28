import React from "react";
import "./login_first_popup.css"; // Importă stilurile
import { useNavigate } from "react-router-dom";
const LoginFirstPopup = ({ onClose }) => {
    const navigate = useNavigate();
    const go_login=()=>{
        navigate('/signup')
    }
  return (
    <div className="popup-overlay1">
      <div className="popup-content1" onClick={(e) => e.stopPropagation()}>
        <h2>Please log in first</h2>
        <p>You must log in to access this feature.</p>
        <div className="popup-buttons1">
          <a href="/login" className="popup-link1" >
            Go to Login
          </a>
          <button className="popup-btn-cancel1" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginFirstPopup;
