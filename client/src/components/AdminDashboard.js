import { useEffect, useState } from "react";
import axios from "axios";
import CollegeInfo from "./CollegeInfo";
import { useNavigate } from "react-router-dom";

const AdminDashboard = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  const [grievances, setGrievances] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  console.log("loggedin", loggedIn);

  useEffect(() => {
    localStorage.setItem("adminLoggedIn", true);
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");
    console.log("adminLoggedin", adminLoggedIn);
    if (adminLoggedIn === "true") {
      // Navigate to the dashboard page
      navigate("/admin");
    } else {
      navigate("/admin/login");
    }
  }, [loggedIn, navigate]);

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



  const handleUpdateGrievance = (id, newData) => {
    newData.dateOfRedressal = new Date();
    newData.status = "Resolved";

    axios
      .put(`http://localhost:5000/admin/grievance/update/${id}`, newData)
      .then((response) => {
        //console.log("update", response);

        // Update state with the updated grievance
        const updatedGrievance = response.data.grievance;
        console.log("updatedGrievances", updatedGrievance);
        setGrievances((prevGrievances) =>
          prevGrievances.map((g) => {
            console.log("prev", prevGrievances);
            console.log("g", g);
            if (g.id === id) {
              console.log("Updating grievance:", g);
              console.log("Updated grievance:", updatedGrievance);
              return updatedGrievance; // Update the specific grievance
            } else {
              return g; // Return unchanged if not the updated grievance
            }
          })
        );
      })
      .catch((error) => {
        console.error("Error updating grievance:", error);
      });
  };
  const handleLogout = () => {
    console.log("logout");
    // Clear admin's authentication state
    setLoggedIn(false);
    // Clear authentication state from local storage
    localStorage.removeItem("adminLoggedIn");
    // Redirect to admin login page
    navigate("/admin/login");
  };

  useEffect(() => {
    const resolved = grievances.filter(
      (status) => status.status === "Resolved"
    );
    console.log("resolve", resolved);
    const pending = grievances.filter((status) => status.status === "Pending");
    setResolvedCount(resolved.length);
    setPendingCount(pending.length);
  }, [grievances]);

  const handleFilterChange = (e) => {
    if (e.target.name === "status") {
      setStatusFilter(e.target.value);
    } else if (e.target.name === "department") {
      setDepartmentFilter(e.target.value);
    }
  };

  const filterGrievances = () => {
    let filteredStatuses = [...grievances];

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

  const handlePrintRedressals = () => {
    window.print(); // Trigger browser's print dialog
  };

  const filteredStatuses = filterGrievances();
  console.log(filteredStatuses);

  return (
    <div>
      <CollegeInfo />

      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-xl m-7 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center print:hidden">
          ADMIN DASHBOARD
        </h2>
        <hr className="my-2 print:hidden" />
        <div className="flex justify-between items-center mb-4 print:hidden">
          <h6>Welcome admin!</h6>

          <div className="flex space-x-4">
            <button
              onClick={handlePrintRedressals}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Generate Report
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0 md:space-x-4 p-6 print:hidden">
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
            <label
              htmlFor="endDate"
              className="text-gray-700 mr-2 font-semibold"
            >
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
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 border-r border-h border-black-500">
                  S.No.
                </th>

                <th className="px-4 py-2 border-r border-h border-black-500">
                  Detail
                </th>
                <th className="px-4 py-2 border-r border-h border-black-500">
                  Date of Submission
                </th>
                <th className="px-4 py-2 border-r border-h border-black-500">
                  Grievance Area
                </th>
                <th className="px-4 py-2 border-r border-h border-black-500">
                  Remarks
                </th>
                <th className="px-4 py-2 border-r border-h border-black-500">
                  Date of Redressal
                </th>
                <th className="px-4 py-2 border-r border-h border-black-500">
                  Status
                </th>
                <th className="px-4 py-2 border-r border-h border-black-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStatuses.map((grievance, index) => (
                <tr
                  key={grievance.id}
                  className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
                >
                  <td className="px-4 py-2 border-r border-h border-black-500">
                    {index + 1}
                  </td>

                  <td className="px-4 py-2 border-r border-h border-black-500">
                    {grievance.detail}
                  </td>

                  <td className="px-4 py-2 border-r border-h border-black-500">
                    {new Date(grievance.dateOfSubmission).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-r border-h border-black-500">
                    {grievance.department}
                  </td>
                  <td className="px-4 py-2 border-r border-h border-black-500">
                    {grievance.remarks}
                  </td>
                  <td className="px-4 py-2 border-r border-h border-black-500">
                    {grievance.dateOfRedressal
                      ? new Date(grievance.dateOfRedressal).toLocaleDateString()
                      : "-"}
                  </td>

                  <td
                    className={`px-4 py-2 border-r border-h border-black-500 ${
                      grievance.status === "Resolved"
                        ? "text-green-600"
                        : grievance.status === "Pending"
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {grievance.status}
                  </td>

                  <td className="px-4 py-2 border-r border-h border-black-500">
                    {grievance.status === "Pending" ? (
                      <div className="flex flex-col">
                        <input
                          type="text"
                          placeholder="Enter remarks"
                          onChange={(e) => {
                            const updatedGrievances = [...grievances];
                            const updatedGrievance = updatedGrievances.find(
                              (g) => g.id === grievance.id
                            );
                            updatedGrievance.remarks = e.target.value;
                            setGrievances(updatedGrievances);
                          }}
                          className="border border-gray-300 rounded px-2 py-2 mb-2 focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          onClick={() =>
                            handleUpdateGrievance(grievance.id, {
                              remarks: grievance.remarks,
                            })
                          }
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                        >
                          Resolve
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md"
                          disabled
                        >
                          Resolved
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
