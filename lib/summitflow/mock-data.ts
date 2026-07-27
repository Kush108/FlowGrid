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
  { id: 's-main', code: 'main', name: 'Edmonton Central', city: 'Edmonton', color: SITE_COLORS.main, managerName: 'Mike R.', staffTotal: 18 },
  { id: 's-b', code: 'b', name: 'North Zone', city: 'Edmonton', color: SITE_COLORS.b, managerName: 'Lisa K.', staffTotal: 14 },
  { id: 's-c', code: 'c', name: 'South Zone', city: 'Edmonton', color: SITE_COLORS.c, managerName: 'Dev P.', staffTotal: 12 },
  { id: 's-d', code: 'd', name: 'Sherwood Park', city: 'Sherwood Park', color: SITE_COLORS.d, managerName: 'Chris M.', staffTotal: 10 },
  { id: 's-e', code: 'e', name: 'St. Albert', city: 'St. Albert', color: SITE_COLORS.e, managerName: 'Jen W.', staffTotal: 11 },
  { id: 's-f', code: 'f', name: 'Leduc / Beaumont', city: 'Leduc', color: SITE_COLORS.f, managerName: 'Tom H.', staffTotal: 9 },
];

export const MOCK_PROFILES: Profile[] = [
  { id: 'p-dir', fullName: 'Dave S.', email: 'dave@summitflow.demo', role: 'director', siteId: null },
  { id: 'p-hr', fullName: 'Karen L.', email: 'office@summitflow.demo', role: 'hr', siteId: null },
  { id: 'p-mgr-main', fullName: 'Mike R.', email: 'mike@summitflow.demo', role: 'manager', siteId: 's-main', siteCode: 'main' },
  { id: 'p-mgr-b', fullName: 'Lisa K.', email: 'lisa@summitflow.demo', role: 'manager', siteId: 's-b', siteCode: 'b' },
  { id: 'p-emp-1', fullName: 'Jake T.', email: 'jake@summitflow.demo', role: 'employee', siteId: 's-main', siteCode: 'main' },
  { id: 'p-emp-2', fullName: 'Marcus B.', email: 'marcus@summitflow.demo', role: 'employee', siteId: 's-b', siteCode: 'b' },
  { id: 'p-emp-3', fullName: 'Ryan C.', email: 'ryan@summitflow.demo', role: 'employee', siteId: 's-c', siteCode: 'c' },
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
    employeeName: 'Jake T.',
    siteId: 's-main',
    siteCode: 'main',
    program: 'furnace',
    title: 'Furnace install — 2-stage Lennox',
    location: '8421 119 St NW, Edmonton',
    startsAt: `${dayPrefix}T08:00:00`,
    endsAt: `${dayPrefix}T14:00:00`,
    status: 'in_progress',
    requiresVisitLog: true,
    notes: 'Customer: Henderson. Old unit removal + new install.',
    assignmentType: 'assigned',
  },
  {
    id: 'sh-2',
    employeeId: 'p-emp-1',
    employeeName: 'Jake T.',
    siteId: 's-main',
    siteCode: 'main',
    program: 'maintenance',
    title: 'Annual tune-up — maintenance plan',
    location: '12405 51 Ave NW, Edmonton',
    startsAt: `${dayPrefix}T14:30:00`,
    endsAt: `${dayPrefix}T16:00:00`,
    status: 'scheduled',
    requiresVisitLog: true,
    assignmentType: 'assigned',
  },
  {
    id: 'sh-3',
    employeeId: 'p-emp-2',
    employeeName: 'Marcus B.',
    siteId: 's-b',
    siteCode: 'b',
    program: 'emergency',
    title: 'No heat — furnace failure (-28°C)',
    location: '15603 97 St NW, Edmonton',
    startsAt: `${dayPrefix}T07:30:00`,
    endsAt: `${dayPrefix}T10:30:00`,
    status: 'completed',
    requiresVisitLog: true,
    notes: 'Ignitor replaced. Warranty part on file.',
    assignmentType: 'assigned',
  },
  {
    id: 'sh-4',
    employeeId: 'p-emp-3',
    employeeName: 'Ryan C.',
    siteId: 's-c',
    siteCode: 'c',
    program: 'ac',
    title: 'AC diagnostic — summer prep',
    location: '4520 Calgary Trail, Edmonton',
    startsAt: `${dayPrefix}T09:00:00`,
    endsAt: `${dayPrefix}T11:00:00`,
    status: 'in_progress',
    requiresVisitLog: true,
    assignmentType: 'assigned',
  },
  {
    id: 'sh-5',
    employeeId: 'p-emp-3',
    employeeName: 'Ryan C.',
    siteId: 's-d',
    siteCode: 'd',
    program: 'furnace',
    title: 'Ductless mini-split install',
    location: '321 Baseline Rd, Sherwood Park',
    startsAt: `${dayPrefix}T13:00:00`,
    endsAt: `${dayPrefix}T17:00:00`,
    status: 'scheduled',
    requiresVisitLog: true,
    assignmentType: 'assigned',
  },
  {
    id: 'sh-open-1',
    employeeId: null,
    employeeName: null,
    siteId: 's-main',
    siteCode: 'main',
    program: 'emergency',
    title: 'Emergency callback — warranty re-visit',
    location: '8421 119 St NW, Edmonton',
    startsAt: `${dayPrefix}T16:00:00`,
    endsAt: `${dayPrefix}T18:00:00`,
    status: 'scheduled',
    requiresVisitLog: true,
    notes: 'Customer reports noise after yesterday install. First tech to claim.',
    assignmentType: 'open',
    postedBy: 'Karen L.',
    postedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'sh-open-2',
    employeeId: null,
    employeeName: null,
    siteId: 's-b',
    siteCode: 'b',
    program: 'maintenance',
    title: 'Maintenance route — 4 homes (North Zone)',
    location: 'North Edmonton cluster',
    startsAt: `${dayPrefix}T08:00:00`,
    endsAt: `${dayPrefix}T16:00:00`,
    status: 'scheduled',
    requiresVisitLog: true,
    notes: 'Route sheet in dispatch. Van #7 available.',
    assignmentType: 'open',
    postedBy: 'Lisa K.',
    postedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'sh-open-3',
    employeeId: null,
    employeeName: null,
    siteId: 's-e',
    siteCode: 'e',
    program: 'furnace',
    title: 'Boiler service — commercial client',
    location: 'St. Albert Industrial Park',
    startsAt: `${dayPrefix}T10:00:00`,
    endsAt: `${dayPrefix}T14:00:00`,
    status: 'scheduled',
    requiresVisitLog: true,
    assignmentType: 'open',
    postedBy: 'Karen L.',
    postedAt: new Date(Date.now() - 1800000).toISOString(),
  },
];

