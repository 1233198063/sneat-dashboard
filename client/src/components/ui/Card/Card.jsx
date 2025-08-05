import React from 'react';
import './Card.less';

const Card = ({ 
  children, 
  title, 
  subtitle,
  action,
  bordered = true,
  hoverable = false,
  loading = false,
  className = '',
  ...props 
}) => {
  const cardClass = [
    'card',
    bordered && 'card-bordered',
    hoverable && 'card-hoverable',
    loading && 'card-loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClass} {...props}>
      {(title || subtitle || action) && (
        <div className="card-header">
          <div className="card-header-content">
            {title && <div className="card-title">{title}</div>}
            {subtitle && <div className="card-subtitle">{subtitle}</div>}
          </div>
          {action && <div className="card-action">{action}</div>}
        </div>
      )}
      <div className="card-body">
        {loading ? (
          <div className="card-skeleton">
            <div className="skeleton-line skeleton-line-title"></div>
            <div className="skeleton-line skeleton-line-content"></div>
            <div className="skeleton-line skeleton-line-content short"></div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Card;