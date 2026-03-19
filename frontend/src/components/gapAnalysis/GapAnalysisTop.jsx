import React from "react";
import { AlertTriangle, BookOpen, Users, TrendingUp } from "lucide-react";

const GapAnalysisTop = () => {
  return (
    <div className="px-15 mt-5">
      <div className="flex flex-col gap-10">
        
        {/* Heading */}
        <div>
          <h2 className="text-3xl font-bold mb-2">
            Gap Score Analysis
          </h2>
          <p className="text-normal font-semibold leading-5 text-[var(--text-muted)]">
            Market gap assessment overview based on competitor comparison
          </p>
        </div>

        {/* KPI Cards */}
        <div className="flex justify-between items-center px-3 gap-5">
          
          {/* Total Gap Courses */}
          <div className="flex flex-col justify-between w-1/4 h-40 card p-5 rounded-2xl">
            <div className="flex justify-between items-center">
              <p className="text-[var(--text-muted)]">Total Gap Courses</p>
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <AlertTriangle size={20} />
              </div>
            </div>
            <h2 className="text-4xl font-bold">12</h2>
            <p className="text-sm text-[var(--text-muted)]">Missing from your platform</p>
          </div>

          {/* Courses We Offer */}
          <div className="flex flex-col justify-between w-1/4 h-40 card p-5 rounded-2xl">
            <div className="flex justify-between items-center">
              <p className="text-[var(--text-muted)]">Courses We Offer</p>
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <BookOpen size={20} />
              </div>
            </div>
            <h2 className="text-4xl font-bold">42</h2>
            <p className="text-sm text-[var(--text-muted)]">Available on platform</p>
          </div>

          {/* Avg Courses per Competitor */}
          <div className="flex flex-col justify-between w-1/4 h-40 card p-5 rounded-2xl">
            <div className="flex justify-between items-center">
              <p className="text-[var(--text-muted)]">Avg. Courses / Competitor</p>
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <Users size={20} />
              </div>
            </div>
            <h2 className="text-4xl font-bold">10</h2>
            <p className="text-sm text-[var(--text-muted)]">Market average</p>
          </div>

          {/* Market Relevance Score */}
          <div className="flex flex-col justify-between w-1/4 h-40 card p-5 rounded-2xl">
            <div className="flex justify-between items-center">
              <p className="text-[var(--text-muted)]">Market Relevance Score</p>
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <TrendingUp size={20} />
              </div>
            </div>
            <h2 className="text-4xl font-bold">70</h2>
            <p className="text-sm text-[var(--text-muted)]">Based on demand & gaps</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GapAnalysisTop;