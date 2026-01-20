import mongoose from 'mongoose';

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
  notes: {
    type: String,
    required: false,
  },
  markedBy: {
    type: String,
    default: 'admin',
  },
}, {
  timestamps: true,
});

// Compound index to ensure one attendance record per student per date
AttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);