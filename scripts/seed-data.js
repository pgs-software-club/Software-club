const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student-management';

// Student Schema
const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: false, trim: true, lowercase: true },
  studentId: { type: String, required: false, unique: true, sparse: true },
  phone: { type: String, required: false },
  course: { type: String, required: false },
  year: { type: String, required: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);

// Sample students data
const sampleStudents = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    studentId: 'PGS001',
    phone: '+1234567890',
    course: 'Computer Science',
    year: '2024',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    studentId: 'PGS002',
    phone: '+1234567891',
    course: 'Software Engineering',
    year: '2024',
  },
  {
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    studentId: 'PGS003',
    phone: '+1234567892',
    course: 'Data Science',
    year: '2023',
  },
  {
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    studentId: 'PGS004',
    phone: '+1234567893',
    course: 'Cybersecurity',
    year: '2024',
  },
  {
    name: 'David Brown',
    email: 'david.brown@example.com',
    studentId: 'PGS005',
    phone: '+1234567894',
    course: 'AI & Machine Learning',
    year: '2023',
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
      console.log(`${index + 1}. ${student.name} (${student.studentId}) - ${student.course}`);
    });

    console.log('\nSeed data created successfully!');
    console.log('\nAdmin credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

seedData();