import React from "react";
import { Link } from "react-router-dom";

const CompetitorReport = () => {
  return (
    <div className="text-white px-15 mt-10">

      <div className="flex justify-between items-center gap-8">
        <Link
          to="/"
          className="bg-[#1B2537] w-1/3 h-35 px-10 py-5 rounded-lg flex justify-center place-items-center"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold">5</h2>
            <p className="text-gray-500">Active Competitors</p>
          </div>
        </Link>

        <Link
          to="/"
          className="bg-[#1B2537] w-1/3 h-35 px-10 py-5 rounded-lg flex justify-center place-items-center"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold">200</h2>
            <p className="text-gray-500">Total Course Tracked</p>
          </div>
        </Link>

        <Link
          to="/"
          className="bg-[#1B2537] w-1/3 h-35 px-10 py-5 rounded-lg flex justify-center place-items-center"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold">25,000</h2>
            <p className="text-gray-500">Avg. Market Price</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CompetitorReport;
