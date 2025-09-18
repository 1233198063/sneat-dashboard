const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/mysql');

const Email = sequelize.define('Email', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 100]
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  avatar: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Avatar URL or base64 encoded image data'
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Email subject'
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Email content'
  },
  status: {
    type: DataTypes.ENUM('pending', 'sent', 'failed'),
    defaultValue: 'pending',
    comment: 'Email status'
  },
  sentAt: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Sent timestamp'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'emails',
  timestamps: true,
  indexes: [
    {
      fields: ['email']
    },
    {
      fields: ['status']
    },
    {
      fields: ['createdAt']
    }
  ]
});

module.exports = Email;