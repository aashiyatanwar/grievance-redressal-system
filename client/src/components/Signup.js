import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CollegeInfo from "./CollegeInfo";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    name: "",
    enrollment_no: "",
    fathers_name: "",
    mothers_name: "",
    mobile: "",
    password: "",
  });
  const {
    email,
    enrollment_no,
    name,
    fathers_name,
    mothers_name,
    mobile,
    password,
  } = inputValue;
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
      name: "",
      enrollment_no: "",
      fathers_name: "",
      mothers_name: "",
      mobile: "",
      password: "",
    });
  };

  return (
    <>
      <CollegeInfo></CollegeInfo>

      <main className="w-full h-full flex flex-col items-center justify-center px-4 mb-10">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl mx-auto">
            <div className="text-center px-6 py-4">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Sign up
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
              <div className="flex flex-col">
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  name="email"
                  onChange={handleOnChange}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 rounded-lg"
                />
              </div>
              {/* Other input fields */}
              <div className="flex flex-col">
                <label className="font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  name="name"
                  onChange={handleOnChange}
                  style={{ width: "calc(100% - 0.1rem)" }}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Enrollment No.</label>
                <input
                  type="text"
                  required
                  value={enrollment_no}
                  name="enrollment_no"
                  onChange={handleOnChange}
                  style={{ width: "calc(100% - 0.1rem)" }}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Father's Name</label>
                <input
                  type="text"
                  required
                  value={fathers_name}
                  name="fathers_name"
                  onChange={handleOnChange}
                  style={{ width: "calc(100% - 0.1rem)" }}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Mother's Name</label>
                <input
                  type="text"
                  required
                  value={mothers_name}
                  name="mothers_name"
                  onChange={handleOnChange}
                  style={{ width: "calc(100% - 0.1rem)" }}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Mobile No.</label>
                <input
                  type="text"
                  required
                  value={mobile}
                  name="mobile"
                  onChange={handleOnChange}
                  style={{ width: "calc(100% - 0.1rem)" }}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  name="password"
                  onChange={handleOnChange}
                  style={{ width: "calc(100% - 0.1rem)" }}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                Create account
              </button>
              <p className="text-center py-4">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
