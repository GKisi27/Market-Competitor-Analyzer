import React from "react";

const HowItWorks = () => {
  return (
    <div className="mt-35">
      <h2 className="text-4xl text-center">How To Works</h2>
      <div className="flex gap-4 mt-4 bg-[#1B2537] ">
        <div className=" w-full h-50 py-5 flex space-y-4 flex-col items-center">
          <h1 className="text-xl h-15 w-15 bg-[#025E90] rounded-full flex justify-center items-center ">
            1
          </h1>
          <h2 className="text-3xl font-semibold">Connect Your Institute</h2>
          <p className="text-xl">Integrate Your Institute platforms</p>
        </div>
        <div className=" w-full h-50 py-5 flex space-y-4 flex-col items-center">
          <h1 className="text-xl h-15 w-15 bg-[#025E90] rounded-full flex justify-center items-center ">
            2
          </h1>
          <h2 className="text-3xl font-semibold">Monitor Competitors</h2>
          <p className="text-xl">select the competitors to track the gap</p>
        </div>
        <div className=" w-full h-50 py-5 flex space-y-4 flex-col items-center">
          <h1 className="text-xl h-15 w-15 bg-[#025E90] rounded-full flex justify-center items-center ">
            3
          </h1>
          <h2 className="text-3xl font-semibold">Generate Reports</h2>
          <p className="text-xl">Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
