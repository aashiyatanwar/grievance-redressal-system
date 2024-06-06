import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CollegeInfo from "./CollegeInfo";
import GrievanceForm from "./GrievanceFrom";
import GrievanceStatus from "./GrievanceStatus";

const baseURL = process.env.REACT_APP_BACKEND_URL;
const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [user, setUser] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      console.log("cookies" , cookies.token_fac)
      if (!cookies.token_fac) {
        navigate("/faculty/login");
      }
      const { data } = await axios.post(
        `${baseURL}/faculty`,
        {},
        { withCredentials: true }
      );
      console.log(data);
      const { status, faculty } = data;
      console.log("home", faculty);
      setUser(faculty);
     
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/faculty/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/faculty/signup");
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    setShowStatus(false); // Close status if form is opened
  };

  const toggleStatus = () => {
    setShowStatus(!showStatus);
    setShowForm(false); // Close form if status is opened
  };

  return (
    <div>
      <CollegeInfo />

      <div class="max-w-8xl mx-auto p-6">
        <div class="bg-white shadow-lg rounded-lg border border-gray-200">
          <div class="p-4">
            <h3 class="text-center text-2xl font-semibold tracking-tight text-gray-900 sm:text-2xl mb-4 p-5">
              Grievance Redressal Dashboard
            </h3>

            <div class="bg-white shadow-lg rounded-lg border border-gray-200 ">
              <div class="flex items-center justify-between px-4 py-2 sm:px-6 lg:py-3 lg:px-8">
                <h6 class="text-lg font-semibold text-black dark:text-black">
                  <span class="block">Welcome, {user.name}!</span>
                </h6>
                <div class="lg:mt-0 lg:flex-shrink-0">
                  <div class="inline-flex rounded-md shadow">
                    <button
                      type="button"
                      onClick={Logout}
                      class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center py-12">
              <button
                onClick={toggleForm}
                class="py-2 px-4 bg-blue-500 hover:bg-blue-600 focus:ring-blue-400 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg mr-4"
              >
                Submit Grievance
              </button>
              <button
                onClick={toggleStatus}
                class="py-2 px-4 bg-blue-500 hover:bg-blue-600 focus:ring-blue-400 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Grievance Redressal Status
              </button>
            </div>

            {showForm && <GrievanceForm user={user} onClose={toggleForm} />}
            {showStatus && (
              <GrievanceStatus user={user} onClose={toggleStatus} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
