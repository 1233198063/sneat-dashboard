# MySQL Email Database Configuration Guide

## Database Setup

### 1. Install MySQL
Ensure MySQL database server is installed on your system.

### 2. Create Database
Run the following SQL command to create database and tables:

```bash
mysql -u root -p < database/init.sql
```

Or execute manually:
```sql
CREATE DATABASE IF NOT EXISTS sneat_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Configure Environment Variables
Configure your MySQL connection information in the `.env` file:

```env
# MySQL Database Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=sneat_db
MYSQL_USERNAME=root
MYSQL_PASSWORD=your_password
```

## API Documentation

### Email Management API

Base path: `/api/emails`

#### 1. Get Email List
```
GET /api/emails
```

Query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `status`: Email status filter (pending/sent/failed)

Response example:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5
  }
}
```

#### 2. Get Single Email
```
GET /api/emails/:id
```

#### 3. Create Email
```
POST /api/emails
```

Request body:
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "avatar": "Avatar URL or base64",
  "subject": "Email Subject",
  "message": "Email Content"
}
```

#### 4. Update Email
```
PUT /api/emails/:id
```

#### 5. Delete Email
```
DELETE /api/emails/:id
```

#### 6. Batch Delete Emails
```
DELETE /api/emails
```

Request body:
```json
{
  "ids": [1, 2, 3]
}
```

#### 7. Update Email Status
```
PATCH /api/emails/:id/status
```

Request body:
```json
{
  "status": "sent"
}
```

## Database Schema

### emails table

| Field | Type | Description |
|-------|------|-------------|
| id | INT | Primary key, auto increment |
| name | VARCHAR(100) | User name |
| email | VARCHAR(255) | Email address, unique |
| avatar | TEXT | Avatar URL or base64 data |
| subject | VARCHAR(255) | Email subject |
| message | TEXT | Email content |
| status | ENUM | Email status: pending/sent/failed |
| sentAt | DATETIME | Sent timestamp |
| createdAt | DATETIME | Created timestamp |
| updatedAt | DATETIME | Updated timestamp |

## Usage Examples

### Frontend API Call Examples

```javascript
import { emailAPI } from '../services/api';

// Create email
const createEmail = async (emailData) => {
  try {
    const response = await emailAPI.createEmail({
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://example.com/avatar.jpg',
      subject: 'Product Inquiry',
      message: 'What are the key features of your product?'
    });
    console.log('Email created successfully:', response.data);
  } catch (error) {
    console.error('Failed to create email:', error);
  }
};

// Get email list
const getEmails = async () => {
  try {
    const response = await emailAPI.getEmails({
      page: 1,
      limit: 10,
      status: 'pending'
    });
    console.log('Email list:', response.data);
  } catch (error) {
    console.error('Failed to get email list:', error);
  }
};
```

## Starting the Service

1. Ensure MySQL service is running
2. Configure environment variables
3. Start backend service:
```bash
cd service
npm start
```

The service will automatically connect to MySQL database and synchronize table structures.