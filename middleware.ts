import { NextResponse, type NextRequest } from 'next/server';
import {
  OPS_BASE as SPHINX_BASE,
  ROLE_HOME as SPHINX_ROLE_HOME,
  SESSION_COOKIE as SPHINX_COOKIE,
  type OpsRole,
} from '@/lib/sphinxops/constants';
import {
  OPS_BASE as SUMMIT_BASE,
  ROLE_HOME as SUMMIT_ROLE_HOME,
  SESSION_COOKIE as SUMMIT_COOKIE,
} from '@/lib/summitflow/constants';

type TenantConfig = {
  base: string;
  cookie: string;
  roleHome: Record<OpsRole, string>;
};

const TENANTS: TenantConfig[] = [
  { base: SPHINX_BASE, cookie: SPHINX_COOKIE, roleHome: SPHINX_ROLE_HOME },
  { base: SUMMIT_BASE, cookie: SUMMIT_COOKIE, roleHome: SUMMIT_ROLE_HOME },
];

function getTenant(pathname: string): TenantConfig | null {
  return TENANTS.find((t) => pathname === t.base || pathname.startsWith(`${t.base}/`)) ?? null;
}

function isPublic(pathname: string, base: string) {
  const publicPaths = [`${base}/login`, `${base}/api/auth`];
  return publicPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
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

  if (pathname === '/hydroflo' || pathname.startsWith('/hydroflo/')) {
    const redirect = new URL(pathname.replace('/hydroflo', '/summitflow'), request.url);
    redirect.search = request.nextUrl.search;
    return NextResponse.redirect(redirect);
  }

  const tenant = getTenant(pathname);

  if (!tenant) {
    return NextResponse.next();
  }

  if (isPublic(pathname, tenant.base)) {
    return NextResponse.next();
  }

  const session = parseSession(request.cookies.get(tenant.cookie)?.value);

  if (!session) {
    const login = new URL(`${tenant.base}/login`, request.url);
    login.searchParams.set('next', pathname);
    return NextResponse.redirect(login);
  }

  const rolePrefix = `${tenant.base}/${session.role}`;
  if (pathname === tenant.base || pathname === `${tenant.base}/`) {
    return NextResponse.redirect(new URL(tenant.roleHome[session.role], request.url));
  }

  const allowedPrefixes = [rolePrefix, `${tenant.base}/api`];
  const allowed = allowedPrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (!allowed) {
    return NextResponse.redirect(new URL(tenant.roleHome[session.role], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/sphinxops/:path*', '/summitflow/:path*', '/hydroflo/:path*'],
};
