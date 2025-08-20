import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesDoughnutChart = ({ percentage = 75 }) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [
          '#71DD37',
          '#F5F5F9'
        ],
        borderColor: [
          '#71DD37',
          '#F5F5F9'
        ],
        borderWidth: 0,
        cutout: '70%',
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
        enabled: false,
      }
    },
    elements: {
      arc: {
        borderWidth: 0,
      }
    }
  };

  return (
    <>
      <div className="doughnut-container">
        <Doughnut data={data} options={options} />
        <div className="doughnut-center">
          <div className="center-icons">
            <span className="icon-arrow">↗</span>
          </div>
          <div className="center-percentage">{percentage}%</div>
          <div className="center-label">Sales</div>
        </div>
      </div>
      <div className="doughnut-legend">
        <div className="legend-item">
          <div className="legend-dot conversion"></div>
          <span>Conversion Ratio</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot total"></div>
          <span>Total requirements</span>
        </div>
      </div>
    </>
  );
};

export default SalesDoughnutChart;