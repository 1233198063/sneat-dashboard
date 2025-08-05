import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const analyticsAPI = {
  getStats: (timeRange = '7d') => api.get(`/analytics/stats?timeRange=${timeRange}`),
  getVisitorTrend: (timeRange = '7d') => api.get(`/analytics/visitor-trend?timeRange=${timeRange}`),
  getDeviceBreakdown: () => api.get('/analytics/device-breakdown'),
  getTopPages: () => api.get('/analytics/top-pages'),
  getTrafficSources: () => api.get('/analytics/traffic-sources'),
};

export default api;