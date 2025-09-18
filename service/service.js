/* Connect to database and start API */

const mongoose = require('mongoose')
const app = require('./app')

// Start API
const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}...`);
})

class AnalyticsService {
  static async getVisitorStats(timeRange = '7d') {
    const startDate = this.getStartDate(timeRange);
    
    // Mock data - replace with actual database queries
    return {
      totalVisitors: 24532,
      pageViews: 87234,
      bounceRate: 42.8,
      sessionDuration: 204, // in seconds
      change: {
        visitors: 12.5,
        pageViews: 8.2,
        bounceRate: -2.1,
        sessionDuration: 15.3
      }
    };
  }

  static async getVisitorTrend(timeRange = '7d') {
    // Mock trend data
    return [
      { date: '2024-01-01', visitors: 1200, pageViews: 3400 },
      { date: '2024-01-02', visitors: 1800, pageViews: 4200 },
      { date: '2024-01-03', visitors: 1600, pageViews: 3800 },
      { date: '2024-01-04', visitors: 2200, pageViews: 5100 },
      { date: '2024-01-05', visitors: 1900, pageViews: 4600 },
      { date: '2024-01-06', visitors: 2400, pageViews: 5800 },
      { date: '2024-01-07', visitors: 2100, pageViews: 5200 }
    ];
  }

  static async getDeviceBreakdown() {
    return [
      { name: 'Desktop', value: 45.2, count: 12543 },
      { name: 'Mobile', value: 38.7, count: 10742 },
      { name: 'Tablet', value: 16.1, count: 4471 }
    ];
  }

  static async getTopPages() {
    return [
      { page: '/dashboard', views: 8234, percentage: 23.5 },
      { page: '/analytics', views: 6421, percentage: 18.3 },
      { page: '/reports', views: 5678, percentage: 16.2 },
      { page: '/settings', views: 4532, percentage: 12.9 },
      { page: '/users', views: 3421, percentage: 9.8 }
    ];
  }

  static async getTrafficSources() {
    return [
      { source: 'Direct', visitors: 8234, percentage: 34.2 },
      { source: 'Google Search', visitors: 6421, percentage: 26.7 },
      { source: 'Social Media', visitors: 4532, percentage: 18.8 },
      { source: 'Email', visitors: 3421, percentage: 14.2 },
      { source: 'Referral', visitors: 1456, percentage: 6.1 }
    ];
  }

  static getStartDate(timeRange) {
    const now = new Date();
    switch (timeRange) {
      case '24h':
        return new Date(now - 24 * 60 * 60 * 1000);
      case '7d':
        return new Date(now - 7 * 24 * 60 * 60 * 1000);
      case '30d':
        return new Date(now - 30 * 24 * 60 * 60 * 1000);
      case '90d':
        return new Date(now - 90 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now - 7 * 24 * 60 * 60 * 1000);
    }
  }
}

module.exports = { AnalyticsService };