import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const ProfitChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const datapoints = [0, 20, 20, 60, 60, 120, 80, 180, 120, 125, 105, 110, 170];

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['', '', '', '', '', '', '', '', '', '', '', '', ''],
          datasets: [{
            data: datapoints,
            borderColor: '#F59E0B',
            backgroundColor: 'transparent',
            fill: false,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3
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
              display: false,
              grid: {
                display: false
              }
            },
            y: {
              display: false,
              grid: {
                display: false
              },
              suggestedMin: 0,
              suggestedMax: 200
            }
          },
          elements: {
            line: {
              cubicInterpolationMode: 'monotone'
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

export default ProfitChart;