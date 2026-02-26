import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  return (
    <footer className="mt-5 px-15">
      <div className="flex justify-between">
        <div className="">
          <h2 className="text-2xl font-thin tracking-tight">Ready to outsmart the Market?</h2>
          <h2 className="text-2xl font-thin tracking-tight">Join MCA to grow the revenue</h2>
        </div>
        <Link to = '/signup'>Get Started <FontAwesomeIcon icon={faArrowRight} /> </Link>
      </div>

      <p className="text-center">&copy; 2026 Market Competitor Analyzer</p>
    </footer>
  );
};

export default Footer;
