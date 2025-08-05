const { AnalyticsService } = require('../service');

const analyticsController = {
  async getStats(req, res) {
    try {
      const { timeRange } = req.query;
      const stats = await AnalyticsService.getVisitorStats(timeRange);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch analytics stats' });
    }
  },

  async getVisitorTrend(req, res) {
    try {
      const { timeRange } = req.query;
      const trend = await AnalyticsService.getVisitorTrend(timeRange);
      res.json(trend);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch visitor trend' });
    }
  },

  async getDeviceBreakdown(req, res) {
    try {
      const breakdown = await AnalyticsService.getDeviceBreakdown();
      res.json(breakdown);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch device breakdown' });
    }
  },

  async getTopPages(req, res) {
    try {
      const pages = await AnalyticsService.getTopPages();
      res.json(pages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch top pages' });
    }
  },

  async getTrafficSources(req, res) {
    try {
      const sources = await AnalyticsService.getTrafficSources();
      res.json(sources);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch traffic sources' });
    }
  }
};

module.exports = analyticsController;