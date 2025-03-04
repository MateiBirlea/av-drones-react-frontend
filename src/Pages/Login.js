import React, { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';
import validation from '../login_valid';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom'; 
function Login() {

    const [email_v,setEmail_v]=useState('');
    const [password_v,setPassword_v]=useState('');
    const [loginstatus,setLoginstatus]=useState('');
    const [errors,setErrors]=useState({});
    const navigate = useNavigate();
    const login =(e)=>{
          e.preventDefault();
          const validation_errors=validation(email_v,password_v);
          setErrors(validation_errors);
          if(Object.keys(validation_errors).length>0)
          {
            return;
          }
          Axios.post('https://av-drones-react-backend-production.up.railway.app/login_ver',{
            email:email_v,
            password:password_v
        }).then((response)=>{
            if(response.data.message)
            {
                console.log(response.data.message);
                setLoginstatus(response.data.message);
                setEmail_v("");
                setPassword_v("");
            }
            else
            {
                localStorage.setItem('user', JSON.stringify(response.data[0]));
                navigate('/',{state:{response: response.data}});
            }
           
        });
       
    }
  return (
    <div>
      <div className='blurred-background'>
        <div className="bg-white p-4 rounded shadow w-50">
          <div className="mb-3">
              <label htmlFor="email" className="form-label"><strong>Email</strong></label>
              <input
               value={email_v}
                type="text"
                name="email"
                className="form-control"
                placeholder="Enter password"
               onChange={(e)=>{
                setEmail_v(e.target.value);
               }}
                required
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label"><strong>Password</strong></label>
              <input
               value={password_v}
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e)=>{
                    setPassword_v(e.target.value)

                }}
                required
              />
              {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>
            <button type="submit" className="btn btn-success w-100 mt-3" onClick={login}>
              Log In
            </button>
            <h1 className='l_status'>
                {loginstatus}
            </h1>
          </div>
      </div>
    </div>
  )
}

export default Login
