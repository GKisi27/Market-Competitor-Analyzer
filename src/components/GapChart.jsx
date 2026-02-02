import React from 'react'
import { Radar } from 'react-chartjs-2';
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


const GapChart = () => {
     const data = {
    labels: ["competitor1","competitor2","competitor3","competitor4","competitor5"],
    datasets: [
      {
        label: "Courses",
        data: [85, 75, 70, 65,78],
        fill:true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
       
      },
      {
        label:"students enrolled",
        data:[54,79,20,56,85],
        fill: false,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }
    ],
    
  };

  const options = {
    responsive: true,
    maintainAspectRatio:false,
    scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        backdropColor: "transparent",
      },
      grid: {
        color: "rgba(255,255,255,0.15)",
      },
      angleLines: {
        color: "rgba(255,255,255,0.15)",
      },
      pointLabels: {
        color: "#E5E7EB",
      },
    },
  },
  };

  return (
    <div className='h-96 w-full bg-[#1B2537] p-3 rounded-lg'>
        <Radar data={data} options={options}/>
    </div>
  )
}

export default GapChart