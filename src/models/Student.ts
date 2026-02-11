import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    validate: {
      validator: function(v: string) {
        return v.length >= 2;
      },
      message: 'Name must be at least 2 characters long'
    }
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
    maxlength: 254,
    validate: {
      validator: function(v: string) {
        if (!v) return true; // Allow empty for optional field
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(v);
      },
      message: 'Invalid email format'
    }
  },
  personalEmail: {
    type: String,
    required: false,
    trim: true,
    lowercase: true,
    maxlength: 254,
    validate: {
      validator: function(v: string) {
        if (!v) return true; // Allow empty for optional field
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return emailRegex.test(v);
      },
      message: 'Invalid personal email format'
    }
  },
  githubUsername: {
    type: String,
    required: false,
    trim: true,
    maxlength: 39,
    validate: {
      validator: function(v: string) {
        if (!v) return true; // Allow empty for optional field
        const githubRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]){0,38}$/;
        return githubRegex.test(v);
      },
      message: 'Invalid GitHub username format'
    }
  },
  studentId: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
    trim: true,
    maxlength: 20,
    validate: {
      validator: function(v: string) {
        if (!v) return true; // Allow empty for optional field
        const studentIdRegex = /^[a-zA-Z0-9_-]{1,20}$/;
        return studentIdRegex.test(v);
      },
      message: 'Invalid student ID format'
    }
  },
  phone: {
    type: String,
    required: false,
    maxlength: 20,
    validate: {
      validator: function(v: string) {
        if (!v) return true; // Allow empty for optional field
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(v.replace(/[\s\-\(\)]/g, ''));
      },
      message: 'Invalid phone number format'
    }
  },
  course: {
    type: String,
    required: false,
    maxlength: 100,
  },
  year: {
    type: String,
    required: false,
    maxlength: 20,
  },
  areaOfStudy: {
    type: String,
    required: false,
    trim: true,
    maxlength: 100,
  },
  viberNumber: {
    type: String,
    required: false,
    maxlength: 20,
  },
  technicalInterests: {
    type: [String],
    required: false,
    default: [],
  },
  otherInterest: {
    type: String,
    required: false,
    maxlength: 200,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  // Security and audit fields
  registrationIP: {
    type: String,
    required: false,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  modifiedBy: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
  // Add indexes for performance
  indexes: [
    { email: 1 },
    { githubUsername: 1 },
    { studentId: 1 },
    { isActive: 1, isVerified: 1 }
  ]
});

// Pre-save middleware to update lastModified
StudentSchema.pre('save', function() {
  this.lastModified = new Date();
});

// Pre-update middleware to update lastModified
StudentSchema.pre('findOneAndUpdate', function() {
  this.set({ lastModified: new Date() });
});

StudentSchema.pre('updateOne', function() {
  this.set({ lastModified: new Date() });
});

StudentSchema.pre('updateMany', function() {
  this.set({ lastModified: new Date() });
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);