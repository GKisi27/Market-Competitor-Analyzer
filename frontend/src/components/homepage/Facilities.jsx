import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDollarToSlot, faChartPie, faMap } from "@fortawesome/free-solid-svg-icons";

const Facilities = () => {
  return (
    <div className="flex gap-5 px-15 mt-7">

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl w-1/3 h-45 p-5 flex flex-col justify-center text-left space-y-3 transition-colors duration-300">
        <p className="text-2xl text-blue-500">
          <FontAwesomeIcon icon={faCircleDollarToSlot} />
        </p>
        <h3 className="text-3xl font-bold text-[var(--text-primary)]">Realtime Price Tracking</h3>
        <p className="text-[var(--text-muted)] text-sm">Monitor and compare course prices across Nepal's top IT training providers instantly.</p>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl w-1/3 h-45 p-5 flex flex-col justify-center text-left space-y-3 transition-colors duration-300">
        <p className="text-2xl text-blue-500">
          <FontAwesomeIcon icon={faChartPie} />
        </p>
        <h3 className="text-3xl font-bold text-[var(--text-primary)]">Curriculum Gap Analysis</h3>
        <p className="text-[var(--text-muted)] text-sm">Discover skill gaps and course offerings missing from your competitors' curriculum.</p>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl w-1/3 h-45 p-5 flex flex-col justify-center text-left space-y-3 transition-colors duration-300">
        <p className="text-2xl text-blue-500">
          <FontAwesomeIcon icon={faMap} />
        </p>
        <h3 className="text-3xl font-bold text-[var(--text-primary)]">Competitor SWOT Mapping</h3>
        <p className="text-[var(--text-muted)] text-sm">Analyze strengths, weaknesses, opportunities and threats of each competitor in the market.</p>
      </div>

    </div>
  );
};

export default Facilities;