import React from "react";

const Popup_f = ({ onClose, friends, onRemoveFriend }) => {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>Friends List</h2>

        <div style={styles.friendList}>
          {friends.length > 0 ? (
            friends.map((friend, index) => (
              <div key={index} style={styles.friendItem}>
                <img src={friend.profile} alt={friend.username} style={styles.friendImg} />
                <span style={styles.friendName}>{friend.username}</span>

                <button 
                  onClick={() => onRemoveFriend(friend.username)} 
                  style={styles.removeButton}>
                  – Remove
                </button>
              </div>
            ))
          ) : (
            <p style={styles.noFriends}>No friends found.</p>
          )}
        </div>

        <button onClick={onClose} style={styles.closeButton}>Close</button>
      </div>
    </div>
  );
};

// 🔹 Stiluri CSS inline
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    background: "#252e3f",
    padding: "20px",
    borderRadius: "10px",
    width: "350px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    color: "#ffffff",
  },
  title: {
    marginBottom: "15px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  friendList: {
    maxHeight: "200px",
    overflowY: "auto",
  },
  friendItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px",
    borderBottom: "1px solid #3e4756",
  },
  friendImg: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "2px solid #61c6f9",
  },
  friendName: {
    fontSize: "16px",
    flexGrow: 1, 
    marginLeft: "10px",
  },
  removeButton: {
    background: "none",
    border: "none",
    color: "#f56565", /* Roșu deschis */
    fontSize: "14px",
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  removeButtonHover: {
    color: "#ff3333", /* Roșu mai intens la hover */
  },
  noFriends: {
    fontSize: "14px",
    color: "#aaa",
  },
  closeButton: {
    marginTop: "15px",
    padding: "8px 12px",
    background: "#61c6f9",
    color: "#252e3f",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

export default Popup_f;
