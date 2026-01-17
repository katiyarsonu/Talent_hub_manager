# TalentHub Backend - README

## 📋 Project Overview

TalentHub is a RESTful API backend for a candidate management platform built with Node.js, Express, MySQL, and JWT authentication. This backend provides secure endpoints for user authentication and CRUD operations on candidate records.

---

## 🚀 Features

- ✅ User Authentication (Register, Login, JWT)
- ✅ Protected Routes with JWT Middleware
- ✅ Candidate Management (CRUD Operations)
- ✅ MySQL Database Integration
- ✅ Password Hashing with bcrypt
- ✅ Input Validation
- ✅ Error Handling

---

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **Environment Variables:** dotenv
- **Cloud Secrets:** AWS SDK (Secrets Manager)

---

## 📁 Project Structure

```
backend/
├── config/
│   ├── database.js          # Database connection & initialization
│   └── secrets.js           # AWS Secrets Manager integration
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── candidateController.js # Candidate CRUD logic
├── middleware/
│   ├── authMiddleware.js    # JWT verification
│   └── errorMiddleware.js   # Error handling
├── models/
│   ├── User.js              # User model
│   └── Candidate.js         # Candidate model
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   └── candidateRoutes.js   # Candidate endpoints
├── utils/
│   └── generateToken.js     # JWT token generation
├── .env.example             # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies & scripts
└── server.js                # Application entry point
```

---

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Setup Environment Variables

```bash
cp .env.example .env
```

Edit `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=talenthub

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://localhost:3000

# AWS Secrets Manager (Production Only)
USE_SECRETS_MANAGER=false
AWS_REGION=us-east-1
SECRET_NAME=talenthub/production
```

### Step 4: Setup MySQL Database

```bash
# Login to MySQL
mysql -u root -p

# Create database (optional - app auto-creates)
CREATE DATABASE talenthub;
EXIT;
```

### Step 5: Start Server

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

**Expected Output:**
```
✅ Database connected successfully
✅ Database tables created successfully
🚀 Server running on port 5000
📊 Environment: development
🔗 API: http://localhost:5000/api
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 3. Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2024-01-17T10:30:00.000Z"
    }
  }
}
```

---

### Candidate Endpoints

**Note:** All candidate endpoints require authentication. Include JWT token in Authorization header.

#### 1. Get All Candidates
```http
GET /api/candidates
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "status": "success",
  "count": 2,
  "data": {
    "candidates": [
      {
        "id": 1,
        "name": "Jane Smith",
        "email": "jane@example.com",
        "phone": "+1234567890",
        "skills": "JavaScript, React, Node.js",
        "experience": 5,
        "department": "Engineering",
        "user_id": 1,
        "created_at": "2024-01-17T10:35:00.000Z",
        "updated_at": "2024-01-17T10:35:00.000Z"
      }
    ]
  }
}
```

#### 2. Create Candidate
```http
POST /api/candidates
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "skills": "JavaScript, React, Node.js",
  "experience": 5,
  "department": "Engineering"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "candidate": {
      "id": 1,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+1234567890",
      "skills": "JavaScript, React, Node.js",
      "experience": 5,
      "department": "Engineering"
    }
  }
}
```

#### 3. Update Candidate
```http
PUT /api/candidates/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "skills": "JavaScript, React, Node.js, TypeScript",
  "experience": 6,
  "department": "Engineering"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "candidate": {
      "id": 1,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+1234567890",
      "skills": "JavaScript, React, Node.js, TypeScript",
      "experience": 6,
      "department": "Engineering"
    }
  }
}
```

#### 4. Delete Candidate
```http
DELETE /api/candidates/:id
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Candidate deleted successfully"
}
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Candidates Table
```sql
CREATE TABLE candidates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  skills TEXT NOT NULL,
  experience INT NOT NULL,
  department VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🔒 Security Features

### Authentication
- JWT-based authentication
- Password hashing with bcrypt (10 salt rounds)
- Token expiration (7 days default)
- Protected routes with middleware

### Data Validation
- Email format validation
- Password minimum length (6 characters)
- Phone number format validation
- Required field validation
- Duplicate email prevention

### Security Headers
- CORS configuration
- Environment-based secrets
- SQL injection prevention (parameterized queries)
- Error messages don't expose sensitive info

---

## 🚀 Deployment

### Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

### Production (AWS EC2)

#### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

