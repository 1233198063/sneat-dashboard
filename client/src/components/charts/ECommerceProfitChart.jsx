import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const ECommerceProfitChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Apr', 'Jul', 'Oct'],
          datasets: [
            {
              data: [20, 30, 25, 40],
              backgroundColor: '#71dd37', // Dark green
              borderRadius: 4,
              borderSkipped: false,
              barThickness: 6,
              maxBarThickness: 6,
            },
            {
              data: [15, 25, 20, 35],
              backgroundColor: '#a8e6a3', // Light green
              borderRadius: 4,
              borderSkipped: false,
              barThickness: 6,
              maxBarThickness: 6,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          },
          scales: {
            x: {
              display: false,
              grid: {
                display: false
              },
              categoryPercentage: 0.8,
              barPercentage: 0.7
            },
            y: {
              display: false,
              grid: {
                display: false
              },
              beginAtZero: true
            }
          },
          elements: {
            bar: {
              borderRadius: 4
            }
          },
          datasets: {
            bar: {
              categoryPercentage: 0.8,
              barPercentage: 0.7
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="profit-chart">
      <div className="mini-bars">
        <canvas ref={chartRef} style={{ width: '100%', height: '60px' }} />
      </div>
      <div className="chart-labels">
        <span>Jan</span>
        <span>Apr</span>
        <span>Jul</span>
        <span>Oct</span>
      </div>
    </div>
  );
};

export default ECommerceProfitChart;