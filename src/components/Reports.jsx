import React from "react";
import { faDollarSign,faChartLine,faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Reports = () => {
  return (
    <div className="text-white px-15 mt-10">
      <p className="mb-1">key performance</p>

      <div className="flex justify-between items-center gap-15">
        <div className="bg-[#1B2537] w-1/3 h-35 px-10 py-5 rounded-lg flex justify-between place-items-start">
          <div className="flex flex-col items-start">
            <p className=" text-lg leading-8 ">price index</p>
            <h2 className="text-3xl font-bold">70.99</h2>
            <p className="text-gray-500">According to Market</p>
          </div>

          <div className="bg-[#025E90] p-2 rounded text-white"><FontAwesomeIcon className="text-2xl" icon={faDollarSign} /></div>
        </div>
        <div className="bg-[#1B2537] w-1/3 h-35 px-10 py-5 rounded-lg flex justify-between place-items-start">
          <div className="flex flex-col items-start">
            <p className="text-lg leading-8">Gap Score</p>
            <h2 className="text-3xl font-bold">93/100</h2>
            <p className="text-gray-500">Course Average</p>
          </div>

          <div className="bg-[#025E90] p-2 rounded text-white"><FontAwesomeIcon className="text-2xl" icon={faChartLine} /></div>
        </div>
        <div className="bg-[#1B2537] w-1/3 h-35 px-10 py-5 rounded-lg flex justify-between place-items-start">
          <div className="flex flex-col items-start">
            <p className="text-lg leading-8">Competitor</p>
            <h2 className="text-3xl font-bold">12</h2>
            <p className="text-gray-500">Overall Market</p>
          </div>

          <div className="bg-[#025E90] p-2 rounded text-white"><FontAwesomeIcon className="text-2xl" icon={faUserGroup} /></div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