export const MOCK_TIME_ENTRIES: TimeEntry[] = [
  {
    id: 'te-1',
    employeeId: 'p-emp-1',
    shiftId: 'sh-1',
    punchedInAt: `${dayPrefix}T07:58:00`,
    punchedOutAt: null,
    visitLog: null,
    visitLogSubmittedAt: null,
  },
  {
    id: 'te-2',
    employeeId: 'p-emp-2',
    shiftId: 'sh-3',
    punchedInAt: `${dayPrefix}T07:28:00`,
    punchedOutAt: `${dayPrefix}T10:15:00`,
    visitLog: 'Ignitor assembly replaced. System tested — heat restored. Customer signed off.',
    visitLogSubmittedAt: `${dayPrefix}T10:16:00`,
  },
];

export const MOCK_MILEAGE: MileageEntry[] = [
  {
    id: 'mi-1',
    employeeId: 'p-emp-1',
    employeeName: 'Jake T.',
    siteCode: 'main',
    shiftId: 'sh-1',
    vehicleType: 'company',
    kmTotal: 18,
    reimbursementEligible: false,
    reimbursementAmount: 0,
    status: 'approved',
    weekOf: dayPrefix,
  },
  {
    id: 'mi-2',
    employeeId: 'p-emp-2',
    employeeName: 'Marcus B.',
    siteCode: 'b',
    shiftId: 'sh-3',
    vehicleType: 'personal',
    kmTotal: 34,
    reimbursementEligible: true,
    reimbursementAmount: 23.8,
    status: 'pending',
    weekOf: dayPrefix,
  },
  {
    id: 'mi-3',
    employeeId: 'p-emp-3',
    employeeName: 'Ryan C.',
    siteCode: 'c',
    shiftId: 'sh-4',
    vehicleType: 'company',
    kmTotal: 12,
    reimbursementEligible: false,
    reimbursementAmount: 0,
    status: 'pending',
    weekOf: dayPrefix,
  },
];

