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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesActivityChart = ({ salesActivityData }) => {
  // Chart configuration options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#fff',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: 12,
          weight: '600'
        },
        bodyFont: {
          size: 12
        },
        padding: 12,
        callbacks: {
          title: function(tooltipItems) {
            return tooltipItems[0].label;
          },
          label: function(context) {
            const datasetLabel = context.dataset.label;
            const value = context.parsed.y;
            // Skip showing tooltip for gap dataset
            if (datasetLabel === 'Gap') {
              return null;
            }
            return `${datasetLabel}: ${value}`;
          },
          filter: function(tooltipItem) {
            // Don't show tooltip for gap dataset
            return tooltipItem.dataset.label !== 'Gap';
          }
        }
      },
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 12,
          },
          padding: 10,
        },
        border: {
          display: false,
        },
        stacked: true, // Enable stacked bars on x-axis
      },
      y: {
        display: false,
        beginAtZero: true,
        max: 50, // Further increase max value to ensure full visibility
        stacked: true, // Enable stacked bars on y-axis
      }
    },
    elements: {
      bar: {
        borderRadius: Number.MAX_VALUE, // Fully rounded bars
        borderSkipped: false,
      }
    },
    layout: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }
    }
  };

  // Chart data configuration with gap between stacked bars
  const data = {
    labels: salesActivityData.map(item => item.month),
    datasets: [
      {
        label: 'Sales',
        data: salesActivityData.map(item => item.sales),
        backgroundColor: '#FF4757',
        borderColor: '#FF4757',
        borderWidth: 0,
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 20,
          bottomRight: 20
        },
        borderSkipped: false,
        barThickness: 10,
      },
      {
        label: 'Gap', // Invisible gap dataset
        data: salesActivityData.map(() => 2), // Small gap value
        backgroundColor: 'transparent',
        borderWidth: 0,
        barThickness: 10,
      },
      {
        label: 'Activity',
        data: salesActivityData.map(item => item.activity),
        backgroundColor: '#8B9DC3',
        borderColor: '#8B9DC3',
        borderWidth: 0,
        borderRadius: {
          topLeft: 20,
          topRight: 20,
          bottomLeft: 20,
          bottomRight: 20
        },
        borderSkipped: false,
        barThickness: 10,
      }
    ]
  };

  return (
    <div style={{ height: '260px', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesActivityChart;