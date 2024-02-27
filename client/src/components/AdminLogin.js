import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CollegeInfo from "./CollegeInfo";
import './AdminLogin.css'; 

const AdminLogin = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/admin/login', { username, password });
      console.log("response" , response)
      if (response.data.token) {
        // Set logged-in state or store token
        setLoggedIn(true);
        navigate('/admin');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container">
      <div className="college-info-container" style = {{left : 300 , position : "relative" , top : -200}}>
        <CollegeInfo />
      </div>
     
      <h2 style = {{top : 900}}>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      
    </div>
  );
};

export default AdminLogin;
