export const OPS_BASE = '/sphinxops';

/** Product name — Sphinx Healing field operations platform */
export const APP_NAME = 'Sphinx';
export const COMPANY_NAME = 'Sphinx Healing Services';

export const ROLES = ['director', 'hr', 'manager', 'employee'] as const;

export type OpsRole = (typeof ROLES)[number];

export const ROLE_LABELS: Record<OpsRole, string> = {
  director: 'Director',
  hr: 'HR',
  manager: 'Site Manager',
  employee: 'Field Staff',
};

export const ROLE_HOME: Record<OpsRole, string> = {
  director: `${OPS_BASE}/director`,
  hr: `${OPS_BASE}/hr`,
  manager: `${OPS_BASE}/manager`,
  employee: `${OPS_BASE}/employee`,
};

/** Site color coding — 6 locations */
export const SITE_COLORS = {
  main: '#22c55e',
  b: '#0ea5e9',
  c: '#a855f7',
  d: '#f97316',
  e: '#14b8a6',
  f: '#ec4899',
} as const;

export type SiteCode = keyof typeof SITE_COLORS;

export const PROGRAMS = [
  { id: 'group_care', label: 'Group Care' },
  { id: 'family_living', label: 'Family Living' },
  { id: 'pdd', label: 'PDD' },
  { id: 'tap', label: 'Transition to Adulthood' },
] as const;

export const VEHICLE_TYPES = [
  { id: 'company', label: 'Company vehicle', reimbursement: false },
  { id: 'personal', label: 'Personal vehicle', reimbursement: true },
] as const;

export const SESSION_COOKIE = 'sphinxops_session';
