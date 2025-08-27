import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const TotalIncomeChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Data points matching the design image
      const datapoints = [3.3, 3.3, 4.8, 4.8, 2.9, 2.9, 2.8, 1.8, 1.8, 3.7, 3.7, 5.8];

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            data: datapoints,
            borderColor: '#696cff',
            backgroundColor: 'rgba(105, 108, 255, 0.1)',
            fill: true,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            stepped: true
          }]
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
              display: true,
              grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.05)',
                drawBorder: false
              },
              ticks: {
                color: '#a8b1c7',
                font: {
                  size: 12
                }
              }
            },
            y: {
              display: true,
              grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.05)',
                drawBorder: false
              },
              ticks: {
                color: '#a8b1c7',
                font: {
                  size: 12
                },
                callback: function(value) {
                  return '$' + value + 'k';
                },
                stepSize: 1,
                min: 1,
                max: 6
              }
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

  return <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default TotalIncomeChart;