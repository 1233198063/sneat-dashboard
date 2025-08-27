import React, { useEffect, useRef } from 'react';
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

const ExpensesBarChart = () => {
  const chartRef = useRef(null);

  // Create data for the bar chart with positive and negative values
  const blueData = [30, 65, 45, 50, 80, 35, 60, 45, 75, 50];
  const orangeData = [-25, -45, -35, -40, -60, -30, -50, -35, -55, -40];
  const labels = Array.from({ length: 10 }, (_, i) => i.toString());

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Income',
        data: blueData,
        backgroundColor: '#696cff',
        borderColor: '#696cff',
        borderWidth: 0,
        borderRadius: 3,
        borderSkipped: false,
        barThickness: 8,
      },
      {
        label: 'Expenses',
        data: orangeData,
        backgroundColor: '#ffab00',
        borderColor: '#ffab00',
        borderWidth: 0,
        borderRadius: 3,
        borderSkipped: false,
        barThickness: 8,
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
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#ddd',
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          title: function() {
            return '';
          },
          label: function(context) {
            return `${Math.abs(context.parsed.y)}k`;
          }
        }
      }
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
        categoryPercentage: 0.8,
        barPercentage: 0.6,
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        suggestedMin: -80,
        suggestedMax: 100,
      }
    },
    elements: {
      bar: {
        borderRadius: 3,
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 5,
        right: 5
      }
    }
  };

  return (
    <div className="expenses-bar-chart">
      <div className="chart-container">
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpensesBarChart;