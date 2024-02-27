import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./GrievanceStatus.css"
const GrievanceStatus = ({user}) => {
  const [statuses, setStatuses] = useState([]);
  console.log("userID" , user._id)
  useEffect(() => {
    const fetchStatuses = async () => {
      try{
      if (user && user._id) {
        const response = await axios.get(`http://localhost:5000/grievance/user/${user._id}`);
        console.log("response", response);
        setStatuses(response.data);
      } else {
        console.error("User ID is not available.");
      }
      } catch (error) {
      console.error(error);
    } 
    };

    fetchStatuses();
  }, [user]);

  return (
    <div className = "container">
      <h2>Grievance Redressal Status</h2>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Email ID</th>
            <th>Grievances</th>
            <th>Date of Submission</th>
            <th>Grievance Redressal Remarks</th>
            <th>Date of Redress</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((status, index) => (
            <tr key={status._id}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{status.detail}</td>
              <td>{new Date(status.dateOfSubmission).toLocaleDateString()}</td>
              <td>{status.remarks}</td>
              <td>{new Date(status.dateOfRedressal).toLocaleDateString()}</td>
              <td>{status.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrievanceStatus;
