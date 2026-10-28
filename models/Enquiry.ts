import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, default: '' },
  industry: { type: String, default: '' },
  budget: { type: String, default: '' },
  message: { type: String, default: '' },
  city: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'resolved', 'follow'], default: 'pending' },
}, { timestamps: true });

// The admin list is always sorted by newest first and optionally filtered by
// status, so keep both access patterns covered.
EnquirySchema.index({ createdAt: -1 });
EnquirySchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
