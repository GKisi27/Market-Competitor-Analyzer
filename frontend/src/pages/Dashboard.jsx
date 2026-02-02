import React from "react";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
import Reports from "../components/Reports";
import ChartsGroup from "../components/ChartsGroup";
import WordCloud from "../components/WordCloud";

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
