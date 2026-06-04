import { SITE_COLORS } from './constants';
import type {
  ActivityEvent,
  DirectorStats,
  LeaveRequest,
  MileageEntry,
  OpsNotification,
  Profile,
  Shift,
  Site,
  SiteOverview,
  TimeEntry,
} from './types';

export const MOCK_SITES: Site[] = [
  { id: 's-main', code: 'main', name: 'Edmonton Main', city: 'Edmonton', color: SITE_COLORS.main, managerName: 'Marcus T.', staffTotal: 14 },
  { id: 's-b', code: 'b', name: 'North Site', city: 'Edmonton', color: SITE_COLORS.b, managerName: 'Sarah W.', staffTotal: 12 },
  { id: 's-c', code: 'c', name: 'South Site', city: 'Leduc', color: SITE_COLORS.c, managerName: 'Jordan K.', staffTotal: 11 },
  { id: 's-d', code: 'd', name: 'East Site', city: 'Sherwood Park', color: SITE_COLORS.d, managerName: 'Amélie L.', staffTotal: 10 },
  { id: 's-e', code: 'e', name: 'West Site', city: 'St. Albert', color: SITE_COLORS.e, managerName: 'Kevin B.', staffTotal: 13 },
  { id: 's-f', code: 'f', name: 'Central Site', city: 'Edmonton', color: SITE_COLORS.f, managerName: 'Danielle M.', staffTotal: 12 },
];

export const MOCK_PROFILES: Profile[] = [
  { id: 'p-dir', fullName: 'Stephanie R.', email: 'stephanie@sphinxhealing.demo', role: 'director', siteId: null },
  { id: 'p-hr', fullName: 'Priya N.', email: 'hr@sphinxhealing.demo', role: 'hr', siteId: null },
  { id: 'p-mgr-main', fullName: 'Marcus T.', email: 'marcus@sphinxhealing.demo', role: 'manager', siteId: 's-main', siteCode: 'main' },
  { id: 'p-mgr-b', fullName: 'Sarah W.', email: 'sarah@sphinxhealing.demo', role: 'manager', siteId: 's-b', siteCode: 'b' },
  { id: 'p-emp-1', fullName: 'Danielle M.', email: 'danielle@sphinxhealing.demo', role: 'employee', siteId: 's-f', siteCode: 'f' },
  { id: 'p-emp-2', fullName: 'Tyler R.', email: 'tyler@sphinxhealing.demo', role: 'employee', siteId: 's-main', siteCode: 'main' },
  { id: 'p-emp-3', fullName: 'James O.', email: 'james@sphinxhealing.demo', role: 'employee', siteId: 's-b', siteCode: 'b' },
];

const today = new Date();
const y = today.getFullYear();
const m = String(today.getMonth() + 1).padStart(2, '0');
const d = String(today.getDate()).padStart(2, '0');
const dayPrefix = `${y}-${m}-${d}`;

export const MOCK_SHIFTS: Shift[] = [
  {
    id: 'sh-1',
    employeeId: 'p-emp-1',
    employeeName: 'Danielle M.',
    siteId: 's-f',
    siteCode: 'f',
    program: 'group_care',
    title: 'Group Home — Morning shift',
    location: '8712 118 Ave NW, Edmonton',
    startsAt: `${dayPrefix}T07:00:00`,
    endsAt: `${dayPrefix}T15:00:00`,
    status: 'completed',
    requiresVisitLog: true,
    notes: 'School support + life skills',
  },
  {
    id: 'sh-2',
    employeeId: 'p-emp-1',
    employeeName: 'Danielle M.',
    siteId: 's-f',
    siteCode: 'f',
    program: 'group_care',
    title: 'Community outing — Borden Park',
    location: '7507 Borden Park Rd NW',
    startsAt: `${dayPrefix}T10:30:00`,
    endsAt: `${dayPrefix}T12:30:00`,
    status: 'in_progress',
    requiresVisitLog: true,
  },
  {
    id: 'sh-3',
    employeeId: 'p-emp-1',
    employeeName: 'Danielle M.',
    siteId: 's-b',
    siteCode: 'b',
    program: 'family_living',
    title: 'Reunification home visit',
    location: '2311 34 St SE, Edmonton',
    startsAt: `${dayPrefix}T13:30:00`,
    endsAt: `${dayPrefix}T15:30:00`,
    status: 'scheduled',
    requiresVisitLog: true,
  },
  {
    id: 'sh-4',
    employeeId: 'p-emp-2',
    employeeName: 'Tyler R.',
    siteId: 's-main',
    siteCode: 'main',
    program: 'group_care',
    title: 'Group Care — AM shift',
    location: 'Edmonton Main residence',
    startsAt: `${dayPrefix}T07:00:00`,
    endsAt: `${dayPrefix}T15:00:00`,
    status: 'scheduled',
    requiresVisitLog: true,
  },
  {
    id: 'sh-5',
    employeeId: 'p-emp-3',
    employeeName: 'James O.',
    siteId: 's-b',
    siteCode: 'b',
    program: 'pdd',
    title: 'PDD community connection',
    location: 'Downtown Edmonton',
    startsAt: `${dayPrefix}T09:00:00`,
    endsAt: `${dayPrefix}T17:00:00`,
    status: 'in_progress',
    requiresVisitLog: true,
  },
];

export const MOCK_TIME_ENTRIES: TimeEntry[] = [
  {
    id: 'te-1',
    employeeId: 'p-emp-1',
    shiftId: 'sh-1',
    punchedInAt: `${dayPrefix}T06:58:00`,
    punchedOutAt: `${dayPrefix}T10:02:00`,
    visitLog: 'Morning routine complete. No incidents. Youth engaged in schooling support.',
    visitLogSubmittedAt: `${dayPrefix}T10:03:00`,
  },
  {
    id: 'te-2',
    employeeId: 'p-emp-1',
    shiftId: 'sh-2',
    punchedInAt: `${dayPrefix}T10:28:00`,
    punchedOutAt: null,
    visitLog: null,
    visitLogSubmittedAt: null,
  },
];

