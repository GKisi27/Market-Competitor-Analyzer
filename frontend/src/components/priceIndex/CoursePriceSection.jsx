import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";


const CoursePriceSection = () => {
  return (
    <div className="flex justify-between items-center gap-10 text-white px-15">
      <div className="w-1/2  bg-[#1B2537] rounded-lg p-5">
        <h2 className="text-2xl font-bold mb-4">Course Price comparison</h2>
        <table className="w-full">
         <thead>
           <tr className="border-b">
            <th className="text-left">Courses</th>
            <th className="text-left">Our Price</th>
            <th className="text-left">Avg.Competitor</th>
          </tr>
         </thead>
          <tbody>
            <tr>
            <td >React</td>
            <td>25000</td>
            <td>32000</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div className="w-1/2 bg-[#1B2537] rounded-lg p-5">

        <h2 className="text-2xl font-bold mb-4" >course pricing overview</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
            <th className="text-left">Competitor</th>
            <th className="text-left">Avg Price</th>
            <th className="text-left">Courses</th>
          </tr>
          </thead>
          <tbody>
            <tr>
            <td>comp name</td>
            <td>24000</td>
            <td>courses</td>
            <td><Link to={"https://nextstepinfotech.com/"} ><FontAwesomeIcon className="active:scale-90" icon={faArrowRight} /></Link></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursePriceSection;
