import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CompetitorList = () => {
  const [competitors, setCompetitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompetitors = async () => {
      try {
        const response = await api.get('/competitors');
        setCompetitors(response.data);
      } catch (err) {
        console.error('Error fetching competitors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitors();
  }, []);

  if (loading) {
    return (
      <div className="card mt-10 px-15 py-5 mx-15 flex justify-center items-center">
        <p>Loading competitors...</p>
      </div>
    );
  }

  return (
    <div className="card mt-10 px-15 py-5 mx-15">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="py-2 px-3">Competitor's Name</th>
              <th className="py-2 px-3">Category</th>
              <th className="py-2 px-3">Courses</th>
              <th className="py-2 px-3">Avg. Price</th>
              <th className="py-2 px-3">Avg. Duration</th>
              <th className="py-2 px-3">Detail</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((c) => (
              <tr key={c.id} className="odd:bg-[var(--bg-input)] border-b border-[var(--border)]">
                <td className="py-3 px-3">{c.name}</td>
                <td className="py-3 px-3">{c.category}</td>
                <td className="py-3 px-3">{c.courses}</td>
                <td className="py-3 px-3">{c.avgPrice}</td>
                <td className="py-3 px-3">{c.avgDuration}</td>
                <td className="py-3 px-3">
                  <span 
                    onClick={() => {
                      if (c.websiteUrl) window.open(c.websiteUrl, '_blank');
                      navigate(`/competitors/${c.id}`);
                    }}
                    className="text-blue-500 hover:text-blue-400 underline cursor-pointer"
                  >
                    View Details
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CompetitorList
