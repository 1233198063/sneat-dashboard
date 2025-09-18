-- Create database
CREATE DATABASE IF NOT EXISTS sneat_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE sneat_db;

-- Create emails table
CREATE TABLE IF NOT EXISTS emails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL COMMENT 'User name',
    email VARCHAR(255) NOT NULL UNIQUE COMMENT 'Email address',
    avatar TEXT COMMENT 'Avatar URL or base64 encoded image data',
    subject VARCHAR(255) COMMENT 'Email subject',
    message TEXT COMMENT 'Email content',
    status ENUM('pending', 'sent', 'failed') DEFAULT 'pending' COMMENT 'Email status',
    sentAt DATETIME COMMENT 'Sent timestamp',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Created timestamp',
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated timestamp',

    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (createdAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Emails table';

-- Insert sample data
INSERT INTO emails (name, email, avatar, subject, message, status) VALUES
('John Doe', 'john.doe@example.com', 'https://via.placeholder.com/150', 'Product Inquiry', 'What are the key features of your product?', 'pending'),
('Jane Smith', 'jane.smith@example.com', 'https://via.placeholder.com/150', 'Business Collaboration', 'I would like to discuss potential business cooperation.', 'sent'),
('Mike Johnson', 'mike.johnson@example.com', 'https://via.placeholder.com/150', 'Technical Support', 'I encountered some technical issues during usage.', 'pending');