import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import { getAuthUser } from '@/lib/auth';
import { sendEnquiryEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, city, service } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required.' }, { status: 400 });
    }

    await connectDB();
    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      city: city || '',
      service: service || 'Web',
    });

    try {
      await sendEnquiryEmail({ name, email, phone, city: city || '', service: service || 'Web' });
    } catch (emailErr) {
      console.error('Email send failed:', emailErr);
    }

    return NextResponse.json({ id: enquiry._id, success: true }, { status: 201 });
  } catch (err) {
    console.error('Enquiry POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10')));
  const status = searchParams.get('status') || '';
  const skip = (page - 1) * limit;

  await connectDB();

  const filter: Record<string, string> = {};
  if (status && ['pending', 'resolved', 'follow'].includes(status)) {
    filter.status = status;
  }

  const [enquiries, total] = await Promise.all([
    Enquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Enquiry.countDocuments(filter),
  ]);

  return NextResponse.json({
    enquiries,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
