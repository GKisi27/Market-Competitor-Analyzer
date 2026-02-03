import React from "react";
import PriceChart from "../PriceChart";

const ChartSection = () => {
    // dummy data used for visualizing
  const competitors = [
    {
      name: "broadway",
      address: "ktm",
    },
    {
      name: "broadway infosys",
      address: "ktm",
    },
    {
      name: "neosphere",
      address: "ktm",
    },
    {
      name: "nextstep infotech",
      address: "ktm",
    },
  ];
  return (
    <div className="flex justify-between items-center gap-10 p-15 text-white mt-6">
      <div className="w-3/4 h-96 ">
        <PriceChart />
      </div>
      <div className="w-1/4 bg-[#1B2537] h-96 px-8  flex flex-col justify-center gap-8 rounded-lg">
        {competitors.map((competitor, idx) => (
          <div className="grid grid-cols-[32px_1fr] items-center px-6">
            <div className="h-5 w-5 bg-amber-500"> </div>
            <p>{competitor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartSection;
