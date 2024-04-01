// GrievanceForm.js

import React, { useState } from "react";
import axios from "axios";

const GrievanceForm = ({ user }) => {
  const [grievanceDetails, setGrievanceDetails] = useState("");
  const [department, setDepartment] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/grievance/postGrievance/${user._id}`,
        {
          detail: grievanceDetails,
          department: department,
        }
      );
      console.log(response.data);
      // Optionally, you can show a success message or perform other actions upon successful submission
    } catch (error) {
      console.error("Error submitting grievance:", error);
      // Optionally, you can show an error message or handle the error in another way
    }
    setGrievanceDetails("");
    setDepartment("");
  };

  return (
    <div className="grievance-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: {user.name}</label>
        </div>
        <div>
          <label>Email: {user.email}</label>
        </div>
        <div>
          <label>Mobile: {user.mobile}</label>
        </div>
        <div>
          <textarea
            placeholder="Enter grievance details"
            value={grievanceDetails}
            onChange={(e) => setGrievanceDetails(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Select Department to which grievance is addressed:</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            <option value="Canteen">Canteen</option>
            <option value="Departmental">Departmental</option>
            <option value="Sports">Sports</option>
            <option value="Head-Faculty">Head-Faculty</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GrievanceForm;
