import { NextResponse } from 'next/server';
import { SESSION_COOKIE, ROLE_HOME, type OpsRole } from '@/lib/sphinixops/constants';
import { MOCK_PROFILES } from '@/lib/sphinixops/mock-data';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const role = body.role as OpsRole | undefined;
  const profileId = body.profileId as string | undefined;

  let profile = profileId ? MOCK_PROFILES.find((p) => p.id === profileId) : undefined;
  if (!profile && role) {
    profile = MOCK_PROFILES.find((p) => p.role === role);
  }

  if (!profile) {
    return NextResponse.json({ error: 'Invalid demo account' }, { status: 400 });
  }

  const session = JSON.stringify({
    profileId: profile.id,
    role: profile.role,
    mode: 'demo',
  });

  const res = NextResponse.json({ ok: true, redirect: ROLE_HOME[profile.role] });
  res.cookies.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  });
  return res;
}
