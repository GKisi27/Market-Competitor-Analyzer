import React from "react";
import logoMca from "../../assets/logoMca.svg";
import { useNavigate } from "react-router-dom";

const HomeNav = () => {
    const navigate= useNavigate()
  return (
    <div className="bg-[#1B2537] h-22.5 flex justify-between items-center w-full px-15 ">
      <div className="w-18 h-10 ">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="h-full w-full"
          src={logoMca}
          alt=""
        />
      </div>

      <div className="flex gap-4">
        <button 
        onClick={()=> navigate('/login')}
        className="bg-[#025E90] px-7 py-3 rounded-lg text-white active:scale-95 ">Login</button>
        <button 
        onClick={()=>navigate('/signup')}
        className="bg-[#025E90] px-7 py-3 rounded-lg text-white active:scale-95 ">Get Started</button>
      </div>

     
    </div>
  );
};

export default HomeNav;
