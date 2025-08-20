import React from 'react';

const SalesHeatmap = ({ data, months, yAxisLabels }) => {
  const getIntensity = (value) => {
    if (value === 1) return 0.3;  // Lightest ring - more visible
    if (value === 2) return 0.5;  // Second ring - medium
    if (value === 3) return 0.7;  // Third ring - darker
    if (value === 4) return 1;    // Center - darkest
    return 0.3;
  };

  const getBackgroundColor = (value) => {
    const intensity = getIntensity(value);
    return `rgba(105, 108, 255, ${intensity})`;
  };

  // Flatten the 2D array for CSS Grid
  const flatData = data.flat();

  return (
    <div className="sales-heatmap">
      <div className="heatmap-container">
        <div className="y-axis-labels">
          {yAxisLabels.map((label, index) => (
            <div key={index} className="y-axis-label">
              {label}
            </div>
          ))}
        </div>
        <div className="heatmap-content">
          <div className="heatmap-grid">
            {flatData.map((cellValue, index) => {
              const rowIndex = Math.floor(index / 8);
              const colIndex = index % 8;
              return (
                <div
                  key={index}
                  className="heatmap-cell"
                  style={{
                    backgroundColor: getBackgroundColor(cellValue)
                  }}
                  title={`${months[colIndex]} ${yAxisLabels[rowIndex]}: ${cellValue}`}
                />
              );
            })}
          </div>
          <div className="x-axis-labels">
            {months.map((month, index) => (
              <div key={index} className="x-axis-label">
                {month}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesHeatmap;