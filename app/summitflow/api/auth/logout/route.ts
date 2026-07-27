import { NextResponse } from 'next/server';
import { OPS_BASE, SESSION_COOKIE } from '@/lib/summitflow/constants';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}

export async function GET() {
  const res = NextResponse.redirect(new URL(`${OPS_BASE}/login`, process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'));
  res.cookies.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}
