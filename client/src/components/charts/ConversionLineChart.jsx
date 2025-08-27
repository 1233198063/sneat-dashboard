import React, { useEffect, useRef } from 'react';
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

const ConversionLineChart = () => {
  const chartRef = useRef(null);

  // Create data points for smooth curve similar to the design
  const datapoints = [25, 105, 35, 65, 90, 200];
  const labels = Array.from({ length: 6 }, (_, i) => i.toString());

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Conversion Rate',
        data: datapoints,
        borderColor: '#696cff',
        backgroundColor: 'rgba(105, 108, 255, 0.1)',
        fill: true,
        tension: 0.4,
        cubicInterpolationMode: 'monotone',
        borderWidth: 3,
        pointBackgroundColor: '#696cff',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#696cff',
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
        backgroundColor: 'rgba(105, 108, 255, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#696cff',
        borderWidth: 1,
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          title: function() {
            return '';
          },
          label: function(context) {
            return `${context.parsed.y}%`;
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
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 120,
      }
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        hoverRadius: 6
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
        left: 10,
        right: 10
      }
    }
  };

  return (
    <div className="conversion-line-chart">
      <div className="chart-container">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default ConversionLineChart;