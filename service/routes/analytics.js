const express = require('express');
const router = express.Router();
const analyticsController = require('../controller/analyticsController');
const auth = require('../middleware/auth');

// Apply authentication middleware to all routes
// Temporarily disable auth for testing
// router.use(auth);

router.get('/stats', analyticsController.getStats);
router.get('/visitor-trend', analyticsController.getVisitorTrend);
router.get('/device-breakdown', analyticsController.getDeviceBreakdown);
router.get('/top-pages', analyticsController.getTopPages);
router.get('/traffic-sources', analyticsController.getTrafficSources);

module.exports = router;