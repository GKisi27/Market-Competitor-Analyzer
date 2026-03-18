import React, { useState, useEffect } from "react";
import PriceChart from "../PriceChart";
import api from "../../services/api";

const ChartSection = () => {
    const [competitors, setCompetitors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompetitors = async () => {
            try {
                const response = await api.get("/competitors");
                // Sort by course count descending and take top ones
                const sorted = response.data.sort((a, b) => b.courses - a.courses);
                setCompetitors(sorted.slice(0, 6)); // Display top 6
            } catch (error) {
                console.error("Error fetching competitors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompetitors();
    }, []);

    return (
        <div className="flex justify-between items-stretch gap-10 px-15 mt-6 mb-10">
            <div className="w-3/4">
                <PriceChart />
            </div>
            <div className="w-1/4 card h-96 flex flex-col justify-start py-6 gap-2 overflow-hidden">
                <h3 className="text-xl font-bold px-6 mb-4 border-b border-[var(--border)] pb-3 text-center">Top Competitors</h3>
                    <div className="flex flex-col gap-1 px-2 overflow-y-auto scrollbar-hide">
                        {loading ? (
                            <div className="px-6 py-4 animate-pulse text-gray-400">Loading metrics...</div>
                        ) : (
                            competitors.map((competitor, idx) => (
                                <div 
                                    key={competitor.id || idx} 
                                    className="grid grid-cols-[32px_1fr] items-center px-4 py-2 rounded-xl transition-all hover:bg-white/5 hover:translate-x-1 cursor-default group"
                                >
                                    <div className="h-4 w-4 bg-amber-500 rounded-sm shadow-[0_0_8px_rgba(245,158,11,0.2)] group-hover:scale-110 transition-transform shrink-0"></div>
                                    <div className="flex flex-col ml-1">
                                        <p className="text-sm font-bold leading-tight whitespace-normal break-words">
                                            {competitor.name}
                                        </p>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-tighter">
                                            {competitor.courses} Specialized Courses
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {competitors.length === 0 && !loading && (
                        <p className="px-6 text-sm text-gray-500 italic">No market data available</p>
                    )}
                </div>
        </div>
    );
};

export default ChartSection;
