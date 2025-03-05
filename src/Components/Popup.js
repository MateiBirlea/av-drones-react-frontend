import React, { useEffect, useState,useContext} from "react";
import axios from 'axios';
import Axios from 'axios';
import "./Popup.css";
import PopupChangeName from './Popup_name';
import EmailPopup from './Email_popup';
import  ChangePasswordPopup from './popup_password';
import DeleteAccountPopup from "./delete_popup";
import Popup_username from "./Popup_username";
import R158 from './images/Rectangle 158.png';
import mail from './images/mail 1.png';
import { CounterContext } from "../Context/CounterContext";
import useSWR from "swr";
import fetcher from "../Utils/fetcher";
import fetcher1 from "../Utils/fetcher1";
import Popup_f from "./Popup_friends";
const Popup = ({ onClose }) => {
  const [selectedUser,setSelectedUser]=useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [friendopen,setFriendopen]=useState(false);
  const [activeTab, setActiveTab] = useState("Account");
  const [name1,setName1]=useState("Unknown name");
  const [email,setEmail]=useState("Unkown email");
  const [url,setUrl]=useState();
  const [id,setId]=useState();
  const [username,setUsername]=useState("Unknown username");
  const [popup_email,setPopup_email]=useState(false);
  const [popup_password,setPopup_password]=useState(false);
  const [popup_account,setPopup_account]=useState(false);
  const [query, setQuery] = useState(''); 
  const {counter,setCounter}=useContext(CounterContext);
  const [results, setResults] = useState([]);
  const [popup_username,setPopup_username]=useState(false);
  const openFriend=()=>setFriendopen(true);
  const closeFriend=()=>setFriendopen(false);
  const openUsername=()=>setPopup_username(true);
  const closeUsername=()=>setPopup_username(false);
  const openAccount=()=>setPopup_account(true);
  const closeAccount=()=>setPopup_account(false);
  const openPassword=()=>setPopup_password(true);
  const closePassword=()=>setPopup_password(false);
  const openEmail=()=>setPopup_email(true);
  const closeEmail=()=>setPopup_email(false);
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  const [seenRequestsCount, setSeenRequestsCount] = useState(0);

  {/*const [friendRequests, setFriendRequests] = useState([]);*/}
  const add_friend=()=>{
    if(selectedUser===null)
    {
      alert("Please select a friend");
    }
    else
    {
      
      Axios.post('https://av-drones-react-backend-production.up.railway.app/verify_friend_request',{
        id_sender:id,
        username_receiver:selectedUser,
        username_sender:username
      }).then((response)=>{
        if(response.data.message)
        {
          console.log("Mesaj",response.data.message);
          Axios.post('https://av-drones-react-backend-production.up.railway.app/add_friend',{
            id_sender: id,
            username_reciver:selectedUser
           }).then((response)=>{
            if(response.data.message)
            {
              console.log(response.data.message);
              alert("Friend request sent");
            }
           }).catch((error)=>{
               if(error.response.status===400)
               {
                console.log("Grz");
               }
           });
        }
      }).catch((error)=>{
        if (error.response) {
          console.log("Eroare din backend:", error.response.data.customMessage);
          alert("You have already sent a request to this user / Check notifications / You are already friends.");
      } else {
          console.log("Eroare necunoscută:", error);
      }
      })
      
      
    }
  }
 const refresh_pagina=()=>{
  window.location.href = window.location.href;
 }
  const handleSelect=(user)=>{
      setSelectedUser(user.username);
      const profile=localStorage.getItem('user');
      const parsed_user=JSON.parse(profile);
      setUsername(parsed_user.username);
  }
  const counterIncrement=()=>{
    setCounter(counter+1);
  }
  const ntfy=()=>{
    setActiveTab("Notifications");
    setSeenRequestsCount(friendRequests?.length || 0);
  }
  const searchUser = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === '') {
      setResults([]); 
      return;
    }

    try {
      const response = await fetch(`https://av-drones-react-backend-production.up.railway.app/api/search-user?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data); 
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const image_upload=async(e)=>{
    const file=e.target.files[0];
    const user=localStorage.getItem('user');
    if(!user)
    {
      alert("Please Log In first");
      return;
    }
    if(!file)
    {
      alert("Please select a file")
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setUrl(reader.result);
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('profileImage', file);
    try {
      const response = await axios.post('https://av-drones-react-backend-production.up.railway.app/upload', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });

      console.log('Uploaded image URL:', response.data.url);
      setUrl(response.data.url);
      const jj=localStorage.getItem('user');
      const parseduser=JSON.parse(jj);
      parseduser.profile=response.data.url;
      localStorage.setItem('user',JSON.stringify(parseduser));
      console.log('Email:',parseduser.email);
       await Axios.post('https://av-drones-react-backend-production.up.railway.app/profile_set',{
        emailn:parseduser.email,
        urln:response.data.url
      }).then((response)=>{
        if(response.data.err)
        {
          console.log(response.data.err);
        }else if(response.data.message)
           {
              console.log(response.data.message);
              window.location.href = window.location.href;
           }
      })
  } catch (error) {
      console.error('Error uploading image:', error);
  }
  
};
const handleFileChange = async (event) => {
  await image_upload(event); // Încarcă imaginea

  setTimeout(() => {
    document.getElementById("refresh-link").href = window.location.href;
    document.getElementById("refresh-link").click(); // Forțează refresh
  }, 1000); // După 1 secundă
};
const forceRefresh = () => {
  setTimeout(() => {
    window.location.href = window.location.href;
  }, 1500); // Refresh după 1.5 secunde
};



  useEffect(()=>{
       const profile=localStorage.getItem('user');
       const parsed_user=JSON.parse(profile);
       if(profile)
       {
        console.log("Counter actualizat:", counter);
        setEmail(parsed_user.email);
        setName1(parsed_user.name);
        setUrl(parsed_user.profile);
        setUsername(parsed_user.username);
        setId(parsed_user.id);
       }
       
  },[counter])
 
  const delete_request =(sender)=>{
    Axios.post('https://av-drones-react-backend-production.up.railway.app/delete_request',{
      username_sender:sender,
      id_receiver:id
    }).then((response)=>{
      console.log(response.data.message);
    });
  }
  const delete_friend=(user)=>{
    Axios.post('https://av-drones-react-backend-production.up.railway.app/delete_friend',{
      username1:username,
      username2:user
    }).then((response)=>{
      if(response.data.message)
      {
        console.log(response.data.message);
      }
    })
  }
  const accept_friendship=(username21,profile21)=>{
    Axios.post('https://av-drones-react-backend-production.up.railway.app/accept_friendship',{
      username1:username,
      profile1:url,
      username2:username21,
      profile2:profile21
    }).then((response)=>{
        if(response.data.message)
        {
          console.log(response.data.message);
        }

    }).catch((error)=>{
      console.error("Eroare la cerere: ",error);
    })
  }
  const friendship=(username,profile)=>{
    accept_friendship(username,profile);
    delete_request(username);
  }
{/*useEffect(()=>{
  const show_requests = () => {
    Axios.post('http://localhost:8081/get_requests', {
        id_receiver: id
    })
    .then((response) => {
        const requests = response.data; 
        setFriendRequests(response.data);
        requests.forEach(request => {
            console.log(`Username: ${request.info[0]}, Profile: ${request.info[1]}`);
        });
    })
    .catch((error) => {
        console.error("Eroare la preluarea datelor:", error);
    });
  };

  if (id) { 
    show_requests();
   }
   const interval = setInterval(show_requests, 2000);

   // Curățăm intervalul când componenta se demontează sau `userId` se schimbă
   return () => clearInterval(interval);

 },[id])*/}
 const { data: friendRequests, error } = useSWR(
  id ? ["https://av-drones-react-backend-production.up.railway.app/get_requests", id] : null, 
  ([url, id]) => fetcher(url, id),
  { refreshInterval: 1000 } 
);
const {data: friends,error1}= useSWR(
  username ? ["https://av-drones-react-backend-production.up.railway.app/get_friends",username]:null,
  ([url,username])=>fetcher1(url,username),
  {refreshInterval: 1000}
)
useEffect(() => {
  if (friends) {
      console.log("Prieteni primiți de la backend:", friends);
  }
}, [friends]);


useEffect(() => {
  if (error1) {
      console.error("Eroare la preluarea prietenilor:", error1);
  }
}, [error1]);
const unreadRequests = friendRequests ? Math.max(friendRequests.length - seenRequestsCount, 0) : 0;
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-content"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Header cu tab-uri */}
        <div className="popup-header">
          {/* Bulinele colorate în stânga cuvântului Account */}
          <div className="bullets">
            <div className="bullet red"></div>
            <div className="bullet yellow"></div>
            <div className="bullet green"></div>
          </div>

          <button
            className={`tab-button ${activeTab === "Account" ? "active" : ""}`}
            onClick={() => setActiveTab("Account")}
          >
            Account
          </button>
          <button
            className={`tab-button ${activeTab === "Community" ? "active" : ""}`}
            onClick={() => setActiveTab("Community")}
          >
            Community
          </button>
          <button
            className={`tab-button ${activeTab === "Notifications" ? "active" : ""}`}
            onClick={ntfy}
          >
            Notifications {unreadRequests > 0 && <span>({unreadRequests})</span>}
          </button>

        </div>

        {/* Corpul popup-ului */}
        <div className="popup-body">
          {/* Conținutul tab-ului Account */}
          {activeTab === "Account" && (
          <div className="tab-content">
            
            <div className="circular-image1"  >
               <a href="" id="refresh-link" style={{ display: "none" }}></a>
               <img src={url}    className="circular-image123" />
              <input
                type="file"
                accept="image/*"
                id="file-input"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-input" className="text-label123"   >Upload</label>
             
            </div>

          <div className="refractor"> 
              <div className="section">
                <h3 onClick={counterIncrement}>Name</h3>
                <div className="content">
                  <p>{name1}</p>
                  <a href="#" onClick={(e)=>{
                    e.preventDefault();
                    handleOpenPopup();
                    }}>Change name</a>
                </div>
              </div>
              <div class="grey-line1"></div>
              <div className="section">
                <h3>Email</h3>
                <div className="content">
                  <p>{email}</p>
                  <a href="#" onClick={openEmail}>Change email</a>
                </div>
              </div>
              <div class="grey-line2"></div>
              <div className="section">
                <h3>Password</h3>
                <div className="content">
                  <a href="#" onClick={openPassword}>Change password</a>
                  <a href="#">Enable two-factor authentication</a>
                </div>
              </div>
              <div class="grey-line3"></div>
              <div className="section">
                <h3>Language</h3>
                <div className="content">
                  <p>English</p>
                  <a href="#">Change language</a>
                </div>
              </div>
              <div class="grey-line4"></div>
              <div className="section">
                <h3>Theme</h3>
                <div className="content">
                  <p>Dark</p>
                  <a href="#">Change theme</a>
                </div>
              </div>

              <div className="section">
                <h3>Connected Apps</h3>
                <div className="content">
                  <p>Lorem ipsum dolor sit amet...</p>
                </div>
              </div>

              <div className="section">
                <h3>Account</h3>
                <div className="content">
                  <a href="#" onClick={openAccount}>Delete account</a>
                </div>
               </div>    
            </div>
              
          </div>
          )}

          {/* Conținutul tab-ului Community */}
          {activeTab === "Community" && (
                <div class="community-container">
                <div class="community-section">
                  <h3 class="community-title">Display name</h3>
                  <p class="community-text">{name1}</p>
                </div>
              
                <div class="community-section">
                  <h3 class="community-title">Unique handle</h3>
                  <p class="community-text">{username}</p>
                  <a 
                  onClick={openUsername}
                  href="#" 
                  class="community-link">Change handle</a>
                  <p class="community-subtext">
                    Public profile:
                    <a href="https://www.advrones.com/@MarshM27" class="community-link">https://www.advrones.com/@MarshM27</a>
                  </p>
                </div>
              
                <div class="community-section">
                   <div className="linie_gri"></div>
                  <h3 class="community-title">Profile connections</h3>
                  <p class="community-text1">
                    Connect multiple AVDrones to use a single Community profile and merge multiple profiles into one. Publish content,
                    follow creators, save likes, and receive notifications without having to switch accounts.
                  </p>
                  <p class="community-connection">
                    <img src={mail} className="mail"></img>
                    <span class="community-email">{email}</span>
                  </p>
                  <a href="#" class="community-link">Add profile connection</a>
                </div>
              
                <div class="community-section">
                  <div className="linie_gri1"></div>
                  <h3 class="community-title">Connect with your friends</h3>
                  <div class="community-search-container">
                  <div  class="search-bar">
                    <span class="search-icon" id="search-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#c4c8d4">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C8.01 14 6 11.99 6 9.5S8.01 5 10.5 5 15 7.01 15 9.5 12.99 14 10.5 14z" />
                          </svg>
                    </span>
                    <input class="search-bar"
                       type="text"
                       value={query}
                       onChange={searchUser}
                       placeholder="Search username..."
                    />
                        {friends && friends.friends && friends.friends.length > 0 ? (
                          friends.friends.slice(0, 3).map((friend, index) => (
                        <div key={index}>
                          <img src={friend.profile}  className="community-friend-img" />
                        </div>
                          ))
                        ) : (
                 <p></p>
                        )}

                    <div onClick={openFriend} class="community-more-friends">+</div>
                    </div>
                  </div>
                  <div>
                    {results.length > 0 ? (
                       results.slice(0, 2).map((user, index) => ( 
                          <div key={index}
                            onClick={()=>handleSelect(user)}
                            style={{
                              cursor: "pointer",
                              padding: "6px 10px",
                              marginBottom: "4px",
                              borderRadius: "6px",
                              background: selectedUser === user.username ? "#243c5a" : "transparent",
                              color: selectedUser === user.username ? "#fff" : "#aaa",
                              transition: "background 0.2s ease, color 0.2s ease",
                              fontWeight: "400",
                              fontSize: "14px",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                            onMouseEnter={(e) => (e.target.style.background = "#2c3e55")}
                            onMouseLeave={(e) =>
                              (e.target.style.background = selectedUser === user.username ? "#243c5a" : "transparent")
                            }
                            
                          >
                          {user.username}
                        </div>
                       ))
                      ) : (
                     query && <p>No users found.</p>
                     )}
                   </div>

                  <a href="#" class="community-link"
                    onClick={()=>{add_friend()}}
                  >
                    + add friend
                  </a>
                </div>
              
                <div class="community-section">
                   <div className="linie_gri2"></div>
                  <h3 class="community-title">Profile</h3>
                  <a href="#" class="community-delete-account">Delete account</a>
                </div>
              </div>
              
       )}


          {/* Conținutul tab-ului Notifications */}
          {activeTab === "Notifications" && (
            <div>
              
              <div>
                 {friendRequests.length>0 ? (
                   <ul>
                        {friendRequests.map((requests,index)=>(
                            <li key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <img src={requests.info[1]} alt={requests.info[0]} style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }} />
                            <strong>{requests.info[0]}</strong>
                      
                            <a href="#" onClick={()=>friendship(requests.info[0],requests.info[1])}style={{ color: "lightblue", textDecoration: "none", fontWeight: "bold", marginLeft: "auto" }}>
                                + Accept
                            </a>
                            <a href="#" onClick={()=>delete_request(requests.info[0])}style={{ color: "red", textDecoration: "none", fontWeight: "bold" }}>
                                - Decline
                            </a>
                        </li>
                        
                         
                        ))}
                   </ul>
                 ):(
                  <p>No friend requests</p>
                 )}
              </div>
              
          </div>
          )}
        </div>

        {/* Butonul de închidere */}
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
      <div>
      {popup_email&&< EmailPopup onClose={closeEmail}/>}
      </div>
      <div>
      {isPopupOpen && (
                        <PopupChangeName
                   onClose={handleClosePopup}
                   />
                  )}
      </div>
      <div>
        {popup_password&&(<ChangePasswordPopup onClose={closePassword}/>)}
      </div>
      <div>
        {popup_account&&<DeleteAccountPopup onClose={closeAccount}/>}
      </div>
      <div>
        {popup_username&&<Popup_username onClose={closeUsername}/>}
      </div>
      <div>
        {friendopen&&<Popup_f onClose={closeFriend} friends={friends.friends} onRemoveFriend={delete_friend}/>}
      </div>
    </div>
  );
};

export default Popup;
