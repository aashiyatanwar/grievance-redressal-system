import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CollegeInfo from "./CollegeInfo";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const baseURL = process.env.REACT_APP_BACKEND_URL;
const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
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
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${baseURL}/login`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
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
    });
  };

  return (
    <div>
      <CollegeInfo></CollegeInfo>

      <div className="w-full h-full flex items-center justify-center mb-10">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg hover:shadow-xl">
          <main className="px-8 py-12 text-gray-600">
            <div className="text-center">
              <div className="space-y-2">
                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                  Login
                </h3>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="flex flex-col">
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  style={{ width: "calc(100% - 0.1rem)" }}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                Log in
              </button>
              <p className="text-center">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Login;
