import { randomUUID } from 'node:crypto';
import { NextRequest, NextResponse, after } from 'next/server';
import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import { getAuthUser } from '@/lib/auth';
import { sendEnquiryEmail } from '@/lib/email';
import { isImageKitConfigured, uploadToImageKit } from '@/lib/imagekit';
import { enquirySchema } from '@/lib/validation';
import { site } from '@/lib/site';

const STATUSES = ['pending', 'resolved', 'follow'] as const;
const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024;
const ATTACHMENT_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/gif': 'gif',
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
};

function safeFileName(value: string) {
  return (
    value
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
      .slice(0, 60) || 'enquiry'
  );
}

async function readPayload(req: NextRequest) {
  const contentType = req.headers.get('content-type') || '';

  if (contentType.includes('multipart/form-data')) {
    const formData = await req.formData();
    return {
      raw: {
        name: String(formData.get('name') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        service: String(formData.get('service') || ''),
        industry: String(formData.get('industry') || ''),
        budget: String(formData.get('budget') || ''),
        message: String(formData.get('message') || ''),
      },
      attachment: formData.get('attachment') instanceof File
        ? (formData.get('attachment') as File)
        : null,
    };
  }

  const body = (await req.json()) as Record<string, unknown>;
  return {
    raw: {
      name: String(body.name || ''),
      email: String(body.email || ''),
      phone: String(body.phone || ''),
      service: String(body.service || ''),
      industry: String(body.industry || ''),
      budget: String(body.budget || ''),
      message: String(body.message || ''),
    },
    attachment: null,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { raw, attachment } = await readPayload(req);
    const parsed = enquirySchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid enquiry data.' },
        { status: 400 }
      );
    }

    const { name, email, phone, service, industry, budget, message } = parsed.data;

    let attachmentUrl = '';
    let attachmentName = '';

    if (attachment && attachment.size > 0) {
      const extension = ATTACHMENT_EXTENSIONS[attachment.type];
      if (!extension) {
        return NextResponse.json(
          {
            error:
              'Attach a PDF, Word document, or image (JPG, PNG, WebP, AVIF, GIF).',
          },
          { status: 415 }
        );
      }

      if (attachment.size > MAX_ATTACHMENT_BYTES) {
        return NextResponse.json(
          { error: 'Attachment is too large. Keep it under 8 MB.' },
          { status: 413 }
        );
      }

      if (!isImageKitConfigured()) {
        return NextResponse.json(
          {
            error: `Attachments are temporarily unavailable. Please submit without one, or email ${site.email}.`,
          },
          { status: 503 }
        );
      }

      try {
        const buffer = Buffer.from(await attachment.arrayBuffer());
        const fileName = `${safeFileName(name)}-${Date.now()}-${randomUUID()
          .slice(0, 6)}.${extension}`;
        attachmentUrl = await uploadToImageKit({
          buffer,
          fileName,
          folder: '/enquiries',
          mimeType: attachment.type,
        });
        attachmentName = attachment.name;
      } catch (uploadError) {
        console.error('ImageKit enquiry attachment upload failed:', uploadError);
        return NextResponse.json(
          {
            error: `We could not upload your attachment right now. Please submit without it, or email ${site.email}.`,
          },
          { status: 503 }
        );
      }
    }

    await connectDB();
    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      service,
      industry,
      budget,
      message,
      attachmentUrl,
      attachmentName,
    });

    // Respond as soon as the enquiry is stored. The notification is best-effort
    // and runs after the response, so a slow/unconfigured SMTP server can never
    // delay or fail the form submission.
    after(async () => {
      try {
        await sendEnquiryEmail({
          name,
          email,
          phone,
          service,
          message,
          attachmentUrl: attachmentUrl || undefined,
          attachmentName: attachmentName || undefined,
        });
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
