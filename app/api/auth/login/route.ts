import { NextRequest, NextResponse } from 'next/server';
import { signToken, setAuthCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

    const usernameMatches =
      String(username).trim().toLowerCase() === adminUser.trim().toLowerCase();
    const passwordMatches = String(password) === adminPass;

    if (!usernameMatches || !passwordMatches) {
      return NextResponse.json({ error: 'Invalid username or password.' }, { status: 401 });
    }

    const token = signToken({ id: 'admin', username: adminUser });
    await setAuthCookie(token);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
