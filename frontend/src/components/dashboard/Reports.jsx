import React from "react";
import {
  faDollarSign,
  faChartLine,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Reports = () => {
  return (
    <div className="px-15 mt-10 transition-colors duration-500">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
        Key Performance Metrics
      </p>

      {/* Container for the 3 KPI cards */}
      <div className="flex justify-between items-center gap-8">
        
        {/* 1. Price Index Card */}
        <Link
          to="/price-index"
          className="bg-white dark:bg-[#1B2537] w-1/3 h-40 px-8 py-6 rounded-2xl border border-gray-200 dark:border-none flex justify-between items-start shadow-sm hover:shadow-xl transition-all duration-500 group"
        >
          <div className="flex flex-col text-start">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Price Index</p>
            <h2 className="text-4xl font-black mt-1 text-gray-900 dark:text-white">70.99</h2>
            <p className="text-xs mt-3 text-emerald-600 dark:text-emerald-400 font-semibold">
              ↑ 2.4% <span className="text-gray-400 font-normal">vs last month</span>
            </p>
          </div>

          <div className="bg-[#025E90] p-4 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform">
            <FontAwesomeIcon className="text-xl" icon={faDollarSign} />
          </div>
        </Link>

        {/* 2. Gap Analysis Card */}
        <Link
          to="/gap-analysis"
          className="bg-white dark:bg-[#1B2537] w-1/3 h-40 px-8 py-6 rounded-2xl border border-gray-200 dark:border-none flex justify-between items-start shadow-sm hover:shadow-xl transition-all duration-500 group"
        >
          <div className="flex flex-col text-start">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Gap Score</p>
            <h2 className="text-4xl font-black mt-1 text-gray-900 dark:text-white">93/100</h2>
            <p className="text-xs mt-3 text-sky-600 dark:text-sky-400 font-semibold">
              Institutional <span className="text-gray-400 font-normal">Avg: 85</span>
            </p>
          </div>

          <div className="bg-[#025E90] p-4 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform">
            <FontAwesomeIcon className="text-xl" icon={faChartLine} />
          </div>
        </Link>

        {/* 3. Competitors Card */}
        <Link
          to="/competitors"
          className="bg-white dark:bg-[#1B2537] w-1/3 h-40 px-8 py-6 rounded-2xl border border-gray-200 dark:border-none flex justify-between items-start shadow-sm hover:shadow-xl transition-all duration-500 group"
        >
          <div className="flex flex-col text-start">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tracked Competitors</p>
            <h2 className="text-4xl font-black mt-1 text-gray-900 dark:text-white">12</h2>
            <p className="text-xs mt-3 text-gray-400">Active market monitoring</p>
          </div>

          <div className="bg-[#025E90] p-4 rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform">
            <FontAwesomeIcon className="text-xl" icon={faUserGroup} />
          </div>
        </Link>
        
      </div>
    </div>
  );
};

export default Reports;