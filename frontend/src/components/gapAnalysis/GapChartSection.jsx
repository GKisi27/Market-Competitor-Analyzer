import React, { useState } from "react";
import GapChart from "../GapChart";

const GapChartSection = () => {
  const [competitorCourses, setCompetitorCourses] = useState([]);
  const [showCourses, setShowCourses] = useState(false);
  const [showNoOfCoursesDataset, setShowNoOfCoursesDataset] = useState(true);
  const [showCourseVarietyDataset, setShowCourseVarietyDataset] = useState(true);

  return (
    <div className="px-15 flex justify-between gap-5 mt-4">
      {/* Chart — taller container */}
      <div className="w-3/4 h-[480px]">
        <GapChart 
          onDataLoaded={setCompetitorCourses} 
          showLegend={false} 
          height="h-full" 
          visibleDatasets={{
            "No. of Courses": showNoOfCoursesDataset,
            "Course Variety": showCourseVarietyDataset
          }}
        />
      </div>

      {/* Sidebar */}
      <div className="bg-[var(--bg-input)] w-1/4 flex flex-col gap-3 justify-center px-4 py-5 rounded-lg">
        <h2 className="text-center font-bold text-sm mb-1">Legend</h2>

        {/* Courses box — clickable, toggles breakdown */}
        <div
          className="cursor-pointer rounded-lg p-3 border border-transparent hover:border-red-400 transition-all"
          style={{ background: 'rgba(255,99,132,0.08)' }}
          onClick={() => setShowCourses(prev => !prev)}
          title="Click to toggle course breakdown"
        >
          <div className="flex items-center gap-2 mb-1">
            <input 
              type="checkbox" 
              className="cursor-pointer w-4 h-4 accent-red-500"
              checked={showNoOfCoursesDataset}
              onChange={(e) => {
                e.stopPropagation();
                setShowNoOfCoursesDataset(e.target.checked);
              }}
              onClick={(e) => e.stopPropagation()}
              title="Toggle 'No. of Courses' visibility"
            />
            <div className="h-3 w-3 bg-red-500 shrink-0 rounded-full" />
            <span className="font-semibold text-sm">No. of Courses</span>
            <span className="ml-auto text-xs opacity-60">{showCourses ? '▲' : '▼'}</span>
          </div>

          {/* Breakdown list — shown when clicked */}
          {showCourses && (
            <div className="mt-2 flex flex-col gap-1">
              {competitorCourses.length === 0 ? (
                <p className="text-xs opacity-60 text-center">No data</p>
              ) : (
                competitorCourses.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs px-1">
                    <span className="truncate max-w-[70%] opacity-80">{item.name}</span>
                    <span className="font-bold text-red-400">{item.courses}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Course Variety box — clickable, toggles visibility */}
        <div
          className="cursor-pointer rounded-lg p-3 border border-transparent hover:border-blue-400 transition-all"
          style={{ background: 'rgba(54,162,235,0.08)' }}
          onClick={() => setShowCourseVarietyDataset(prev => !prev)}
        >
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              className="cursor-pointer w-4 h-4 accent-blue-500"
              checked={showCourseVarietyDataset}
              onChange={(e) => {
                e.stopPropagation();
                setShowCourseVarietyDataset(e.target.checked);
              }}
              onClick={(e) => e.stopPropagation()}
              title="Toggle 'Course Variety' visibility"
            />
            <div className="h-3 w-3 bg-blue-500 shrink-0 rounded-full" />
            <span className="font-semibold text-sm">Course Variety</span>
          </div>
          <p className="text-xs opacity-60 mt-1 pl-11">Distinct course subjects</p>
        </div>
      </div>
    </div>
  );
};

export default GapChartSection;
