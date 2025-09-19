const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Try to use MySQL Email model, fallback to mock data if unavailable
let Email;
let useMockData = false;

try {
  Email = require('../model/Email');
} catch (error) {
  console.log('Email model not available, using mock data');
  useMockData = true;
}

// Mock email data for fallback
let mockEmails = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    avatar: null,
    subject: 'Project Status Update',
    message: 'Hi team, I wanted to provide an update on the current project status. We are making good progress and are on track to meet our upcoming deadline.',
    status: 'pending',
    sentAt: null,
    createdAt: new Date('2025-09-18T09:30:00'),
    updatedAt: new Date('2025-09-18T09:30:00')
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@client.com',
    avatar: null,
    subject: 'Meeting Request - Q4 Planning',
    message: 'Good morning! I would like to schedule a meeting to discuss our Q4 planning and strategy. Please let me know your availability for next week.',
    status: 'sent',
    sentAt: new Date('2025-09-18T10:15:00'),
    createdAt: new Date('2025-09-18T08:45:00'),
    updatedAt: new Date('2025-09-18T10:15:00')
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@vendor.com',
    avatar: null,
    subject: 'Invoice #INV-2025-001',
    message: 'Please find attached the invoice for services rendered this month. Payment is due within 30 days as per our agreement.',
    status: 'pending',
    sentAt: null,
    createdAt: new Date('2025-09-18T11:20:00'),
    updatedAt: new Date('2025-09-18T11:20:00')
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@partner.com',
    avatar: null,
    subject: 'Partnership Proposal',
    message: 'We are interested in exploring a potential partnership opportunity. Our teams could benefit greatly from collaboration.',
    status: 'failed',
    sentAt: null,
    createdAt: new Date('2025-09-18T12:10:00'),
    updatedAt: new Date('2025-09-18T12:10:00')
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@support.com',
    avatar: null,
    subject: 'Technical Support Request',
    message: 'I am experiencing some technical difficulties with the platform. Could someone from the support team please assist me?',
    status: 'pending',
    sentAt: null,
    createdAt: new Date('2025-09-18T13:30:00'),
    updatedAt: new Date('2025-09-18T13:30:00')
  },
  {
    id: 6,
    name: 'Emily Davis',
    email: 'emily.davis@marketing.com',
    avatar: null,
    subject: 'Campaign Performance Report',
    message: 'Here is the performance report for our recent marketing campaign. The results exceeded our expectations with a 25% increase in engagement.',
    status: 'sent',
    sentAt: new Date('2025-09-18T14:20:00'),
    createdAt: new Date('2025-09-18T13:50:00'),
    updatedAt: new Date('2025-09-18T14:20:00')
  }
];

let nextId = 7;

// Email validation rules
const emailValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Email subject cannot exceed 255 characters'),
  body('message')
    .optional()
    .trim(),
  body('avatar')
    .optional()
];

// Get all emails
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    if (useMockData || !Email) {
      // Use mock data
      let filteredEmails = mockEmails;
      if (status) {
        filteredEmails = mockEmails.filter(email => email.status === status);
      }

      // Sort by creation date (newest first)
      filteredEmails.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Apply pagination
      const paginatedEmails = filteredEmails.slice(offset, offset + parseInt(limit));

      res.json({
        success: true,
        data: paginatedEmails,
        pagination: {
          total: filteredEmails.length,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(filteredEmails.length / limit)
        }
      });
    } else {
      // Use MySQL database
      const where = {};
      if (status) {
        where.status = status;
      }

      const emails = await Email.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [['createdAt', 'DESC']]
      });

      res.json({
        success: true,
        data: emails.rows,
        pagination: {
          total: emails.count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(emails.count / limit)
        }
      });
    }
  } catch (error) {
    console.error('Failed to get email list:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get email list',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get single email by ID
router.get('/:id', async (req, res) => {
  try {
    if (useMockData || !Email) {
      // Use mock data
      const email = mockEmails.find(e => e.id === parseInt(req.params.id));

      if (!email) {
        return res.status(404).json({
          success: false,
          message: 'Email not found'
        });
      }

      res.json({
        success: true,
        data: email
      });
    } else {
      // Use MySQL database
      const email = await Email.findByPk(req.params.id);

      if (!email) {
        return res.status(404).json({
          success: false,
          message: 'Email not found'
        });
      }

      res.json({
        success: true,
        data: email
      });
    }
  } catch (error) {
    console.error('Failed to get email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get email',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Create new email
router.post('/', emailValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Input data validation failed',
        errors: errors.array()
      });
    }

    const { name, email, avatar, subject, message } = req.body;

    if (useMockData || !Email) {
      // Use mock data
      // Check if email already exists
      const existingEmail = mockEmails.find(e => e.email === email);
      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: 'This email address already exists'
        });
      }

      // Create new email
      const newEmail = {
        id: nextId++,
        name,
        email,
        avatar: avatar || null,
        subject: subject || null,
        message: message || null,
        status: 'pending',
        sentAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      mockEmails.push(newEmail);

      res.status(201).json({
        success: true,
        message: 'Email saved successfully',
        data: newEmail
      });
    } else {
      // Use MySQL database
      // Check if email already exists
      const existingEmail = await Email.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: 'This email address already exists'
        });
      }

      // Create new email record
      const newEmail = await Email.create({
        name,
        email,
        avatar,
        subject,
        message,
        status: 'pending'
      });

      res.status(201).json({
        success: true,
        message: 'Email saved successfully',
        data: newEmail
      });
    }
  } catch (error) {
    console.error('Failed to create email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create email',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update email status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'sent', 'failed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email status'
      });
    }

    if (useMockData || !Email) {
      // Use mock data
      const emailIndex = mockEmails.findIndex(e => e.id === parseInt(req.params.id));

      if (emailIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Email not found'
        });
      }

      mockEmails[emailIndex].status = status;
      mockEmails[emailIndex].sentAt = status === 'sent' ? new Date() : mockEmails[emailIndex].sentAt;
      mockEmails[emailIndex].updatedAt = new Date();

      res.json({
        success: true,
        message: 'Email status updated successfully',
        data: mockEmails[emailIndex]
      });
    } else {
      // Use MySQL database
      const email = await Email.findByPk(req.params.id);
      if (!email) {
        return res.status(404).json({
          success: false,
          message: 'Email not found'
        });
      }

      await email.update({
        status,
        sentAt: status === 'sent' ? new Date() : email.sentAt
      });

      res.json({
        success: true,
        message: 'Email status updated successfully',
        data: email
      });
    }
  } catch (error) {
    console.error('Failed to update email status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update email status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;