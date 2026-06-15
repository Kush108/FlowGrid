import type { Profile, Shift } from './types';

export function shiftsOverlap(
  a: Pick<Shift, 'startsAt' | 'endsAt'>,
  b: Pick<Shift, 'startsAt' | 'endsAt'>,
): boolean {
  const aStart = new Date(a.startsAt).getTime();
  const aEnd = new Date(a.endsAt).getTime();
  const bStart = new Date(b.startsAt).getTime();
  const bEnd = new Date(b.endsAt).getTime();
  return aStart < bEnd && bStart < aEnd;
}

export function isOpenShift(shift: Shift): boolean {
  return shift.assignmentType === 'open' && !shift.employeeId;
}

export function getEmployeeShifts(shifts: Shift[], employeeId: string): Shift[] {
  return shifts.filter((s) => s.employeeId === employeeId && s.status !== 'cancelled');
}

export function canClaimShift(
  shift: Shift,
  employeeShifts: Shift[],
): { ok: boolean; reason?: string } {
  if (!isOpenShift(shift)) {
    return { ok: false, reason: 'This shift is no longer available' };
  }
  if (shift.status === 'cancelled') {
    return { ok: false, reason: 'This shift was cancelled' };
  }
  for (const existing of employeeShifts) {
    if (shiftsOverlap(shift, existing)) {
      return {
        ok: false,
        reason: `Overlaps with "${existing.title}" (${formatTimeShort(existing.startsAt)}–${formatTimeShort(existing.endsAt)})`,
      };
    }
  }
  return { ok: true };
}

export function filterShiftsForRole(shifts: Shift[], profile: Profile): Shift[] {
  if (profile.role === 'manager' && profile.siteId) {
    return shifts.filter((s) => s.siteId === profile.siteId);
  }
  return shifts;
}

export function formatTimeShort(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' });
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' });
}
