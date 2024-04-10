// import React from "react";
// import { Link } from "react-router-dom";
// import CollegeInfo from "./CollegeInfo";

// const Main = () => {
//   return (
//     <div>
//       <CollegeInfo />

//       <h3 class="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//         Welcome to the Grievance Portal
//       </h3>

//       <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
//         <div className="grid max-w-screen-lg gap-8 row-gap-5 md:row-gap-8 sm:mx-auto lg:grid-cols-2">
//           <div className="transition duration-300 transform bg-white rounded shadow-sm hover:-translate-y-1 hover:shadow md:text-center">
//             <div className="relative">
//               <img
//                 className="object-cover w-full h-64 rounded-t lg:h-80 xl:h-96"
//                 src="../admin.jpg"
//                 alt=""
//               />
//               <div className="absolute inset-0 bg-gray-800 bg-opacity-25" />
//             </div>
//             <div className="px-6 py-8 border border-t-0 rounded-b sm:px-8">
//               <h5 className="mb-2 text-xl font-bold leading-none sm:text-2xl">
//                 Admin
//               </h5>
//               <Link to="/admin/login">
//                 <button className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none">
//                   LOGIN
//                 </button>
//               </Link>
//             </div>
//           </div>
//           <div className="transition duration-300 transform bg-white rounded shadow-sm hover:-translate-y-1 hover:shadow md:text-center">
//             <div className="relative">
//               <img
//                 className="object-cover w-full h-60 rounded-t lg:h-80 xl:h-96"
//                 src="../student.png"
//                 alt=""
//               />
//               <div className="absolute inset-0 bg-gray-800 bg-opacity-25" />
//             </div>
//             <div className="px-6 py-8 border border-t-0 rounded-b sm:px-8">
//               <h5 className="mb-2 text-xl font-bold leading-none sm:text-2xl">
//                 Student
//               </h5>
//               <Link to="/login">
//                 <button className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none">
//                   LOGIN
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;

import React from "react";
import { Link } from "react-router-dom";
import CollegeInfo from "./CollegeInfo";

const Main = () => {
  return (
    <div>
      <CollegeInfo />

      <div className="max-w-screen-xl mx-auto p-12 bg-white border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 m-6 -mt-6">
        <h3 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
          Welcome to the Grievance Portal
        </h3>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="transition duration-300 transform bg-white rounded shadow-sm hover:-translate-y-1 hover:shadow-lg md:text-center">
            <div className="relative">
              <img
                className="object-cover w-full h-64 rounded-t lg:h-80 xl:h-96"
                src="../admin.jpg"
                alt=""
              />
              <div className="absolute inset-0 bg-gray-800 bg-opacity-25" />
            </div>
            <div className="px-6 py-8 border border-t-0 rounded-b">
              <h5 className="mb-2 text-xl font-bold leading-none sm:text-2xl">
                Admin
              </h5>
              <Link to="/admin/login">
                <button className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none">
                  LOGIN
                </button>
              </Link>
            </div>
          </div>
          <div className="transition duration-300 transform bg-white rounded shadow-sm hover:-translate-y-1 hover:shadow-lg md:text-center">
            <div className="relative">
              <img
                className="object-cover w-full h-60 rounded-t lg:h-80 xl:h-96"
                src="../student.png"
                alt=""
              />
              <div className="absolute inset-0 bg-gray-800 bg-opacity-25" />
            </div>
            <div className="px-6 py-8 border border-t-0 rounded-b">
              <h5 className="mb-2 text-xl font-bold leading-none sm:text-2xl">
                Student
              </h5>
              <Link to="/login">
                <button className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none">
                  LOGIN
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

