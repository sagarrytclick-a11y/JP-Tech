import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'jp-tech-secret-key-2025';
const COOKIE_NAME = 'admin_token';
const EXPIRY = '6h';

export function signToken(payload: { id: string; email: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRY });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string };
  } catch {
    return null;
  }
}

export async function getAuthUser() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function setAuthCookie(token: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 6 * 60 * 60,
    path: '/',
  });
}

export async function clearAuthCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
