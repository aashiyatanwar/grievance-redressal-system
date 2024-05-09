import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Main from "./components/Main";
import FacultyDashboard from "./components/FacultyDashboard"; // Import the FacultyDashboard component
import FacultyLogin from "./components/FacultyLogin"; // Import the FacultyLogin component
import FacultySignup from "./components/FacultySignup"; // Import the FacultySignup component

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("login", loggedIn);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin/login"
          element={<AdminLogin setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/admin/*"
          element={
            <AdminDashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          }
        />
        <Route path="/faculty/login" element={<FacultyLogin />} /> 
        <Route path="/faculty/signup" element={<FacultySignup />} /> 
        <Route path="/faculty/dashboard" element={<FacultyDashboard />} /> 
      </Routes>
    </div>
  );
}

export default App;
