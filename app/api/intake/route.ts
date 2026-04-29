import { NextResponse } from 'next/server';

type IntakePayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  industry?: unknown;
  staffCount?: unknown;
  message?: unknown;
  city?: unknown;
  businessType?: unknown;
  need?: unknown;
  systemName?: unknown;
  source?: unknown;
  website?: unknown; // honeypot
};

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;
const rateByIp = new Map<string, { resetAt: number; count: number }>();

function getClientIp(req: Request) {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim() || null;
  return req.headers.get('x-real-ip');
}

function isNonEmptyString(v: unknown, maxLen = 160) {
  return typeof v === 'string' && v.trim().length > 0 && v.trim().length <= maxLen;
}

function optionalString(v: unknown, maxLen = 1200) {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  if (!t) return null;
  return t.slice(0, maxLen);
}

function isValidEmail(v: unknown) {
  if (typeof v !== 'string') return false;
  const t = v.trim();
  if (t.length < 3 || t.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req) ?? 'unknown';
    const now = Date.now();
    const existing = rateByIp.get(ip);
    if (!existing || existing.resetAt <= now) {
      rateByIp.set(ip, { resetAt: now + RATE_WINDOW_MS, count: 1 });
    } else {
      existing.count += 1;
      if (existing.count > RATE_MAX) {
        return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
      }
    }

    const body = (await req.json()) as IntakePayload;
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 });
    }

    // Honeypot: bots fill hidden fields.
    if (isNonEmptyString(body.website, 2_000)) {
      return NextResponse.json({ ok: true });
    }

    if (!isNonEmptyString(body.name, 120) || !isValidEmail(body.email)) {
      return NextResponse.json({ ok: false, error: 'invalid_contact' }, { status: 400 });
    }

    const payload = {
      name: String(body.name).trim(),
      email: String(body.email).trim(),
      phone: optionalString(body.phone, 64),
      company: optionalString(body.company, 160),
      industry: optionalString(body.industry, 80),
      staffCount: optionalString(body.staffCount, 40),
      message: optionalString(body.message, 2000),
      city: optionalString(body.city, 60),
      businessType: optionalString(body.businessType, 160),
      need: optionalString(body.need, 2000),
      systemName: optionalString(body.systemName, 80),
      source: optionalString(body.source, 40),
      meta: {
        ip,
        ua: req.headers.get('user-agent') ?? null,
        at: new Date().toISOString(),
      },
    };

    // Optional Make.com hook: set MAKE_WEBHOOK_URL in your env.
    const makeUrl = process.env.MAKE_WEBHOOK_URL;
    if (makeUrl) {
      try {
        await fetch(makeUrl, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        // Non-blocking: keep UX smooth even if Make is down.
      }
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 });
  }
}

