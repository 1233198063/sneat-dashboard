import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard/StatsCard';
import Card from '../../components/ui/Card/Card';
import TotalRevenueChart from '../../components/charts/TotalRevenueChart';
import ProgressDoughnutChart from '../../components/charts/ProgressDoughnutChart';
import OrderChart from '../../components/charts/OrderChart';
import ProfitChart from '../../components/charts/ProfitChart';
import IncomeChart from '../../components/charts/IncomeChart';
import OrderStatsChart from '../../components/charts/OrderStatsChart';
import FixedButtons from '../../components/ui/FixedButtons/FixedButtons';
import './Dashboard.less';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('browser');

  // Operating Systems data
  const operatingSystemsData = [
    {
      id: 1,
      name: 'Windows',
      visits: '475.26k',
      percentage: 61.5,
      icon: '/images/icons/windows.png',
      color: '#4CAF50'
    },
    {
      id: 2,
      name: 'Mac',
      visits: '89.12k',
      percentage: 15.67,
      icon: '/images/icons/mac.png',
      color: '#6366F1'
    },
    {
      id: 3,
      name: 'Ubuntu',
      visits: '38.68k',
      percentage: 5.82,
      icon: '/images/icons/ubuntu.png',
      color: '#06B6D4'
    },
    {
      id: 4,
      name: 'Linux',
      visits: '30.27k',
      percentage: 5.03,
      icon: '/images/icons/linux.png',
      color: '#F59E0B'
    },
    {
      id: 5,
      name: 'Chrome',
      visits: '8.34k',
      percentage: 3.25,
      icon: '/images/icons/chrome.png',
      color: '#EF4444'
    },
    {
      id: 6,
      name: 'Cent',
      visits: '2.25k',
      percentage: 1.76,
      icon: '/images/icons/cent.png',
      color: '#06B6D4'
    }
  ];

  // Browser data
  const browserData = [
    {
      id: 1,
      name: 'Chrome',
      visits: '8.92k',
      percentage: 64.91,
      icon: '/images/icons/chrome.png',
      color: '#4CAF50'
    },
    {
      id: 2,
      name: 'Safari',
      visits: '1.29k',
      percentage: 19.03,
      icon: '/images/icons/safari.png',
      color: '#6366F1'
    },
    {
      id: 3,
      name: 'Firefox',
      visits: '328',
      percentage: 3.26,
      icon: '/images/icons/firefox.png',
      color: '#06B6D4'
    },
    {
      id: 4,
      name: 'Edge',
      visits: '142',
      percentage: 3.99,
      icon: '/images/icons/edge.png',
      color: '#F59E0B'
    },
    {
      id: 5,
      name: 'Opera',
      visits: '85',
      percentage: 2.12,
      icon: '/images/icons/opera.png',
      color: '#EF4444'
    },
    {
      id: 6,
      name: 'Brave',
      visits: '36',
      percentage: 1.06,
      icon: '/images/icons/brave.png',
      color: '#06B6D4'
    }
  ];

  // Country data
  const countryData = [
    {
      id: 1,
      name: 'USA',
      visits: '87.24k',
      percentage: 38.12,
      icon: '/images/countries/usa.png',
      color: '#4CAF50'
    },
    {
      id: 2,
      name: 'Brazil',
      visits: '42.69k',
      percentage: 28.23,
      icon: '/images/countries/brazil.png',
      color: '#6366F1'
    },
    {
      id: 3,
      name: 'India',
      visits: '12.58k',
      percentage: 13.82,
      icon: '/images/countries/india.png',
      color: '#06B6D4'
    },
    {
      id: 4,
      name: 'Australia',
      visits: '4.13k',
      percentage: 12.72,
      icon: '/images/countries/australia.png',
      color: '#F59E0B'
    },
    {
      id: 5,
      name: 'China',
      visits: '2.21k',
      percentage: 7.11,
      icon: '/images/countries/china.png',
      color: '#EF4444'
    },
    {
      id: 6,
      name: 'France',
      visits: '1.56k',
      percentage: 6.59,
      icon: '/images/countries/france.png',
      color: '#06B6D4'
    }
  ];

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case 'browser':
        return browserData;
      case 'os':
        return operatingSystemsData;
      case 'country':
        return countryData;
      default:
        return browserData;
    }
  };

  const getTableHeader = () => {
    switch (activeTab) {
      case 'browser':
        return 'BROWSER';
      case 'os':
        return 'SYSTEM';
      case 'country':
        return 'COUNTRY';
      default:
        return 'BROWSER';
    }
  };

  // Statistics data for dashboard cards
  const statsData = [
    {
      title: 'Order',
      value: '276k',
      chartType: 'order-chart',
      chartComponent: <OrderChart />
    },
    {
      title: 'Sales',
      value: '$4,679',
      change: '28.14%',
      changeType: 'positive',
      icon: 'stats-vertical-wallet.png',
      iconType: 'transparent'
    },
    {
      title: 'Revenue',
      value: '425k',
      icon: 'trending-up',
      iconType: 'warning',
      chartType: 'paypal',
      chartColor: '#F59E0B'
    },
    {
      title: 'Payments',
      value: '$2,468',
      change: '14.82%',
      changeType: 'negative',
      icon: 'stats-vertical-paypal.png',
      iconType: 'transparent'
    },
    {
      title: 'Profit Report',
      value: '$84,686k',
      change: '68.2%',
      changeType: 'positive',
      subtitle: 'YEAR 2025',
      chartType: 'profit-chart',
      chartComponent: <ProfitChart />
    }
  ];



  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {/* Row 1, Col 1: Congratulations Card */}
        <Card className="welcome-banner">
          <div className="welcome-content">
            <div className="welcome-text">
              <h1 className="welcome-title">Congratulations John! 🎉</h1>
              <p className="welcome-subtitle">
                You have done 72% more sales today.<br />
                Check your new badge in your profile.
              </p>
              <button className="view-badges-btn">VIEW BADGES</button>
            </div>
            <div className="welcome-illustration">
              <img
                src="/images/illustration-john-light.png"
                alt="John illustration"
                className="character-image"
              />
            </div>
          </div>
        </Card>

        {/* Row 1, Col 2: Order Card */}
        <StatsCard {...statsData[0]} />

        {/* Row 1, Col 3: Sales Card */}
        <StatsCard {...statsData[1]} />


        {/* Row 2, Col 1: Total Revenue Card */}
        <Card className="revenue-chart-card">
          <div className="revenue-main-container">
            <div className="left-section">
              <div className="left-header">
                <h3 className="card-title">Total Revenue</h3>
                <p className="card-subtitle">2024 vs 2023</p>
              </div>
              
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: '#696CFF' }}></span>
                  <span>2024</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: '#03DAC6' }}></span>
                  <span>2023</span>
                </div>
              </div>
              
              <div className="chart-area">
                <TotalRevenueChart />
              </div>
            </div>
            
            <div className="vertical-divider"></div>
            
            <div className="right-section">
              <div className="right-top">
                <select className="year-select-purple">
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>
              
              <div className="right-middle">
                <div className="progress-container">
                  <div className="progress-chart">
                    <ProgressDoughnutChart percentage={78} />
                  </div>
                  <div className="company-growth">62% Company Growth</div>
                </div>
              </div>
              
              <div className="right-bottom">
                <div className="revenue-stats">
                  <div className="revenue-stat">
                    <div className="stat-icon stat-2025">$</div>
                    <div className="stat-info">
                      <div className="stat-year">2025</div>
                      <div className="stat-value">$32.5k</div>
                    </div>
                  </div>
                  <div className="revenue-stat">
                    <div className="stat-icon stat-2024">📊</div>
                    <div className="stat-info">
                      <div className="stat-year">2024</div>
                      <div className="stat-value">$41.2k</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Row 2, Col 2: Payments Card */}
        <StatsCard {...statsData[3]} />

        {/* Row 2, Col 3: Revenue Card */}
        <Card className="revenue-card">
          <div className="revenue-header">
            <h3 className="revenue-title">Revenue</h3>
          </div>
          <div className="revenue-content">
            <div className="revenue-value">425k</div>
            <div className="revenue-chart">
              <div className="chart-bars">
                <div className="bar" style={{ height: '30%', backgroundColor: '#E5E7EB' }}></div>
                <div className="bar" style={{ height: '50%', backgroundColor: '#E5E7EB' }}></div>
                <div className="bar" style={{ height: '40%', backgroundColor: '#E5E7EB' }}></div>
                <div className="bar" style={{ height: '30%', backgroundColor: '#E5E7EB' }}></div>
                <div className="bar" style={{ height: '80%', backgroundColor: '#6366F1' }}></div>
                <div className="bar" style={{ height: '45%', backgroundColor: '#E5E7EB' }}></div>
                <div className="bar" style={{ height: '60%', backgroundColor: '#E5E7EB' }}></div>
              </div>
              <div className="chart-labels">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Row 3, Col 2: Profit Report Card */}
        <div className="profit-report-card">
          <StatsCard {...statsData[4]} />
        </div>

        {/* Additional cards for Revenue (hide for now) */}
        <div className="additional-cards">
          <StatsCard {...statsData[2]} />
        </div>
      </div>


      {/* Bottom Section */}
      <div className="bottom-section">
        {/* Order Statistics */}
        <Card
          title="Order Statistics"
          subtitle="42.82k Total Sales"
          action={
            <button className="card-menu-btn">
              <MoreHorizontal size={20} />
            </button>
          }
          className="order-stats-card"
        >
          <div className="order-content">
            <div className="order-top-section">
              <div className="order-main-stats">
                <div className="order-number">8,258</div>
                <div className="order-label">Total Orders</div>
              </div>

              <div className="order-chart">
                <div className="chart-container">
                  <OrderStatsChart />
                </div>
              </div>
            </div>

            <div className="order-categories">
              <div className="category-item">
                <div className="category-icon electronic">📱</div>
                <div className="category-info">
                  <div className="category-name">Electronic</div>
                  <div className="category-desc">Mobile, Earbuds, TV</div>
                </div>
                <div className="category-value">82.5k</div>
              </div>

              <div className="category-item">
                <div className="category-icon fashion">👕</div>
                <div className="category-info">
                  <div className="category-name">Fashion</div>
                  <div className="category-desc">Tshirt, Jeans, Shoes</div>
                </div>
                <div className="category-value">23.8k</div>
              </div>

              <div className="category-item">
                <div className="category-icon decor">🏠</div>
                <div className="category-info">
                  <div className="category-name">Decor</div>
                  <div className="category-desc">Fine Art, Dining</div>
                </div>
                <div className="category-value">849</div>
              </div>

              <div className="category-item">
                <div className="category-icon sports">⚽</div>
                <div className="category-info">
                  <div className="category-name">Sports</div>
                  <div className="category-desc">Football, Cricket Kit</div>
                </div>
                <div className="category-value">99</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Income / Expenses */}
        <Card className="income-expenses-card sneat">
          {/* Tabs */}
          <div className="income-tabs">
            <button className="tab active">INCOME</button>
            <button className="tab">EXPENSES</button>
            <button className="tab">PROFIT</button>
          </div>
          <div className="tabs-divider" />

          {/* Content */}
          <div className="income-content">
            {/* Header */}
            <div className="income-header">
              <div className="income-icon">
                <img src="/images/wallet-with-bg.png" alt="wallet" className="wallet-image" />
              </div>

              <div className="income-info">
                <div className="income-title">Total Income</div>
                <div className="row">
                  <div className="income-amount">$459.1k</div>
                  <div className="income-change">+42.9%</div>
                </div>
              </div>
            </div>

            {/* Income Chart Area */}
            <div className="income-chart-area">
              <div className="area-chart">
                <IncomeChart />
              </div>

              {/* Weekly statistics */}
              <div className="income-week-info">
                <div className="week-circle">
                  <svg viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="21" className="ring-bg" />
                    <circle cx="24" cy="24" r="21" className="ring-fg" />
                  </svg>
                  <span className="week-val">6.5k</span>
                </div>

                <div className="week-text">
                  <div className="week-title">Income this week</div>
                  <div className="week-subtitle">$39k less than last week</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Transactions */}
        <Card
          title="Transactions"
          action={
            <button className="card-menu-btn">
              <MoreHorizontal size={20} />
            </button>
          }
          className="transactions-card"
        >
          <div className="transaction-list">
            <div className="transaction-item">
              <div className="transaction-icon paypal">💳</div>
              <div className="transaction-details">
                <div className="transaction-name">Paypal</div>
                <div className="transaction-desc">Send money</div>
              </div>
              <div className="transaction-amount positive">+82.6 USD</div>
            </div>

            <div className="transaction-item">
              <div className="transaction-icon wallet">💳</div>
              <div className="transaction-details">
                <div className="transaction-name">Wallet</div>
                <div className="transaction-desc">Mac'D</div>
              </div>
              <div className="transaction-amount positive">+270.69 USD</div>
            </div>

            <div className="transaction-item">
              <div className="transaction-icon transfer">💰</div>
              <div className="transaction-details">
                <div className="transaction-name">Transfer</div>
                <div className="transaction-desc">Refund</div>
              </div>
              <div className="transaction-amount positive">+637.91 USD</div>
            </div>

            <div className="transaction-item">
              <div className="transaction-icon credit">💳</div>
              <div className="transaction-details">
                <div className="transaction-name">Credit Card</div>
                <div className="transaction-desc">Ordered Food</div>
              </div>
              <div className="transaction-amount negative">-838.71 USD</div>
            </div>

            <div className="transaction-item">
              <div className="transaction-icon wallet">💳</div>
              <div className="transaction-details">
                <div className="transaction-name">Wallet</div>
                <div className="transaction-desc">Starbucks</div>
              </div>
              <div className="transaction-amount positive">+203.33 USD</div>
            </div>

            <div className="transaction-item">
              <div className="transaction-icon mastercard">💳</div>
              <div className="transaction-details">
                <div className="transaction-name">Mastercard</div>
                <div className="transaction-desc">Ordered Food</div>
              </div>
              <div className="transaction-amount negative">-92.45 USD</div>
            </div>
          </div>
        </Card>
      </div>

      {/* New Bottom Row */}
      <div className="new-bottom-section">
        {/* Activity Timeline */}
        <Card
          title="Activity Timeline"
          action={
            <button className="card-menu-btn">
              <MoreHorizontal size={20} />
            </button>
          }
          className="activity-timeline-card"
        >
          <div className="activity-timeline">
            <div className="timeline-item">
              <div className="timeline-dot timeline-dot-invoice"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-title">12 Invoices have been paid</span>
                  <span className="timeline-time">12 min ago</span>
                </div>
                <div className="timeline-description">Invoices have been paid to the company</div>
                <div className="timeline-attachment">
                  <div className="attachment-icon">
                    <img src="/images/icons/pdf.png" alt="PDF" width="28" height="28" />
                  </div>
                  <span>Invoices.pdf</span>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot timeline-dot-meeting"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-title">Client Meeting</span>
                  <span className="timeline-time">45 min ago</span>
                </div>
                <div className="timeline-description">Project meeting with john @10:15am</div>
                <div className="timeline-client">
                  <div className="client-avatar">
                    <img src="/images/avatars/Unsplash-Avatars_0004s_0005_laurence-cruz-P7yvmajPvkM-unsplash.png" alt="Steven Nash" />
                  </div>
                  <div className="client-info">
                    <div className="client-name">Steven Nash (Client)</div>
                    <div className="client-role">CEO of ThemeSelection</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot timeline-dot-project"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-title">Create a new project for client</span>
                  <span className="timeline-time">2 days ago</span>
                </div>
                <div className="timeline-description">5 team members in a project</div>
                <div className="timeline-team">
                  <div className="team-avatars">
                    <div className="team-avatar">
                      <img src="/images/avatars/Unsplash-Avatars_0004s_0001_etty-fidele--5S4I0Y8ngY-unsplash.png" alt="Team member" />
                    </div>
                    <div className="team-avatar">
                      <img src="/images/avatars/Unsplash-Avatars_0004s_0002_jessica-felicio-QS9ZX5UnS14-unsplash.png" alt="Team member" />
                    </div>
                    <div className="team-avatar">
                      <img src="/images/avatars/Unsplash-Avatars_0004s_0004_nathan-dumlao-iKwCVH4cyjQ-unsplash.png" alt="Team member" />
                    </div>
                    <div className="team-avatar">
                      <img src="/images/avatars/Unsplash-Avatars_0004s_0006_tyler-nix-_DM28mlR5Bs-unsplash.png" alt="Team member" />
                    </div>
                    <div className="team-avatar">+1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Browser Analytics */}
        <Card
          title=""
          className="browser-analytics-card"
        >
          <div className="browser-analytics">
            <div className="browser-tabs">
              <button 
                className={`browser-tab ${activeTab === 'browser' ? 'active' : ''}`}
                onClick={() => setActiveTab('browser')}
              >
                BROWSER
              </button>
              <button 
                className={`browser-tab ${activeTab === 'os' ? 'active' : ''}`}
                onClick={() => setActiveTab('os')}
              >
                OPERATING SYSTEM
              </button>
              <button 
                className={`browser-tab ${activeTab === 'country' ? 'active' : ''}`}
                onClick={() => setActiveTab('country')}
              >
                COUNTRY
              </button>
            </div>

            <div className="browser-table">
              <div className="table-header">
                <div className="header-cell">NO.</div>
                <div className="header-cell">{getTableHeader()}</div>
                <div className="header-cell">VISITS</div>
                <div className="header-cell">DATA IN PERCENTAGE</div>
              </div>

              <div className="table-body">
                {getCurrentData().map((item, index) => (
                  <div key={item.id} className="table-row">
                    <div className="cell-number">{index + 1}</div>
                    <div className="cell-browser">
                      <img src={item.icon} alt={item.name} className="browser-icon" />
                      <span>{item.name}</span>
                    </div>
                    <div className="cell-visits">{item.visits}</div>
                    <div className="cell-percentage">
                      <div className="percentage-bar">
                        <div 
                          className="percentage-fill" 
                          style={{ 
                            width: `${item.percentage}%`, 
                            backgroundColor: item.color 
                          }}
                        ></div>
                      </div>
                      <span>{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Card>
      </div>

      <FixedButtons />
    </div>
  );
};

export default Dashboard;