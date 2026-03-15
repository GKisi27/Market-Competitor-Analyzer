import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    /* 
       Added border-t and transition for a premium feel.
       bg-gray-50 provides a nice contrast for Light Mode.
    */
    <footer className="mt-20 px-15 py-12 bg-gray-50 dark:bg-[#0B0F17] border-t border-gray-200 dark:border-gray-800 transition-colors duration-500">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        <div className="space-y-1">
          <h2 className="text-3xl font-light tracking-tight text-gray-900 dark:text-white">
            Ready to outsmart the Market?
          </h2>
          <h2 className="text-3xl font-light tracking-tight text-[#025E90] dark:text-sky-400">
            Join MCA to grow the revenue
          </h2>
        </div>

        {/* Call to Action Link */}
        <Link 
          to='/signup' 
          className="group flex items-center gap-3 text-lg font-semibold text-gray-900 dark:text-white hover:text-[#025E90] dark:hover:text-sky-400 transition-all"
        >
          Get Started 
          <FontAwesomeIcon 
            icon={faArrowRight} 
            className="group-hover:translate-x-2 transition-transform" 
          /> 
        </Link>
      </div>

      {/* Divider and Copyright */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center text-sm text-gray-500 dark:text-gray-500">
        <p>&copy; 2026 Market Competitor Analyzer</p>
        <div className="flex gap-6">
          <span className="cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</span>
          <span className="cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;