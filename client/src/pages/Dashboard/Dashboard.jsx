import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Users, Eye, TrendingUp, ShoppingCart, Clock, DollarSign, Activity, MoreHorizontal, Filter } from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard/StatsCard';
import Card from '../../components/ui/Card/Card';
import './Dashboard.less';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Stats data for cards
  const statsData = [
    { title: 'Total Revenue', value: 42562, change: '+42%', changeType: 'positive', icon: DollarSign, iconType: 'primary' },
    { title: 'Sessions', value: 97412, change: '+18%', changeType: 'positive', icon: Users, iconType: 'success' },
    { title: 'Orders', value: 13648, change: '+38%', changeType: 'positive', icon: ShoppingCart, iconType: 'warning' },
    { title: 'Customers', value: 745, change: '+8%', changeType: 'positive', icon: TrendingUp, iconType: 'error' }
  ];

  const chartData = [
    { name: 'Jan', revenue: 12000, orders: 240 },
    { name: 'Feb', revenue: 15000, orders: 300 },
    { name: 'Mar', revenue: 18000, orders: 360 },
    { name: 'Apr', revenue: 16500, orders: 330 },
    { name: 'May', revenue: 22000, orders: 440 },
    { name: 'Jun', revenue: 25000, orders: 500 }
  ];

  const salesData = [
    { name: 'Desktop', value: 58.6, sales: 45820 },
    { name: 'Mobile', value: 34.9, sales: 27315 },
    { name: 'Tablet', value: 6.5, sales: 5095 }
  ];

  const recentTransactions = [
    { id: '#5089', customer: 'John Doe', product: 'Premium Plan', amount: '$89.00', status: 'Completed' },
    { id: '#5088', customer: 'Jane Smith', product: 'Basic Plan', amount: '$29.00', status: 'Pending' },
    { id: '#5087', customer: 'Mike Johnson', product: 'Pro Plan', amount: '$59.00', status: 'Completed' },
    { id: '#5086', customer: 'Sarah Wilson', product: 'Premium Plan', amount: '$89.00', status: 'Failed' }
  ];

  const topProducts = [
    { name: 'iPhone 14 Pro', sales: 1247, revenue: '$124,700' },
    { name: 'MacBook Air M2', sales: 856, revenue: '$85,600' },
    { name: 'iPad Pro', sales: 645, revenue: '$64,500' },
    { name: 'AirPods Pro', sales: 432, revenue: '$43,200' }
  ];

  const COLORS = ['#696CFF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#10b981';
      case 'Pending': return '#f59e0b';
      case 'Failed': return '#ef4444';
      default: return '#6b7280';
    }
  };


  return (
    <div className="dashboard">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Welcome back, John! Here's what's happening with your store today.</p>
          </div>
          <div className="page-actions">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="time-select"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Revenue Chart */}
        <Card 
          title="Revenue Analytics" 
          subtitle="Commercial networks & enterprises"
          action={
            <button className="card-menu-btn">
              <MoreHorizontal size={20} />
            </button>
          }
          className="chart-card"
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#696CFF" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#696CFF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#696CFF" 
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Sales by Device */}
        <Card 
          title="Sales by Device"
          subtitle="Device-wise sales distribution"
          action={
            <button className="card-menu-btn">
              <MoreHorizontal size={20} />
            </button>
          }
          className="chart-card"
        >
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={salesData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {salesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="device-legend">
            {salesData.map((item, index) => (
              <div key={index} className="legend-item">
                <div className="legend-dot" style={{ backgroundColor: COLORS[index] }}></div>
                <div className="legend-info">
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-value">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        {/* Recent Transactions */}
        <Card 
          title="Recent Transactions"
          subtitle="Last transactions performed"
          action={
            <button className="view-all-btn">
              View All
            </button>
          }
          className="table-card"
        >
          <div className="transactions-list">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-id">{transaction.id}</div>
                  <div className="transaction-customer">{transaction.customer}</div>
                  <div className="transaction-product">{transaction.product}</div>
                </div>
                <div className="transaction-amount">{transaction.amount}</div>
                <div 
                  className="transaction-status"
                  style={{ color: getStatusColor(transaction.status) }}
                >
                  {transaction.status}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Products */}
        <Card 
          title="Top Selling Products"
          subtitle="Best performing products"
          action={
            <button className="view-all-btn">
              View All
            </button>
          }
          className="table-card"
        >
          <div className="products-list">
            {topProducts.map((product, index) => (
              <div key={index} className="product-item">
                <div className="product-rank">#{index + 1}</div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-sales">{product.sales} sales</div>
                </div>
                <div className="product-revenue">{product.revenue}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;