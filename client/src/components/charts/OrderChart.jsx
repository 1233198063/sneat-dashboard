import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const OrderChart = () => {
  const data = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        data: [0, 20, 20, 60, 60, 120, 150, 180, 120, 125, 105, 170],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 0,
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
        min: 0,
        max: 200,
      }
    },
    layout: {
      padding: {
        top: 5,
        right: 8,
        bottom: 5,
        left: 8
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    elements: {
      point: {
        hoverRadius: 6,
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <Line data={data} options={options} />
      {/* Add dot indicator in top-right corner */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          right: '20%',
          width: '6px',
          height: '6px',
          backgroundColor: '#10B981',
          borderRadius: '50%',
          border: '2px solid #ffffff',
          boxShadow: '0 1px 4px rgba(16, 185, 129, 0.3)'
        }}
      />
    </div>
  );
};

export default OrderChart;