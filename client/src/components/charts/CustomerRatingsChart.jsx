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
  Legend
);

const CustomerRatingsChart = ({ ratingsData }) => {
  // Secondary data for the gray dashed line (slightly lower values)
  const secondaryData = ratingsData.map(item => ({
    ...item,
    rating: item.rating - 0.3 // Offset for the secondary line
  }));
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
        displayColors: false,
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
            return `${context.parsed.y.toFixed(1)} stars`;
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
        }
      },
      y: {
        display: false,
        min: 3.0,
        max: 4.3,
      }
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 8,
        backgroundColor: '#696CFF',
        borderColor: '#fff',
        borderWidth: 3,
        hoverBorderWidth: 4,
      },
      line: {
        borderWidth: 3,
        tension: 0.4, // Cubic interpolation for smooth curves
      }
    },
    onHover: (event, activeElements) => {
      event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
    }
  };

  // Chart data configuration
  const data = {
    labels: ratingsData.map(item => item.month),
    datasets: [
      {
        label: 'Customer Rating',
        data: ratingsData.map(item => item.rating),
        borderColor: '#696CFF',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4, // Cubic interpolation for smooth curves
        pointRadius: 0,
        pointHoverRadius: 8,
        pointBackgroundColor: '#696CFF',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointHoverBorderWidth: 4,
        pointHoverBackgroundColor: '#696CFF',
        pointHoverBorderColor: '#fff',
        cubicInterpolationMode: 'monotone', // Smooth monotone cubic interpolation
        borderWidth: 3,
      },
      {
        label: 'Secondary Rating',
        data: secondaryData.map(item => item.rating),
        borderColor: '#E5E7EB',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0,
        cubicInterpolationMode: 'monotone',
        borderWidth: 2,
        borderDash: [5, 5], // Dashed line pattern
      }
    ]
  };

  return (
    <div style={{ height: '180px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CustomerRatingsChart;