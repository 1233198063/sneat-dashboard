import React from 'react';
import Card from '../../ui/Card/Card';
import './StatsCard.less';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon,
  iconType = 'primary',
  subtitle,
  chartType,
  chartColor,
  chartComponent,
  loading = false 
}) => {
  
  const renderMiniChart = () => {
    switch (chartType) {
      case 'mini-chart':
        return (
          <div className="mini-chart">
            <div className="chart-icon" style={{color: chartColor}}>📊</div>
          </div>
        );
      case 'trend-up':
        return (
          <div className="mini-chart trend-chart">
            <svg width="40" height="20" viewBox="0 0 40 20">
              <path d="M2 15 L10 10 L18 5 L26 8 L34 3 L38 6" 
                    stroke={chartColor} 
                    strokeWidth="2" 
                    fill="none" 
                    strokeLinecap="round"/>
              <circle cx="38" cy="6" r="2" fill={chartColor}/>
            </svg>
          </div>
        );
      case 'paypal':
        return (
          <div className="mini-chart paypal-chart">
            <div className="paypal-icon" style={{color: chartColor}}>💳</div>
          </div>
        );
      case 'calendar':
        return (
          <div className="mini-chart calendar-chart">
            <div className="calendar-grid">
              <div className="calendar-row">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
              </div>
              <div className="calendar-days">
                <div className="day"></div>
                <div className="day"></div>
                <div className="day active" style={{backgroundColor: chartColor}}></div>
                <div className="day"></div>
                <div className="day"></div>
                <div className="day"></div>
                <div className="day"></div>
              </div>
            </div>
          </div>
        );
      case 'line-chart':
        return (
          <div className="mini-chart line-chart">
            <svg width="60" height="30" viewBox="0 0 60 30">
              <path d="M5 20 Q15 10 25 15 T45 8 T55 12" 
                    stroke={chartColor} 
                    strokeWidth="2" 
                    fill="none" 
                    strokeLinecap="round"/>
              <circle cx="55" cy="12" r="2" fill={chartColor}/>
            </svg>
          </div>
        );
      case 'order-chart':
        return (
          <div className="chart-component-container">
            {chartComponent}
          </div>
        );
      case 'profit-chart':
        return (
          <div className="chart-component-container">
            {chartComponent}
          </div>
        );
      default:
        return null;
    }
  };

  const formatValue = (val) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      }
      if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
      return val.toLocaleString();
    }
    return val;
  };

  return (
    <Card className={`stats-card ${chartType === 'profit-chart' ? 'profit-report-card' : ''}`} bordered hoverable loading={loading}>
      <div className="stats-content">
        {chartType === 'profit-chart' ? (
          <div className="profit-layout">
            <div className="profit-info">
              <div className="stats-title">{title}</div>
              {subtitle && <div className="stats-subtitle">{subtitle}</div>}
              {change && (
                <div className={`stats-change ${changeType}`}>
                  <span>{change}</span>
                </div>
              )}
              <div className="stats-value">{formatValue(value)}</div>
            </div>
            <div className="profit-chart">
              {renderMiniChart()}
            </div>
          </div>
        ) : (
          <>
            <div className="stats-main">
              <div className="stats-info">
                {icon && (
                  <div className={`stats-icon ${iconType}`}>
                    {typeof icon === 'string' && icon.includes('.') ? (
                      <img src={`/images/${icon}`} alt="icon" className="icon-image" />
                    ) : typeof icon === 'string' ? (
                      <span className="emoji-icon">{icon}</span>
                    ) : (
                      React.createElement(icon, { size: 24 })
                    )}
                  </div>
                )}
                <div className="stats-title">{title}</div>
                <div className="stats-value">{formatValue(value)}</div>
                {subtitle && <div className="stats-subtitle">{subtitle}</div>}
                {change && (
                  <div className={`stats-change ${changeType}`}>
                    <span>{change}</span>
                  </div>
                )}
              </div>
            </div>
            {chartType && (
              <div className="stats-chart-area">
                {renderMiniChart()}
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;