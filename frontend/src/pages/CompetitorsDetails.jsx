import React from "react";
import Navbar from "../components/Navbar";
import CompetitorDetail from "../components/competitorsDetails/CompetitorDetail";
import TopCourses from "../components/competitorsDetails/TopCourses";

const CompetitorsDetails = () => {
  return (
    <div className="bg-[#141A28] w-full">
      <Navbar />
      <CompetitorDetail />
      <TopCourses/>
    </div>
  );
};

export default CompetitorsDetails;
