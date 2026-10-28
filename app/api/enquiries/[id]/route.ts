import { NextRequest, NextResponse } from 'next/server';
import { isValidObjectId } from 'mongoose';
import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import { getAuthUser } from '@/lib/auth';

const STATUSES = ['pending', 'resolved', 'follow'];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  let status: unknown;
  try {
    ({ status } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (typeof status !== 'string' || !STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    await connectDB();
    const result = await Enquiry.findByIdAndUpdate(id, { status }, { new: true }).lean();
    if (!result) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: result });
  } catch (error) {
    console.error('Enquiry update error:', error);
    return NextResponse.json(
      { error: 'Could not update the enquiry. Check the database connection.' },
      { status: 503 }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    await connectDB();
    const result = await Enquiry.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Enquiry delete error:', error);
    return NextResponse.json(
      { error: 'Could not delete the enquiry. Check the database connection.' },
      { status: 503 }
    );
  }
}
