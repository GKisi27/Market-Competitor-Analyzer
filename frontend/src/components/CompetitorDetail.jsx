import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGlobe,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";

const CompetitorDetail = () => {
  return (
    <div>
      <div className="mt-[60px] bg-[#1B2537] h-[300px] rounded-lg p-6 mx-15 text-white flex items-center">
        <div className="flex items-center gap-4">
          <h1 className="h-[150px] w-[150px] bg-gray-300 rounded-lg flex items-center justify-center text-black">
            Logo
          </h1>
          <div>
            <h2 className="font-bold text-xl">TechPro Academy</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} />
                <p>Techproacademy@gmail.com</p>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faLocation} />
                <p>Suryabinayak-3, Bhaktapur</p>
              </div>
              <p>EST. 1994</p>
            </div>
            <div className="flex items-center gap-2 text-blue-400 underline">
              <FontAwesomeIcon icon={faGlobe} />
              <p>WWW.TechProAcademy.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorDetail;
