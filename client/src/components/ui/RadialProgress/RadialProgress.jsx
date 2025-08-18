import React from 'react';
import './RadialProgress.less';

const RadialProgress = ({ percentage, size = 120, strokeWidth = 8, children }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="radial-progress" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="radial-progress-svg"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#696CFF"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="radial-progress-circle"
        />
      </svg>
      <div className="radial-progress-content">
        {children}
      </div>
    </div>
  );
};

export default RadialProgress;