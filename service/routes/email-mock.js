const express = require('express');
const router = express.Router();

// Mock email data for testing without MySQL
let mockEmails = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/150',
    subject: 'Product Inquiry',
    message: 'What are the key features of your product?',
    status: 'pending',
    sentAt: null,
    createdAt: new Date('2025-09-17T10:30:00'),
    updatedAt: new Date('2025-09-17T10:30:00')
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://via.placeholder.com/150',
    subject: 'Business Collaboration',
    message: 'I would like to discuss potential business cooperation.',
    status: 'sent',
    sentAt: new Date('2025-09-17T11:45:00'),
    createdAt: new Date('2025-09-17T09:15:00'),
    updatedAt: new Date('2025-09-17T11:45:00')
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    avatar: 'https://via.placeholder.com/150',
    subject: 'Technical Support',
    message: 'I encountered some technical issues during usage.',
    status: 'pending',
    sentAt: null,
    createdAt: new Date('2025-09-17T12:20:00'),
    updatedAt: new Date('2025-09-17T12:20:00')
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    avatar: null,
    subject: 'Order Update',
    message: 'Could you please provide an update on my recent order?',
    status: 'failed',
    sentAt: null,
    createdAt: new Date('2025-09-17T13:10:00'),
    updatedAt: new Date('2025-09-17T13:10:00')
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    avatar: null,
    subject: 'Account Information',
    message: 'I need help updating my account information.',
    status: 'pending',
    sentAt: null,
    createdAt: new Date('2025-09-17T14:30:00'),
    updatedAt: new Date('2025-09-17T14:30:00')
  }
];

let nextId = 6;

// Get all emails with pagination and filtering
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    // Filter by status if provided
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
  } catch (error) {
    console.error('Failed to get email list:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get email list',
      error: 'Internal server error'
    });
  }
});

// Get single email by ID
router.get('/:id', (req, res) => {
  try {
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
  } catch (error) {
    console.error('Failed to get email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get email',
      error: 'Internal server error'
    });
  }
});

// Create new email
router.post('/', (req, res) => {
  try {
    const { name, email, avatar, subject, message } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required'
      });
    }

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
  } catch (error) {
    console.error('Failed to create email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create email',
      error: 'Internal server error'
    });
  }
});

// Update email
router.put('/:id', (req, res) => {
  try {
    const emailIndex = mockEmails.findIndex(e => e.id === parseInt(req.params.id));

    if (emailIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Email not found'
      });
    }

    const { name, email, avatar, subject, message, status } = req.body;

    // Update email
    mockEmails[emailIndex] = {
      ...mockEmails[emailIndex],
      name: name || mockEmails[emailIndex].name,
      email: email || mockEmails[emailIndex].email,
      avatar: avatar !== undefined ? avatar : mockEmails[emailIndex].avatar,
      subject: subject !== undefined ? subject : mockEmails[emailIndex].subject,
      message: message !== undefined ? message : mockEmails[emailIndex].message,
      status: status || mockEmails[emailIndex].status,
      sentAt: status === 'sent' ? new Date() : mockEmails[emailIndex].sentAt,
      updatedAt: new Date()
    };

    res.json({
      success: true,
      message: 'Email updated successfully',
      data: mockEmails[emailIndex]
    });
  } catch (error) {
    console.error('Failed to update email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update email',
      error: 'Internal server error'
    });
  }
});

// Delete email
router.delete('/:id', (req, res) => {
  try {
    const emailIndex = mockEmails.findIndex(e => e.id === parseInt(req.params.id));

    if (emailIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Email not found'
      });
    }

    mockEmails.splice(emailIndex, 1);

    res.json({
      success: true,
      message: 'Email deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete email',
      error: 'Internal server error'
    });
  }
});

// Update email status
router.patch('/:id/status', (req, res) => {
  try {
    const emailIndex = mockEmails.findIndex(e => e.id === parseInt(req.params.id));

    if (emailIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Email not found'
      });
    }

    const { status } = req.body;

    if (!['pending', 'sent', 'failed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email status'
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
  } catch (error) {
    console.error('Failed to update email status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update email status',
      error: 'Internal server error'
    });
  }
});

module.exports = router;