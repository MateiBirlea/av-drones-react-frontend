
import { useLocalStorage } from '../Hooks/useLocalStorage';
import axios from 'axios';
import Axios from 'axios';
import './Site.css';
import Popup from "../Components/Popup";
import Signup from './Signup';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';
import forest from './images/forest.jpg'
import forest2 from './images/forest2.jpg'
import river from './images/river.jpg'
import scanning1 from './images/scanning1.jpg'
import scanning2 from './images/scanning2.jpg'
import scanning3 from './images/scanning3.jpg'
import product1 from './images/product1.jpg'
import product2 from './images/product2.jpg'
import product3 from './images/product3.jpg'
import Rectangle35 from './images/Rectangle 35.png';
import Rectangle118 from './images/Rectangle 118.png';
import PauseButton from  './images/Pause Button.png';
import Rectangle122 from './images/r2.png';
import PauseButton2 from './images/Pause Button(2).png';
import Rectangle123 from './images/Rectangle 123.png';
import Rectabgle34 from './images/Rectangle 34.png';
import Rectangle33 from './images/Rectangle 33.png';
import instagram from './images/iconmonstr-instagram-15 1.png';
import facebook from './images/iconmonstr-facebook-5 1.png';
import manu from './images/Menu.png';
import Rectangle151 from './images/Rectangle 151.png';
import Rectangle128 from './images/Rectangle 128.png';
import drone_logo from  './images/Drone Logo.png';
import Rectangle141  from './images/Rectangle 141.png';
import Icon from './images/iconmonstr-magnifier-lined 1.png';
import Ret  from './images/Rectangle 130.png';
import bellIcon from './images/bell.png';
import supportIcon from './images/support.png';
import settingsIcon from './images/settings.png';
import homeIcon from './images/home2.PNG';
import dashboardIcon from './images/dashboard2.PNG';
import projectsIcon from './images/projects2.PNG';
import tasksIcon from './images/tasks2.PNG';
import reportingIcon from './images/reporting2.PNG';
import usersIcon from './images/Users2.PNG';
import vectorIcon from './images/Vector(1).png';
import ellipse1 from "./images/Ellipse 1.png";
import ellipse2 from "./images/Ellipse 2.png";
import ellipse3 from "./images/Ellipse 3.png";
import rectangle152 from "./images/Rectangle 152.png";
import user1 from "./images/ue.png";
import LoginFirstPopup from "../Components/Login_firs";
import Popup_gallery from '../Components/Popup_gallery';
import Popup_gallery_3d from '../Components/Popup_gallery_3d';
import Popup_info from '../Components/Popup_info';
import Popup_gallery_p from '../Components/Popup_gallery_p';
import React,{ useState,useEffect,useContext } from 'react';
import { CounterContext } from "../Context/CounterContext";
function Site() {
  
    const navigate = useNavigate();
    const [utilizator,setUtilizator]=useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [email,setEmail]=useState('');
    const [preview, setPreview] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [login_popup,setLogin_popup]=useState(false);
    const [entry_info,setEntry_info]=useState(false);
    const [gallery_photo,setGalleryphoto]=useState(false);
    const [gallery_photo_3d,setGalleryphoto_3d]=useState(false);
    const [gallery_photo_t,setGalleryphoto_t]=useState(false);
    const {counter}=useContext(CounterContext);
    const images = [forest, forest2, river];
  const handleOpenPopup = () => {
    const local_profile=localStorage.getItem('user');
    if(local_profile)
      setIsPopupOpen(true);
    else
    {
       setLogin_popup(true);
    }
  };
  const close_gallery_photo=()=>{setGalleryphoto(false)}
  const open_gallery_photo=()=>{setGalleryphoto(true)}
  const close_gallery_photo_3d=()=>{setGalleryphoto_3d(false)}
  const open_gallery_photo_3d=()=>{setGalleryphoto_3d(true)}
  const close_gallery_photo_t=()=>{setGalleryphoto_t(false)}
  const open_gallery_photo_t=()=>{setGalleryphoto_t(true)}
  const closeLog=()=>{setLogin_popup(false)}
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const openEntry=()=>{
    setEntry_info(true);
  }
  const closeEntry=()=>{
    setEntry_info(false);
  }
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
        reader.onloadend = () => setPreview(reader.result);
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
          setPreview(response.data.url);
          const jj=localStorage.getItem('user');
          const parseduser=JSON.parse(jj);
          parseduser.profile=response.data.url;
          localStorage.setItem('user',JSON.stringify(parseduser));
          console.log('Email:',parseduser.email);
          Axios.post('https://av-drones-react-backend-production.up.railway.app/profile_set',{
            emailn:parseduser.email,
            urln:response.data.url
          }).then((response)=>{
            if(response.data.err)
            {
              console.log(response.data.err);
            }else if(response.data.message)
               {
                  console.log(response.data.message);
               }
          })
      } catch (error) {
          console.error('Error uploading image:', error);
      }
  };
        
    const toggleSidebar = () => {
        const sidebar = document.querySelector('.side-nav');
        sidebar.classList.toggle('active');
      };
      const submenu = (event) => {
        const n = event.target.closest("li");
        n.classList.toggle("open");
        const n1 = event.target;
        n1.classList.toggle("rotated");
      };
      const s_up =()=>{
        navigate('/signup');
      }

      useEffect(() => {
        const local_profile = localStorage.getItem('user');
        console.log("local_profile:", local_profile); // Verifică ce este salvat
        
        if (local_profile) {
            try {
                const parseduser = JSON.parse(local_profile);
                setPreview(parseduser.profile);
                console.log("URL Profil", preview);
                setUtilizator(parseduser);
                setEmail(parseduser.email);
            } catch (error) {
                console.error("JSON parsing error:", error);
                localStorage.removeItem('user'); // Șterge datele corupte
            }
        } else {
            console.warn("No user data in localStorage!");
        }
    }, [counter]);
    
      useEffect(() => {
        console.log("Preview după setare:", preview); 
        /*let stored=JSON.parse(localStorage.getItem('user'));
                  if(stored)
                  {
                    stored.profile=preview;
                    localStorage.setItem('user',JSON.stringify(stored));
                  }*/
    }, [preview]);
      const logout = () => {
       const local=localStorage.getItem('user');
       if(local==null)
        alert("You must Log In first!")
      else
       {
        localStorage.removeItem('user');
        localStorage.removeItem('profileImage');
        setUtilizator(null);  
        setProfileImage(null); 
        setPreview(null);
        navigate('/');
        alert("Logged out successfully");
       }
      };
      
    
    const location=useLocation();
    const response=location.state?.response;
   
      
      
  return (
    
  <div className="no-zoom">
    <div className="background">
      <div className="left">
             <nav>
              <ul className="layout-nav">
                 <li><a onClick={openEntry}href="#">ENTRY INFO</a></li>
                 <li><a onClick={open_gallery_photo_t}href="#">PRODUCTS</a></li>
                 <li><a onClick={open_gallery_photo}href="#">PHOTO & VIDEO</a></li>
                 <li><a onClick={open_gallery_photo_3d}href="#">3D CAPTURING</a></li>
             </ul>
            </nav>
              <div>
                <h1 className="av_drones">AV DRONES.</h1>
                <h1 className="just-fly">JUST FLY.</h1>
                <h1 className="world">SEE THE WORLD THROUGH OUR EYES</h1>
                <img src={Rectangle35} className="line-image" alt="descriere imagine" />
                <img src={Rectangle118} className="vertical-image" alt="Descriere imagine" />
              </div>
          </div>
      </div>
      <div className='Right'>
        {/*<div>
          <img src={PauseButton} className="pause" alt="" />
          <img src={Rectangle122} className="rectangle" />
          <img src={PauseButton2} className="pause2" />
          <img src={Rectangle123} className="rectangle2" />
          <h1  className="play_video">PLAY VIDEO</h1>
        </div>*/}
        
          <img src={Rectabgle34} className="line_v1" />
          <img src={Rectangle33} className="line_v2" />
          <h1 className="mouse_scroll">Mouse scroll</h1>
          {/* <img src={instagram} className="instagram" />
          <img src={facebook} className="facebook" />*/}
          <img src={manu} className="menu" onClick={toggleSidebar} />
          <h1 className="av_register" onClick={s_up}>Log In / Sign Up</h1>
          <h1 className="av_register1" onClick={logout}>Log Out</h1>
        
       
        <div className='side-nav'>
           <div className='panel'>
               <img className="panel_image" src={Rectangle151} />
               <img className="logo_1" src={Rectangle128} />
               <img className="logo_2" src={drone_logo} />
               <h1 className="text_1">AV DRONES.</h1>
               <img className="line_v" src={Rectangle141} />
               <img className="search" src={Icon} />
               <img className="search_r" src={Ret} />
               <ul className="menu_2">
                  <li>
                    <p>
                    <img src={bellIcon} className="b_icon" />
                    <span className="text">Notifications</span>
                    </p>
                  </li>
                    <li>
                       <p>
                        <img src={supportIcon} className="s_icon" />
                        <span className="text">Support</span>
                      </p>
                   </li>
                 <li>
                   <p>
                    <img src={settingsIcon} className="se_icon" />
                  <span className="text">Settings</span>
                  </p>
                 </li>
              </ul>
              <ul className="menu_1">
           <li>
                <p>
                <img src={homeIcon} className="h_icon" />
                <span className="text">Home</span>
                <img src={vectorIcon} className="s_1" onClick={submenu} />
              </p>
             <ul className="sub_menu">
               <p>elemnt1</p>
               <p>elemnt2</p>
               <p>elemnt3</p>
               <p>elemnt4</p>
              </ul>
          </li>
          <li>
           <p>
             <img src={dashboardIcon} className="d_icon" />
             <span className="text">Dashboard</span>
              <img src={vectorIcon} className="s_2" onClick={submenu} />
           </p>
           <ul className="sub_menu">
             <p>elemnt1</p>
             <p>elemnt2</p>
              <p>elemnt3</p>
             <p>elemnt4</p>
           </ul>
        </li>
        <li>
            <p>
             <img src={projectsIcon} className="d_projects" />
              <span className="t">Projects</span>
             <img src={vectorIcon} className="s_3" onClick={submenu} />
           </p>
          <ul className="sub_menu">
             <p>elemnt1</p>
            <p>elemnt2</p>
             <p>elemnt3</p>
            <p>elemnt4</p>
          </ul>
        </li>
        <li>
           <p>
             <img src={tasksIcon} className="d_tasks" />
              <span className="text">Tasks</span>
             <img src={vectorIcon} className="s_4" onClick={submenu} />
           </p>
          <ul className="sub_menu">
             <p>elemnt1</p>
             <p>elemnt2</p>
             <p>elemnt3</p>
             <p>elemnt4</p>
           </ul>
         </li>
          <li>
            <p>
             <img src={reportingIcon} className="d_reporting" />
             <span className="text">Reporting</span>
              <img src={vectorIcon} className="s_5" onClick={submenu} />
            </p>
            <ul className="sub_menu">
              <p>elemnt1</p>
              <p>elemnt2</p>
              <p>elemnt3</p>
              <p>elemnt4</p>
            </ul>
          </li>
          <li>
            <p>
              <img src={usersIcon} className="d_users" />
              <span className="text">Users</span>
              <img src={vectorIcon} className="s_6" onClick={submenu} />
           </p>
            <ul className="sub_menu">
              <p>elemnt1</p>
              <p>elemnt2</p>
              <p>elemnt3</p>
              <p>elemnt4</p>
              <p>elemnt5</p>
           </ul>
         </li>
        </ul>
        <ul className="elipse">
        <li><img src={ellipse1} alt="Ellipse 1" /></li>
        <li><img src={ellipse2} alt="Ellipse 2" /></li>
        <li><img src={ellipse3} alt="Ellipse 3" /></li>
      </ul>
      {/*<h1 className="sign" onClick={s_up}>Sign Up</h1>*/}
      {/*<h1 className="login" >Log in</h1>*/}
      {/*<h1 className="logout" onClick={logout}>Log Out </h1>*/}
      <input
                type="file"
                accept="image/*"
                onChange={image_upload}
                id="file-input"
                style={{ display: 'none' }}
              />
      {/*<label htmlFor="file-input"className="upload" >Upload</label>*/}
      <div>
        <img src={rectangle152} className="acc" alt="Account Rectangle" />
        {utilizator ? (
                <p className='mm'>{utilizator ? `${utilizator.name} ${utilizator.prenume}` : 'Nume utilizator indisponibil'}</p>
            ) : (
                <p className='mm'>Unknown name</p>
            )}
        {utilizator ? (
              <p className='me'>{utilizator.email ? utilizator.email : ''}</p>
        ) : (
             <p className='me'>Unknown email</p>
        )}
        {preview ? (
                <img src={preview} alt="Profile" className="circular-image" />
              ) : (
                  <label htmlFor="file-input" className='text-label'>No image</label>
              )}
      </div>
      <div className="dots-container" onClick={handleOpenPopup}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
     </div>
        </div>
      </div>
      <div>
         {isPopupOpen && <Popup onClose={handleClosePopup} />}
      </div>
      <div>
        {login_popup && <LoginFirstPopup onClose={closeLog}/>}
      </div>
      <div>
      {entry_info && <Popup_info onClose={closeEntry}/>}
      </div>
      <div>
      { gallery_photo&&<Popup_gallery images={[forest, forest2, river]} onClose={close_gallery_photo} />}
      </div>
      <div>
      { gallery_photo_3d&&<Popup_gallery_3d images={[scanning1,scanning2,scanning3]} onClose={close_gallery_photo_3d} />}
      </div>
      <div>
      { gallery_photo_t&&<Popup_gallery_p images={[product1,product2,product3]} onClose={close_gallery_photo_t} />}
      </div>
 </div>

  )
}

export default Site;
