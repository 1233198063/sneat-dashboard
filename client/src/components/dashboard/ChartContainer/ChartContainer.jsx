import React from 'react';
import './ChartContainer.less';

const ChartContainer = ({ title, children, actions }) => {
  return (
    <div className="chart-container">
      <div className="chart-container__header">
        <h3 className="chart-container__title">{title}</h3>
        {actions && (
          <div className="chart-container__actions">
            {actions}
          </div>
        )}
      </div>
      <div className="chart-container__content">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;