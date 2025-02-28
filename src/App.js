import React from 'react';
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
  return (
  <CounterProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Site />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
 </CounterProvider>
  );
}

export default App;
