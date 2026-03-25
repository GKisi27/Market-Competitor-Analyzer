import React from "react";
import logoMca from "../../assets/logoMca.svg";
import { useNavigate } from "react-router-dom";

const HomeNav = () => {
    const navigate= useNavigate()
  return (
    <div className="bg-[var(--bg-navbar)] h-22.5 flex justify-between items-center w-full px-4 md:px-15 ">
      <div className="w-18 h-10 cursor-pointer">
        <img
          onClick={() => {
            navigate("/dashboard");
          }}
          className="h-full w-full"
          src={logoMca}
          alt="MCA Logo"
        />
      </div>

      <div className="flex gap-2 md:gap-4">
        <button 
        onClick={()=> navigate('/login')}
        className="bg-[#025E90] px-4 md:px-7 py-2 md:py-3 rounded-lg active:scale-95 text-sm md:text-base text-white">Login</button>
        <button 
        onClick={()=>navigate('/signup')}
        className="bg-[#025E90] px-4 md:px-7 py-2 md:py-3 rounded-lg active:scale-95 text-sm md:text-base text-white">Get Started</button>
      </div>
    </div>
  );
};

export default HomeNav;
