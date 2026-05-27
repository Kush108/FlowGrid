import { NextRequest, NextResponse } from 'next/server';
import { getCurrentProfile } from '@/lib/sphinixops/session';

// Replace with your actual DB (Supabase etc.)
const leaveRequests: any[] = [];

export async function GET() {
  return NextResponse.json(leaveRequests);
}

export async function POST(req: NextRequest) {
  const profile = await getCurrentProfile();
  if (!profile) return NextResponse.json({ error: 'Unauth' }, { status: 401 });

  const body = await req.json();
  const record = {
    id: Date.now().toString(),
    staffId: profile.id,
    staffName: profile.fullName,
    siteId: profile.siteId,
    type: body.type,       // 'vacation' | 'sick' | 'personal'
    startDate: body.startDate,
    endDate: body.endDate,
    note: body.note,
    status: 'pending',     // 'pending' | 'approved' | 'denied'
    submittedAt: new Date().toISOString(),
  };
  leaveRequests.push(record);
  return NextResponse.json(record);
}

export async function PATCH(req: NextRequest) {
  const profile = await getCurrentProfile();
  if (!profile || !['director','manager','hr'].includes(profile.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id, status } = await req.json();
  const req_ = leaveRequests.find(r => r.id === id);
  if (!req_) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  req_.status = status;
  req_.reviewedBy = profile.fullName;
  req_.reviewedAt = new Date().toISOString();
  return NextResponse.json(req_);
}