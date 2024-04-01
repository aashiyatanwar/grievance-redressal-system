import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./GrievanceStatus.css";

const GrievanceStatus = ({ user }) => {
  const [statuses, setStatuses] = useState([]);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(`http://localhost:5000/grievance/user/${user._id}`);
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

  useEffect(() => {
    const resolved = statuses.filter(status => status.status === "Resolved");
    const pending = statuses.filter(status => status.status === "Pending");
    setResolvedCount(resolved.length);
    setPendingCount(pending.length);
  }, [statuses]);

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filterGrievances = () => {
    let filteredStatuses = statuses;

    if (startDate && endDate) {
      filteredStatuses = filteredStatuses.filter(status =>
        new Date(status.dateOfSubmission) >= new Date(startDate) &&
        new Date(status.dateOfSubmission) <= new Date(endDate)
      );
    }

    if (statusFilter) {
      filteredStatuses = filteredStatuses.filter(status => status.status === statusFilter);
    }

    return filteredStatuses;
  };

  const filteredStatuses = filterGrievances();

  return (
    <div className="container">
      <h2>Grievance Redressal Status</h2>
      <div className="filters">
        <label htmlFor="startDate">Start Date:</label>
        <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label htmlFor="endDate">End Date:</label>
        <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <select value={statusFilter} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Resolved">Resolved</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Email ID</th>
            <th>Grievances</th>
            <th>Date of Submission</th>
            <th>Grievance Redressal Remarks</th>
            <th>Date of Redress</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredStatuses.map((status, index) => (
            <tr key={status._id}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{status.detail}</td>
              <td>{new Date(status.dateOfSubmission).toLocaleDateString()}</td>
              <td>{status.remarks}</td>
              <td>{new Date(status.dateOfRedressal).toLocaleDateString()}</td>
              <td>{status.department}</td>
              <td>{status.status}</td>

            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default GrievanceStatus;
