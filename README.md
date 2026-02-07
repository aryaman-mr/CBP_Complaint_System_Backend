# CricketBatPro Complaint Management System

A complete complaint management system with user authentication, file uploads, and admin panel.

## Features

- User registration and login with JWT authentication
- Complaint submission with file upload support
- Admin panel for complaint management
- Automatic email notifications
- Role-based access control
- MongoDB database integration

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create `.env` file in backend directory:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cricketbat_complaints
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5000
```

### 3. Database Setup

1. Create MongoDB Atlas account
2. Create new cluster
3. Get connection string
4. Update MONGODB_URI in .env

### 4. Create Admin Account

```bash
node createAdmin.js
```

Default admin credentials:
- Email: admin@cricketbatpro.com
- Password: admin123

### 5. Start Backend Server

```bash
npm run dev
```

### 6. Frontend Setup

Open `frontend/index.html` in browser or serve with live server.

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Complaints
- POST `/api/complaints` - Create complaint
- GET `/api/complaints/my-complaints` - Get user complaints
- GET `/api/complaints/all` - Get all complaints (admin)
- PUT `/api/complaints/:id/status` - Update complaint status (admin)

## Deployment

### VPS Deployment with Nginx

1. Upload files to VPS
2. Install Node.js and MongoDB
3. Configure Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location / {
        root /path/to/frontend;
        try_files $uri $uri/ /index.html;
    }
}
```

4. Start backend with PM2:
```bash
pm2 start server.js --name cricketbat-api
```

## Usage

1. Register new user account
2. Login to access dashboard
3. Submit complaints with optional file attachments
4. Admin can view all complaints and update status
5. Users receive email notifications on status changes