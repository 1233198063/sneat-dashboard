import { useState, useEffect } from 'react';
import { analyticsAPI } from '../services/api';

export const useAnalytics = (timeRange = '7d') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [stats, trend, devices, pages, sources] = await Promise.all([
          analyticsAPI.getStats(timeRange),
          analyticsAPI.getVisitorTrend(timeRange),
          analyticsAPI.getDeviceBreakdown(),
          analyticsAPI.getTopPages(),
          analyticsAPI.getTrafficSources(),
        ]);

        setData({
          stats: stats.data,
          visitorTrend: trend.data,
          deviceBreakdown: devices.data,
          topPages: pages.data,
          trafficSources: sources.data,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  return { data, loading, error };
};