#### 2. Database Setup
```bash
sudo mysql -u root -p

CREATE DATABASE talenthub;
CREATE USER 'talenthub_user'@'localhost' IDENTIFIED BY 'Strong_Password_123!';
GRANT ALL PRIVILEGES ON talenthub.* TO 'talenthub_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### 3. Application Setup
```bash
# Clone repository
git clone <repository-url>
cd backend

# Install dependencies
npm install --production

# Create .env file
nano .env
```

**Production .env:**
```env
PORT=5000
NODE_ENV=production
DB_HOST=localhost
DB_USER=talenthub_user
DB_PASSWORD=Strong_Password_123!
DB_NAME=talenthub
JWT_SECRET=<generate-random-secret>
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend-domain.com
USE_SECRETS_MANAGER=false
```

#### 4. Process Manager (PM2)
```bash
# Install PM2
sudo npm install -g pm2

# Start application
pm2 start server.js --name talenthub-backend

# Save PM2 configuration
pm2 save

# Setup auto-start on boot
pm2 startup
```

#### 5. Nginx Reverse Proxy
```bash
# Install Nginx
sudo apt install -y nginx

# Create configuration
sudo nano /etc/nginx/sites-available/talenthub
```

**Nginx Config:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/talenthub /etc/nginx/sites-enabled/

# Test and restart
sudo nginx -t
sudo systemctl restart nginx
```

#### 6. SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## 🔐 AWS Secrets Manager (Optional)

### Setup

1. **Create IAM Role for EC2**
   - Go to IAM Console
   - Create role with `SecretsManagerReadWrite` policy
   - Attach to EC2 instance

2. **Store Secrets**
   - Go to AWS Secrets Manager
   - Create new secret (Other type)
   - Add key/value pairs:
     ```json
     {
       "DB_HOST": "localhost",
       "DB_USER": "talenthub_user",
       "DB_PASSWORD": "Strong_Password_123!",
       "DB_NAME": "talenthub",
       "JWT_SECRET": "your-secret-here"
     }
     ```
   - Secret name: `talenthub/production`

3. **Update .env**
   ```env
   USE_SECRETS_MANAGER=true
   AWS_REGION=us-east-1
   SECRET_NAME=talenthub/production
   ```

4. **Install AWS SDK**
   ```bash
   npm install aws-sdk
   ```

---

## 🧪 Testing

### Manual Testing with cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get candidates (replace TOKEN)
curl http://localhost:5000/api/candidates \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Import API endpoints
2. Set environment variable: `token`
3. Test each endpoint
4. Use Bearer token authentication for protected routes

---

## 📊 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| PORT | Server port | 5000 | No |
| NODE_ENV | Environment | development | No |
| DB_HOST | MySQL host | localhost | Yes |
| DB_USER | MySQL user | root | Yes |
| DB_PASSWORD | MySQL password | - | Yes |
| DB_NAME | Database name | talenthub | Yes |
| JWT_SECRET | JWT secret key | - | Yes |
| JWT_EXPIRE | Token expiration | 7d | No |
| CLIENT_URL | Frontend URL | http://localhost:3000 | No |
| USE_SECRETS_MANAGER | Use AWS Secrets | false | No |
| AWS_REGION | AWS region | us-east-1 | No |
| SECRET_NAME | Secret name | talenthub/production | No |

---

## 🐛 Troubleshooting

### Database Connection Issues

**Error:** `ECONNREFUSED`
```bash
# Check if MySQL is running
sudo systemctl status mysql

# Start MySQL
sudo systemctl start mysql
```

**Error:** `Access denied for user`
```bash
# Reset MySQL user password
sudo mysql -u root -p

ALTER USER 'talenthub_user'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

### Port Already in Use

```bash
# Find process using port 5000
lsof -ti:5000

# Kill process
kill -9 <PID>
```

### JWT Errors

**Error:** `jwt malformed`
- Check if token is being sent in Authorization header
- Verify token format: `Bearer <token>`

### PM2 Issues

```bash
# View logs
pm2 logs talenthub-backend

# Restart app
pm2 restart talenthub-backend

# Delete and recreate
pm2 delete talenthub-backend
pm2 start server.js --name talenthub-backend
```

---

## 📝 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| start | `npm start` | Start production server |
| dev | `npm run dev` | Start development server with nodemon |

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Your Name**
- Email: katiyarsonu2110@gmail.com
- GitHub: [@katiyarsonu](https://github.com/katiyarsonu)

---

## 🙏 Acknowledgments

- Express.js Documentation
- MySQL Documentation
- JWT.io
- AWS Documentation

---

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Email: katiyarsonu2110@gmail.com

---

**Built with ❤️ using Node.js and Express**
