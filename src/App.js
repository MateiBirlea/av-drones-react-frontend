import React from 'react';
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Site from './Pages/Site';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Popup from './Components/Popup';
import PopupChangeNameUnique from './Components/Popup_name';
import EmailPopup from './Components/Email_popup';
import { CounterProvider } from './Context/CounterContext';
import DeleteAccountPopup from './Components/delete_popup';
function App() {

  useEffect(() => {
   
    document.body.style.zoom = "100%";

    
    window.addEventListener("resize", () => {
      document.body.style.zoom = "100%";
    });

    return () => {
      window.removeEventListener("resize", () => {
        document.body.style.zoom = "100%";
      });
    };
  }, []);


  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      zoom: "1",
      transform: "none",
      touchAction: "pan-x pan-y",
      userSelect: "none"
    }}>
  <CounterProvider>
    <Router>
      <Routes>
        
        <Route path="/" element={<Site />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
 </CounterProvider>
 </div>
  );
}

export default App;
