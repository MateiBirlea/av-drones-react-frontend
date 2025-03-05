import React from "react";

const Popup_info = ({ onClose }) => {
  return (
    <div className="avd-popup-overlay">
      <div className="avd-popup-content">
        
        <button className="avd-popup-close-btn" onClick={onClose}>
          ×
        </button>

        <h2 className="avd-popup-title">Welcome to AV Drones! 🚀</h2>
        <p className="avd-popup-text">
          AV Drones is your personal hub for managing your drone experiences.
          Here's how to navigate the platform:
        </p>
        <ul className="avd-popup-list">
          <li>🛠 <strong>Top-right Menu</strong> - Click the menu icon to open the **side-bar**.</li>
          <li>🔑 <strong>Login / Sign Up & Logout</strong> - Use the buttons below the menu to <strong>log in or sign up</strong>, and the <strong>logout</strong> button to exit your account.</li>
          <li>📸 <strong>Profile Picture Upload</strong> - At the bottom of the sidebar, click <strong>"No Image"</strong> to upload your profile picture.</li>
          <li>⚙️ <strong>Profile Settings</strong> - Click the **three dots** to view and modify your profile details.</li>
          <li>🔍 <strong>Pop-up Profile Options</strong> - The three-dot menu lets you access:</li>
          <ul>
            <li>👤 <strong>Account</strong> - Modify your personal details.</li>
            <li>🌍 <strong>Community</strong> - Add new friends.</li>
            <li>📨 <strong>Notifications</strong> - Check your friend requests.</li>
          </ul>
        </ul>
        <p className="avd-popup-text">Have fun exploring AV Drones and making the most of your experience! 🚁✨</p>
        <button className="avd-popup-confirm-btn" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default Popup_info;
