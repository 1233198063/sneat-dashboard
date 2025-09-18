# Email Page MySQL Integration Setup Guide

## Completed Features

✅ **Backend Implementation**
- MySQL database configuration with Sequelize ORM
- Email data model with fields: name, email, avatar, subject, message, status, timestamps
- Complete REST API endpoints for email management
- Data validation and error handling
- English comments and messages throughout

✅ **Frontend Implementation**
- Email page connected to MySQL API
- Dynamic email loading from database
- Loading states, error handling, and pagination
- Auto-generated avatars for users without profile pictures
- Folder filtering by email status (inbox, sent, spam)
- Responsive design with proper styling

## Database Schema

The `emails` table contains:
- `id` - Primary key (auto increment)
- `name` - User name (VARCHAR 100)
- `email` - Email address (VARCHAR 255, unique)
- `avatar` - Avatar URL or base64 data (TEXT)
- `subject` - Email subject (VARCHAR 255)
- `message` - Email content (TEXT)
- `status` - Email status: 'pending', 'sent', 'failed' (ENUM)
- `sentAt` - Sent timestamp (DATETIME)
- `createdAt` - Created timestamp (DATETIME)
- `updatedAt` - Updated timestamp (DATETIME)

## Setup Instructions

### 1. Install MySQL
Install MySQL server on your system:
- **Windows**: Download from https://dev.mysql.com/downloads/mysql/
- **macOS**: `brew install mysql`
- **Linux**: `sudo apt install mysql-server`

### 2. Configure Database
1. Start MySQL service
2. Create database and user:
```sql
CREATE DATABASE sneat_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'sneat_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON sneat_db.* TO 'sneat_user'@'localhost';
FLUSH PRIVILEGES;
```

3. Run initialization script:
```bash
cd service
mysql -u root -p < database/init.sql
```

### 3. Update Environment Variables
Edit `service/.env` file:
```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=sneat_db
MYSQL_USERNAME=sneat_user
MYSQL_PASSWORD=your_password
```

### 4. Start Services

**Backend:**
```bash
cd service
npm start
```

**Frontend:**
```bash
cd client
npm start
```

## API Endpoints

All endpoints use base URL: `http://localhost:8080/api/emails`

- `GET /` - Get paginated email list
- `GET /:id` - Get single email by ID
- `POST /` - Create new email
- `PUT /:id` - Update email
- `DELETE /:id` - Delete email
- `DELETE /` - Batch delete emails
- `PATCH /:id/status` - Update email status

## Frontend Features

### Email List Display
- Shows emails from MySQL database
- Real-time loading with spinner
- Error handling with retry option
- Pagination for large datasets

### Email Status Mapping
- **Inbox** → Shows 'pending' emails
- **Sent** → Shows 'sent' emails
- **Spam** → Shows 'failed' emails
- **Draft, Starred, Trash** → Shows all emails

### Avatar System
- Uses avatar URL from database if available
- Auto-generates colorful letter avatars for users without images
- Fallback handling for broken image URLs

### Responsive Design
- Mobile-friendly layout
- Adaptive email list display
- Touch-friendly pagination controls

## Testing

1. **Verify Backend**: `curl http://localhost:8080/api/emails`
2. **Add Test Data**: Use the sample data in `database/init.sql`
3. **Check Frontend**: Navigate to email page in browser
4. **Test CRUD Operations**: Create, read, update, delete emails

## Troubleshooting

**MySQL Connection Issues:**
- Ensure MySQL service is running
- Check credentials in `.env` file
- Verify database exists and user has permissions

**Frontend API Errors:**
- Check if backend service is running on port 8080
- Verify CORS settings allow frontend domain
- Check browser console for detailed error messages

**No Emails Showing:**
- Verify sample data was inserted
- Check MySQL database has data: `SELECT * FROM emails;`
- Ensure email status matches folder filter

The email page now fully integrates with MySQL database, displaying real user data including names, avatars, messages, and timestamps from the database.