import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  return (
    <footer className="mt-10 px-4 md:px-15 mb-5 border-t border-[var(--border)] pt-5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-thin tracking-tight">Ready to outsmart the Market?</h2>
          <h2 className="text-xl md:text-2xl font-thin tracking-tight">Join MCA to grow the revenue</h2>
        </div>
        <Link to='/signup' className="bg-[#025E90] px-6 py-3 rounded-lg text-white hover:bg-[#024c75] transition-colors flex items-center gap-2">Get Started <FontAwesomeIcon icon={faArrowRight} /> </Link>
      </div>

      <p className="text-center mt-8 text-sm md:text-base text-[var(--text-muted)]">&copy; 2026 Market Competitor Analyzer</p>
    </footer>
  );
};

export default Footer;
