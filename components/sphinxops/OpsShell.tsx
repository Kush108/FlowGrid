'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  Users,
  Building2,
  FileBarChart,
  Settings,
  CalendarDays,
  CheckSquare,
  LogOut,
  Menu,
  X,
  Clock,
  Plane,
  Car,
  ClipboardList,
  Truck,
  Contact,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import type { Profile } from '@/lib/sphinxops/types';
import { OPS_BASE, APP_NAME, COMPANY_NAME, LOGO_PATH } from '@/lib/sphinxops/constants';
import { ThemeToggle } from './ThemeToggle';
import { NotificationBell } from './NotificationBell';

// ─── Types ────────────────────────────────────────────────────────────────────
type NavItem = { href: string; label: string; icon: React.ReactNode };

// ─── Nav config per role ──────────────────────────────────────────────────────
const NAV_BY_ROLE: Record<string, NavItem[]> = {
  director: [
    { href: `${OPS_BASE}/director`,           label: 'Dashboard',  icon: <LayoutDashboard size={17} /> },
    { href: `${OPS_BASE}/director/staff`,      label: 'All Staff',  icon: <Users size={17} /> },
    { href: `${OPS_BASE}/director/sites`,      label: 'Sites',      icon: <Building2 size={17} /> },
    { href: `${OPS_BASE}/director/schedule`,   label: 'Schedule',   icon: <CalendarDays size={17} /> },
    { href: `${OPS_BASE}/director/leave`,      label: 'Leave',      icon: <Plane size={17} /> },
    { href: `${OPS_BASE}/director/mileage`,    label: 'Mileage',    icon: <Car size={17} /> },
    { href: `${OPS_BASE}/director/fleet`,     label: 'Fleet',      icon: <Truck size={17} /> },
    { href: `${OPS_BASE}/director/crm`,       label: 'CRM',        icon: <Contact size={17} /> },
    { href: `${OPS_BASE}/director/payroll`,   label: 'Payroll',    icon: <Wallet size={17} /> },
    { href: `${OPS_BASE}/director/reports`,    label: 'Reports',    icon: <FileBarChart size={17} /> },
    { href: `${OPS_BASE}/director/settings`,   label: 'Settings',   icon: <Settings size={17} /> },
  ],
  hr: [
    { href: `${OPS_BASE}/hr`,                  label: 'Dashboard',  icon: <LayoutDashboard size={17} /> },
    { href: `${OPS_BASE}/hr/schedule`,         label: 'Schedule',   icon: <CalendarDays size={17} /> },
    { href: `${OPS_BASE}/hr/leave`,            label: 'Leave',      icon: <Plane size={17} /> },
    { href: `${OPS_BASE}/hr/approvals`,        label: 'Approvals',  icon: <CheckSquare size={17} /> },
    { href: `${OPS_BASE}/hr/staff`,            label: 'Staff',      icon: <Users size={17} /> },
    { href: `${OPS_BASE}/hr/reports`,          label: 'Reports',    icon: <FileBarChart size={17} /> },
  ],
  manager: [
    { href: `${OPS_BASE}/manager`,             label: 'Dashboard',  icon: <LayoutDashboard size={17} /> },
    { href: `${OPS_BASE}/manager/team`,        label: 'My Team',    icon: <Users size={17} /> },
    { href: `${OPS_BASE}/manager/schedule`,    label: 'Schedule',   icon: <CalendarDays size={17} /> },
    { href: `${OPS_BASE}/manager/approvals`,   label: 'Approvals',  icon: <CheckSquare size={17} /> },
    { href: `${OPS_BASE}/manager/mileage`,     label: 'Mileage',    icon: <Car size={17} /> },
    { href: `${OPS_BASE}/manager/leave`,       label: 'Leave',      icon: <Plane size={17} /> },
  ],
  employee: [
    { href: `${OPS_BASE}/employee`,            label: 'My Dashboard', icon: <LayoutDashboard size={17} /> },
    { href: `${OPS_BASE}/employee/shifts`,     label: 'My Shifts',    icon: <Clock size={17} /> },
    { href: `${OPS_BASE}/employee/mileage`,    label: 'Mileage',      icon: <Car size={17} /> },
    { href: `${OPS_BASE}/employee/leave`,      label: 'Request Leave', icon: <Plane size={17} /> },
    { href: `${OPS_BASE}/employee/visits`,     label: 'Visit Logs',   icon: <ClipboardList size={17} /> },
  ],
};

