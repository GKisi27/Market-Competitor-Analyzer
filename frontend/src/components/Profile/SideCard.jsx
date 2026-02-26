import React from "react";

const SideCard = () => {
  return (
    <div className="bg-[#1B2537] h-128 w-112.5 rounded-xl flex p-10 text-white font-semibold text-[24px] flex-col ">
      Access & Permissions
      <div className="h-px w-full bg-white mt-2.5"></div>
      <div className=" mt-5 text-[20px] ">
        <p className="inline-block mb-5 bg-[#141A28] px-10 py-2.5 rounded-full ">View Logs</p>
        <p className="inline-block mb-5 bg-[#141A28] px-10 py-2.5 rounded-full ">Manage Competitors</p>
        <p className="inline-block mb-5 bg-[#141A28] px-10 py-2.5 rounded-full ">Permission three</p>
        <p className="inline-block mb-5 bg-[#141A28] px-10 py-2.5 rounded-full ">Permission Four</p>
      </div>
    </div>
  );
};

export default SideCard;
