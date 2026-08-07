import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin',
        enum: ['admin', 'super-admin'],
    },
    lastLogin: {
        type: Date,
    },
}, {
    timestamps: true,
});

// Hash password before saving
AdminSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
AdminSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
