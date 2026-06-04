export const OPS_BASE = '/sphinxops';

/** Product name — unified ops platform for Sphinx Healing Services */
export const APP_NAME = 'Sphinx Ops';
export const COMPANY_NAME = 'Sphinx Healing Services';
export const COMPANY_WEBSITE = 'https://sphinxhealing.org/';
export const LOGO_PATH = '/sphinx-healing-logo.png';

export const APP_TAGLINE =
  'Full-circle care operations — HR, fleet, CRM, payroll, and field programs in one platform built for social services.';

/** Capability areas shown on login and director hub (beyond generic BrightHR-style HR) */
export const PLATFORM_MODULES = [
  {
    id: 'hr',
    title: 'Workforce & scheduling',
    description: 'Shift planning, leave, approvals, and site-scoped manager views across 6 locations.',
    status: 'live' as const,
  },
  {
    id: 'fleet',
    title: 'Fleet management',
    description: 'Company vs personal vehicles, KM tracking, maintenance reminders, and reimbursement workflows.',
    status: 'live' as const,
  },
  {
    id: 'crm',
    title: 'Client & program CRM',
    description: 'Group Care, Family Living, PDD, and TAP — contacts, care plans, and seamless program transitions.',
    status: 'preview' as const,
  },
  {
    id: 'payroll',
    title: 'Auto payroll sync',
    description: 'Approved hours and mileage export to payroll — no re-keying from spreadsheets or BrightHR gaps.',
    status: 'preview' as const,
  },
  {
    id: 'visits',
    title: 'Field visit logs',
    description: 'Trauma-informed visit notes, punch in/out, and GPS-backed mileage for funder-ready reporting.',
    status: 'live' as const,
  },
  {
    id: 'reports',
    title: 'Compliance & funder reports',
    description: 'Director dashboards, volunteer hours, and program metrics aligned with sphinxhealing.org programs.',
    status: 'live' as const,
  },
];

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
