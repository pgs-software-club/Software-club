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
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);