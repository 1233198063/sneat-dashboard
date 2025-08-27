import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import Card from '../../components/ui/Card/Card';
import FixedButtons from '../../components/ui/FixedButtons/FixedButtons';
import VisitorsChart from '../../components/charts/VisitorsChart';
import ActivityChart from '../../components/charts/ActivityChart';
import ExpensesChart from '../../components/charts/ExpensesChart';
import ECommerceProfitChart from '../../components/charts/ECommerceProfitChart';
import TotalIncomeChart from '../../components/charts/TotalIncomeChart';
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

      {/* Second Row */}
      <div className="second-row">
        {/* Left side - Four small cards in grid */}
        <div className="small-cards-grid">
          <Card className="small-card sales-card">
            <div className="small-card-content">
              <div className="card-icon sales-icon">
                <img src="/images/stats-vertical-wallet.png" alt="Sales" className="card-icon-image" />
              </div>
              <div className="card-stats">
                <div className="stat-label">Sales</div>
                <div className="stat-value">$4,679</div>
                <div className="stat-change positive">+28.14%</div>
              </div>
            </div>
          </Card>

          <Card className="small-card profit-card">
            <div className="small-card-content">
              <div className="card-stats">
                <div className="stat-label">Profit</div>
                <div className="stat-value">624k</div>
                <ECommerceProfitChart />
              </div>
            </div>
          </Card>

          <Card className="small-card expenses-card">
            <div className="small-card-content">
              <div className="card-stats">
                <div className="stat-label">Expenses</div>
                <ExpensesChart />
                <div className="expenses-info">$2k Expenses more than last month</div>
              </div>
            </div>
          </Card>

          <Card className="small-card transactions-card">
            <div className="small-card-content">
              <div className="card-icon transactions-icon">
                <img src="/images/stats-vertical-card.png" alt="Transactions" className="card-icon-image" />
              </div>
              <div className="card-stats">
                <div className="stat-label">Transactions</div>
                <div className="stat-value">$14,854</div>
                <div className="stat-change positive">+17.53%</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right side - Large card */}
        <Card className="large-card revenue-chart-card">
          <div className="revenue-main-container">
            <div className="left-section">
              <div className="left-header">
                <h3 className="card-title">Total Income</h3>
                <p className="card-subtitle">Yearly report overview</p>
              </div>
              
              <div className="chart-area">
                <TotalIncomeChart />
              </div>
            </div>
            
            <div className="vertical-divider"></div>
            
            <div className="right-section">
              <div className="right-top">
                <div className="report-header">
                  <h4 className="report-title">Report</h4>
                  <p className="report-subtitle">Monthly Avg. $45,578k</p>
                </div>
                <div className="report-actions">
                  <button className="more-btn">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </div>
              
              <div className="right-bottom">
                <div className="income-stats">
                  <div className="stat-item">
                    <div className="stat-icon income-stat">
                      <img src="/images/paypal-primary.png" alt="Income" className="stat-icon-image" />
                    </div>
                    <div className="stat-info">
                      <div className="stat-label">Income</div>
                      <div className="stat-value-row">
                        <div className="stat-value">$42,845</div>
                        <div className="stat-change positive">+2.7k</div>
                      </div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon expense-stat">
                      <img src="/images/shopping-bag.png" alt="Expense" className="stat-icon-image" />
                    </div>
                    <div className="stat-info">
                      <div className="stat-label">Expense</div>
                      <div className="stat-value-row">
                        <div className="stat-value">$38,658</div>
                        <div className="stat-change negative">-1.15k</div>
                      </div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-icon profit-stat">
                      <img src="/images/wallet-info.png" alt="Profit" className="stat-icon-image" />
                    </div>
                    <div className="stat-info">
                      <div className="stat-label">Profit</div>
                      <div className="stat-value-row">
                        <div className="stat-value">$18,220</div>
                        <div className="stat-change positive">+1.34k</div>
                      </div>
                    </div>
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