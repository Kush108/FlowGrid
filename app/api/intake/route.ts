import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Optional Make.com hook: set MAKE_WEBHOOK_URL in your env.
    const makeUrl = process.env.MAKE_WEBHOOK_URL;
    if (makeUrl) {
      try {
        await fetch(makeUrl, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body),
        });
      } catch {
        // Non-blocking: keep UX smooth even if Make is down.
      }
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

