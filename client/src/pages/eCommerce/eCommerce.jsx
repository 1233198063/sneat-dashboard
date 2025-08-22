import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import Card from '../../components/ui/Card/Card';
import FixedButtons from '../../components/ui/FixedButtons/FixedButtons';
import VisitorsChart from '../../components/charts/VisitorsChart';
import ActivityChart from '../../components/charts/ActivityChart';
import './eCommerce.less';

const ECommerce = () => {
  return (
    <div className="ecommerce-page">
      {/* First Row */}
      <div className="first-row">
        {/* Congratulations Katie Card - 1/3 width */}
        <Card className="congratulations-card">
          <div className="congrats-content">
            <div className="congrats-text">
              <h1 className="congrats-title">Congratulations Katie! </h1>
              <p className="congrats-subtitle">Best seller of the month</p>
              <div className="congrats-amount">$48.9k</div>
              <p className="congrats-target">78% of target</p>
              <button className="view-sales-btn">VIEW SALES</button>
            </div>
          </div>
          <div className="congrats-illustration">
            <img src="/images/trophy.png" alt="Trophy" className="trophy-image" />
          </div>
        </Card>

        {/* New Visitors & Activity Card - 2/3 width */}
        <Card className="visitors-activity-card">
          <div className="card-content">
            {/* New Visitors Section */}
            <div className="visitors-section">
              <div className="section-header">
                <h3 className="section-title">New Visitors</h3>
                <span className="section-period">Last Week</span>
              </div>
              <div className="visitors-stats">
                <div className="stats-left">
                  <div className="main-stat">
                    <span className="stat-number">23%</span>
                    <span className="stat-change negative">↓ 8.75%</span>
                  </div>
                </div>
                <div className="chart-section">
                  {/* Chart.js visitors chart */}
                  <div className="chart-placeholder visitors-chart">
                    <VisitorsChart />
                  </div>
                  <div className="week-labels">
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                    <span>Su</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Section */}
            <div className="activity-section">
              <div className="section-header">
                <h3 className="section-title">Activity</h3>
                <span className="section-period">Last Week</span>
              </div>
              <div className="activity-stats">
                <div className="stats-left">
                  <div className="main-stat">
                    <span className="stat-number">82%</span>
                    <span className="stat-change positive">↑ 19.6%</span>
                  </div>
                </div>
                <div className="chart-section">
                  {/* Chart.js activity chart */}
                  <div className="chart-placeholder activity-chart">
                    <ActivityChart />
                  </div>
                  <div className="week-labels">
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                    <span>Su</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <FixedButtons />
    </div>
  );
};

export default ECommerce;