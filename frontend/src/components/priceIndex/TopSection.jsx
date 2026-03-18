import React from "react";
import { Layers, BookOpen, AlertCircle, Folder } from "lucide-react";

const TopSection = () => {
  return (
    <div className="px-15 mt-5">
      <div className="flex flex-col gap-10">
        
        {/* Heading */}
        <div>
          <h2 className="text-3xl font-bold mb-2">
            Course Coverage Analysis
          </h2>
          <p className="text-normal font-semibold leading-5 text-[var(--text-muted)]">
            Coverage comparison of your courses against competitors across key categories
          </p>
        </div>

        {/* KPI Cards */}
        <div className="flex justify-between items-center gap-5">
          
          {/* Course Coverage */}
          <div className="flex flex-col justify-between w-1/4 h-40 card p-5 rounded-2xl">
            <div className="flex justify-between items-center">
              <p className="text-gray-300">Course Coverage</p>
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <Layers size={20} />
              </div>
            </div>
            <h2 className="text-4xl font-bold">68%</h2>
            <p className="text-sm text-[var(--text-muted)]">Across market</p>
          </div>

          {/* Your Courses */}
          <div className="flex flex-col justify-between w-1/4 h-40 card p-5 rounded-2xl">
            <div className="flex justify-between items-center">
              <p className="text-gray-300">Your Courses</p>
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <BookOpen size={20} />
              </div>
            </div>
            <h2 className="text-4xl font-bold">48</h2>
            <p className="text-sm text-[var(--text-muted)]">Available</p>
          </div>

          {/* Missing Courses */}
          <div className="flex flex-col justify-between w-1/4 h-40 card p-5 rounded-2xl">
            <div className="flex justify-between items-center">
              <p className="text-gray-300">Missing Courses</p>
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <AlertCircle size={20} />
              </div>
            </div>
            <h2 className="text-4xl font-bold">12</h2>
            <p className="text-sm text-[var(--text-muted)]">vs competitors</p>
          </div>

          {/* Categories Covered */}
          <div className="flex flex-col justify-between w-1/4 h-40 card p-5 rounded-2xl">
            <div className="flex justify-between items-center">
              <p className="text-gray-300">Categories Covered</p>
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <Folder size={20} />
              </div>
            </div>
            <h2 className="text-4xl font-bold">6 / 10</h2>
            <p className="text-sm text-[var(--text-muted)]">Market coverage</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopSection;