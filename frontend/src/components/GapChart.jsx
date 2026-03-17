import { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import api from '../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { useTheme } from '../context/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);


const GapChart = ({ onDataLoaded, height = "h-96", showLegend = true }) => {
  const { isDark } = useTheme();
  const [data, setData] = useState({
    labels: [],
    datasets: []
  });
  const [competitorCourses, setCompetitorCourses] = useState([]);
  const [showCourses, setShowCourses] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/analytics/gap-analysis');
        setData(response.data.chartData);
        setCompetitorCourses(response.data.competitorCourses || []);
        
        if (onDataLoaded && response.data.competitorCourses) {
          onDataLoaded(response.data.competitorCourses);
        }
      } catch (err) {
        console.error('Error fetching gap analysis data:', err);
        setError('Failed to load gap analysis data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={`card ${height} w-full p-3 flex items-center justify-center font-bold`}>
        <p>Loading Gap Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`card ${height} w-full p-3 flex items-center justify-center font-bold text-red-500`}>
        <p>{error}</p>
      </div>
    );
  }

  // Chart.js renders on canvas — CSS variables don't resolve here, use explicit colors
  const labelColor    = isDark ? '#e2e8f0' : '#1e293b';
  const gridColor     = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
  const angleColor    = isDark ? 'rgba(255, 255, 255, 0.20)' : 'rgba(0, 0, 0, 0.18)';
  const tickColor     = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg     = isDark ? '#1e293b' : '#ffffff';
  const tooltipText   = isDark ? '#f1f5f9' : '#1e293b';

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: labelColor,
          font: { size: 12 },
          padding: 16,
        }
      },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: tooltipText,
        bodyColor: tooltipText,
        borderColor: '#6366F1',
        borderWidth: 1,
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          backdropColor: 'transparent',
          color: tickColor,
          font: { size: 10 },
          stepSize: 20,
        },
        grid: {
          color: gridColor,
        },
        angleLines: {
          color: angleColor,
        },
        pointLabels: {
          color: labelColor,
          font: {
            size: 9,
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <div className={`card ${height} w-full p-3 flex flex-col`}>
      <h3 className='text-center mb-2 font-bold'>Gap Analysis: Courses vs Enrollment</h3>
      <div className='flex flex-1 min-h-0 gap-3'>
        {/* Chart Area */}
        <div className='flex-1 relative'>
          <Radar data={data} options={options} />
        </div>

        {/* Legend Area - Integrated directly to match user request */}
        {showLegend && (
          <div className="w-1/3 flex flex-col gap-2 justify-center bg-[var(--bg-input)] rounded-lg px-3 py-2 overflow-y-auto custom-scrollbar">
            <h4 className="text-center font-bold text-xs mb-1">Legend</h4>

            {/* Courses Offered */}
            <div
              className="cursor-pointer rounded-md p-2 border border-transparent hover:border-red-400 transition-all"
              style={{ background: 'rgba(255,99,132,0.08)' }}
              onClick={() => setShowCourses(prev => !prev)}
              title="Click to toggle course breakdown"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-red-500 shrink-0 rounded-full" />
                <span className="font-semibold text-[10px]">Courses Offered</span>
                <span className="ml-auto text-[8px] opacity-60">{showCourses ? '▲' : '▼'}</span>
              </div>

              {showCourses && (
                <div className="mt-1 flex flex-col gap-1 max-h-32 overflow-y-auto pr-1">
                  {competitorCourses.length === 0 ? (
                    <p className="text-[10px] opacity-60 text-center">No data</p>
                  ) : (
                    competitorCourses.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-[9px] px-1">
                        <span className="truncate max-w-[70%] opacity-80">{item.name}</span>
                        <span className="font-bold text-red-400">{item.courses}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Students Enrolled */}
            <div
              className="rounded-md p-2"
              style={{ background: 'rgba(54,162,235,0.08)' }}
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-blue-500 shrink-0 rounded-full" />
                <span className="font-semibold text-[10px]">Students Enrolled</span>
              </div>
              <p className="text-[8px] opacity-60 mt-0.5 pl-4">Score (0–100)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GapChart