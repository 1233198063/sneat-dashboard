import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const PerformanceRadarChart = () => {
  const chartRef = useRef(null);

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Income',
        data: [85, 70, 95, 80, 75, 90],
        borderColor: '#696cff',
        backgroundColor: 'rgba(105, 108, 255, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#696cff',
        pointBorderColor: '#696cff',
        pointRadius: 3,
      },
      {
        label: 'Earning',
        data: [75, 85, 80, 90, 85, 95],
        borderColor: '#03c3ec',
        backgroundColor: 'rgba(3, 195, 236, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#03c3ec',
        pointBorderColor: '#03c3ec',
        pointRadius: 3,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll show legend separately below the chart
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          display: false, // Hide the numbers
          stepSize: 20,
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1,
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)',
          lineWidth: 1,
        },
        pointLabels: {
          color: '#999',
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.1
      }
    }
  };

  return (
    <div className="performance-radar-chart">
      <div className="chart-container">
        <Radar ref={chartRef} data={data} options={options} />
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: '#696cff' }}></div>
          <span>Income</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ backgroundColor: '#03c3ec' }}></div>
          <span>Earning</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceRadarChart;