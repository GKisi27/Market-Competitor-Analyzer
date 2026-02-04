import React from "react";
import heroimage from "../../assets/heroimage.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

    const navigate = useNavigate()
  return (
    <div className="flex px-15 mt-7 gap-8">
      <div className=" space-y-3">
        <h1 className="text-6xl font-bold leading-20">
          Bridging the Gap in <br />{" "}
          <span className="text-emerald-800">Institutional Excellence</span>
        </h1>

        <p
          className="leading-5 text-lg tracking-tight"
        >
          Unlock actionable insights with gap analysis, price analysis, trends,
          reports for modern organization
        </p>
       <button  
        onClick={()=>navigate('/signup')}
        className="bg-[#025E90] px-7 py-3 mt-10 rounded-lg text-white active:scale-95 ">Get Started</button>
      </div>

      <div className="w-1/2 overflow-hidden h-96 rounded-lg">
        <img
          className="h-full w-full object-cover object-center"
          src={heroimage}
          alt="image"
        />
      </div>
    </div>
  );
};

export default HeroSection;
