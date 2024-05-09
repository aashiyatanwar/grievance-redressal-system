import React from "react";

const CollegeInfo = () => {
  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="pb-6">
            <img src="../bvicam.png" width={150} className="mx-auto" />
          </div>
          <figure>
            <blockquote>
              <h2 className="text-4xl font-bold text-gray-800 sm:text-3xl">
                BHARATI VIDYAPEETH'S INSTITUTE OF COMPUTER APPLICATIONS AND MANAGEMENT
              </h2>
            </blockquote>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default CollegeInfo;
