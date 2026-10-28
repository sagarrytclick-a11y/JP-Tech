'use server';

import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import { sendEnquiryEmail } from '@/lib/email';
import { enquirySchema } from '@/lib/validation';

export async function submitEnquiry(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  industry: string;
  budget: string;
  message: string;
}) {
  const parsed = enquirySchema.safeParse(data);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { error: `${first.path.join('.')}: ${first.message}` };
  }

  const { name, email, phone, service, industry, budget, message } = parsed.data;

  try {
    await connectDB();
    await Enquiry.create({ name, email, phone, service, industry, budget, message });

    try {
      await sendEnquiryEmail({
        name,
        email,
        phone,
        service,
        industry,
        budget,
        message,
      });
    } catch (emailErr) {
      console.error('Email send failed:', emailErr);
    }

    return { success: true };
  } catch (err) {
    console.error('Enquiry submission error:', err);
    return { error: 'Something went wrong. Please try again.' };
  }
}
