// GrievanceForm.js

import React, { useState } from "react";
import axios from "axios";

const GrievanceForm = ({ user }) => {
  console.log(user);
  const [grievanceDetails, setGrievanceDetails] = useState("");
  const [showForm, setShowForm] = useState(false);
  console.log("id", user._id);
  console.log("detail", grievanceDetails);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/grievance/postGrievance/${user._id}`,
        {
          detail: grievanceDetails,
        }
      );
      console.log(response.data);
      // Optionally, you can show a success message or perform other actions upon successful submission
    } catch (error) {
      console.error("Error submitting grievance:", error);
      // Optionally, you can show an error message or handle the error in another way
    }
    setGrievanceDetails("");
  };

  return (
    <div className = "grievance-form">
      
      
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
          <button type="submit">Submit</button>
        </form>
      
    </div>
  );
};

export default GrievanceForm;
