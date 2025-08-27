import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const data = {
      labels: ['Used', 'Remaining'],
      datasets: [
        {
          data: [72, 28], // 72% used, 28% remaining
          backgroundColor: [
            '#696cff', // Purple for used portion
            '#e5e7eb', // Light gray for remaining
          ],
          borderWidth: 0,
          cutout: '75%', // Creates the doughnut hole
        }
      ]
    };

    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Hide legend as we have custom text
          },
          tooltip: {
            enabled: false, // Disable tooltips for clean look
          }
        },
        elements: {
          arc: {
            borderWidth: 0,
          }
        }
      },
    };

    chartInstance.current = new ChartJS(ctx, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="expenses-chart">
      <div className="circular-progress">
        <canvas ref={chartRef}></canvas>
        <div className="percentage">72%</div>
      </div>
    </div>
  );
};

export default ExpensesChart;