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

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