// ─── Role display labels & accent colors ──────────────────────────────────────
const ROLE_META: Record<string, { label: string; color: string }> = {
  director: { label: 'Director',  color: '#a78bfa' },
  hr:       { label: 'HR',        color: '#38bdf8' },
  manager:  { label: 'Manager',   color: '#22c55e' },
  employee: { label: 'Employee',  color: '#f59e0b' },
};

// ─── Initials avatar ──────────────────────────────────────────────────────────
function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('');
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'rgba(34,197,94,0.15)',
        border: '1.5px solid rgba(34,197,94,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.34,
        fontWeight: 600,
        color: 'var(--ops-green)',
        flexShrink: 0,
        letterSpacing: '0.02em',
      }}
    >
      {initials}
    </div>
  );
}

// ─── Sidebar content (shared between desktop + mobile drawer) ─────────────────
function SidebarContent({
  profile,
  nav,
  pathname,
  onNavigate,
  onLogout,
}: {
  profile: Profile;
  nav: NavItem[];
  pathname: string;
  onNavigate: () => void;
  onLogout: () => void;
}) {
  const roleMeta = ROLE_META[profile.role] ?? { label: profile.role, color: '#22c55e' };
  const firstName = profile.fullName.split(' ')[0];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'var(--ops-surface)',
        borderRight: '1px solid var(--ops-border)',
      }}
    >
      {/* Logo / brand */}
      <div
        style={{
          padding: '20px 18px 16px',
          borderBottom: '1px solid var(--ops-border)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '1.5px solid rgba(34,197,94,0.35)',
          }}
        >
          <Image src={LOGO_PATH} alt="" width={38} height={38} className="object-cover w-full h-full" />
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ops-text)', lineHeight: 1.2 }}>
            {COMPANY_NAME}
          </div>
          <div
            style={{
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--ops-muted)',
              marginTop: 2,
            }}
          >
            {APP_NAME}
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
        {nav.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== nav[0]?.href && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                margin: '1px 0',
                borderRadius: 8,
                fontSize: 13.5,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--ops-green)' : 'var(--ops-muted)',
                background: isActive ? 'rgba(34,197,94,0.10)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.12s ease',
                borderLeft: isActive ? '2.5px solid var(--ops-green)' : '2.5px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.04)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ops-text)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--ops-muted)';
                }
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div style={{ padding: '14px 16px', borderTop: '1px solid var(--ops-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <Avatar name={profile.fullName} size={34} />
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--ops-text)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {firstName}
            </div>
            <div
              style={{
                fontSize: 11,
                color: roleMeta.color,
                fontWeight: 500,
                marginTop: 1,
              }}
            >
              {roleMeta.label}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 7,
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid var(--ops-border)',
            background: 'transparent',
            color: 'var(--ops-muted)',
            fontSize: 13,
            cursor: 'pointer',
            transition: 'all 0.12s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(239,68,68,0.4)';
            (e.currentTarget as HTMLButtonElement).style.color = '#ef4444';
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.06)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--ops-border)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--ops-muted)';
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
          }}
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </div>
  );
}

