import React from 'react';

const CircularProgress = ({ percentage = 75, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-progress">
      <svg width={size} height={size} className="progress-svg">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F5F5F9"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#71DD37"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%'
          }}
        />
        {/* Center text */}
        <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="progress-percentage"
          fontSize="24"
          fontWeight="700"
          fill="#2E3A47"
        >
          {percentage}%
        </text>
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="progress-label"
          fontSize="12"
          fill="#8B909A"
        >
          Sales
        </text>
      </svg>
      <div className="progress-legend">
        <div className="legend-item">
          <div className="legend-dot conversion"></div>
          <span>Conversion Ratio</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot total"></div>
          <span>Total requirements</span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;