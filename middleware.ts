import { NextResponse, type NextRequest } from 'next/server';
import { OPS_BASE, ROLE_HOME, SESSION_COOKIE, type OpsRole } from '@/lib/sphinxops/constants';

const PUBLIC_PATHS = [`${OPS_BASE}/login`, `${OPS_BASE}/api/auth`];

function isPublic(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

function parseSession(raw: string | undefined) {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as { profileId: string; role: OpsRole };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(OPS_BASE)) {
    return NextResponse.next();
  }

  if (isPublic(pathname)) {
    return NextResponse.next();
  }

  const session = parseSession(request.cookies.get(SESSION_COOKIE)?.value);

  if (!session) {
    const login = new URL(`${OPS_BASE}/login`, request.url);
    login.searchParams.set('next', pathname);
    return NextResponse.redirect(login);
  }

  const rolePrefix = `${OPS_BASE}/${session.role}`;
  if (pathname === OPS_BASE || pathname === `${OPS_BASE}/`) {
    return NextResponse.redirect(new URL(ROLE_HOME[session.role], request.url));
  }

  const allowedPrefixes = [rolePrefix, `${OPS_BASE}/api`];
  const allowed = allowedPrefixes.some((p) => pathname === p || pathname.startsWith(p + '/'));

  if (!allowed) {
    return NextResponse.redirect(new URL(ROLE_HOME[session.role], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/sphinxops/:path*'],
};
