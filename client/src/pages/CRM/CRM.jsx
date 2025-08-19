import React, { useState } from 'react';
import { 
  Users, UserCheck, TrendingUp, DollarSign, 
  Phone, Mail, Calendar, MoreHorizontal,
  Star, MapPin, Clock, Target
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, PieChart, Pie, Cell,
  BarChart, Bar, FunnelChart, Funnel, LabelList
} from 'recharts';
import StatsCard from '../../components/dashboard/StatsCard/StatsCard';
import Card from '../../components/ui/Card/Card';
import FixedButtons from '../../components/ui/FixedButtons/FixedButtons';
import './CRM.less';

const CRM = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // CRM statistics data
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

  // Recent customer data
  const recentCustomers = [
    {
      id: 1,
      name: 'Jordan Stevenson',
      email: 'jordan@gmail.com',
      avatar: 'JS',
      company: 'Tech Corp',
      status: 'Active',
      value: '$18,500',
      location: 'New York',
      lastContact: '2 hours ago'
    },
    {
      id: 2,
      name: 'Benedetto Rossini',
      email: 'benedetto@gmail.com',
      avatar: 'BR',
      company: 'Design Studio',
      status: 'Inactive',
      value: '$12,200',
      location: 'California',
      lastContact: '1 day ago'
    },
    {
      id: 3,
      name: 'Bertha Beltran',
      email: 'bertha@gmail.com',
      avatar: 'BB',
      company: 'Marketing Inc',
      status: 'Active',
      value: '$24,800',
      location: 'Texas',
      lastContact: '3 hours ago'
    },
    {
      id: 4,
      name: 'Alma Gonzalez',
      email: 'alma@gmail.com',
      avatar: 'AG',
      company: 'Finance Ltd',
      status: 'Pending',
      value: '$8,750',
      location: 'Florida',
      lastContact: '5 days ago'
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
      default: return '#8B909A';
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
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <div>
            <h1 className="page-title">CRM Dashboard</h1>
            <p className="page-subtitle">Track your customer relationships and sales performance</p>
          </div>
          <div className="page-actions">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="time-select"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {crmStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="crm-content-grid">
        {/* Revenue Growth Chart */}
        <Card 
          title="Revenue Growth" 
          subtitle="Monthly revenue and customer acquisition"
          action={
            <button className="card-menu-btn">
              <MoreHorizontal size={20} />
            </button>
          }
          className="revenue-chart-card"
        >
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#696CFF" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#696CFF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                formatter={(value, name) => [`$${value.toLocaleString()}`, name === 'revenue' ? 'Revenue' : 'Customers']}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#696CFF" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Sales Funnel */}
        <Card 
          title="Sales Funnel" 
          subtitle="Conversion pipeline overview"
          action={
            <button className="card-menu-btn">
              <MoreHorizontal size={20} />
            </button>
          }
          className="funnel-card"
        >
          <div className="funnel-container">
            {salesFunnelData.map((stage, index) => (
              <div key={index} className="funnel-stage" style={{ backgroundColor: stage.fill + '20' }}>
                <div className="funnel-bar" style={{ backgroundColor: stage.fill, width: `${(stage.value / 1000) * 100}%` }}>
                </div>
                <div className="funnel-info">
                  <span className="funnel-label">{stage.name}</span>
                  <span className="funnel-value">{stage.value}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Customer Distribution */}
        <Card 
          title="Customer Distribution"
          subtitle="Customer segments breakdown"
          action={
            <button className="card-menu-btn">
              <MoreHorizontal size={20} />
            </button>
          }
          className="distribution-card"
        >
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={customerDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {customerDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="distribution-legend">
            {customerDistribution.map((item, index) => (
              <div key={index} className="legend-item">
                <div className="legend-dot" style={{ backgroundColor: item.color }}></div>
                <div className="legend-info">
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-count">{item.count.toLocaleString()}</span>
                </div>
                <span className="legend-percentage">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="crm-bottom-section">
        {/* Recent Customers */}
        <Card 
          title="Recent Customers"
          subtitle="Latest customer interactions"
          action={
            <button className="view-all-btn">
              View All
            </button>
          }
          className="customers-table-card"
        >
          <div className="customers-table">
            <div className="table-header">
              <div className="header-cell">Customer</div>
              <div className="header-cell">Company</div>
              <div className="header-cell">Status</div>
              <div className="header-cell">Value</div>
              <div className="header-cell">Actions</div>
            </div>
            {recentCustomers.map((customer) => (
              <div key={customer.id} className="table-row">
                <div className="customer-info">
                  <div className="customer-avatar">{customer.avatar}</div>
                  <div className="customer-details">
                    <div className="customer-name">{customer.name}</div>
                    <div className="customer-email">{customer.email}</div>
                  </div>
                </div>
                <div className="customer-company">
                  <div className="company-name">{customer.company}</div>
                  <div className="company-location">
                    <MapPin size={12} />
                    {customer.location}
                  </div>
                </div>
                <div className="customer-status">
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(customer.status) + '20', color: getStatusColor(customer.status) }}
                  >
                    {customer.status}
                  </span>
                </div>
                <div className="customer-value">{customer.value}</div>
                <div className="customer-actions">
                  <button className="action-btn">
                    <Phone size={16} />
                  </button>
                  <button className="action-btn">
                    <Mail size={16} />
                  </button>
                  <button className="action-btn">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Sales Activities Timeline */}
        <Card 
          title="Sales Activities"
          subtitle="Recent interactions and follow-ups"
          action={
            <button className="view-all-btn">
              View All
            </button>
          }
          className="activities-card"
        >
          <div className="activities-timeline">
            {salesActivities.map((activity) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="timeline-item">
                  <div className="timeline-marker">
                    <IconComponent size={16} />
                  </div>
                  <div className="timeline-content">
                    <div className="activity-header">
                      <h4 className="activity-title">{activity.title}</h4>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                    <p className="activity-description">{activity.description}</p>
                    <div className={`activity-status ${activity.status}`}>
                      {activity.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
      
      <FixedButtons />
    </div>
  );
};

export default CRM;