// ─── Top bar ──────────────────────────────────────────────────────────────────
function TopBar({
  profile,
  pageTitle,
  onMobileMenuOpen,
  onLogout,
}: {
  profile: Profile;
  pageTitle: string;
  onMobileMenuOpen: () => void;
  onLogout: () => void;
}) {
  return (
    <header
      style={{
        height: 54,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        background: 'var(--ops-surface)',
        borderBottom: '1px solid var(--ops-border)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        flexShrink: 0,
      }}
    >
      {/* Left: mobile hamburger + breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          type="button"
          onClick={onMobileMenuOpen}
          aria-label="Open menu"
          style={{
            display: 'none', // shown via media query — see globals.css .ops-menu-btn
            padding: 6,
            borderRadius: 6,
            border: 'none',
            background: 'transparent',
            color: 'var(--ops-muted)',
            cursor: 'pointer',
          }}
          className="ops-menu-btn"
        >
          <Menu size={20} />
        </button>
        <div style={{ fontSize: 13, color: 'var(--ops-muted)' }}>
          {APP_NAME}
          <span style={{ margin: '0 6px', opacity: 0.4 }}>/</span>
          <span style={{ color: 'var(--ops-text)', fontWeight: 500 }}>{pageTitle}</span>
        </div>
      </div>

      {/* Right: notifications + theme toggle + avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <NotificationBell />
        <ThemeToggle />
        <Avatar name={profile.fullName} size={32} />
      </div>
    </header>
  );
}

// ─── Derive page title from pathname ─────────────────────────────────────────
function getPageTitle(pathname: string): string {
  const segment = pathname.split('/').pop() ?? '';
  const map: Record<string, string> = {
    director: 'Dashboard',
    manager: 'Dashboard',
    hr: 'Dashboard',
    employee: 'Dashboard',
    staff: 'All Staff',
    sites: 'Sites',
    schedule: 'Schedule',
    leave: 'Leave',
    mileage: 'Mileage',
    fleet: 'Fleet',
    crm: 'CRM',
    payroll: 'Payroll',
    reports: 'Reports',
    settings: 'Settings',
    approvals: 'Approvals',
    team: 'My Team',
    shifts: 'My Shifts',
    visits: 'Visit Logs',
  };
  return map[segment] ?? 'Dashboard';
}

// ─── Main OpsShell export ─────────────────────────────────────────────────────
export function OpsShell({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = NAV_BY_ROLE[profile.role] ?? [];
  const pageTitle = getPageTitle(pathname);

  async function logout() {
    await fetch(`${OPS_BASE}/api/auth/logout`, { method: 'POST' });
    router.push(`${OPS_BASE}/login`);
    router.refresh();
  }

  const sidebarProps = {
    profile,
    nav,
    pathname,
    onNavigate: () => setMobileOpen(false),
    onLogout: logout,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--ops-bg)' }}>
        {/* ── Desktop sidebar (fixed, always visible ≥1024px) ── */}
        <aside
          style={{
            width: 220,
            flexShrink: 0,
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 40,
            overflowY: 'auto',
          }}
          className="ops-sidebar-desktop"
        >
          <SidebarContent {...sidebarProps} />
        </aside>

        {/* ── Mobile drawer overlay ── */}
        {mobileOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              display: 'flex',
            }}
          >
            {/* backdrop */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(2px)',
              }}
              onClick={() => setMobileOpen(false)}
            />
            {/* drawer */}
            <aside
              style={{
                position: 'relative',
                width: 240,
                maxWidth: '85vw',
                height: '100%',
                zIndex: 1,
              }}
            >
              <SidebarContent {...sidebarProps} />
            </aside>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                zIndex: 2,
                width: 34,
                height: 34,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* ── Main content column ── */}
        <div
          className="ops-main-column"
          style={{
            flex: 1,
            marginLeft: 220, // matches sidebar width
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            minWidth: 0,
          }}
        >
          <TopBar
            profile={profile}
            pageTitle={pageTitle}
            onMobileMenuOpen={() => setMobileOpen(true)}
            onLogout={logout}
          />

          <main
            style={{
              flex: 1,
              padding: '28px 32px',
              maxWidth: 1400,
              width: '100%',
              margin: '0 auto',
              boxSizing: 'border-box',
            }}
          >
            {children}
          </main>
        </div>
      </div>
  );
}
