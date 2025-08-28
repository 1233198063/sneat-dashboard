import React, { useRef } from 'react';
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

const TotalBalanceChart = () => {
  const chartRef = useRef(null);

  // Data for the Total Balance chart matching the design
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const datapoints = [40, 80, 60, 110, 85, 140];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Balance',
        data: datapoints,
        borderColor: '#ffab00',
        backgroundColor: 'rgba(255, 171, 0, 0.1)',
        fill: true,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#ffab00',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#ffab00',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
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
        backgroundColor: 'rgba(255, 171, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#ffab00',
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          title: function(tooltipItems) {
            return tooltipItems[0].label;
          },
          label: function(context) {
            return `$${context.parsed.y}k`;
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#999',
          font: {
            size: 12,
          },
          maxTicksLimit: 6,
        },
        border: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 160,
      }
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        hoverRadius: 7
      }
    },
    layout: {
      padding: {
        top: 20,
        bottom: 10,
        left: 15,
        right: 15
      }
    }
  };

  return (
    <div className="total-balance-chart">
      <div className="chart-container">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default TotalBalanceChart;