export const MOCK_ACTIVITY: ActivityEvent[] = [
  { id: 'a1', message: 'Jake T. punched in — Furnace install (Edmonton Central)', siteCode: 'main', createdAt: new Date(Date.now() - 120000).toISOString(), type: 'shift' },
  { id: 'a2', message: 'Marcus B. submitted mileage — 34 km personal vehicle (pending)', siteCode: 'b', createdAt: new Date(Date.now() - 300000).toISOString(), type: 'mileage' },
  { id: 'a3', message: 'Ryan C. — AC diagnostic started, van #4 en route', siteCode: 'c', createdAt: new Date(Date.now() - 600000).toISOString(), type: 'shift' },
  { id: 'a4', message: 'Job log approved — Emergency no-heat call (Marcus B.)', siteCode: 'b', createdAt: new Date(Date.now() - 900000).toISOString(), type: 'visit' },
  { id: 'a5', message: 'Dispatch posted open shift — Warranty callback, Edmonton Central', siteCode: 'main', createdAt: new Date(Date.now() - 1200000).toISOString(), type: 'shift' },
];

export const MOCK_NOTIFICATIONS: OpsNotification[] = [
  {
    id: 'n1',
    title: 'Mileage pending approval',
    message: 'Marcus B. submitted 34 km (personal vehicle) — Emergency no-heat call',
    type: 'mileage',
    createdAt: new Date(Date.now() - 180000).toISOString(),
    read: false,
    href: '/summitflow/hr/approvals',
    siteCode: 'b',
  },
  {
    id: 'n2',
    title: 'Cold snap surge',
    message: '12 emergency calls queued — 3 open shifts need technicians',
    type: 'alert',
    createdAt: new Date(Date.now() - 420000).toISOString(),
    read: false,
    href: '/summitflow/manager/team',
    siteCode: 'main',
  },
  {
    id: 'n3',
    title: 'Job log submitted',
    message: 'Marcus B. completed emergency furnace repair — customer signed off',
    type: 'visit',
    createdAt: new Date(Date.now() - 720000).toISOString(),
    read: false,
    href: '/summitflow/director/reports',
    siteCode: 'b',
  },
  {
    id: 'n4',
    title: 'Time-off request',
    message: 'Ryan C. requested vacation Jul 14–18 (pending review)',
    type: 'leave',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    read: true,
    href: '/summitflow/hr/leave',
    siteCode: 'c',
  },
  {
    id: 'n6',
    title: 'Open job posted',
    message: 'Warranty callback at 119 St — 4 PM to 6 PM. First tech to claim gets it.',
    type: 'shift',
    createdAt: new Date(Date.now() - 900000).toISOString(),
    read: false,
    href: '/summitflow/employee/shifts?tab=open',
    siteCode: 'main',
  },
  {
    id: 'n5',
    title: 'Job assigned',
    message: 'Ductless install scheduled for Ryan C. tomorrow 1 PM — Sherwood Park',
    type: 'shift',
    createdAt: new Date(Date.now() - 5400000).toISOString(),
    read: true,
    href: '/summitflow/employee/shifts',
    siteCode: 'd',
  },
];

export const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'lv-1',
    staffId: 'p-emp-3',
    staffName: 'Ryan C.',
    siteId: 's-c',
    type: 'vacation',
    startDate: '2026-07-14',
    endDate: '2026-07-18',
    note: 'Family camping trip — coverage with Jake T.',
    status: 'pending',
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'lv-2',
    staffId: 'p-emp-2',
    staffName: 'Marcus B.',
    siteId: 's-b',
    type: 'sick',
    startDate: '2026-06-02',
    endDate: '2026-06-03',
    note: 'Flu — doctor note attached',
    status: 'approved',
    submittedAt: new Date(Date.now() - 172800000).toISOString(),
    reviewedBy: 'Karen L.',
    reviewedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export function getDirectorStats(): DirectorStats {
  return {
    staffOnShift: 38,
    kmThisWeek: 4120,
    pendingApprovals: MOCK_MILEAGE.filter((m) => m.status === 'pending').length + 2,
    activeSites: 6,
  };
}

export function getSiteOverviews(): SiteOverview[] {
  const onShift = [11, 9, 7, 6, 8, 5];
  return MOCK_SITES.map((s, i) => ({
    ...s,
    staffOnShift: onShift[i] ?? 7,
  }));
}

export function getProfileById(id: string): Profile | undefined {
  return MOCK_PROFILES.find((p) => p.id === id);
}

export function getDemoProfile(role: string, profileId?: string): Profile | undefined {
  if (profileId) return getProfileById(profileId);
  return MOCK_PROFILES.find((p) => p.role === role);
}
