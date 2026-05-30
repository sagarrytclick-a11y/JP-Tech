import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Enquiry from '@/models/Enquiry';
import { getAuthUser } from '@/lib/auth';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  if (!['pending', 'resolved', 'follow'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  await connectDB();
  const result = await Enquiry.findByIdAndUpdate(id, { status });
  if (!result) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;

  await connectDB();
  const result = await Enquiry.findByIdAndDelete(id);
  if (!result) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
