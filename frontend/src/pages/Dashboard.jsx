import React from "react";
import Navbar from "../components/Navbar";
import Welcome from "../components/dashboard/Welcome";
import Reports from "../components/dashboard/Reports";
import ChartsGroup from "../components/dashboard/ChartsGroup"
import WordCloud from "../components/dashboard/WordCloud";
import { Navigate } from "react-router-dom";

const Dashboard = () => {

  const user= false
  if(!user){
   return <Navigate to='/login'/>
  }


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
