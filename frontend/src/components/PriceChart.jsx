import React from 'react'
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

  const data = {
    labels: ["React", "Node", "MongoDB", "SQL", "DevOps"],
    datasets: [
      {
        label: "Skill Score",
        data: [85, 75, 70, 65, 60],
        backgroundColor:[
           "#6366F1", // React
        "#22C55E", // Node
        "#F59E0B", // MongoDB
        "#EF4444", // SQL
        ]
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio:false,
    // scales: {
    //   y: { beginAtZero: true },
    // },
  };
  return (
    <div className='bg-[#1B2537] h-96 w-full rounded-lg p-3'>
         <Bar data={data} options={options} />

    </div>
  )
}

export default PriceChart