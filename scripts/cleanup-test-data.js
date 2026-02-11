const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  personalEmail: String,
  githubUsername: String,
  studentId: String,
  phone: String,
  course: String,
  year: String,
  areaOfStudy: String,
  viberNumber: String,
  technicalInterests: [String],
  otherInterest: String,
  isActive: Boolean,
  isVerified: Boolean,
  registrationIP: String,
  registrationDate: Date,
  lastModified: Date,
  modifiedBy: String,
}, {
  timestamps: true,
});

const AttendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
    required: true,
  },
  notes: String,
  recordedBy: String,
}, {
  timestamps: true,
});

const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema);
const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);

async function cleanupTestData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all students
    const allStudents = await Student.find({});
    console.log(`\nFound ${allStudents.length} total students in database`);

    // Find all attendance records
    const allAttendance = await Attendance.find({});
    console.log(`Found ${allAttendance.length} total attendance records in database`);

    if (allStudents.length === 0 && allAttendance.length === 0) {
      console.log('No data to clean up');
      await mongoose.connection.close();
      return;
    }

    // Display all students
    if (allStudents.length > 0) {
      console.log('\nCurrent students:');
      allStudents.forEach((student, index) => {
        console.log(`${index + 1}. ${student.name} (${student.email || 'no email'}) - ID: ${student.studentId || 'no ID'} - Verified: ${student.isVerified} - Active: ${student.isActive}`);
      });
    }

    // Delete all students
    if (allStudents.length > 0) {
      console.log('\n⚠️  Deleting ALL students from database...');
      const studentResult = await Student.deleteMany({});
      console.log(`✅ Successfully deleted ${studentResult.deletedCount} students`);
    }

    // Delete all attendance records
    if (allAttendance.length > 0) {
      console.log('\n⚠️  Deleting ALL attendance records from database...');
      const attendanceResult = await Attendance.deleteMany({});
      console.log(`✅ Successfully deleted ${attendanceResult.deletedCount} attendance records`);
    }

    console.log('\n✨ Database cleanup complete!');
    
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  }
}

cleanupTestData();
