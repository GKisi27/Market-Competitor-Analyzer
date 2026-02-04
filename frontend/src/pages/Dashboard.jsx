import React from "react";
import Navbar from "../components/Navbar";
import Welcome from "../components/dashboard/Welcome";
import Reports from "../components/dashboard/Reports";
import ChartsGroup from "../components/dashboard/ChartsGroup"
import WordCloud from "../components/dashboard/WordCloud";

const Dashboard = () => {
  return (
    <div className="bg-[#141A28]  w-full">
      <Navbar />
      <Welcome />
      <Reports />
      <ChartsGroup />
      <WordCloud />
    </div>
  );
};

export default Dashboard;
