import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDollarToSlot, faChartPie, faMap } from "@fortawesome/free-solid-svg-icons";

const Facilities = () => {
  return (
    <div className="flex gap-5 px-15 mt-7 transition-colors duration-500">
      
      {/* Card 1 */}
      <div className="bg-white dark:bg-[#1B2537] border border-gray-200 dark:border-none shadow-sm hover:shadow-md rounded w-1/3 h-45 p-5 flex flex-col justify-center text-left space-y-3 transition-all duration-500">
        <p className="text-2xl text-[#025E90] dark:text-white">
          <FontAwesomeIcon icon={faCircleDollarToSlot} />
        </p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Realtime Price Tracking</h3>
        <p className="text-gray-600 dark:text-gray-300">Automatically track competitor price</p>
      </div>

      {/* Card 2 */}
      <div className="bg-white dark:bg-[#1B2537] border border-gray-200 dark:border-none shadow-sm hover:shadow-md rounded w-1/3 h-45 p-5 flex flex-col justify-center text-left space-y-3 transition-all duration-500">
        <p className="text-2xl text-[#025E90] dark:text-white">
          <FontAwesomeIcon icon={faChartPie} />
        </p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Competitor</h3>
        <p className="text-gray-600 dark:text-gray-300">Identify your Competitors</p>
      </div>

      {/* Card 3 */}
      <div className="bg-white dark:bg-[#1B2537] border border-gray-200 dark:border-none shadow-sm hover:shadow-md rounded w-1/3 h-45 p-5 flex flex-col justify-center text-left space-y-3 transition-all duration-500">
        <p className="text-2xl text-[#025E90] dark:text-white">
          <FontAwesomeIcon icon={faMap} />
        </p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Competitor SWOT Mapping</h3>
        <p className="text-gray-600 dark:text-gray-300">Identify Companies Strength Weakness </p>
      </div>
      
    </div>
  );
};

export default Facilities;