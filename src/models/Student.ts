import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
  },
  githubUsername: {
    type: String,
    required: false,
    trim: true,
  },
  studentId: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    trim: true,
  },
  phone: {
    type: String,
    required: false,
  },
  course: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: false,
  },
  areaOfStudy: {
    type: String,
    required: false,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  registrationType: {
    type: String,
    enum: ['admin', 'self'],
    default: 'admin',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);