import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import Card from '../../components/ui/Card/Card';
import FixedButtons from '../../components/ui/FixedButtons/FixedButtons';
import VisitorsChart from '../../components/charts/VisitorsChart';
import ActivityChart from '../../components/charts/ActivityChart';
import ExpensesChart from '../../components/charts/ExpensesChart';
import ECommerceProfitChart from '../../components/charts/ECommerceProfitChart';
import TotalIncomeChart from '../../components/charts/TotalIncomeChart';
import PerformanceRadarChart from '../../components/charts/PerformanceRadarChart';
import ConversionLineChart from '../../components/charts/ConversionLineChart';
import ExpensesBarChart from '../../components/charts/ExpensesBarChart';
import TotalBalanceChart from '../../components/charts/TotalBalanceChart';
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

      {/* Third Row */}
      <div className="third-row">
        {/* Performance Card - Left 1/3 */}
        <Card className="performance-card">
          <div className="performance-content">
            <div className="performance-header">
              <h3 className="card-title">Performance</h3>
              <button className="more-btn">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="performance-stats">
              <div className="stat-item">
                <div className="stat-label">Earning: $846.17</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Sales: 25.7M</div>
              </div>
            </div>

            <div className="performance-chart">
              <PerformanceRadarChart />
            </div>
          </div>
        </Card>

        {/* Conversion Rate Card - Middle 1/3 */}
        <Card className="conversion-rate-card">
          <div className="conversion-content">
            <div className="conversion-header">
              <div className="header-left">
                <h3 className="card-title">Conversion Rate</h3>
                <p className="card-subtitle">Compared To Last Month</p>
              </div>
              <button className="more-btn">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="conversion-main-section">
              <div className="conversion-main-stat">
                <span className="main-percentage">8.72%</span>
                <span className="change-indicator positive">↑ 4.8%</span>
              </div>

              <div className="conversion-chart">
                <ConversionLineChart />
              </div>
            </div>

            <div className="conversion-funnel">
              <div className="funnel-step">
                <div className="step-left">
                  <div className="step-label">Impressions</div>
                  <div className="step-value">12.4k Visits</div>
                </div>
                <div className="step-stats">
                  <span className="step-change positive">↑ 12.8%</span>
                </div>
              </div>
              
              <div className="funnel-step">
                <div className="step-left">
                  <div className="step-label">Added To Cart</div>
                  <div className="step-value">32 Product in cart</div>
                </div>
                <div className="step-stats">
                  <span className="step-change negative">↓ -8.3%</span>
                </div>
              </div>
              
              <div className="funnel-step">
                <div className="step-left">
                  <div className="step-label">Checkout</div>
                  <div className="step-value">21 Product checkout</div>
                </div>
                <div className="step-stats">
                  <span className="step-change positive">↑ 9.12%</span>
                </div>
              </div>
              
              <div className="funnel-step">
                <div className="step-left">
                  <div className="step-label">Purchased</div>
                  <div className="step-value">12 Orders</div>
                </div>
                <div className="step-stats">
                  <span className="step-change positive">↑ 2.24%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Side Composite - Right 1/3 */}
        <div className="right-composite">
          {/* Top Two Small Cards */}
          <div className="top-small-cards">
            <Card className="revenue-small-card">
              <div className="small-card-content">
                <div className="card-icon revenue-icon">
                  <img src="/images/stats-vertical-desktop.png" alt="Revenue" className="card-icon-image" />
                </div>
                <div className="card-stats">
                  <div className="stat-label">Revenue</div>
                  <div className="stat-value">$42,389</div>
                  <div className="stat-change positive">↑ 52.76%</div>
                </div>
              </div>
            </Card>

            <Card className="sales-small-card">
              <div className="small-card-content">
                <div className="card-stats">
                  <div className="stat-label">Sales</div>
                  <div className="stat-value">482k</div>
                  <div className="stat-change positive">+34%</div>
                  <div className="sales-target">
                    <div className="target-label">Sales Target</div>
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div className="progress-fill" style={{width: '78%'}}></div>
                      </div>
                      <div className="target-percentage">78%</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Bottom Large Card */}
          <Card className="expenses-large-card">
            <div className="expenses-content">
              <div className="expenses-header">
                <div className="header-left">
                  <h3 className="card-title">Expenses</h3>
                </div>
                <button className="more-btn">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              
              <div className="expenses-body">
                <div className="expenses-left">
                  <div className="expenses-main-stat">
                    <span className="main-amount">$84.7k</span>
                    <span className="change-indicator negative">↓ 8.2%</span>
                  </div>
                  <div className="chart-label">JULY 2025</div>
                </div>
                
                <div className="expenses-right">
                  <div className="expenses-chart">
                    <ExpensesBarChart />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Fourth Row */}
      <div className="fourth-row">
        {/* Products Table Card - Left 2/3 */}
        <Card className="products-table-card">
          <div className="products-content">
            
            <div className="products-table">
              <div className="table-header">
                <div className="col-product">PRODUCT</div>
                <div className="col-category">CATEGORY</div>
                <div className="col-payment">PAYMENT</div>
                <div className="col-order-status">ORDER STATUS</div>
                <div className="col-actions">ACTIONS</div>
              </div>
              
              <div className="table-body">
                <div className="table-row">
                  <div className="col-product">
                    <div className="product-info">
                      <img src="/images/products/oneplus-7pro-light.png" alt="OnePlus 7Pro" className="product-image" />
                      <div className="product-details">
                        <div className="product-name">OnePlus 7Pro</div>
                        <div className="product-brand">OnePlus</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-category">
                    <div className="category-badge smartphone-category">
                      <div className="category-icon"></div>
                      <span>Smart Phone</span>
                    </div>
                  </div>
                  <div className="col-payment">
                    <div className="payment-info">
                      <div className="payment-amount">$120/$499</div>
                      <div className="payment-status">Partially Paid</div>
                    </div>
                  </div>
                  <div className="col-order-status">
                    <span className="status-badge confirmed">CONFIRMED</span>
                  </div>
                  <div className="col-actions">
                    <button className="actions-btn">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                <div className="table-row">
                  <div className="col-product">
                    <div className="product-info">
                      <img src="/images/products/apple-magic-mouse-light.png" alt="Magic Mouse" className="product-image" />
                      <div className="product-details">
                        <div className="product-name">Magic Mouse</div>
                        <div className="product-brand">Apple</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-category">
                    <div className="category-badge mouse-category">
                      <div className="category-icon"></div>
                      <span>Mouse</span>
                    </div>
                  </div>
                  <div className="col-payment">
                    <div className="payment-info">
                      <div className="payment-amount">$149</div>
                      <div className="payment-status">Fully Paid</div>
                    </div>
                  </div>
                  <div className="col-order-status">
                    <span className="status-badge completed">COMPLETED</span>
                  </div>
                  <div className="col-actions">
                    <button className="actions-btn">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                <div className="table-row">
                  <div className="col-product">
                    <div className="product-info">
                      <img src="/images/products/apple-iMac-pro-light.png" alt="iMac Pro" className="product-image" />
                      <div className="product-details">
                        <div className="product-name">iMac Pro</div>
                        <div className="product-brand">Apple</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-category">
                    <div className="category-badge computer-category">
                      <div className="category-icon"></div>
                      <span>Computer</span>
                    </div>
                  </div>
                  <div className="col-payment">
                    <div className="payment-info">
                      <div className="payment-amount">$0/$899</div>
                      <div className="payment-status">Unpaid</div>
                    </div>
                  </div>
                  <div className="col-order-status">
                    <span className="status-badge cancelled">CANCELLED</span>
                  </div>
                  <div className="col-actions">
                    <button className="actions-btn">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                <div className="table-row">
                  <div className="col-product">
                    <div className="product-info">
                      <img src="/images/products/samsung-note-10-light.png" alt="Note 10" className="product-image" />
                      <div className="product-details">
                        <div className="product-name">Note 10</div>
                        <div className="product-brand">Samsung</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-category">
                    <div className="category-badge smartphone-category">
                      <div className="category-icon"></div>
                      <span>Smart Phone</span>
                    </div>
                  </div>
                  <div className="col-payment">
                    <div className="payment-info">
                      <div className="payment-amount">$169</div>
                      <div className="payment-status">Fully Paid</div>
                    </div>
                  </div>
                  <div className="col-order-status">
                    <span className="status-badge completed">COMPLETED</span>
                  </div>
                  <div className="col-actions">
                    <button className="actions-btn">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                <div className="table-row">
                  <div className="col-product">
                    <div className="product-info">
                      <img src="/images/products/apple-iPhone-11-pro-light.png" alt="iPhone 11 Pro" className="product-image" />
                      <div className="product-details">
                        <div className="product-name">iPhone 11 Pro</div>
                        <div className="product-brand">Apple</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-category">
                    <div className="category-badge smartphone-category">
                      <div className="category-icon"></div>
                      <span>Smart Phone</span>
                    </div>
                  </div>
                  <div className="col-payment">
                    <div className="payment-info">
                      <div className="payment-amount">$399</div>
                      <div className="payment-status">Fully Paid</div>
                    </div>
                  </div>
                  <div className="col-order-status">
                    <span className="status-badge completed">COMPLETED</span>
                  </div>
                  <div className="col-actions">
                    <button className="actions-btn">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                <div className="table-row">
                  <div className="col-product">
                    <div className="product-info">
                      <img src="/images/products/mi-led-tv-4x-light.png" alt="Mi Led TV 4X" className="product-image" />
                      <div className="product-details">
                        <div className="product-name">Mi Led TV 4X</div>
                        <div className="product-brand">Xiaomi</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-category">
                    <div className="category-badge tv-category">
                      <div className="category-icon"></div>
                      <span>Smart TV</span>
                    </div>
                  </div>
                  <div className="col-payment">
                    <div className="payment-info">
                      <div className="payment-amount">$349/$2599</div>
                      <div className="payment-status">Partially Paid</div>
                    </div>
                  </div>
                  <div className="col-order-status">
                    <span className="status-badge confirmed">CONFIRMED</span>
                  </div>
                  <div className="col-actions">
                    <button className="actions-btn">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                <div className="table-row">
                  <div className="col-product">
                    <div className="product-info">
                      <img src="/images/products/logitech-mx-light.png" alt="Logitech MX" className="product-image" />
                      <div className="product-details">
                        <div className="product-name">Logitech MX</div>
                        <div className="product-brand">Logitech</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-category">
                    <div className="category-badge mouse-category">
                      <div className="category-icon"></div>
                      <span>Mouse</span>
                    </div>
                  </div>
                  <div className="col-payment">
                    <div className="payment-info">
                      <div className="payment-amount">$89</div>
                      <div className="payment-status">Fully Paid</div>
                    </div>
                  </div>
                  <div className="col-order-status">
                    <span className="status-badge completed">COMPLETED</span>
                  </div>
                  <div className="col-actions">
                    <button className="actions-btn">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Total Balance Card - Right 1/3 */}
        <Card className="total-balance-card">
          <div className="balance-content">
            <div className="balance-header">
              <h3 className="card-title">Total Balance</h3>
              <button className="more-btn">
                <MoreHorizontal size={20} />
              </button>
            </div>
            
            <div className="balance-amounts">
              <div className="balance-item">
                <img src="/images/wallet-info.png" alt="Wallet" className="balance-icon" />
                <div className="balance-info">
                  <div className="balance-amount">$2.54k</div>
                  <div className="balance-label">Wallet</div>
                </div>
              </div>
              <div className="balance-item">
                <img src="/images/paypal-primary.png" alt="Paypal" className="balance-icon" />
                <div className="balance-info">
                  <div className="balance-amount">$4.21k</div>
                  <div className="balance-label">Paypal</div>
                </div>
              </div>
            </div>

            <div className="balance-chart">
              <TotalBalanceChart />
            </div>

            <div className="balance-footer">
              <div className="progress-info">
                <div className="progress-text">You have done 57.6% more sales.</div>
                <div className="progress-subtext">Check your new badge in your profile.</div>
              </div>
              <div className="progress-arrow">→</div>
            </div>
          </div>
        </Card>
      </div>

      <FixedButtons />
    </div>
  );
};

export default ECommerce;