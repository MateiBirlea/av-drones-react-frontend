import React, { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom'; 
import validation from '../signup_valid';

function Signup() {
 
  const [first_name_reg, setFirst_name_reg] = useState('');
  const [last_name_reg, setLast_name_reg] = useState('');
  const [email_reg, setEmail_reg] = useState('');
  const [password_reg, setPassword_reg] = useState('');
  const [signup_status,setSignup_status]=useState('');
  const [errors,setErrors]=useState('');
  const navigate = useNavigate();
  
  const register = (e) => {

    e.preventDefault(); 
    const valid_errors=validation(first_name_reg,last_name_reg,email_reg,password_reg);
    setErrors(valid_errors);
    console.log("Eroare nume",errors.first_name);
    console.log("NR eori",Object.keys(valid_errors).length);
    if(Object.keys(valid_errors).length>0)
    {
      return;
    }
    Axios.post("https://av-drones-react-backend-production.up.railway.app/register", {
      firstn: first_name_reg,
      lastn: last_name_reg,
      email: email_reg,
      password: password_reg,
    })
    .then((response) => {
         if(response.data.error)
         {
            setSignup_status(response.data.message);
         }else{
          navigate('/login');
         }
          
    })
    .catch((error) => {
      console.error("There was an error registering!", error);
    });
  };
 const l_in = ()=>{
  navigate('/login');
 }
 const clear_box=()=>{
  setEmail_reg("");
  setFirst_name_reg("");
  setPassword_reg("");
  setLast_name_reg("");
 }
  return (
    <div >
      <div  className='blurred-background'>
        <div className="bg-white p-4 rounded shadow w-50">
          
          <form onSubmit={register}> 
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label"><strong>First Name</strong></label>
              <input
                type="text"
                name="first_name"
                className="form-control"
                placeholder="Enter first name"
                onChange={(e) => setFirst_name_reg(e.target.value)}
                //required
              />
               {errors.first_name && <p style={{ color: 'red' }}>{errors.first_name}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label"><strong>Last Name</strong></label>
              <input
                type="text"
                name="last_name"
                className="form-control"
                placeholder="Enter last name"
                onChange={(e) => setLast_name_reg(e.target.value)}
                //required
              />
              {errors.last_name && <p style={{ color: 'red' }}>{errors.last_name}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label"><strong>Email</strong></label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail_reg(e.target.value)}
                //required
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label"><strong>Password</strong></label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword_reg(e.target.value)}
                //required
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>

            <button type="submit" className="btn btn-success w-100 mt-3"  >
              Sign Up
            </button>

            <div className="text-center mt-3">
              <button type="button" className="btn btn-link" onClick={l_in}>
                Already have an account? Log In
              </button>
            </div>
            <h1  className="l_status">
              {signup_status}
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
