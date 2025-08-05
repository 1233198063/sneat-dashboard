const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { PageView, Session, Event } = require('../model/Analytics');

// Temporarily disable auth for testing
// router.use(auth);

// Real-time dashboard data
router.get('/realtime', async (req, res) => {
  try {
    const now = new Date();
    const fiveMinutesAgo = new Date(now - 5 * 60 * 1000);
    
    const activeUsers = await Session.countDocuments({
      startTime: { $gte: fiveMinutesAgo },
      endTime: { $exists: false }
    });
    
    const recentPageViews = await PageView.countDocuments({
      timestamp: { $gte: fiveMinutesAgo }
    });

    res.json({
      activeUsers,
      recentPageViews,
      timestamp: now
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch real-time data' });
  }
});

// Geographic data
router.get('/geography', async (req, res) => {
  try {
    const { timeRange = '7d' } = req.query;
    const startDate = getStartDate(timeRange);
    
    const geoData = await Session.aggregate([
      { $match: { startTime: { $gte: startDate } } },
      {
        $group: {
          _id: '$country',
          sessions: { $sum: 1 },
          users: { $addToSet: '$userId' }
        }
      },
      {
        $project: {
          country: '$_id',
          sessions: 1,
          users: { $size: '$users' }
        }
      },
      { $sort: { sessions: -1 } },
      { $limit: 10 }
    ]);

    res.json(geoData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch geographic data' });
  }
});

function getStartDate(timeRange) {
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

module.exports = router;