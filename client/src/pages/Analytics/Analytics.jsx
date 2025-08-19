import React, { useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { Users, Eye, TrendingUp, Clock, MoreHorizontal } from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard/StatsCard';
import Card from '../../components/ui/Card/Card';
import FixedButtons from '../../components/ui/FixedButtons/FixedButtons';
import './Analytics.less';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Analytics-focused stats data
  const analyticsStats = [
    { title: 'Page Views', value: 87234, change: '+12.5%', changeType: 'positive', icon: Eye, iconType: 'primary' },
    { title: 'Unique Visitors', value: 24532, change: '+8.2%', changeType: 'positive', icon: Users, iconType: 'success' },
    { title: 'Bounce Rate', value: '42.8%', change: '-2.1%', changeType: 'positive', icon: TrendingUp, iconType: 'warning' },
    { title: 'Avg. Session', value: '3m 24s', change: '+15.3%', changeType: 'positive', icon: Clock, iconType: 'info' },
  ];

  // Visitor trend data
  const visitorTrendData = [
    { date: 'Mon', visitors: 1200, pageViews: 3400 },
    { date: 'Tue', visitors: 1800, pageViews: 4200 },
    { date: 'Wed', visitors: 1600, pageViews: 3800 },
    { date: 'Thu', visitors: 2200, pageViews: 5100 },
    { date: 'Fri', visitors: 1900, pageViews: 4600 },
    { date: 'Sat', visitors: 2400, pageViews: 5800 },
    { date: 'Sun', visitors: 2100, pageViews: 5200 },
  ];

  // Device breakdown
  const deviceData = [
    { name: 'Desktop', value: 45.2, count: 12543 },
    { name: 'Mobile', value: 38.7, count: 10742 },
    { name: 'Tablet', value: 16.1, count: 4471 },
  ];

  // Top pages
  const topPages = [
    { page: '/dashboard', views: 8234, percentage: 23.5 },
    { page: '/analytics', views: 6421, percentage: 18.3 },
    { page: '/reports', views: 5678, percentage: 16.2 },
    { page: '/settings', views: 4532, percentage: 12.9 },
    { page: '/users', views: 3421, percentage: 9.8 },
  ];

  // Traffic sources
  const trafficSources = [
    { source: 'Direct', visitors: 8234, percentage: 34.2 },
    { source: 'Google Search', visitors: 6421, percentage: 26.7 },
    { source: 'Social Media', visitors: 4532, percentage: 18.8 },
    { source: 'Email', visitors: 3421, percentage: 14.2 },
    { source: 'Referral', visitors: 1456, percentage: 6.1 },
  ];

  const COLORS = ['#696CFF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="analytics">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title">Analytics Dashboard</h1>
            <p className="page-subtitle">Track your website performance and user engagement metrics</p>
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

      {/* Analytics Stats Cards */}
      <div className="stats-grid">
        {analyticsStats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Visitor Trend Chart */}
        <Card
          title="Visitor Trend"
          subtitle="Daily visitors and page views"
          action={
            <button className="card-menu-btn" type="button" aria-label="More">
              <MoreHorizontal size={20} />
            </button>
          }
          className="chart-card large"
        >
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={visitorTrendData}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#696CFF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#696CFF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stackId="1"
                stroke="#696CFF"
                fill="url(#colorVisitors)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="pageViews"
                stackId="2"
                stroke="#10B981"
                fill="url(#colorPageViews)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Device Breakdown */}
        <Card
          title="Device Breakdown"
          subtitle="Visitors by device type"
          action={
            <button className="card-menu-btn" type="button" aria-label="More">
              <MoreHorizontal size={20} />
            </button>
          }
          className="chart-card"
        >
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {deviceData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>

          <div className="device-legend">
            {deviceData.map((item, index) => (
              <div key={item.name} className="legend-item">
                <div
                  className="legend-dot"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <div className="legend-info">
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-value">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Middle Section */}
      <div className="middle-section">
        {/* Top Pages */}
        <Card
          title="Top Pages"
          subtitle="Most visited pages"
          action={
            <button className="view-all-btn" type="button">View All</button>
          }
          className="table-card"
        >
          <div className="pages-list">
            {topPages.map((page) => (
              <div key={page.page} className="page-item">
                <div className="page-info">
                  <div className="page-url">{page.page}</div>
                  <div className="page-percentage">{page.percentage}% of total views</div>
                </div>
                <div className="page-views">{page.views.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Traffic Sources */}
        <Card
          title="Traffic Sources"
          subtitle="Where your visitors come from"
          action={
            <button className="view-all-btn" type="button">View All</button>
          }
          className="table-card"
        >
          <div className="sources-list">
            {trafficSources.map((src, index) => (
              <div key={src.source} className="source-item">
                <div className="source-info">
                  <div className="source-name">{src.source}</div>
                  <div className="source-percentage">{src.percentage}%</div>
                </div>
                <div className="source-visitors">{src.visitors.toLocaleString()}</div>
                <div className="source-bar">
                  <div
                    className="source-bar-fill"
                    style={{
                      width: `${src.percentage}%`,
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        {/* Activity Timeline */}
        <Card title="Activity Timeline" className="activity-card">
          <div>Activity Timeline content here</div>
        </Card>

        {/* Browser Analytics */}
        <Card title="Browser Analytics" className="browser-analytics-card">
          <div>Browser Analytics content here</div>
        </Card>
      </div>
      
      <FixedButtons />
    </div>
  );
};

export default Analytics;
