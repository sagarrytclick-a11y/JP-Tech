import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, default: '' },
  service: { type: String, default: 'Web' },
  status: { type: String, enum: ['pending', 'resolved', 'follow'], default: 'pending' },
}, { timestamps: true });

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
