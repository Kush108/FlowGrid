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
import { useEffect, useState } from 'react';
import type { Profile } from '@/lib/sphinxops/types';
import { OPS_BASE, APP_NAME, COMPANY_NAME, LOGO_PATH } from '@/lib/sphinxops/constants';
import { ThemeToggle } from './ThemeToggle';
import { NotificationBell } from './NotificationBell';
import { MobileBottomNav } from './MobileBottomNav';

type NavItem = { href: string; label: string; icon: React.ReactNode; shortLabel?: string };

const NAV_BY_ROLE: Record<string, NavItem[]> = {
  director: [
    { href: `${OPS_BASE}/director`, label: 'Dashboard', shortLabel: 'Home', icon: <LayoutDashboard size={20} /> },
    { href: `${OPS_BASE}/director/staff`, label: 'All Staff', shortLabel: 'Staff', icon: <Users size={20} /> },
    { href: `${OPS_BASE}/director/sites`, label: 'Sites', icon: <Building2 size={20} /> },
    { href: `${OPS_BASE}/director/schedule`, label: 'Schedule', icon: <CalendarDays size={20} /> },
    { href: `${OPS_BASE}/director/leave`, label: 'Leave', icon: <Plane size={20} /> },
    { href: `${OPS_BASE}/director/mileage`, label: 'Mileage', icon: <Car size={20} /> },
    { href: `${OPS_BASE}/director/fleet`, label: 'Fleet', icon: <Truck size={20} /> },
    { href: `${OPS_BASE}/director/crm`, label: 'CRM', icon: <Contact size={20} /> },
    { href: `${OPS_BASE}/director/payroll`, label: 'Payroll', icon: <Wallet size={20} /> },
    { href: `${OPS_BASE}/director/reports`, label: 'Reports', icon: <FileBarChart size={20} /> },
    { href: `${OPS_BASE}/director/settings`, label: 'Settings', icon: <Settings size={20} /> },
  ],
  hr: [
    { href: `${OPS_BASE}/hr`, label: 'Dashboard', shortLabel: 'Home', icon: <LayoutDashboard size={20} /> },
    { href: `${OPS_BASE}/hr/schedule`, label: 'Schedule', icon: <CalendarDays size={20} /> },
    { href: `${OPS_BASE}/hr/leave`, label: 'Leave', icon: <Plane size={20} /> },
    { href: `${OPS_BASE}/hr/approvals`, label: 'Approvals', icon: <CheckSquare size={20} /> },
    { href: `${OPS_BASE}/hr/staff`, label: 'Staff', icon: <Users size={20} /> },
    { href: `${OPS_BASE}/hr/reports`, label: 'Reports', icon: <FileBarChart size={20} /> },
  ],
  manager: [
    { href: `${OPS_BASE}/manager`, label: 'Dashboard', shortLabel: 'Home', icon: <LayoutDashboard size={20} /> },
    { href: `${OPS_BASE}/manager/team`, label: 'My Team', shortLabel: 'Team', icon: <Users size={20} /> },
    { href: `${OPS_BASE}/manager/schedule`, label: 'Schedule', icon: <CalendarDays size={20} /> },
    { href: `${OPS_BASE}/manager/approvals`, label: 'Approvals', icon: <CheckSquare size={20} /> },
    { href: `${OPS_BASE}/manager/mileage`, label: 'Mileage', icon: <Car size={20} /> },
    { href: `${OPS_BASE}/manager/leave`, label: 'Leave', icon: <Plane size={20} /> },
  ],
  employee: [
    { href: `${OPS_BASE}/employee`, label: 'Today', shortLabel: 'Today', icon: <LayoutDashboard size={20} /> },
    { href: `${OPS_BASE}/employee/shifts`, label: 'Shifts', icon: <Clock size={20} /> },
    { href: `${OPS_BASE}/employee/mileage`, label: 'Mileage', icon: <Car size={20} /> },
    { href: `${OPS_BASE}/employee/leave`, label: 'Leave', shortLabel: 'Leave', icon: <Plane size={20} /> },
    { href: `${OPS_BASE}/employee/visits`, label: 'Visits', icon: <ClipboardList size={20} /> },
  ],
};

