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
                const sorted = response.data.sort((a, b) => b.courses - a.courses);
                setCompetitors(sorted.slice(0, 6));
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
                <h3 className="text-xl font-bold px-6 mb-4 border-b border-[var(--border)] pb-3 text-center text-[var(--text-primary)]">
                    Top Competitors
                </h3>
                <div className="flex flex-col gap-1 px-2 overflow-y-auto scrollbar-hide">
                    {loading ? (
                        <div className="px-6 py-4 animate-pulse text-[var(--text-muted)]">Loading metrics...</div>
                    ) : (
                        competitors.map((competitor, idx) => (
                            <div
                                key={competitor.id || idx}
                                className="grid grid-cols-[32px_1fr] items-center px-4 py-2 rounded-xl transition-all hover:bg-[var(--bg-input)] hover:translate-x-1 cursor-default group"
                            >
                                <div className="h-4 w-4 bg-amber-500 rounded-sm group-hover:scale-110 transition-transform shrink-0"></div>
                                <div className="flex flex-col ml-1">
                                    <p className="text-sm font-bold leading-tight whitespace-normal break-words text-[var(--text-primary)]">
                                        {competitor.name}
                                    </p>
                                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-tighter">
                                        {competitor.courses} Specialized Courses
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {competitors.length === 0 && !loading && (
                    <p className="px-6 text-sm text-[var(--text-muted)] italic">No market data available</p>
                )}
            </div>
        </div>
    );
};

export default ChartSection;