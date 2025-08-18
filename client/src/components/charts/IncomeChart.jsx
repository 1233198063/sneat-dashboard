import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const IncomeChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const datapoints = [20, 40, 35, 80, 45, 120, 80, 180, 120, 125, 105, 150];
      const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            data: datapoints,
            borderColor: '#6366F1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#6366F1',
            pointHoverBorderColor: '#ffffff',
            pointHoverBorderWidth: 3,
            borderWidth: 3,
            cubicInterpolationMode: 'monotone'
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
                color: '#94a3b8',
                font: {
                  size: 11
                },
                padding: 8
              },
              border: {
                display: false
              }
            },
            y: {
              display: false,
              grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.05)',
                drawBorder: false
              },
              suggestedMin: 0,
              suggestedMax: 200
            }
          },
          interaction: {
            intersect: false,
            mode: 'index'
          },
          elements: {
            point: {
              hoverRadius: 8
            }
          }
        }
      });

      // Add special styling for the last point
      const lastPointIndex = datapoints.length - 1;
      chartInstance.current.data.datasets[0].pointRadius = datapoints.map((_, index) => 
        index === lastPointIndex ? 6 : 0
      );
      chartInstance.current.data.datasets[0].pointBackgroundColor = datapoints.map((_, index) => 
        index === lastPointIndex ? '#6366F1' : 'transparent'
      );
      chartInstance.current.data.datasets[0].pointBorderColor = datapoints.map((_, index) => 
        index === lastPointIndex ? '#ffffff' : 'transparent'
      );
      chartInstance.current.data.datasets[0].pointBorderWidth = datapoints.map((_, index) => 
        index === lastPointIndex ? 3 : 0
      );
      
      chartInstance.current.update();
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default IncomeChart;