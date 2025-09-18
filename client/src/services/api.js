import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

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

export const emailAPI = {
  // Get all emails
  getEmails: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/emails?${queryString}`);
  },

  // Get single email by ID
  getEmailById: (id) => api.get(`/emails/${id}`),

  // Create new email
  createEmail: (emailData) => api.post('/emails', emailData),

  // Update email
  updateEmail: (id, emailData) => api.put(`/emails/${id}`, emailData),

  // Delete email
  deleteEmail: (id) => api.delete(`/emails/${id}`),

  // Batch delete emails
  deleteEmails: (ids) => api.delete('/emails', { data: { ids } }),

  // Update email status
  updateEmailStatus: (id, status) => api.patch(`/emails/${id}/status`, { status })
};

export default api;