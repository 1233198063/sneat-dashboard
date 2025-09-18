/* Create web service, client-related content, routes, middleware */

const express = require('express')
const bodyParser = require('body-parser')
const { expressjwt } = require('express-jwt')
const cors = require('cors')
const router = require('./routes/UserRouter')
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/database');
const { connectMySQL } = require('./config/mysql');
// const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const dashboardRoutes = require('./routes/dashboard');
// Use mock email routes if MySQL is not available
const emailRoutes = require('./routes/email-mock');

const app = express()

// Connect to MongoDB
connectDB();

// Try to connect to MySQL (optional for now)
connectMySQL().catch(err => {
  console.log('MySQL not available, continuing without database...');
});

app.use(bodyParser.json())

app.use(cors())

// Security middleware
app.use(helmet());
app.use(compression());

// secret: encryption string must be consistent with token generation
// algorithms: encryption algorithm
// unless: paths that don't require authentication /api/
// Temporarily disable JWT for testing
// app.use(expressjwt({ secret: 'token_userdb', algorithms: ['HS256'] }).unless({path:[/^\/api\//]}))

// Temporarily disable user router to avoid auth issues
// app.use(router)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined'));

// Static files
app.use('/static', express.static('static'));

// Routes
// app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/emails', emailRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Analytics Dashboard API', 
    status: 'running',
    endpoints: [
      'GET /health - Health check',
      'GET /api/analytics/stats - Analytics stats',
      'GET /api/dashboard/realtime - Real-time dashboard data'
    ]
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Remove duplicate listen - it's handled in service.js
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


module.exports = app