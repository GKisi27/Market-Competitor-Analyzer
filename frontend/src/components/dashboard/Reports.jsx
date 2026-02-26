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
    <div className="text-white px-15 mt-10">
      <p className="mb-1">key performance</p>

      {/* section where price index gap and cmpetitors are shhown */}
      <div className="flex justify-between items-center gap-8">
        {/* price index card */}
        <Link
          to="/price-index"
          className="bg-[#1B2537] w-1/3 h-35 px-10 py-5 rounded-lg flex justify-between place-items-start"
        >
          <div className="flex flex-col w-full text-start">
            <p className=" text-lg leading-8 text-left ">price index</p>
            <h2 className="text-3xl font-bold">70.99</h2>
            <p className="text-gray-500 ">According Market</p>
          </div>

          <div className="bg-[#025E90] p-2 rounded text-white">
            <FontAwesomeIcon className="text-2xl" icon={faDollarSign} />
          </div>
        </Link>

        {/* gap analysis card */}
        <Link
          to="/gap-analysis"
          className="bg-[#1B2537] w-1/3 h-35 px-10 py-5 rounded-lg flex justify-between place-items-start"
        >
          <div className="flex flex-col items-start">
            <p className="text-lg leading-8">Gap Score</p>
            <h2 className="text-3xl font-bold">93/100</h2>
            <p className="text-gray-500">Course Average</p>
          </div>

          <div className="bg-[#025E90] p-2 rounded text-white">
            <FontAwesomeIcon className="text-2xl" icon={faChartLine} />
          </div>
        </Link>

        {/* competitors caard section */}
        <Link
          to="/competitors"
          className="bg-[#1B2537] w-1/3 h-35 px-10 py-5 rounded-lg flex justify-between place-items-start"
        >
          <div className="flex flex-col items-start">
            <p className="text-lg leading-8">Competitor</p>
            <h2 className="text-3xl font-bold">12</h2>
            <p className="text-gray-500">Overall Market</p>
          </div>

          <div className="bg-[#025E90] p-2 rounded text-white">
            <FontAwesomeIcon className="text-2xl" icon={faUserGroup} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Reports;
