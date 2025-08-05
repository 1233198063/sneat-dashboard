import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Card from '../../ui/Card/Card';
import './StatsCard.less';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  iconType = 'primary',
  loading = false 
}) => {
  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp size={14} />;
      case 'negative':
        return <TrendingDown size={14} />;
      default:
        return <Minus size={14} />;
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
    <Card className="stats-card" bordered hoverable loading={loading}>
      <div className="stats-content">
        <div className="stats-info">
          <div className="stats-title">{title}</div>
          <div className="stats-value">{formatValue(value)}</div>
          {change && (
            <div className={`stats-change ${changeType}`}>
              {getChangeIcon()}
              <span>{change}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`stats-icon ${iconType}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatsCard;