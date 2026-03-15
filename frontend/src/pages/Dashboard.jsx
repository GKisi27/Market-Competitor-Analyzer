import React from "react";
import Navbar from "../components/Navbar";
import Welcome from "../components/dashboard/Welcome";
import Reports from "../components/dashboard/Reports";
import ChartsGroup from "../components/dashboard/ChartsGroup";
import WordCloud from "../components/dashboard/WordCloud";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const user = true; // Set to true for testing
  if (!user) {
    return <Navigate to='/login'/>
  }

  return (
    /* 
       THE FIX: 
       - bg-white: Default (Light Mode)
       - dark:bg-[#141A28]: Navy (Dark Mode)
    */
    <div className="bg-white dark:bg-[#141A28] min-h-screen w-full transition-colors duration-500">
      <Navbar />
      <div className="pb-20">
        <Welcome />
        <Reports />
        <ChartsGroup />
        <WordCloud />
      </div>
    </div>
  );
};

export default Dashboard;