import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CollegeInfo from "./CollegeInfo"

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    name : "",
    enrollment_no: "",
    fathers_name : "",
    mothers_name : "",
    mobile: ""
  });
  const { email, password, enrollment_no, name, fathers_name, mothers_name, mobile } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
        password: "",
        name : "",
        enrollment_no: "",
        fathers_name : "",
        mothers_name : "",
        mobile: ""
    });
  };

  return (
    <>
    <div className = "college-info-container">
      <CollegeInfo></CollegeInfo>
    </div>
    <div className="form_container">
      <h2>Signup Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Full Name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter your full name"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Enrollment No.</label>
          <input
            type="text"
            name="enrollment_no"
            value={enrollment_no}
            placeholder="Enter your enrollment number"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Father's Name</label>
          <input
            type="text"
            name="fathers_name"
            value={fathers_name}
            placeholder="Enter your father's name"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Mother's Name</label>
          <input
            type="text"
            name="mothers_name"
            value={mothers_name}
            placeholder="Enter your mother's name"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="email">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={mobile}
            placeholder="Enter your mobile"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
    </>
  );
};

export default Signup;