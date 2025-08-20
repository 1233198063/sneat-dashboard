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

const EarningBarChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.day),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: data.map(item => 
          item.day === 'Fr' ? '#696CFF' : 'rgba(105, 108, 255, 0.2)'
        ),
        borderColor: data.map(item => 
          item.day === 'Fr' ? '#696CFF' : 'rgba(105, 108, 255, 0.2)'
        ),
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
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
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#8B909A',
        }
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        border: {
          display: false,
        }
      }
    },
    elements: {
      bar: {
        borderRadius: 4,
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default EarningBarChart;