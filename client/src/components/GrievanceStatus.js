import React, { useEffect, useState } from "react";
import axios from "axios";

const GrievanceStatus = ({ user }) => {
  const [statuses, setStatuses] = useState([]);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(
            `http://localhost:5000/grievance/user/${user._id}`
          );
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
    const resolved = statuses.filter((status) => status.status === "Resolved");
    const pending = statuses.filter((status) => status.status === "Pending");
    setResolvedCount(resolved.length);
    setPendingCount(pending.length);
  }, [statuses]);

  const handleFilterChange = (e) => {
    if (e.target.name === "status") {
      setStatusFilter(e.target.value);
    } else if (e.target.name === "department") {
      setDepartmentFilter(e.target.value);
    }
  };

  const filterGrievances = () => {
    let filteredStatuses = statuses;

    if (startDate && endDate) {
      filteredStatuses = filteredStatuses.filter(
        (status) =>
          new Date(status.dateOfSubmission) >= new Date(startDate) &&
          new Date(status.dateOfSubmission) <= new Date(endDate)
      );
    }

    if (statusFilter) {
      filteredStatuses = filteredStatuses.filter(
        (status) => status.status === statusFilter
      );
    }

    if (departmentFilter) {
      filteredStatuses = filteredStatuses.filter(
        (status) => status.department === departmentFilter
      );
    }

    return filteredStatuses;
  };

  const filteredStatuses = filterGrievances();

  return (
    <div className="max-w-10xl mx-auto p-6 bg-white rounded-lg shadow-xl m-7 border border-gray-200">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Grievance Redressal Status
      </h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex items-center">
          <label
            htmlFor="startDate"
            className="text-gray-700 mr-2 font-semibold"
          >
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="endDate" className="text-gray-700 mr-2 font-semibold">
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="statusFilter"
            className="text-gray-700 mr-2 font-semibold"
          >
            Status:
          </label>
          <select
            id="statusFilter"
            name="status"
            value={statusFilter}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-indigo-500 appearance-none"
          >
            <option value="">All</option>
            <option value="Resolved" className="text-green-600 ">
              Resolved
            </option>
            <option value="Pending" className="text-red-600 ">
              Pending
            </option>
          </select>
        </div>
        <div className="flex items-center">
          <label
            htmlFor="departmentFilter"
            className="text-gray-700 mr-2 font-semibold"
          >
            Grievance Area:
          </label>
          <select
            id="departmentFilter"
            name="department"
            value={departmentFilter}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-indigo-500 appearance-none"
          >
            <option value="">All</option>
            <option value="Canteen">Canteen</option>
            <option value="Departmental">Departmental</option>
            <option value="Head-Faculty">Head-Faculty</option>
            <option value="Sports">Sports</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-black-500">
          <thead className="text-white">
            <tr>
              <th className="px-4 py-2 bg-blue-500 border-r border-h border-black-500">
                S.No.
              </th>
              <th className="px-4 py-2 bg-blue-500 border-r border-h border-black-500">
                Email ID
              </th>
              <th className="px-4 py-2 bg-blue-500 border-r border-h border-black-500">
                Grievances
              </th>
              <th className="px-4 py-2 bg-blue-500 border-r border-h border-black-500">
                Date of Submission
              </th>
              <th className="px-4 py-2 bg-blue-500 border-r border-h border-black-500">
                Grievance Redressal Remarks
              </th>
              <th className="px-4 py-2 bg-blue-500 border-r border-h border-black-500">
                Date of Redress
              </th>
              <th className="px-4 py-2 bg-blue-500 border-r border-h border-black-500">
                Department
              </th>
              <th className="px-4 py-2 bg-blue-500 border-r border-h border-black-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStatuses.map((status, index) => (
              <tr
                key={status._id}
                className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
              >
                <td className="px-4 py-2 border-r border-h border-black-500">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-r border-h border-black-500">
                  {user.email}
                </td>
                <td className="px-4 py-2 border-r border-h border-black-500">
                  {status.detail}
                </td>
                <td className="px-4 py-2 border-r border-h border-black-500">
                  {status.dateOfSubmission
                    ? new Date(status.dateOfSubmission).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-2 border-r border-h border-black-500">
                  {status.remarks}
                </td>
                <td className="px-4 py-2 border-r border-h border-black-500">
                  {status.dateOfRedressal
                    ? new Date(status.dateOfRedressal).toLocaleDateString()
                    : "-"}
                </td>
                <td className="px-4 py-2 border-r border-h border-black-500">
                  {status.department}
                </td>
                <td
                  className={`px-4 py-2 ${
                    status.status === "Resolved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {status.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GrievanceStatus;
