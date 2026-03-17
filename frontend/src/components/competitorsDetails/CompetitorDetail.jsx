import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGlobe,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";

const CompetitorDetail = () => {
  const { id } = useParams();
  const [competitor, setCompetitor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompetitor = async () => {
      try {
        const response = await api.get(`/competitors/${id}`);
        setCompetitor(response.data);
      } catch (err) {
        console.error('Error fetching competitor details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCompetitor();
  }, [id]);

  if (loading) return (
    <div className="mt-15 card h-75 p-6 mx-15 flex items-center justify-center">
      <p>Loading competitor details...</p>
    </div>
  );

  if (!competitor) return (
    <div className="mt-15 card h-75 p-6 mx-15 flex items-center justify-center">
      <p>Competitor not found.</p>
    </div>
  );
  return (
    <div>
      <div className="mt-15 card h-75 p-6 mx-15 flex items-center">
        <div className="flex items-center gap-4">
          <h1 className="h-37.5 w-37.5 bg-gray-300 rounded-lg flex items-center justify-center text-black">
            Logo
          </h1>
          <div>
            <h2 className="font-bold text-xl">{competitor.name}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <FontAwesomeIcon icon={faEnvelope} />
                <p>{competitor.industry || 'IT Training'}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <FontAwesomeIcon icon={faLocation} />
                <p>{competitor.country || 'Nepal'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-blue-400 mt-2">
              <FontAwesomeIcon icon={faGlobe} />
              <a href={competitor.website_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {competitor.website_url ? new URL(competitor.website_url).hostname : 'Website Unavailable'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorDetail;
