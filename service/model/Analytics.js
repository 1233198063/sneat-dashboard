const mongoose = require('mongoose');

const PageViewSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  page: {
    type: String,
    required: true
  },
  title: String,
  referrer: String,
  userAgent: String,
  ipAddress: String,
  country: String,
  city: String,
  device: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet'],
    required: true
  },
  browser: String,
  os: String,
  screenResolution: String,
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  duration: {
    type: Number,
    default: 0
  },
  exitPage: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const SessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: Date,
  duration: Number,
  pageViews: {
    type: Number,
    default: 0
  },
  bounced: {
    type: Boolean,
    default: false
  },
  country: String,
  city: String,
  device: String,
  browser: String,
  os: String,
  source: String,
  medium: String,
  campaign: String
}, {
  timestamps: true
});

const EventSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  eventType: {
    type: String,
    required: true
  },
  eventCategory: String,
  eventAction: String,
  eventLabel: String,
  eventValue: Number,
  page: String,
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  properties: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Indexes for better performance
PageViewSchema.index({ timestamp: -1, page: 1 });
PageViewSchema.index({ sessionId: 1, timestamp: 1 });
SessionSchema.index({ startTime: -1 });
EventSchema.index({ timestamp: -1, eventType: 1 });

const PageView = mongoose.model('PageView', PageViewSchema);
const Session = mongoose.model('Session', SessionSchema);
const Event = mongoose.model('Event', EventSchema);

module.exports = { PageView, Session, Event };
