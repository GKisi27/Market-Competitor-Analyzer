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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/analytics/gap-analysis');
        setData(response.data.chartData);
        
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
  }, [onDataLoaded]);

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
        display: showLegend,
        position: 'top',
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
            size: 10,
            weight: 'bold',
          },
        },
      },
    },
  };

  return (
    <div className={`card ${height} w-full p-8 flex flex-col overflow-hidden shadow-sm`}>
      <h3 className='text-center mb-6 font-bold text-lg border-b border-[var(--border)] pb-3'>Gap Analysis: Courses vs Enrollment</h3>
      <div className='flex-1 relative'>
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default GapChart;