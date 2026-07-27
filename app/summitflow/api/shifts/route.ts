import { NextRequest, NextResponse } from 'next/server';
import { shifts } from '@/lib/summitflow/shift-store';
import { canClaimShift, filterShiftsForRole, getEmployeeShifts, isOpenShift } from '@/lib/summitflow/shift-utils';
import { getCurrentProfile } from '@/lib/summitflow/session';
import { MOCK_SITES } from '@/lib/summitflow/mock-data';
import type { SiteCode } from '@/lib/summitflow/constants';
import type { AssignmentType, Shift } from '@/lib/summitflow/types';

function siteCodeFor(siteId: string): SiteCode {
  return (MOCK_SITES.find((s) => s.id === siteId)?.code ?? 'main') as SiteCode;
}

export async function GET(req: NextRequest) {
  const profile = await getCurrentProfile();
  if (!profile) return NextResponse.json({ error: 'Unauth' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const view = searchParams.get('view');

  let result = filterShiftsForRole([...shifts], profile);

  if (view === 'open' && profile.role === 'employee' && profile.siteId) {
    result = result.filter((s) => isOpenShift(s) && s.siteId === profile.siteId);
  } else if (view === 'mine' && profile.role === 'employee') {
    result = getEmployeeShifts(result, profile.id);
  } else if (view === 'open') {
    result = result.filter(isOpenShift);
  } else if (view === 'assigned') {
    result = result.filter((s) => s.assignmentType === 'assigned' && s.employeeId);
  }

  result.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const profile = await getCurrentProfile();
  if (!profile || !['director', 'manager', 'hr'].includes(profile.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const assignmentType = (body.assignmentType ?? 'assigned') as AssignmentType;

  if (profile.role === 'manager' && profile.siteId && body.siteId !== profile.siteId) {
    return NextResponse.json({ error: 'Managers can only post shifts for their site' }, { status: 403 });
  }

  const siteId = body.siteId as string;
  const record: Shift = {
    id: `sh-${Date.now()}`,
    employeeId: assignmentType === 'open' ? null : (body.employeeId as string),
    employeeName: assignmentType === 'open' ? null : (body.employeeName as string),
    siteId,
    siteCode: siteCodeFor(siteId),
    program: body.program,
    title: body.title,
    location: body.location,
    startsAt: body.startsAt,
    endsAt: body.endsAt,
    status: 'scheduled',
    requiresVisitLog: body.requiresVisitLog ?? true,
    notes: body.notes,
    assignmentType,
    postedBy: profile.fullName,
    postedAt: new Date().toISOString(),
  };

  if (assignmentType === 'assigned' && !record.employeeId) {
    return NextResponse.json({ error: 'Employee required for assigned shifts' }, { status: 400 });
  }

  shifts.unshift(record);
  return NextResponse.json(record);
}

export async function PATCH(req: NextRequest) {
  const profile = await getCurrentProfile();
  if (!profile) return NextResponse.json({ error: 'Unauth' }, { status: 401 });

  const body = await req.json();
  const { id, action } = body as { id: string; action: string };
  const shift = shifts.find((s) => s.id === id);
  if (!shift) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (action === 'claim') {
    if (profile.role !== 'employee') {
      return NextResponse.json({ error: 'Only field staff can claim shifts' }, { status: 403 });
    }
    if (profile.siteId && shift.siteId !== profile.siteId) {
      return NextResponse.json({ error: 'This shift is outside your site area' }, { status: 403 });
    }

    const mine = getEmployeeShifts(shifts, profile.id);
    const check = canClaimShift(shift, mine);
    if (!check.ok) return NextResponse.json({ error: check.reason }, { status: 409 });

    shift.employeeId = profile.id;
    shift.employeeName = profile.fullName;
    shift.assignmentType = 'assigned';
    shift.claimedAt = new Date().toISOString();
    return NextResponse.json(shift);
  }

  if (!['director', 'manager', 'hr'].includes(profile.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (profile.role === 'manager' && profile.siteId && shift.siteId !== profile.siteId) {
    return NextResponse.json({ error: 'Managers can only edit shifts at their site' }, { status: 403 });
  }

  if (action === 'delete') {
    const idx = shifts.findIndex((s) => s.id === id);
    if (idx >= 0) shifts.splice(idx, 1);
    return NextResponse.json({ ok: true });
  }

  if (action === 'update') {
    const assignmentType = (body.assignmentType ?? shift.assignmentType) as AssignmentType;
    const employeeId = assignmentType === 'open' ? null : (body.employeeId ?? shift.employeeId);
    const employeeName = assignmentType === 'open' ? null : (body.employeeName ?? shift.employeeName);

    if (assignmentType === 'assigned' && !employeeId) {
      return NextResponse.json({ error: 'Employee required for assigned shifts' }, { status: 400 });
    }

    const siteId = (body.siteId ?? shift.siteId) as string;
    Object.assign(shift, {
      employeeId,
      employeeName,
      siteId,
      siteCode: siteCodeFor(siteId),
      program: body.program ?? shift.program,
      title: body.title ?? shift.title,
      location: body.location ?? shift.location,
      startsAt: body.startsAt ?? shift.startsAt,
      endsAt: body.endsAt ?? shift.endsAt,
      notes: body.notes ?? shift.notes,
      assignmentType,
      requiresVisitLog: body.requiresVisitLog ?? shift.requiresVisitLog,
    });

    return NextResponse.json(shift);
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
