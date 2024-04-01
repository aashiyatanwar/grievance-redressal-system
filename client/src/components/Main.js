import React from 'react';
import { Link } from 'react-router-dom';
import CollegeInfo from "./CollegeInfo";
import "./Main.css";

const Main = () => {
  return (
    <div>
    <div className="college-info-container">
        <CollegeInfo />
      </div>
    <div className="main-container">
      

      <div className="login-options">
        <div className="login-card">
          <img src="../admin.png" alt="Admin" className="login-card-img" />
          <h3>Admin Login</h3>
          <p>Login as an admin</p>
          <Link to="/admin/login">
            <button className="admin-login">Admin Login</button>
          </Link>
        </div>

        <div className="login-card">
          <img src="../student.png" alt="Student" className="login-card-img" />
          <h3>Student Login</h3>
          <p>Login as a student</p>
          <Link to="/login">
            <button className="student-login">Student Login</button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Main;