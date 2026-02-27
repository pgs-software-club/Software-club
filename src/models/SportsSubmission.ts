import mongoose from 'mongoose';

const SportsSubmissionSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'SportsForm', required: true },
    responses: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        required: true
    },
    studentId: { type: String }, // Optional: extracted from fields for uniqueness check
    submittedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

// Index for performance and uniqueness if needed
SportsSubmissionSchema.index({ formId: 1, studentId: 1 }, { unique: true, sparse: true });

export default mongoose.models.SportsSubmission || mongoose.model('SportsSubmission', SportsSubmissionSchema);
