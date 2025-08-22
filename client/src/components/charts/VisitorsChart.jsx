import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VisitorsChart = () => {
  const data = {
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    datasets: [
      {
        data: [20, 40, 30, 60, 80, 45, 35],
        backgroundColor: (ctx) => {
          // Highlight Friday (index 4) with primary color
          return ctx.dataIndex === 4 ? '#696CFF' : '#E8E6FF';
        },
        borderRadius: 20,
        borderSkipped: false,
        barPercentage: 1,
        categoryPercentage: 0.5,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    elements: {
      bar: {
        borderRadius: 20,
      },
    },
    layout: {
      padding: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
      },
    },
  };

  return (
    <div className="visitors-chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default VisitorsChart;