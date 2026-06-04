import { NextRequest, NextResponse } from 'next/server';
import { getCurrentProfile } from '@/lib/sphinxops/session';
import { leaveRequests } from '@/lib/sphinxops/leave-store';

export async function GET() {
  return NextResponse.json(leaveRequests);
}

export async function POST(req: NextRequest) {
  const profile = await getCurrentProfile();
  if (!profile) return NextResponse.json({ error: 'Unauth' }, { status: 401 });

  const body = await req.json();
  const record = {
    id: `lv-${Date.now()}`,
    staffId: profile.id,
    staffName: profile.fullName,
    siteId: profile.siteId,
    type: body.type as 'vacation' | 'sick' | 'personal',
    startDate: body.startDate,
    endDate: body.endDate,
    note: body.note,
    status: 'pending' as const,
    submittedAt: new Date().toISOString(),
  };
  leaveRequests.unshift(record);
  return NextResponse.json(record);
}

export async function PATCH(req: NextRequest) {
  const profile = await getCurrentProfile();
  if (!profile || !['director', 'manager', 'hr'].includes(profile.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id, status } = await req.json();
  const req_ = leaveRequests.find((r) => r.id === id);
  if (!req_) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  req_.status = status;
  req_.reviewedBy = profile.fullName;
  req_.reviewedAt = new Date().toISOString();
  return NextResponse.json(req_);
}
