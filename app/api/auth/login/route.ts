import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { signToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@jptechnologies.com';
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const hash = bcrypt.hashSync(adminPass, 10);
      await User.create({ email: adminEmail, password: hash });
    }

    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ id: user._id.toString(), email: user.email });
    await setAuthCookie(token);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
