import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CollegeInfo from "./CollegeInfo";

const AdminLogin = ({ setLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/admin/login", {
        username,
        password,
      });
      console.log("response", response);
      if (response.data.token) {
        // Set logged-in state or store token
        setLoggedIn(true);
        navigate("/admin");
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <div>
        <CollegeInfo />
      </div>

      {/* <h2 style = {{top : 900}}>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button> */}

      <main className="w-full h-full flex items-center justify-center mb-10">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg hover:shadow-xl">
          <main className="px-8 py-12 text-gray-600">
            <div className="text-center">
              <div className="space-y-2">
                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                  Login
                </h3>
              </div>
            </div>
            <div className="mt-8 space-y-5">
              <div className="flex flex-col">
                <label className="font-medium">Username</label>
                <input
                  type="text"
                  required
                  name="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "calc(100% - 0.1rem)" }}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <button
                onClick={handleLogin}
                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              >
                Login
              </button>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
