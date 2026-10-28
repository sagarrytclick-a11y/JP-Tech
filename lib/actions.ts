'use server';

import { after } from 'next/server';
import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import { sendEnquiryEmail } from '@/lib/email';
import { enquirySchema } from '@/lib/validation';
import { site } from '@/lib/site';

export async function submitEnquiry(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  industry?: string;
  budget?: string;
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
  } catch (err) {
    console.error('Enquiry submission error:', err);
    return {
      error: `We could not save your enquiry right now. Please try again in a moment, or email ${site.email}.`,
    };
  }

  // The enquiry is already saved, so the email notification runs after the
  // response is sent and can never block or fail the submission.
  after(async () => {
    try {
      await sendEnquiryEmail({ name, email, phone, service, message });
    } catch (emailErr) {
      console.error('Enquiry email notification failed:', emailErr);
    }
  });

  return { success: true };
}
