import React from "react";

const TopSection = () => {
 
    

  return (
    <div className="text-white px-15 mt-5">
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">Competitor Price Index</h2>
          <p className="text-normal font-semibold leading-5">
            Pricing analysis of top five competitors for <br /> key
            certification and courses
          </p>
        </div>

        <div className="flex justify-between items-center gap-5">
          <div className="flex flex-col justify-center  items-center rounded-lg w-1/4 h-40 bg-[#1B2537]">
            <h2 className="text-4xl font-bold">98.8</h2>
            <p className="text-normal">price index</p>
          </div>
          <div className="flex flex-col justify-center  items-center rounded-lg w-1/4 h-40 bg-[#1B2537]">
            <h2 className="text-4xl font-bold">RS.25000</h2>
            <p className="text-normal">our Average Course Price</p>
          </div>
          <div className="flex flex-col justify-center  items-center rounded-lg w-1/4 h-40 bg-[#1B2537]">
            <h2 className="text-4xl font-bold">5</h2>
            <p className="text-normal">Courses Over Market</p>
          </div>
          <div className="flex flex-col justify-center  items-center rounded-lg w-1/4 h-40 bg-[#1B2537]">
            <h2 className="text-4xl font-bold">10</h2>
            <p className="text-normal">Courses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
