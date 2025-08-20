import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SessionsChart = ({ sessionsData }) => {
  // Chart configuration options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false, // Disable tooltips for cleaner look
      },
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    scales: {
      x: {
        display: false, // Hide x-axis
        grid: {
          display: false,
        },
      },
      y: {
        display: false, // Hide y-axis
        beginAtZero: false,
        min: 2200,
        max: 2900,
      }
    },
    elements: {
      point: {
        radius: 0, // Hide points
        hoverRadius: 0,
      },
      line: {
        borderWidth: 3,
        tension: 0.4, // Smooth curves
      }
    },
    layout: {
      padding: 0
    }
  };

  // Create gradient fill
  const createGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(255, 180, 0, 0.3)'); // Yellow with opacity at top
    gradient.addColorStop(1, 'rgba(255, 180, 0, 0.05)'); // Very light yellow at bottom
    return gradient;
  };

  // Chart data configuration
  const data = {
    labels: sessionsData.map((_, index) => index), // Simple numeric labels
    datasets: [
      {
        label: 'Sessions',
        data: sessionsData.map(item => item.value),
        borderColor: '#FFB400', // Orange/yellow line color
        backgroundColor: (context) => {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) {
            return null;
          }
          return createGradient(ctx);
        },
        fill: true, // Enable fill under the line
        tension: 0.4, // Smooth curves
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3,
      }
    ]
  };

  return (
    <div style={{ height: '60px', width: '100%', margin: 0, padding: 0 }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default SessionsChart;