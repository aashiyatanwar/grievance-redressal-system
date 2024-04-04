import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Main from "./components/Main";

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
      </Routes>
    </div>
  );
}

export default App;
