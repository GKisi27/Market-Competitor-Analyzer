import React from "react";
import {
  faDollarSign,
  faBook,
  faChartLine,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Reports = () => {
  return (
    <div className="px-15 mt-10">
      <p className="mb-1">key performance</p>

      {/* Container for the 3 KPI cards */}
      <div className="flex justify-between items-center gap-8">
        
        {/* 1. Price Index Card */}
        <Link
          to="/price-index"
          className="card w-1/3 h-35 px-10 py-5 flex justify-between place-items-start"
        >
          <div className="flex flex-col w-full text-start">
            <p className=" text-lg leading-8 text-left ">Course Coverage</p>
            <h2 className="text-3xl font-bold">68%</h2>
            <p className="text-gray-500 ">Market Coverage</p>
          </div>

          <div className="bg-[#025E90] p-2 rounded">
            <FontAwesomeIcon className="text-2xl" icon={faBook} />
          </div>
        </Link>

        {/* 2. Gap Analysis Card */}
        <Link
          to="/gap-analysis"
          className="card w-1/3 h-35 px-10 py-5 flex justify-between place-items-start"
        >
          <div className="flex flex-col text-start">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Gap Score</p>
            <h2 className="text-4xl font-black mt-1 text-gray-900 dark:text-white">93/100</h2>
            <p className="text-xs mt-3 text-sky-600 dark:text-sky-400 font-semibold">
              Institutional <span className="text-gray-400 font-normal">Avg: 85</span>
            </p>
          </div>

          <div className="bg-[#025E90] p-2 rounded">
            <FontAwesomeIcon className="text-2xl" icon={faChartLine} />
          </div>
        </Link>

        {/* 3. Competitors Card */}
        <Link
          to="/competitors"
          className="card w-1/3 h-35 px-10 py-5 flex justify-between place-items-start"
        >
          <div className="flex flex-col items-start">
            <p className="text-lg leading-8">Competitor</p>
            <h2 className="text-3xl font-bold">5</h2>
            <p className="text-gray-500">Overall Market</p>
          </div>

          <div className="bg-[#025E90] p-2 rounded">
            <FontAwesomeIcon className="text-2xl" icon={faUserGroup} />
          </div>
        </Link>
        
      </div>
    </div>
  );
};

export default Reports;