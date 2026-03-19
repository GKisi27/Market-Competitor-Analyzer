import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const CompetitorReport = () => {
  const [summary, setSummary] = useState({
    activeCompetitors: 0,
    totalCoursesTracked: 0,
    avgMarketPrice: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get('/competitors/summary');
        setSummary(response.data);
      } catch (err) {
        console.error('Error fetching competitor summary:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return null;

  return (
    <div className="px-15 mt-10">

      <div className="flex justify-between items-center gap-8">
        <Link
          to="#"
          className="card w-1/3 h-35 px-10 py-5 flex justify-center place-items-center"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold">{summary.activeCompetitors}</h2>
            <p className="text-gray-500">Active Competitors</p>
          </div>
        </Link>

        <Link
          to="#"
          className="card w-1/3 h-35 px-10 py-5 flex justify-center place-items-center"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold">{summary.totalCoursesTracked}</h2>
            <p className="text-gray-500">Total Course Tracked</p>
          </div>
        </Link>

        <Link
          to="#"
          className="card w-1/3 h-35 px-10 py-5 flex justify-center place-items-center"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold">Rs.{summary.avgMarketPrice.toLocaleString()}</h2>
            <p className="text-gray-500">Avg. Market Price</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CompetitorReport;
