import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressDoughnutChart = ({ percentage = 78 }) => {
  // Create segmented data for dashed effect
  const segments = 40; // Number of segments for dashed effect
  const filledSegments = Math.round((percentage / 100) * segments);
  const emptySegments = segments - filledSegments;
  
  // Create alternating data array for dashed effect
  const segmentData = [];
  const segmentColors = [];
  
  for (let i = 0; i < filledSegments; i++) {
    segmentData.push(1);
    segmentColors.push('#696CFF');
  }
  
  for (let i = 0; i < emptySegments; i++) {
    segmentData.push(1);
    segmentColors.push('#E5E7EB');
  }

  const data = {
    datasets: [
      {
        data: segmentData,
        backgroundColor: segmentColors,
        borderColor: segmentColors,
        borderWidth: 0,
        cutout: '75%',
        spacing: 2,
      },
    ],
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
      },
    },
    elements: {
      arc: {
        borderRadius: 0,
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '120px', height: '120px' }}>
      <Doughnut data={data} options={options} />
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{ fontSize: '28px', fontWeight: '600', color: '#374151', lineHeight: 1 }}>
          {percentage}%
        </div>
        <div style={{ fontSize: '14px', color: '#9CA3AF', marginTop: '4px' }}>
          Growth
        </div>
      </div>
    </div>
  );
};

export default ProgressDoughnutChart;