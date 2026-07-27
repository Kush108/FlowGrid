import type { OpsRole, SiteCode } from './constants';

export interface Site {
  id: string;
  code: SiteCode;
  name: string;
  city: string;
  color: string;
  managerName: string;
  staffTotal: number;
}

export interface Profile {
  id: string;
  fullName: string;
  email: string;
  role: OpsRole;
  siteId: string | null;
  siteCode?: SiteCode;
  phone?: string;
}

export type ShiftStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
export type AssignmentType = 'assigned' | 'open';

export interface Shift {
  id: string;
  employeeId: string | null;
  employeeName: string | null;
  siteId: string;
  siteCode: SiteCode;
  program: string;
  title: string;
  location: string;
  startsAt: string;
  endsAt: string;
  status: ShiftStatus;
  requiresVisitLog: boolean;
  notes?: string;
  assignmentType: AssignmentType;
  postedBy?: string;
  postedAt?: string;
  claimedAt?: string;
}

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface MileageEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  siteCode: SiteCode;
  shiftId: string;
  vehicleType: 'company' | 'personal';
  kmTotal: number;
  reimbursementEligible: boolean;
  reimbursementAmount: number;
  status: ApprovalStatus;
  weekOf: string;
}

export interface TimeEntry {
  id: string;
  employeeId: string;
  shiftId: string;
  punchedInAt: string | null;
  punchedOutAt: string | null;
  visitLog: string | null;
  visitLogSubmittedAt: string | null;
}

export interface ActivityEvent {
  id: string;
  message: string;
  siteCode: SiteCode;
  createdAt: string;
  type: 'shift' | 'mileage' | 'visit' | 'alert';
}

export interface DirectorStats {
  staffOnShift: number;
  kmThisWeek: number;
  pendingApprovals: number;
  activeSites: number;
}

export interface SiteOverview extends Site {
  staffOnShift: number;
}

export interface OpsNotification {
  id: string;
  title: string;
  message: string;
  type: 'shift' | 'mileage' | 'leave' | 'visit' | 'alert';
  createdAt: string;
  read: boolean;
  href?: string;
  siteCode?: SiteCode;
}

export interface LeaveRequest {
  id: string;
  staffId: string;
  staffName: string;
  siteId: string | null;
  type: 'vacation' | 'sick' | 'personal';
  startDate: string;
  endDate: string;
  note?: string;
  status: 'pending' | 'approved' | 'denied';
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
}
