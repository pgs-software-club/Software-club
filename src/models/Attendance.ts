import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    validate: {
      validator: function(v: mongoose.Types.ObjectId) {
        return mongoose.Types.ObjectId.isValid(v);
      },
      message: 'Invalid student ID'
    }
  },
  date: {
    type: Date,
    required: true,
    validate: {
      validator: function(v: Date) {
        return v instanceof Date && !isNaN(v.getTime());
      },
      message: 'Invalid date'
    }
  },
  status: {
    type: String,
    enum: {
      values: ['present', 'absent', 'late'],
      message: 'Status must be present, absent, or late'
    },
    required: true,
  },
  notes: {
    type: String,
    required: false,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
    trim: true,
  },
  markedBy: {
    type: String,
    required: true,
    maxlength: [254, 'MarkedBy field cannot exceed 254 characters'],
    validate: {
      validator: function(v: string) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(v);
      },
      message: 'MarkedBy must be a valid email address'
    }
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
  // Add indexes for performance and security
  indexes: [
    { studentId: 1, date: 1 }, // Compound unique index
    { date: 1 },
    { markedBy: 1 },
    { createdAt: 1 }
  ]
});

// Compound index to ensure one attendance record per student per date
AttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

// Pre-save middleware to update lastModified
AttendanceSchema.pre('save', function() {
  this.lastModified = new Date();
});

// Pre-update middleware to update lastModified
AttendanceSchema.pre('findOneAndUpdate', function() {
  this.set({ lastModified: new Date() });
});

AttendanceSchema.pre('updateOne', function() {
  this.set({ lastModified: new Date() });
});

AttendanceSchema.pre('updateMany', function() {
  this.set({ lastModified: new Date() });
});

export default mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);