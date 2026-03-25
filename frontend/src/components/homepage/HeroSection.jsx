import React from "react";
import heroimage from "../../assets/heroimage.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

    const navigate = useNavigate()
  return (
    <div className="flex flex-col md:flex-row px-4 md:px-15 mt-7 gap-8 items-center">
      <div className="space-y-3 w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight md:leading-[1.1]">
          Bridging the Gap in <br className="hidden md:block" />{" "}
          <span className="text-emerald-800">Institutional Excellence</span>
        </h1>

        <p className="leading-relaxed text-base md:text-lg tracking-tight mt-4">
          Unlock actionable insights with gap analysis, price analysis, trends,
          reports for modern organization
        </p>
       <button  
        onClick={()=>navigate('/signup')}
        className="bg-[#025E90] px-6 md:px-7 py-3 mt-6 md:mt-10 rounded-lg active:scale-95 text-white">Get Started</button>
      </div>

      <div className="w-full md:w-1/2 overflow-hidden h-64 sm:h-80 md:h-96 rounded-lg mt-6 md:mt-0">
        <img
          className="h-full w-full object-cover object-center"
          src={heroimage}
          alt="hero"
        />
      </div>
    </div>
  );
};

export default HeroSection;
