const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Email = require('../model/Email');

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
  } catch (error) {
    console.error('Failed to create email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create email',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update email
router.put('/:id', emailValidation, async (req, res) => {
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

    const { name, email, avatar, subject, message, status } = req.body;

    const emailRecord = await Email.findByPk(req.params.id);
    if (!emailRecord) {
      return res.status(404).json({
        success: false,
        message: 'Email not found'
      });
    }

    // If email address has changed, check if new email already exists
    if (email !== emailRecord.email) {
      const existingEmail = await Email.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: 'This email address already exists'
        });
      }
    }

    await emailRecord.update({
      name,
      email,
      avatar,
      subject,
      message,
      status,
      sentAt: status === 'sent' ? new Date() : emailRecord.sentAt
    });

    res.json({
      success: true,
      message: 'Email updated successfully',
      data: emailRecord
    });
  } catch (error) {
    console.error('Failed to update email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update email',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Delete email
router.delete('/:id', async (req, res) => {
  try {
    const email = await Email.findByPk(req.params.id);
    if (!email) {
      return res.status(404).json({
        success: false,
        message: 'Email not found'
      });
    }

    await email.destroy();

    res.json({
      success: true,
      message: 'Email deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete email',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Batch delete emails
router.delete('/', async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a list of email IDs to delete'
      });
    }

    const deletedCount = await Email.destroy({
      where: {
        id: ids
      }
    });

    res.json({
      success: true,
      message: `Successfully deleted ${deletedCount} email records`
    });
  } catch (error) {
    console.error('Failed to batch delete emails:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to batch delete emails',
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