export const MOCK_MILEAGE: MileageEntry[] = [
  {
    id: 'mi-1',
    employeeId: 'p-emp-1',
    employeeName: 'Danielle M.',
    siteCode: 'f',
    shiftId: 'sh-1',
    vehicleType: 'company',
    kmTotal: 14,
    reimbursementEligible: false,
    reimbursementAmount: 0,
    status: 'approved',
    weekOf: dayPrefix,
  },
  {
    id: 'mi-2',
    employeeId: 'p-emp-3',
    employeeName: 'James O.',
    siteCode: 'b',
    shiftId: 'sh-5',
    vehicleType: 'personal',
    kmTotal: 22,
    reimbursementEligible: true,
    reimbursementAmount: 15.4,
    status: 'pending',
    weekOf: dayPrefix,
  },
  {
    id: 'mi-3',
    employeeId: 'p-emp-2',
    employeeName: 'Tyler R.',
    siteCode: 'main',
    shiftId: 'sh-4',
    vehicleType: 'personal',
    kmTotal: 0,
    reimbursementEligible: true,
    reimbursementAmount: 0,
    status: 'pending',
    weekOf: dayPrefix,
  },
];

export const MOCK_ACTIVITY: ActivityEvent[] = [
  { id: 'a1', message: 'Danielle M. punched in — Community outing (Central Site)', siteCode: 'f', createdAt: new Date(Date.now() - 120000).toISOString(), type: 'shift' },
  { id: 'a2', message: 'James O. submitted mileage — 22 km personal vehicle (pending)', siteCode: 'b', createdAt: new Date(Date.now() - 300000).toISOString(), type: 'mileage' },
  { id: 'a3', message: 'Tyler R. — shift started 7 AM, no punch-in yet', siteCode: 'main', createdAt: new Date(Date.now() - 600000).toISOString(), type: 'alert' },
  { id: 'a4', message: 'Visit log approved — Group Home AM (Danielle M.)', siteCode: 'f', createdAt: new Date(Date.now() - 900000).toISOString(), type: 'visit' },
  { id: 'a5', message: 'HR assigned shift — Family Living visit tomorrow (Danielle M.)', siteCode: 'b', createdAt: new Date(Date.now() - 1200000).toISOString(), type: 'shift' },
];

export const MOCK_NOTIFICATIONS: OpsNotification[] = [
  {
    id: 'n1',
    title: 'Mileage pending approval',
    message: 'James O. submitted 22 km (personal vehicle) — North Site PDD shift',
    type: 'mileage',
    createdAt: new Date(Date.now() - 180000).toISOString(),
    read: false,
    href: '/sphinxops/hr/approvals',
    siteCode: 'b',
  },
  {
    id: 'n2',
    title: 'Missing punch-in',
    message: 'Tyler R. has a 7 AM Group Care shift at Edmonton Main with no punch-in yet',
    type: 'alert',
    createdAt: new Date(Date.now() - 420000).toISOString(),
    read: false,
    href: '/sphinxops/manager/team',
    siteCode: 'main',
  },
  {
    id: 'n3',
    title: 'Visit log submitted',
    message: 'Danielle M. completed morning Group Care shift — visit note on file',
    type: 'visit',
    createdAt: new Date(Date.now() - 720000).toISOString(),
    read: false,
    href: '/sphinxops/director/reports',
    siteCode: 'f',
  },
  {
    id: 'n4',
    title: 'Leave request',
    message: 'Tyler R. requested vacation Jun 10–14 (pending HR review)',
    type: 'leave',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    read: true,
    href: '/sphinxops/hr/leave',
    siteCode: 'main',
  },
  {
    id: 'n5',
    title: 'Shift assigned',
    message: 'Family Living home visit scheduled for Danielle M. tomorrow 1:30 PM',
    type: 'shift',
    createdAt: new Date(Date.now() - 5400000).toISOString(),
    read: true,
    href: '/sphinxops/employee/shifts',
    siteCode: 'b',
  },
];

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'lv-1',
    staffId: 'p-emp-2',
    staffName: 'Tyler R.',
    siteId: 's-main',
    type: 'vacation',
    startDate: '2026-06-10',
    endDate: '2026-06-14',
    note: 'Family trip — coverage arranged with James O.',
    status: 'pending',
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'lv-2',
    staffId: 'p-emp-3',
    staffName: 'James O.',
    siteId: 's-b',
    type: 'sick',
    startDate: '2026-05-28',
    endDate: '2026-05-29',
    note: 'Doctor appointment',
    status: 'approved',
    submittedAt: new Date(Date.now() - 172800000).toISOString(),
    reviewedBy: 'Priya N.',
    reviewedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export function getDirectorStats(): DirectorStats {
  return {
    staffOnShift: 47,
    kmThisWeek: 2847,
    pendingApprovals: MOCK_MILEAGE.filter((m) => m.status === 'pending').length + 3,
    activeSites: 6,
  };
}

export function getSiteOverviews(): SiteOverview[] {
  const onShift = [9, 7, 8, 6, 9, 8];
  return MOCK_SITES.map((s, i) => ({
    ...s,
    staffOnShift: onShift[i] ?? 8,
  }));
}

export function getProfileById(id: string): Profile | undefined {
  return MOCK_PROFILES.find((p) => p.id === id);
}

export function getDemoProfile(role: string, profileId?: string): Profile | undefined {
  if (profileId) return getProfileById(profileId);
  return MOCK_PROFILES.find((p) => p.role === role);
}
