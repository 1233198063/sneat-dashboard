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

const TotalRevenueChart = () => {
  // Revenue data matching the design with positive and negative values
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: '2024',
        data: [16, 4, 12, 26, 16, 9, 6],
        backgroundColor: '#696CFF',
        borderRadius: 50,
        borderSkipped: false,
        barThickness: 12,
      },
      {
        label: '2023',
        data: [-12, -18, -8, -14, -2, -16, -14],
        backgroundColor: '#03DAC6',
        borderRadius: 50,
        borderSkipped: false,
        barThickness: 12,
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
        backgroundColor: '#fff',
        titleColor: '#374151',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${Math.abs(context.parsed.y)}k`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          display: true,
          color: '#9CA3AF',
          font: {
            size: 12,
          },
          maxRotation: 0,
          minRotation: 0
        }
      },
      y: {
        min: -20,
        max: 30,
        grid: {
          color: '#F3F4F6',
          lineWidth: 1,
        },
        border: {
          display: false,
        },
        ticks: {
          display: true,
          color: '#9CA3AF',
          font: {
            size: 11,
          },
          stepSize: 10,
          callback: function(value) {
            return value;
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    layout: {
      padding: {
        top: 10,
        right: 10,
        bottom: 20,
        left: 10
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TotalRevenueChart;