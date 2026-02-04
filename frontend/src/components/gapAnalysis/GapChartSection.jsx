import React from "react";
import GapChart from "../GapChart";

const GapChartSection = () => {
  return (
    <div className="px-15 text-white bg-[] flex justify-between gap-5 mt-4 ">
      <div className="w-3/4">
        <GapChart />
      </div>
      <div className="rounded bg-zinc-600 w-1/4 flex flex-col justify-center text-center">
        <h2>index</h2>
        <div className="flex items-center px-6 gap-3">
          <div className="h-5 w-5 bg-red-500 shrink-0 rounded-full"></div>
          <p className="truncate">courses </p>
        </div>
        <div className="flex items-center px-6 gap-3">
          <div className="h-5 w-5 bg-blue-500 shrink-0 rounded-full"></div>
          <p className="truncate">students </p>
        </div>
      </div>
    </div>
  );
};

export default GapChartSection;
