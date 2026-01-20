# Student Management System

A comprehensive admin system for managing students and tracking attendance, built with Next.js, MongoDB, and JWT authentication.

## Features

### Admin Features
- **Secure Login**: JWT-based authentication with environment variable credentials
- **Student Management**: Add, edit, update, and remove students
- **Attendance Tracking**: Mark daily attendance with status (Present, Absent, Late)
- **Attendance History**: View and filter attendance records with export functionality
- **Dashboard**: Overview of student statistics and attendance metrics

### Public Features
- **Members Page**: Display all active students with their information
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# GitHub Token (existing)
GITHUB_TOKEN=your_github_token

# Admin credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

# JWT Secret (change this in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# MongoDB connection
MONGODB_URI=mongodb://localhost:27017/student-management
```

### 2. MongoDB Setup
Make sure you have MongoDB installed and running locally, or use a cloud MongoDB service like MongoDB Atlas.

For local MongoDB:
```bash
# Install MongoDB (Ubuntu/Debian)
sudo apt-get install mongodb

# Start MongoDB service
sudo systemctl start mongodb

# Or using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Seed Sample Data (Optional)
```bash
npm run seed
```

This will create 5 sample students in your database.

### 5. Run the Application
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

### Admin Access
1. Navigate to `/admin/login` or click "Admin" in the navigation
2. Login with the credentials from your `.env` file:
   - Email: `admin@example.com`
   - Password: `admin123`

### Admin Dashboard
After logging in, you'll have access to:
- **Dashboard**: Overview of students and today's attendance
- **Student Management**: Add, edit, and remove students
- **Take Attendance**: Mark attendance for any date
- **Reports**: View attendance history and export data

### Student Display
- Visit `/members` to see all active students
- Students added by admin will automatically appear here

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout

### Students
- `GET /api/students` - Get all active students
- `POST /api/students` - Create new student
- `PUT /api/students/[id]` - Update student
- `DELETE /api/students/[id]` - Soft delete student

### Attendance
- `GET /api/attendance` - Get attendance records (with filters)
- `POST /api/attendance` - Record single attendance
- `POST /api/attendance/bulk` - Record bulk attendance

## Database Schema

### Student Model
```javascript
{
  name: String (required),
  email: String (optional),
  studentId: String (optional, unique),
  phone: String (optional),
  course: String (optional),
  year: String (optional),
  isActive: Boolean (default: true),
  timestamps: true
}
```

### Attendance Model
```javascript
{
  studentId: ObjectId (ref: Student, required),
  date: Date (required),
  status: String (enum: ['present', 'absent', 'late'], required),
  notes: String (optional),
  markedBy: String (default: 'admin'),
  timestamps: true
}
```

## Security Features

- JWT token authentication
- HTTP-only cookies for token storage
- Protected admin routes with middleware
- Input validation and sanitization
- Secure password handling (ready for bcrypt hashing)

## Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **Deployment**: Ready for Vercel deployment

## Production Deployment

1. Update environment variables for production
2. Use a strong JWT secret
3. Use MongoDB Atlas or another cloud database
4. Consider implementing password hashing for admin credentials
5. Set up proper CORS and security headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.