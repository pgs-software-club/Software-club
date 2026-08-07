import mongoose from 'mongoose';

const FormFieldSchema = new mongoose.Schema({
    id: { type: String, required: true },
    type: {
        type: String,
        required: true,
        enum: ['text', 'textarea', 'number', 'select', 'radio', 'checkbox', 'studentId']
    },
    label: { type: String, required: true },
    placeholder: { type: String },
    required: { type: Boolean, default: false },
    options: [{ label: { type: String }, value: { type: String } }],
    order: { type: Number, required: true },
});

const SportsFormSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    fields: [FormFieldSchema],
    isOpen: { type: Boolean, default: true },
    slug: { type: String, required: true, unique: true }, // For shareable link
}, {
    timestamps: true,
});

export default mongoose.models.SportsForm || mongoose.model('SportsForm', SportsFormSchema);
