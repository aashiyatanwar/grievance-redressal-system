import React, { useState } from "react";
import axios from "axios";

const GrievanceFormFaculty = ({ user }) => {
  const [grievanceDetails, setGrievanceDetails] = useState("");
  const [department, setDepartment] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    console.log("user" ,user.id)
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/faculty/postGrievanceFaculty/${user.id}`,
        {
          detail: grievanceDetails,
          department: department,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting grievance:", error);
    }
    setGrievanceDetails("");
    setDepartment("");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            value={user.name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            value={user.email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mobile:
          </label>
          <input
            type="text"
            value={user.mobile}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Grievance Details:
          </label>
          <textarea
            placeholder="Enter grievance details"
            value={grievanceDetails}
            onChange={(e) => setGrievanceDetails(e.target.value)}
            className="resize-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Grievance Area:
          </label>
          <div className="relative">
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Grievance Area</option>
              <option value="Canteen">Canteen</option>
              <option value="Departmental">Departmental</option>
              <option value="Sports">Sports</option>
              <option value="Head-Faculty">Head-Faculty</option>
              <option value="Other">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default GrievanceFormFaculty;