const ROLE_META: Record<string, { label: string; color: string }> = {
  director: { label: 'Director', color: '#a78bfa' },
  hr: { label: 'HR', color: '#38bdf8' },
  manager: { label: 'Manager', color: '#22c55e' },
  employee: { label: 'Field Staff', color: '#f59e0b' },
};

function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? '')
    .join('');
  return (
    <div
      className="ops-avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
      }}
    >
      {initials}
    </div>
  );
}

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
    <div className="ops-sidebar-inner">
      <div className="ops-sidebar-brand">
        <div className="ops-sidebar-logo">
          <Image src={LOGO_PATH} alt="" width={38} height={38} className="object-cover w-full h-full" />
        </div>
        <div>
          <div className="ops-sidebar-company">{COMPANY_NAME}</div>
          <div className="ops-sidebar-app">{APP_NAME}</div>
        </div>
      </div>

      <nav className="ops-sidebar-nav">
        {nav.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== nav[0]?.href && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`ops-sidebar-link${isActive ? ' active' : ''}`}
            >
              <span className="ops-sidebar-link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="ops-sidebar-footer">
        <div className="ops-sidebar-user">
          <Avatar name={profile.fullName} size={34} />
          <div className="ops-sidebar-user-meta">
            <div className="ops-sidebar-user-name">{firstName}</div>
            <div className="ops-sidebar-user-role" style={{ color: roleMeta.color }}>
              {roleMeta.label}
            </div>
          </div>
        </div>
        <button type="button" onClick={onLogout} className="ops-sidebar-logout">
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </div>
  );
}

function TopBar({
  profile,
  pageTitle,
  onMobileMenuOpen,
}: {
  profile: Profile;
  pageTitle: string;
  onMobileMenuOpen: () => void;
}) {
  return (
    <header className="ops-topbar">
      <div className="ops-topbar-left">
        <button
          type="button"
          onClick={onMobileMenuOpen}
          aria-label="Open menu"
          className="ops-menu-btn ops-icon-btn"
        >
          <Menu size={20} />
        </button>
        <div className="ops-topbar-title">
          <span className="ops-topbar-crumb">{APP_NAME}</span>
          <span className="ops-topbar-sep">/</span>
          <span className="ops-topbar-page">{pageTitle}</span>
        </div>
      </div>

      <div className="ops-topbar-right">
        <NotificationBell />
        <ThemeToggle />
        <div className="ops-topbar-avatar">
          <Avatar name={profile.fullName} size={32} />
        </div>
      </div>
    </header>
  );
}

function getPageTitle(pathname: string): string {
  const segment = pathname.split('/').pop() ?? '';
  const map: Record<string, string> = {
    director: 'Dashboard',
    manager: 'Dashboard',
    hr: 'Dashboard',
    employee: 'Today',
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

export function OpsShell({ profile, children }: { profile: Profile; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = NAV_BY_ROLE[profile.role] ?? [];
  const pageTitle = getPageTitle(pathname);
  const bottomNavItems = nav.map((item) => ({
    href: item.href,
    label: item.shortLabel ?? item.label,
    icon: item.icon,
  }));

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

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
    <div className="ops-shell">
      <aside className="ops-sidebar-desktop">
        <SidebarContent {...sidebarProps} />
      </aside>

      {mobileOpen && (
        <div className="ops-drawer-overlay" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <div className="ops-drawer-backdrop" onClick={() => setMobileOpen(false)} />
          <aside className="ops-drawer">
            <SidebarContent {...sidebarProps} />
          </aside>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="ops-drawer-close"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="ops-main-column">
        <TopBar profile={profile} pageTitle={pageTitle} onMobileMenuOpen={() => setMobileOpen(true)} />

        <main className="ops-main">{children}</main>

        <MobileBottomNav items={bottomNavItems} onMore={() => setMobileOpen(true)} />
      </div>
    </div>
  );
}
