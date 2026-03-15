import React from "react";

const WordCloud = () => {
  // Mock keywords to show how it looks in the "Design System"
  const keywords = [
    { text: "Growth", size: "text-3xl", color: "text-sky-500" },
    { text: "Market Share", size: "text-xl", color: "text-emerald-500" },
    { text: "Price Index", size: "text-2xl", color: "text-rose-500" },
    { text: "Revenue", size: "text-4xl", color: "text-sky-600" },
    { text: "Competitors", size: "text-lg", color: "text-gray-500" },
    { text: "Strategy", size: "text-2xl", color: "text-amber-500" },
    { text: "Data", size: "text-base", color: "text-indigo-400" },
  ];

  return (
    <div className="px-15 flex flex-col items-start mt-10 pb-20 transition-colors duration-500">
      {/* Adaptive Title */}
      <p className="text-gray-900 dark:text-white font-bold text-2xl mb-4">
        Word Cloud Insights
      </p>

      {/* 
         Adaptive Container:
         - bg-gray-50: Professional light gray for Light Mode
         - border-gray-200: Subtle border so it stands out on white
         - dark:bg-[#1B2537]: Your signature Navy for Dark Mode
      */}
      <div className="bg-gray-50 dark:bg-[#1B2537] w-full min-h-[250px] rounded-2xl border border-gray-200 dark:border-none p-10 flex flex-wrap justify-center items-center gap-6 shadow-sm transition-all duration-500">
        
        {/* Placeholder keywords to demonstrate the theme change */}
        {keywords.map((word, index) => (
          <span 
            key={index} 
            className={`${word.size} ${word.color} font-bold hover:scale-110 transition-transform cursor-default opacity-80 hover:opacity-100`}
          >
            {word.text}
          </span>
        ))}

        {/* If it's empty, show this premium-styled message */}
        {keywords.length === 0 && (
          <p className="text-gray-400 italic">No sentiment data available yet...</p>
        )}
      </div>
    </div>
  );
};

export default WordCloud;