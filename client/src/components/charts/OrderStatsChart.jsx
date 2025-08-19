import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const OrderStatsChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [selectedData, setSelectedData] = useState({ percentage: 38, label: 'Weekly' });
  const selectedDataRef = useRef(selectedData);

  // Keep ref synchronized with state
  useEffect(() => {
    selectedDataRef.current = selectedData;
  }, [selectedData]);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const dataValues = [80, 28, 40, 20]; // Electronic, Fashion, Decor, Sports
      const labels = ['Electronic', 'Fashion', 'Decor', 'Sports'];
      const displayValues = [80, 28, 40, 20]; // Corresponding display values

      // Create plugin function to get latest selectedData from ref
      const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: function(chart) {
          const { ctx, width, height } = chart;
          ctx.restore();
          
          // Get latest selectedData from ref
          const currentData = selectedDataRef.current;
          
          const centerX = width / 2;
          const centerY = height / 2 - 6;
          
          if (currentData.label === 'Weekly') {
            // Default state: display percentage
            const fontSize = Math.floor(width / 6);
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.fillStyle = '#374151';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            ctx.fillText(`${currentData.percentage}%`, centerX, centerY);
            
            const smallFontSize = Math.floor(width / 10);
            ctx.font = `${smallFontSize}px Arial`;
            ctx.fillStyle = '#9ca3af';
            ctx.fillText(currentData.label, centerX, centerY + fontSize / 2 + 6);
          } else {
            // Hover state: display value and label
            const fontSize = Math.floor(width / 6);
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.fillStyle = '#374151';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            ctx.fillText(currentData.percentage.toString(), centerX, centerY);
            
            const smallFontSize = Math.floor(width / 10);
            ctx.font = `${smallFontSize}px Arial`;
            ctx.fillStyle = '#9ca3af';
            ctx.fillText(currentData.label, centerX, centerY + fontSize / 2 + 6);
          }
          
          ctx.save();
        }
      };

      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: dataValues,
            backgroundColor: [
              '#6366f1', // Electronic category
              '#10b981', // Fashion category  
              '#06b6d4', // Decor category
              '#9ca3af'  // Sports category
            ],
            borderWidth: 0,
            cutout: '75%', // Larger cutout for thinner ring
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false // Hide legend
            },
            tooltip: {
              enabled: false // Disable hover tooltips
            }
          },
          elements: {
            arc: {
              borderWidth: 0
            }
          },
          onHover: (event, elements) => {
            if (elements.length > 0) {
              const hoveredElementIndex = elements[0].index;
              const hoveredValue = dataValues[hoveredElementIndex];
              const hoveredLabel = labels[hoveredElementIndex];
              
              setSelectedData({ 
                percentage: hoveredValue, 
                label: hoveredLabel 
              });
            } else {
              // Mouse leave: restore default display
              setSelectedData({ percentage: 38, label: 'Weekly' });
            }
          }
        },
        plugins: [centerTextPlugin]
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Only create chart on initialization

  // When selectedData changes, trigger chart re-render
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.update('none'); // 'none' means no animation
    }
  }, [selectedData]);

  return <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default OrderStatsChart;