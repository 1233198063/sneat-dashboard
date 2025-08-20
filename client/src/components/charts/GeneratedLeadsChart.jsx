import React, { useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const GeneratedLeadsChart = () => {
  // Week data for the 4 segments
  const weekData = [
    { week: '4th week', value: 28, color: '#71DD37' }, // Dark green
    { week: '3rd week', value: 22, color: '#A3E635' }, // Medium green  
    { week: '2nd week', value: 27, color: '#BFDB38' }, // Light green
    { week: '1st week', value: 23, color: '#D9F99D' }, // Very light green
  ];

  // Calculate total for average display
  const totalPercentage = weekData.reduce((sum, item) => sum + item.value, 0);
  const averagePercentage = Math.round(totalPercentage / weekData.length);

  // State to track hovered segment
  const [hoveredSegment, setHoveredSegment] = useState(null);

  // Chart configuration options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false, // Disable default tooltips
      },
    },
    cutout: '65%', // Creates the doughnut hole (reduced for thicker ring)
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 4, // Rounded ends
      }
    },
    rotation: -90, // Start from top
    circumference: 360,
    onHover: (event, activeElements) => {
      event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
      
      if (activeElements.length > 0) {
        const index = activeElements[0].index;
        setHoveredSegment(index);
      } else {
        setHoveredSegment(null);
      }
    }
  };

  // Chart data configuration
  const data = {
    labels: weekData.map(item => item.week),
    datasets: [
      {
        data: weekData.map(item => item.value),
        backgroundColor: weekData.map(item => item.color),
        borderWidth: 2,
        borderColor: '#fff',
        hoverBackgroundColor: weekData.map(item => item.color),
        hoverBorderWidth: 3,
      }
    ]
  };

  return (
    <div style={{ width: '120px', height: '120px', position: 'relative', marginLeft: '-10px' }}>
      <Doughnut data={data} options={options} />
      {/* Center text overlay */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: '600',
        color: '#374151',
        lineHeight: '1.2'
      }}>
        {hoveredSegment !== null ? (
          <>
            <div>{weekData[hoveredSegment].value}%</div>
            <div style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: '500' }}>
              {weekData[hoveredSegment].week}
            </div>
          </>
        ) : (
          <>
            <div>{averagePercentage}%</div>
            <div style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: '500' }}>
              Average
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GeneratedLeadsChart;