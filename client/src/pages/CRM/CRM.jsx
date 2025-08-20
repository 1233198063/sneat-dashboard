import React, { useState } from 'react';
import { 
  Users, UserCheck, TrendingUp, 
  Phone, Mail, Calendar, MoreHorizontal,
  MapPin, Clock, Star, Package
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell
} from 'recharts';
import CustomerRatingsChart from '../../components/charts/CustomerRatingsChart';
import SalesActivityChart from '../../components/charts/SalesActivityChart';
import SessionsChart from '../../components/charts/SessionsChart';
import GeneratedLeadsChart from '../../components/charts/GeneratedLeadsChart';
import EarningBarChart from '../../components/charts/EarningBarChart';
import SalesHeatmap from '../../components/charts/SalesHeatmap';
import CircularProgress from '../../components/charts/CircularProgress';
import SalesDoughnutChart from '../../components/charts/SalesDoughnutChart';
import StatsCard from '../../components/dashboard/StatsCard/StatsCard';
import Card from '../../components/ui/Card/Card';
import FixedButtons from '../../components/ui/FixedButtons/FixedButtons';
import './CRM.less';

const CRM = () => {

  // Customer ratings data
  const ratingsData = [
    { month: 'Jan', rating: 3.2 },
    { month: 'Feb', rating: 3.5 },
    { month: 'Mar', rating: 4.1 },
    { month: 'Apr', rating: 3.8 },
    { month: 'May', rating: 3.9 },
    { month: 'Jun', rating: 4.2 },
    { month: 'Jul', rating: 4.0 }
  ];

  // Sales activity data
  const salesActivityData = [
    { month: 'Jan', sales: 16, activity: 12 },
    { month: 'Feb', sales: 8, activity: 18 },
    { month: 'Mar', sales: 20, activity: 8 },
    { month: 'Apr', sales: 25, activity: 14 },
    { month: 'May', sales: 12, activity: 2 },
    { month: 'Jun', sales: 28, activity: 16 },
    { month: 'Jul', sales: 15, activity: 14 }
  ];

  // Sessions trend data
  const sessionsData = [
    { point: 1, value: 2400 },
    { point: 2, value: 2600 },
    { point: 3, value: 2300 },
    { point: 4, value: 2700 },
    { point: 5, value: 2500 },
    { point: 6, value: 2845 }
  ];

  // CRM statistics data (keeping for lower sections)
  const crmStats = [
    { title: 'Total Customers', value: 21459, change: '+29%', changeType: 'positive', icon: Users, iconType: 'primary' },
    { title: 'Paid Users', value: 4567, change: '+18%', changeType: 'positive', icon: UserCheck, iconType: 'success' },
    { title: 'Active Users', value: 19860, change: '+14%', changeType: 'positive', icon: TrendingUp, iconType: 'warning' },
    { title: 'Pending Users', value: 237, change: '-12%', changeType: 'negative', icon: Clock, iconType: 'error' }
  ];

  // Sales funnel data
  const salesFunnelData = [
    { name: 'Leads', value: 1000, fill: '#696CFF' },
    { name: 'Qualified', value: 750, fill: '#71DD37' },
    { name: 'Proposals', value: 500, fill: '#FF9F40' },
    { name: 'Negotiations', value: 300, fill: '#FF6384' },
    { name: 'Closed Won', value: 150, fill: '#4BC0C0' }
  ];

  // Monthly revenue data
  const revenueData = [
    { month: 'Jan', revenue: 32000, customers: 1200 },
    { month: 'Feb', revenue: 42000, customers: 1890 },
    { month: 'Mar', revenue: 35000, customers: 1567 },
    { month: 'Apr', revenue: 58000, customers: 2134 },
    { month: 'May', revenue: 49000, customers: 1876 },
    { month: 'Jun', revenue: 67000, customers: 2456 }
  ];

  // Customer distribution data
  const customerDistribution = [
    { name: 'New', value: 35, count: 7845, color: '#696CFF' },
    { name: 'Returning', value: 45, count: 10123, color: '#71DD37' },
    { name: 'Referrals', value: 20, count: 4321, color: '#FF9F40' }
  ];

  // Top products data
  const topProductsBySales = [
    {
      id: 1,
      name: 'Oneplus Nord',
      brand: 'Oneplus',
      sales: '$98,348',
      icon: '📱',
      color: '#FF9090'
    },
    {
      id: 2,
      name: 'Smart Band 4',
      brand: 'Xiaomi',
      sales: '$15,459',
      icon: '⌚',
      color: '#696CFF'
    },
    {
      id: 3,
      name: 'Surface Pro X',
      brand: 'Microsoft',
      sales: '$4,589',
      icon: '💻',
      color: '#4DD3E0'
    },
    {
      id: 4,
      name: 'iPhone 13',
      brand: 'Apple',
      sales: '$84,345',
      icon: '📱',
      color: '#71DD37'
    },
    {
      id: 5,
      name: 'Bluetooth Earphone',
      brand: 'Beats',
      sales: '$10,3748',
      icon: '🎧',
      color: '#8B909A'
    }
  ];

  const topProductsByVolume = [
    {
      id: 1,
      name: 'ENVY Laptop',
      brand: 'HP',
      volume: '12.4k',
      change: '+12.4%',
      changeType: 'positive',
      icon: '💻',
      color: '#8B909A'
    },
    {
      id: 2,
      name: 'Apple',
      brand: 'iMac Pro',
      volume: '74.9k',
      change: '-8.5%',
      changeType: 'negative',
      icon: '🖥️',
      color: '#FF9F40'
    },
    {
      id: 3,
      name: 'Smart Watch',
      brand: 'Fitbit',
      volume: '4.4k',
      change: '+17.6%',
      changeType: 'positive',
      icon: '⌚',
      color: '#FF4C4C'
    },
    {
      id: 4,
      name: 'Oneplus Nord',
      brand: 'Oneplus',
      volume: '12.34k',
      change: '+13.9%',
      changeType: 'positive',
      icon: '📱',
      color: '#71DD37'
    },
    {
      id: 5,
      name: 'Pixel 4a',
      brand: 'Google',
      volume: '8.65k',
      change: '-11.8%',
      changeType: 'negative',
      icon: '📱',
      color: '#696CFF'
    }
  ];

  // Earning report data
  const earningReport = {
    title: 'Earning Report',
    subtitle: 'Weekly Earnings Overview',
    metrics: [
      {
        label: 'Net Profit',
        value: '$1,619',
        change: '18.6%',
        changeType: 'positive',
        subtext: '12.4k Sales',
        icon: '📈',
        color: '#696CFF'
      },
      {
        label: 'Total Income',
        value: '$3,571',
        change: '39.6%',
        changeType: 'positive',
        subtext: 'Sales, Affiliation',
        icon: '💰',
        color: '#71DD37'
      },
      {
        label: 'Total Expenses',
        value: '$430',
        change: '52.8%',
        changeType: 'positive',
        subtext: 'ADVT, Marketing',
        icon: '💳',
        color: '#8B909A'
      }
    ],
    chartData: [
      { day: 'Mo', value: 20 },
      { day: 'Tu', value: 40 },
      { day: 'We', value: 30 },
      { day: 'Th', value: 60 },
      { day: 'Fr', value: 80 },
      { day: 'Sa', value: 50 },
      { day: 'Su', value: 100 }
    ]
  };

  // Sales Analytics heatmap data - 8 rows (1k-8k) x 8 columns (Jan-Aug)
  // Concentric circles pattern with additional hot spots
  const salesAnalyticsData = [
    [1, 1, 1, 1, 1, 1, 1, 1], // 8k row (outermost ring)
    [1, 2, 2, 2, 2, 2, 4, 1], // 7k row (Jul,7k = 4)
    [1, 2, 3, 3, 3, 4, 2, 1], // 6k row (Jun,6k = 4)
    [1, 2, 3, 4, 4, 3, 2, 1], // 5k row (ring 4)
    [1, 2, 3, 4, 4, 3, 2, 1], // 4k row (ring 4)
    [1, 2, 4, 3, 3, 3, 2, 1], // 3k row (Mar,3k = 4)
    [1, 4, 2, 2, 2, 2, 2, 1], // 2k row (Feb,2k = 4)
    [1, 1, 1, 1, 1, 1, 1, 1]  // 1k row (outermost ring)
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const yAxisLabels = ['8k', '7k', '6k', '5k', '4k', '3k', '2k', '1k'];

  // Sales by Countries data
  const salesByCountries = [
    {
      id: 1,
      country: 'United states of america',
      flagImage: '/images/countries/usa.png',
      sales: '$8,656k',
      change: '+25.8%',
      changeType: 'positive',
      rightValue: '894k'
    },
    {
      id: 2,
      country: 'Brazil',
      flagImage: '/images/countries/brazil.png',
      sales: '$2,415k',
      change: '-6.2%',
      changeType: 'negative',
      rightValue: '645k'
    },
    {
      id: 3,
      country: 'India',
      flagImage: '/images/countries/india.png',
      sales: '$865k',
      change: '+12.4%',
      changeType: 'positive',
      rightValue: '148k'
    },
    {
      id: 4,
      country: 'Australia',
      flagImage: '/images/countries/australia.png',
      sales: '$745k',
      change: '-11.9%',
      changeType: 'negative',
      rightValue: '86k'
    },
    {
      id: 5,
      country: 'Belgium',
      flagImage: '/images/countries/belgium.png',
      sales: '$45k',
      change: '+16.2%',
      changeType: 'positive',
      rightValue: '42k'
    },
    {
      id: 6,
      country: 'China',
      flagImage: '/images/countries/china.png',
      sales: '$12k',
      change: '+14.8%',
      changeType: 'positive',
      rightValue: '8k'
    }
  ];

  // Team Members data
  const teamMembers = [
    {
      id: 1,
      name: 'Nathan Wagner',
      role: 'iOS Developer',
      avatar: '/images/avatars/Unsplash-Avatars_0001s_0005_sirio-jxE_5_HqSJY-unsplash.png',
      project: 'ZIPCAR',
      projectColor: '#696CFF',
      tasks: '87/135',
      progress: 65
    },
    {
      id: 2,
      name: 'Emma Bowen',
      role: 'UI/UX Designer', 
      avatar: '/images/avatars/Unsplash-Avatars_0000s_0035_azamat-zhanisov-a5sRFieA3BY-unsplash 1.png',
      project: 'BITBANK',
      projectColor: '#FF4C4C',
      tasks: '340/420',
      progress: 81
    },
    {
      id: 3,
      name: 'Adrian McGuire',
      role: 'React Developer',
      avatar: 'AM',
      project: 'PAYERS',
      projectColor: '#FF9F40',
      tasks: '50/82',
      progress: 61
    },
    {
      id: 4,
      name: 'Alma Gonzalez',
      role: 'Product Manager',
      avatar: '/images/avatars/Unsplash-Avatars_0004s_0028_toa-heftiba-O3ymvT7Wf9U-unsplash.png',
      project: 'BRANDI',
      projectColor: '#4DD3E0',
      tasks: '98/260',
      progress: 38
    },
    {
      id: 5,
      name: 'Travis Collins',
      role: 'VueJs Developer',
      avatar: '/images/avatars/Unsplash-Avatars_0005s_0007_emile-guillemot-vfijBqzoQE0-unsplash.png',
      project: 'AVIATO',
      projectColor: '#8B909A',
      tasks: '12/25',
      progress: 48
    }
  ];

  // Recent customer data
  const recentCustomers = [
    {
      id: 1,
      name: 'Henry Barnes',
      email: 'jok@puc.co.uk',
      avatar: '/images/avatars/Unsplash-Avatars_0005s_0018_alexi-romano-dW2QQZ480Vc-unsplash.png',
      amount: '$459.65',
      status: 'PAID',
      paidBy: 'Mastercard'
    },
    {
      id: 2,
      name: 'Herman Holland',
      email: 'sami@lelo.com',
      avatar: '/images/avatars/Unsplash-Avatars_0004s_0029_azamat-zhanisov-4yhHhpAMC3U-unsplash.png',
      amount: '$93.81',
      status: 'PENDING',
      paidBy: 'Visa'
    },
    {
      id: 3,
      name: 'Hallie Warner',
      email: 'initus@odemi.com',
      avatar: '/images/avatars/Unsplash-Avatars_0005s_0000_stefan-stefancik-aoB1B2kkyIw-unsplash.png',
      amount: '$934.34',
      status: 'PENDING',
      paidBy: 'Visa'
    },
    {
      id: 4,
      name: 'John Davidson',
      email: 'tum@upkesja.gov',
      avatar: '/images/avatars/Unsplash-Avatars_0004s_0007_nathan-dumlao-Ju--S80ezyU-unsplash.png',
      amount: '$794.97',
      status: 'PAID',
      paidBy: 'PayPal'
    },
    {
      id: 5,
      name: 'Cora Schmidt',
      email: 'wipare@tin.com',
      avatar: '/images/avatars/Unsplash-Avatars_0001s_0008_aiony-haust-soK2Bdjzrng-unsplash.png',
      amount: '$19.49',
      status: 'PAID',
      paidBy: 'Mastercard'
    },
    {
      id: 6,
      name: 'Betty Ross',
      email: 'nur@kaomor.edu',
      avatar: '/images/avatars/Unsplash-Avatars_0004s_0015_ali-pazani-_AIaWSaSTVI-unsplash.png',
      amount: '$636.27',
      status: 'FAILED',
      paidBy: 'PayPal'
    }
  ];

  // Sales activities timeline
  const salesActivities = [
    {
      id: 1,
      type: 'call',
      title: 'Call with Jordan Stevenson',
      description: 'Discussed pricing and contract terms',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'email',
      title: 'Email to Benedetto Rossini',
      description: 'Sent proposal for new project',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Meeting with Bertha Beltran',
      description: 'Product demo and Q&A session',
      time: '1 day ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'call',
      title: 'Follow-up call with Alma Gonzalez',
      description: 'Waiting for client response',
      time: '2 days ago',
      status: 'pending'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#71DD37';
      case 'Inactive': return '#8B909A';
      case 'Pending': return '#FF9F40';
      case 'PAID': return '#71DD37';
      case 'PENDING': return '#FF9F40';
      case 'FAILED': return '#FF4C4C';
      default: return '#8B909A';
    }
  };

  const renderPaymentIcon = (paidBy) => {
    switch (paidBy) {
      case 'Mastercard':
        return <img src="/images/payment/mastercard-light.png" alt="Mastercard" className="payment-icon" />;
      case 'Visa':
        return <img src="/images/payment/visa-light.png" alt="Visa" className="payment-icon" />;
      case 'PayPal':
        return <img src="/images/payment/paypal-light.png" alt="PayPal" className="payment-icon" />;
      default:
        return null;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'call': return Phone;
      case 'email': return Mail;
      case 'meeting': return Calendar;
      default: return Calendar;
    }
  };


  return (
    <div className="crm-page">

      {/* Top Cards Row */}
      <div className="top-cards-grid">
        {/* Customer Ratings Card */}
        <Card 
          title="Customer Ratings" 
          action={
            <button className="card-menu-btn">
              <MoreHorizontal size={20} />
            </button>
          }
          className="customer-ratings-card"
        >
          <div className="rating-summary">
            <div className="rating-score-with-stars">
              <div className="rating-score">4.0</div>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={20} 
                    fill={star <= 4 ? '#FFD700' : 'none'} 
                    stroke={star <= 4 ? '#FFD700' : '#E5E7EB'} 
                  />
                ))}
              </div>
            </div>
            <div className="rating-change">
              <span className="change-badge purple">+5.0</span>
              <span className="change-text">Points from last month</span>
            </div>
          </div>
          <CustomerRatingsChart ratingsData={ratingsData} />
        </Card>

        {/* Overview & Sales Activity Card */}
        <Card 
          title="Overview & Sales Activity"
          subtitle="Check out each column for more details"
          action={
            <button className="card-menu-btn">
              <MoreHorizontal size={20} />
            </button>
          }
          className="sales-activity-card"
        >
          <SalesActivityChart salesActivityData={salesActivityData} />
        </Card>

        {/* Right Side Cards Container */}
        <div className="right-cards-container">
          {/* Top Small Cards Row */}
          <div className="top-small-cards">
            {/* Sessions Card */}
            <Card className="sessions-card">
              <h3 className="card-title">Sessions</h3>
              <div className="metric-value">2845</div>
              <div className="mini-chart">
                <SessionsChart sessionsData={sessionsData} />
              </div>
            </Card>

            {/* Order Card */}
            <Card className="order-card">
              <div className="card-header">
                <div className="card-icon">
                  <Package size={24} className="icon-cube" />
                </div>
                <button className="card-menu-btn">
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <h3 className="card-title">Order</h3>
              <div className="metric-value">$1,286</div>
              <div className="metric-change negative">
                <span>↓ 13.24%</span>
              </div>
            </Card>
          </div>

          {/* Generated Leads Card */}
          <Card className="generated-leads-card">
            <div className="leads-content">
              <div className="leads-text">
                <div className="card-header-simple">
                  <div>
                    <h3 className="card-title">Generated Leads</h3>
                    <p className="card-subtitle">Monthly Report</p>
                  </div>
                </div>
                <div className="leads-stats">
                  <div className="leads-number">4,234</div>
                  <div className="leads-change positive">↑ 12.8%</div>
                </div>
              </div>
              <div className="progress-container">
                <GeneratedLeadsChart />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Second Row Cards */}
      <div className="second-row-cards">
        {/* Top Products Card */}
        <Card 
          title=""
          className="top-products-card"
        >
          <div className="products-container">
            {/* Top Products by Sales */}
            <div className="products-section">
              <div className="section-header">
                <h3 className="products-title">
                  Top Products by <span className="title-highlight">Sales</span>
                </h3>
                <button className="card-menu-btn">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <div className="products-list">
                {topProductsBySales.map((product) => (
                  <div key={product.id} className="product-item">
                    <div className="product-info">
                      <div 
                        className="product-icon" 
                        style={{ backgroundColor: product.color + '20' }}
                      >
                        <span style={{ fontSize: '16px' }}>{product.icon}</span>
                      </div>
                      <div className="product-details">
                        <div className="product-name">{product.name}</div>
                        <div className="product-brand">{product.brand}</div>
                      </div>
                    </div>
                    <div className="product-sales">{product.sales}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products by Volume */}
            <div className="products-section">
              <div className="section-header">
                <h3 className="products-title">
                  Top Products by <span className="title-highlight volume">Volume</span>
                </h3>
                <button className="card-menu-btn">
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <div className="products-list">
                {topProductsByVolume.map((product) => (
                  <div key={product.id} className="product-item">
                    <div className="product-info">
                      <div 
                        className="product-icon" 
                        style={{ backgroundColor: product.color + '20' }}
                      >
                        <span style={{ fontSize: '16px' }}>{product.icon}</span>
                      </div>
                      <div className="product-details">
                        <div className="product-name">{product.name}</div>
                        <div className="product-brand">{product.brand}</div>
                      </div>
                    </div>
                    <div className="product-volume">
                      <div className="volume-value">{product.volume}</div>
                      <div className={`volume-change ${product.changeType}`}>
                        {product.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Earning Report Card */}
        <Card 
          title={earningReport.title}
          subtitle={earningReport.subtitle}
          action={
            <button className="card-menu-btn">
              <MoreHorizontal size={20} />
            </button>
          }
          className="earning-report-card"
        >
          <div className="earning-content">
            <div className="earning-metrics">
              {earningReport.metrics.map((metric, index) => (
                <div key={index} className="metric-item">
                  <div className="metric-header">
                    <div 
                      className="metric-icon"
                      style={{ backgroundColor: metric.color + '20' }}
                    >
                      <span style={{ fontSize: '16px' }}>{metric.icon}</span>
                    </div>
                    <div className="metric-info">
                      <div className="metric-label">{metric.label}</div>
                      <div className="metric-subtext">{metric.subtext}</div>
                    </div>
                  </div>
                  <div className="metric-values">
                    <div className="metric-value">{metric.value}</div>
                    <div className={`metric-change ${metric.changeType}`}>
                      ↑ {metric.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mini Chart */}
            <div className="earning-chart">
              <EarningBarChart data={earningReport.chartData} />
            </div>
          </div>
        </Card>
      </div>

      {/* Third Row Cards */}
      <div className="third-row-cards">
        {/* Sales Analytics Card */}
        <Card 
          title="Sales Analytics"
          action={
            <select className="time-select">
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          }
          className="sales-analytics-card"
        >
          <div className="analytics-content">
            <div className="analytics-summary">
              <span className="summary-badge positive">+42.6%</span>
              <span className="summary-text">Than last year</span>
            </div>
            <SalesHeatmap 
              data={salesAnalyticsData} 
              months={months} 
              yAxisLabels={yAxisLabels} 
            />
          </div>
        </Card>

        {/* Sales by Countries Card */}
        <Card 
          title="Sales by Countries"
          subtitle="Monthly Sales Overview"
          action={
            <button className="card-menu-btn">
              <MoreHorizontal size={20} />
            </button>
          }
          className="sales-countries-card"
        >
          <div className="countries-list">
            {salesByCountries.map((country) => (
              <div key={country.id} className="country-item">
                <div className="country-info">
                  <div className="country-flag">
                    <img 
                      src={country.flagImage} 
                      alt={country.country}
                      className="flag-image"
                    />
                  </div>
                  <div className="country-details">
                    <div className="sales-info">
                      <span className="sales-value">{country.sales}</span>
                      <span className={`sales-change ${country.changeType}`}>
                        {country.changeType === 'positive' ? '↗' : '↘'} {country.change}
                      </span>
                    </div>
                    <div className="country-name">{country.country}</div>
                  </div>
                </div>
                <div className="country-right-value">
                  {country.rightValue}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Sales Stats Card */}
        <Card 
          title="Sales Stats"
          action={
            <button className="card-menu-btn">
              <MoreHorizontal size={20} />
            </button>
          }
          className="sales-stats-card"
        >
          <div className="stats-content">
            <SalesDoughnutChart percentage={75} />
          </div>
        </Card>
      </div>

      {/* Fifth Row Cards */}
      <div className="fifth-row-cards">
        {/* Team Members Card */}
        <Card 
          title="Team Members"
          action={
            <button className="card-menu-btn">
              <MoreHorizontal size={20} />
            </button>
          }
          className="team-members-card"
        >
          <div className="team-members-table">
            <div className="table-header">
              <div className="header-cell">NAME</div>
              <div className="header-cell">PROJECT</div>
              <div className="header-cell">TASKS</div>
              <div className="header-cell">PROGRESS</div>
            </div>
            <div className="team-members-list">
              {teamMembers.map((member) => (
                <div key={member.id} className="team-member-item">
                  <div className="member-info">
                    <div className="member-avatar">
                      {member.avatar.startsWith('/') ? (
                        <img src={member.avatar} alt={member.name} />
                      ) : (
                        member.avatar
                      )}
                    </div>
                    <div className="member-details">
                      <div className="member-name">{member.name}</div>
                      <div className="member-role">{member.role}</div>
                    </div>
                  </div>
                  <div className="member-project">
                    <span 
                      className="project-badge" 
                      style={{ backgroundColor: member.projectColor + '20', color: member.projectColor }}
                    >
                      {member.project}
                    </span>
                  </div>
                  <div className="member-tasks">{member.tasks}</div>
                  <div className="member-progress">
                    <div className="progress-container">
                      <svg width="50" height="50" viewBox="0 0 50 50" className="progress-circle">
                        <circle
                          cx="25"
                          cy="25"
                          r="20"
                          fill="none"
                          stroke="#F5F5F9"
                          strokeWidth="4"
                        />
                        <circle
                          cx="25"
                          cy="25"
                          r="20"
                          fill="none"
                          stroke={member.project === 'ZIPCAR' ? '#696CFF' : 
                                 member.project === 'BITBANK' ? '#FF4C4C' :
                                 member.project === 'PAYERS' ? '#FF9F40' :
                                 member.project === 'BRANDI' ? '#4DD3E0' : '#8B909A'}
                          strokeWidth="4"
                          strokeDasharray={`${member.progress * 1.25} ${125 - member.progress * 1.25}`}
                          strokeDashoffset="31.25"
                          transform="rotate(-90 25 25)"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="progress-text">{member.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Customers Card */}
        <Card 
          title="Recent Customers"
          action={
            <button className="card-menu-btn">
              <MoreHorizontal size={20} />
            </button>
          }
          className="customers-table-card"
        >
          <div className="customers-table">
            <div className="table-header">
              <div className="header-cell">CUSTOMER</div>
              <div className="header-cell">AMOUNT</div>
              <div className="header-cell">STATUS</div>
              <div className="header-cell">PAID BY</div>
              <div className="header-cell">ACTIONS</div>
            </div>
            {recentCustomers.map((customer) => (
              <div key={customer.id} className="table-row">
                <div className="customer-info">
                  <div className="customer-avatar">
                    {customer.avatar.startsWith('/') ? (
                      <img src={customer.avatar} alt={customer.name} />
                    ) : (
                      customer.avatar
                    )}
                  </div>
                  <div className="customer-details">
                    <div className="customer-name">{customer.name}</div>
                    <div className="customer-email">{customer.email}</div>
                  </div>
                </div>
                <div className="customer-amount">{customer.amount}</div>
                <div className="customer-status">
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(customer.status) + '20', color: getStatusColor(customer.status) }}
                  >
                    {customer.status}
                  </span>
                </div>
                <div className="customer-payment">
                  {renderPaymentIcon(customer.paidBy)}
                </div>
                <div className="customer-actions">
                  <button className="action-btn">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      

      <FixedButtons />
    </div>
  );
};

export default CRM;