import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDollarToSlot,faChartPie,faMap } from "@fortawesome/free-solid-svg-icons";
const Facilities = () => {
  return (
    
      <div className="flex gap-5 px-15 mt-7 ">
        <div className="bg-[#1B2537] rounded w-1/3 h-45 p-5 flex flex-col justify-center text-left space-y-3">
          <p className="text-2xl">
            <FontAwesomeIcon icon={faCircleDollarToSlot} />
          </p>
          <h3 className="text-3xl font-bold">Realtime Price Tracking</h3>
          <p>Automatically track competitor price</p>
        </div>
        <div className="bg-[#1B2537] rounded w-1/3 h-45 p-5 flex flex-col justify-center text-left space-y-3">
          <p className="text-2xl">
            <FontAwesomeIcon icon={faChartPie} />
          </p>
          <h3 className="text-3xl font-bold">Manage Competitor</h3>
          <p>Identify your Competitors</p>
        </div>
        <div className="bg-[#1B2537] rounded w-1/3 h-45 p-5 flex flex-col justify-center text-left space-y-3">
          <p className="text-2xl">
            <FontAwesomeIcon icon={faMap} />
          </p>
          <h3 className="text-3xl font-bold">Competitor SWOT Mapping</h3>
          <p>Identify Companies Strength Weakness </p>
        </div>
      
      </div>

  );
};

export default Facilities;
