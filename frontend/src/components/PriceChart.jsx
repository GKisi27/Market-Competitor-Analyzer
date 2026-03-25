import { useState, useEffect } from 'react';
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
import { Bar } from 'react-chartjs-2';
import api from '../services/api';
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

const PriceChart = () => {
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
        const response = await api.get('/analytics/price-index');
        setData(response.data.chartData);
      } catch (err) {
        console.error('Error fetching price index data:', err);
        setError('Failed to load price data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='card h-96 w-full p-3 flex items-center justify-center font-bold'>
        <p>Loading Price Data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='card h-96 w-full p-3 flex items-center justify-center font-bold text-red-500'>
        <p>{error}</p>
      </div>
    );
  }

  // Chart.js cannot resolve CSS variables — use explicit colors based on theme
  const labelColor = isDark ? '#f1f5f9' : '#1e293b';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';
  const tooltipBg = isDark ? '#1e293b' : '#ffffff';
  const tooltipText = isDark ? '#f1f5f9' : '#1e293b';

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
      x: {
        grid: {
          color: gridColor,
        },
        ticks: {
          color: '#94a3b8',
        },
        beginAtZero: true,
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: labelColor,
          font: {
            size: 12,
            weight: 'bold'
          }
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 4,
      }
    }
  };

    return (
        <div className='card h-96 w-full p-6 flex flex-col overflow-hidden'>
            <h3 className='text-center mb-6 font-bold text-lg border-b border-[var(--border)] pb-3'>Common Courses Across Institutes</h3>
            <div className='flex-1 min-h-0'>
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}

export default PriceChart
