import { NextRequest, NextResponse, after } from 'next/server';
import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import { getAuthUser } from '@/lib/auth';
import { sendEnquiryEmail } from '@/lib/email';
import { enquirySchema } from '@/lib/validation';
import { site } from '@/lib/site';

const STATUSES = ['pending', 'resolved', 'follow'] as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid enquiry data.' },
        { status: 400 }
      );
    }

    const { name, email, phone, service, industry, budget, message } = parsed.data;

    await connectDB();
    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      service,
      industry,
      budget,
      message,
    });

    // Respond as soon as the enquiry is stored. The notification is best-effort
    // and runs after the response, so a slow/unconfigured SMTP server can never
    // delay or fail the form submission.
    after(async () => {
      try {
        await sendEnquiryEmail({ name, email, phone, service, message });
      } catch (emailErr) {
        console.error('Enquiry email notification failed:', emailErr);
      }
    });

    return NextResponse.json({ id: enquiry._id, success: true }, { status: 201 });
  } catch (err) {
    console.error('Enquiry POST error:', err);
    return NextResponse.json(
      {
        error: `We could not save your enquiry right now. Please try again in a moment, or email ${site.email}.`,
      },
      { status: 503 }
    );
  }
}

export async function GET(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const requestedPage = Number.parseInt(searchParams.get('page') || '1', 10);
    const requestedLimit = Number.parseInt(searchParams.get('limit') || '10', 10);
    const page = Number.isFinite(requestedPage) ? Math.max(1, requestedPage) : 1;
    const limit = Number.isFinite(requestedLimit)
      ? Math.min(50, Math.max(5, requestedLimit))
      : 10;
    const status = searchParams.get('status') || '';
    const query = (searchParams.get('q') || '').trim();

    await connectDB();

    const filter: Record<string, unknown> = {};
    if (status && (STATUSES as readonly string[]).includes(status)) {
      filter.status = status;
    }

    if (query) {
      const safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(safe, 'i');
      filter.$or = [
        { name: pattern },
        { email: pattern },
        { phone: pattern },
        { service: pattern },
        { message: pattern },
        { city: pattern },
      ];
    }

    const total = await Enquiry.countDocuments(filter);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(page, totalPages);
    const skip = (currentPage - 1) * limit;

    const [enquiries, statusGroups] = await Promise.all([
      Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Enquiry.aggregate<{ _id: string; count: number }>([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);

    const counts: Record<string, number> = {
      all: 0,
      pending: 0,
      resolved: 0,
      follow: 0,
    };
    for (const group of statusGroups) {
      counts[group._id] = group.count;
      counts.all += group.count;
    }

    return NextResponse.json(
      {
        enquiries,
        counts,
        pagination: {
          page: currentPage,
          limit,
          total,
          totalPages,
          hasPrev: currentPage > 1,
          hasNext: currentPage < totalPages,
        },
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('Enquiry GET error:', err);
    return NextResponse.json(
      { error: 'Enquiries are temporarily unavailable. Check the database connection.' },
      { status: 503 }
    );
  }
}
