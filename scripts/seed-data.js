const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student-management';

// Student Schema
const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: false, trim: true, lowercase: true },
  githubUsername: { type: String, required: false, trim: true },
  studentId: { type: String, required: false, unique: true, sparse: true },
  phone: { type: String, required: false },
  course: { type: String, required: false },
  year: { type: String, required: false },
  areaOfStudy: { type: String, required: false, trim: true },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  registrationDate: { type: Date, default: Date.now },
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

// Sample students data
const sampleStudents = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    githubUsername: 'johndoe',
    studentId: 'PGS001',
    phone: '+1234567890',
    course: 'Computer Science',
    year: '2024',
    areaOfStudy: 'Full Stack Development',
    isVerified: true,
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    githubUsername: 'janesmith',
    studentId: 'PGS002',
    phone: '+1234567891',
    course: 'Software Engineering',
    year: '2024',
    areaOfStudy: 'Mobile Development',
    isVerified: true,
  },
  {
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    githubUsername: 'mikejohnson',
    studentId: 'PGS003',
    phone: '+1234567892',
    course: 'Data Science',
    year: '2023',
    areaOfStudy: 'Machine Learning',
    isVerified: true,
  },
  {
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    githubUsername: 'sarahwilson',
    studentId: 'PGS004',
    phone: '+1234567893',
    course: 'Cybersecurity',
    year: '2024',
    areaOfStudy: 'Ethical Hacking',
    isVerified: false, // Pending verification
  },
  {
    name: 'David Brown',
    email: 'david.brown@example.com',
    githubUsername: 'davidbrown',
    studentId: 'PGS005',
    phone: '+1234567894',
    course: 'AI & Machine Learning',
    year: '2023',
    areaOfStudy: 'Deep Learning',
    isVerified: false, // Pending verification
  },
];

async function seedData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Clear existing students
    await Student.deleteMany({});
    console.log('Cleared existing students');

    // Insert sample students
    const insertedStudents = await Student.insertMany(sampleStudents);
    console.log(`Inserted ${insertedStudents.length} sample students`);

    console.log('Sample students:');
    insertedStudents.forEach((student, index) => {
      const status = student.isVerified ? 'Verified' : 'Pending';
      console.log(`${index + 1}. ${student.name} (${student.studentId}) - ${student.course} [${status}]`);
    });

    console.log('\nSeed data created successfully!');
    console.log('\n=== IMPORTANT SECURITY NOTICE ===');
    console.log('Admin credentials must be configured in .env file:');
    console.log('1. Copy .env.example to .env');
    console.log('2. Generate password hash: node scripts/hash-password.js');
    console.log('3. Update ADMIN_EMAIL and ADMIN_PASSWORD_HASH in .env');
    console.log('4. Set a strong JWT_SECRET');
    console.log('5. Configure MONGODB_URI and GITHUB_TOKEN');
    
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedData();