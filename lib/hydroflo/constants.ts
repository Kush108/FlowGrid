export const OPS_BASE = '/hydroflo';

/** Product name — unified ops platform for Hydroflo Heating & Cooling */
export const APP_NAME = 'Hydroflo Ops';
export const COMPANY_NAME = 'Hydroflo Heating & Cooling';
export const COMPANY_WEBSITE = 'https://flowgrid.ca/hydroflo';
export const LOGO_PATH = '';

export const APP_TAGLINE =
  'Dispatch, fleet, jobs, and payroll in one platform built for HVAC companies — not generic field service software.';

/** Capability areas shown on login and director hub */
export const PLATFORM_MODULES = [
  {
    id: 'dispatch',
    title: 'Dispatch & scheduling',
    description: 'Job board, technician routing, open-shift claiming, and zone-based manager views across 5 service areas.',
    status: 'live' as const,
  },
  {
    id: 'fleet',
    title: 'Fleet & mileage',
    description: 'Service vans, personal vehicles, KM per job, maintenance alerts, and CRA-ready reimbursement.',
    status: 'live' as const,
  },
  {
    id: 'jobs',
    title: 'Job & warranty CRM',
    description: 'Install, repair, maintenance contracts, and warranty callbacks — customer history in one place.',
    status: 'preview' as const,
  },
  {
    id: 'payroll',
    title: 'Payroll export',
    description: 'Approved hours, drive time, and callbacks export to payroll — no re-keying from whiteboards.',
    status: 'preview' as const,
  },
  {
    id: 'field',
    title: 'Field job logs',
    description: 'Punch in/out at job site, work order notes, parts used, and photos for every service call.',
    status: 'live' as const,
  },
  {
    id: 'reports',
    title: 'Seasonal & ops reports',
    description: 'Cold-snap surge dashboards, callback rates, revenue per tech, and Alberta compliance exports.',
    status: 'live' as const,
  },
];

export const ROLES = ['director', 'hr', 'manager', 'employee'] as const;

export type OpsRole = (typeof ROLES)[number];

export const ROLE_LABELS: Record<OpsRole, string> = {
  director: 'Owner / GM',
  hr: 'Office Manager',
  manager: 'Dispatch Lead',
  employee: 'Technician',
};

export const ROLE_HOME: Record<OpsRole, string> = {
  director: `${OPS_BASE}/director`,
  hr: `${OPS_BASE}/hr`,
  manager: `${OPS_BASE}/manager`,
  employee: `${OPS_BASE}/employee`,
};

/** Service zone color coding — 5 Edmonton-area zones */
export const SITE_COLORS = {
  main: '#0ea5e9',
  b: '#f97316',
  c: '#22c55e',
  d: '#a855f7',
  e: '#14b8a6',
  f: '#ec4899',
} as const;

export type SiteCode = keyof typeof SITE_COLORS;

export const PROGRAMS = [
  { id: 'furnace', label: 'Furnace Install' },
  { id: 'ac', label: 'AC Service' },
  { id: 'emergency', label: 'Emergency Repair' },
  { id: 'maintenance', label: 'Maintenance Plan' },
] as const;

export const VEHICLE_TYPES = [
  { id: 'company', label: 'Service van', reimbursement: false },
  { id: 'personal', label: 'Personal vehicle', reimbursement: true },
] as const;

export const SESSION_COOKIE = 'hydroflo_session';
