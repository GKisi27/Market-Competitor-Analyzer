import React from "react";

const HowItWorks = () => {
  return (
    <div className="mt-35 px-15">
      {/* Title: Switches between dark gray and white text */}
      <h2 className="text-4xl text-center text-gray-900 dark:text-white transition-colors">
        How It Works
      </h2>

      {/* 
         Container: 
         - bg-gray-50: Light mode background
         - dark:bg-[#1B2537]: Dark mode background
         - border-gray-200: Added a subtle border for light mode
      */}
      <div className="flex gap-4 mt-8 bg-gray-50 dark:bg-[#1B2537] border border-gray-200 dark:border-none rounded-2xl overflow-hidden transition-all duration-500 shadow-sm dark:shadow-none">
        
        {/* Step 1 */}
        <div className="w-full h-60 py-8 flex space-y-4 flex-col items-center">
          <h1 className="text-xl h-15 w-15 bg-[#025E90] text-white rounded-full flex justify-center items-center shadow-lg">
            1
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Connect Your Institute
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center px-4">
            Integrate Your Institute platforms
          </p>
        </div>

        {/* Step 2 */}
        <div className="w-full h-60 py-8 flex space-y-4 flex-col items-center border-x border-gray-200 dark:border-gray-800">
          <h1 className="text-xl h-15 w-15 bg-[#025E90] text-white rounded-full flex justify-center items-center shadow-lg">
            2
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Monitor Competitors
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center px-4">
            Select the competitors to track the gap
          </p>
        </div>

        {/* Step 3 */}
        <div className="w-full h-60 py-8 flex space-y-4 flex-col items-center">
          <h1 className="text-xl h-15 w-15 bg-[#025E90] text-white rounded-full flex justify-center items-center shadow-lg">
            3
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Generate Reports
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center px-4">
            Analyze insights and download reports
          </p>
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;