import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Placeholder hook:
    // Connect this to Airtable/HubSpot via Zapier/Make or store in DB.
    // For now, we simply acknowledge receipt to keep UX smooth.
    void body;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

