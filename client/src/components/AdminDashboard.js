import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import CollegeInfo from "./CollegeInfo";
import { useNavigate } from "react-router-dom";

const AdminDashboard = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  const [grievances, setGrievances] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  console.log("loggedin" , loggedIn)

  useEffect(() => {
    localStorage.setItem("adminLoggedIn", true);
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");
    console.log("adminLoggedin" , adminLoggedIn)
    if (adminLoggedIn === "true" && loggedIn) {
      // Navigate to the dashboard page
      navigate("/admin");
    } else {
      navigate("/admin/login");
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    fetchGrievances();
  }, [startDate, endDate]);

  useEffect(() => {
    // Fetch all grievances from backend
    axios
      .get("http://localhost:5000/admin/grievance/getAll")
      .then((response) => {
        console.log(response.data.data);
        setGrievances(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching grievances:", error);
      });
  }, []);

  const fetchGrievances = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/admin/grievance/getByDate",
        {
          params: {
            startDate,
            endDate,
          },
        }
      );
      console.log("response-date", response.data);
      setGrievances(response.data);
    } catch (error) {
      console.error("Error fetching grievances:", error);
    }
  };

  const handleUpdateGrievance = (id, newData) => {
    // Update grievance on backend
    newData.dateOfRedressal = new Date();
    axios
      .put(`http://localhost:5000/admin/grievance/update/${id}`, newData)
      .then((response) => {
        console.log("update", response);
        // Update state with the updated grievance
        setGrievances(
          grievances.map((g) => (g._id === id ? response.data : g))
        );
      })
      .catch((error) => {
        console.error("Error updating grievance:", error);
      });
  };

  const handleLogout = () => {
    console.log("logout")
    // Clear admin's authentication state
    setLoggedIn(false);
    // Clear authentication state from local storage
    localStorage.removeItem("adminLoggedIn");
    // Redirect to admin login page
    navigate("/admin/login");
  };

  return (
    <div className="home_page">
      <div className="college-info-container" style = {{left : 450}}>
        <CollegeInfo />
      </div>
      <div className = "form-container">
      <h2 style = {{textAlign : "center"}}>List of Grievances</h2>
      <hr />
        <div className="user-info">
        <h6>Welcome admin!</h6>
          <button onClick={handleLogout} >LOGOUT</button>
        </div>
      <div className="filter-container">
        <label htmlFor="startDate">Start Date of Submission:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="endDate">End Date of Submission:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
     
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Detail</th>
            <th>Date of Submission</th>
            <th>Remarks</th>
            <th>Date of Redressal</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {grievances.map((grievance, index) => (
            <tr key={grievance._id}>
              <td>{index + 1}</td>
              <td>{grievance.detail}</td>
              <td>
                {new Date(grievance.dateOfSubmission).toLocaleDateString()}
              </td>
              <td>{grievance.remarks}</td>
              <td>
                {grievance.dateOfRedressal
                  ? new Date(grievance.dateOfRedressal).toLocaleDateString()
                  : "-"}
              </td>
              <td>{grievance.status}</td>
              <td>
                {grievance.status === "Pending" && (
                  <input
                    type="text"
                    placeholder="Enter remarks"
                    onChange={(e) => {
                      const updatedGrievances = [...grievances];
                      updatedGrievances.find(
                        (g) => g._id === grievance._id
                      ).remarks = e.target.value;
                      setGrievances(updatedGrievances);
                    }}
                  />
                )}
                <button
                  onClick={() =>
                    handleUpdateGrievance(grievance._id, {
                      remarks: grievance.remarks,
                      status:
                        grievance.status === "Pending" ? "Resolved" : "Pending",
                    })
                  }
                >
                  {grievance.status === "Pending"
                    ? "Mark as Resolved"
                    : "Mark as Pending"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

