import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import api from "../../services/api";

const CoursePriceSection = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/analytics/price-index");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching price index data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="px-15 py-10">Loading comparison data...</div>;
    if (!data) return null;

    return (
        <div className="flex justify-between items-stretch gap-10 px-15 mt-10">
            {/* Table 1: Your Courses vs Market Average */}
            <div className="w-1/2 card p-8 rounded-2xl shadow-sm border border-[var(--border)]">
                <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Course Category Comparison</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[var(--border)]">
                                <th className="pb-4 font-semibold text-[var(--text-muted)]">Category</th>
                                <th className="pb-4 font-semibold text-[var(--text-muted)]">Your Courses</th>
                                <th className="pb-4 font-semibold text-[var(--text-muted)]">Market Average</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                            {data.categoryComparison?.map((item, idx) => (
                                <tr key={idx} className="hover:bg-[var(--bg-input)] transition-colors">
                                    <td className="py-4 font-medium">{item.category}</td>
                                    <td className="py-4 font-bold text-blue-500">{item.yourCourses}</td>
                                    <td className="py-4 font-semibold text-amber-500">{item.marketAverage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Table 2: Competitor Pricing Overview */}
            <div className="w-1/2 card p-8 rounded-2xl shadow-sm border border-[var(--border)]">
                <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">Course Pricing Overview</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[var(--border)]">
                                <th className="pb-4 font-semibold text-[var(--text-muted)]">Competitor</th>
                                <th className="pb-4 font-semibold text-[var(--text-muted)]">Avg Price</th>
                                <th className="pb-4 font-semibold text-[var(--text-muted)]">Courses</th>
                                <th className="pb-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                            {data.pricingOverview.map((item, idx) => (
                                <tr key={idx} className="hover:bg-[var(--bg-input)] transition-colors">
                                    <td className="py-4 font-medium">{item.competitor}</td>
                                    <td className="py-4 font-semibold">Rs. {Math.round(item.avgPrice).toLocaleString()}</td>
                                    <td className="py-4 text-[var(--text-muted)]">{item.courses} Courses</td>
                                    <td className="py-4 text-right">
                                        {item.url ? (
                                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                                <FontAwesomeIcon className="active:scale-90" icon={faArrowRight} />
                                            </a>
                                        ) : (
                                            <div className="w-5 h-5"></div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CoursePriceSection;
