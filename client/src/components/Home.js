// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import CollegeInfo from "./CollegeInfo";
// import GrievanceForm from "./GrievanceFrom";
// import GrievanceStatus from "./GrievanceStatus"

// const Home = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [user, setUser] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   useEffect(() => {
//     const verifyCookie = async () => {
//       if (!cookies.token) {
//         navigate("/login");
//       }
//       const { data } = await axios.post(
//         "http://localhost:5000",
//         {},
//         { withCredentials: true }
//       );
//       console.log(data);
//       const { status, user } = data;
//       console.log("home", user);
//       setUser(user);
//       return status
//         ? toast(`Hello ${user}`, {
//             position: "top-right",
//           })
//         : (removeCookie("token"), navigate("/login"));
//     };
//     verifyCookie();
//   }, [cookies, navigate, removeCookie]);
//   const Logout = () => {
//     removeCookie("token");
//     navigate("/signup");
//   };
//   return (
//     <div className="home_page">
//       <div className="college-info-container" style={{ paddingTop: "1rem" , zIndex : 2, position : "relative" , marginTop : "90px"}}>
//         <CollegeInfo />
//       </div>

//       <div className="form-container" style = {{marginTop : "50px"}}>
//         <h6>Grievances Redressal Dashboard</h6>
//         <hr></hr>
//         <div className="user-info">
//       <h6>
//         Welcome, {user.name}!
//       </h6>
//       <button onClick={Logout}>LOGOUT</button>
//     </div>

//         <GrievanceForm user={user}></GrievanceForm>
//         <GrievanceStatus user = {user}/>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CollegeInfo from "./CollegeInfo";
import GrievanceForm from "./GrievanceFrom";
import GrievanceStatus from "./GrievanceStatus";
//import "./home.css"

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [user, setUser] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:5000",
        {},
        { withCredentials: true }
      );
      console.log(data);
      const { status, user } = data;
      console.log("home", user);
      setUser(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <div className="home_page">
      <div className="college-info-container" style = {{textAlign : "center" , marginBottom : "2rem" ,  left : 400}}>
        <CollegeInfo />
      </div>

      <div className="form-container">
        <h6>Grievances Redressal Dashboard</h6>
        <hr />
        <div className="user-info">
          <h6>Welcome, {user.name}!</h6>
          <button onClick={Logout}>LOGOUT</button>
        </div>

        <div className="buttons-container">
          <button onClick={() => setShowForm(true)}>Submit Grievance</button>
          <button onClick={() => setShowStatus(true)}>
            Grievance Redressal Status
          </button>
        </div>

        {showForm && <GrievanceForm user={user} />}
        {showStatus && <GrievanceStatus user={user} />}
      </div>
      
    </div>
  );
};

export default Home;
