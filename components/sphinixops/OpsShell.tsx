'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
} from 'lucide-react';
import { useState } from 'react';
import type { Profile } from '@/lib/sphinixops/types';
import { OPS_BASE } from '@/lib/sphinixops/constants';

type NavItem = { href: string; label: string; icon: React.ReactNode };

const NAV_BY_ROLE: Record<string, NavItem[]> = {
  director: [
    { href: `${OPS_BASE}/director`, label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { href: `${OPS_BASE}/director/staff`, label: 'All Staff', icon: <Users size={18} /> },
    { href: `${OPS_BASE}/director/sites`, label: 'Sites', icon: <Building2 size={18} /> },
    { href: `${OPS_BASE}/director/reports`, label: 'Reports', icon: <FileBarChart size={18} /> },
    { href: `${OPS_BASE}/director/settings`, label: 'Settings', icon: <Settings size={18} /> },
  ],
  hr: [
    { href: `${OPS_BASE}/hr`, label: 'Schedule', icon: <CalendarDays size={18} /> },
    { href: `${OPS_BASE}/hr/approvals`, label: 'Approvals', icon: <CheckSquare size={18} /> },
    { href: `${OPS_BASE}/hr/staff`, label: 'Staff', icon: <Users size={18} /> },
  ],
  manager: [
    { href: `${OPS_BASE}/manager`, label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { href: `${OPS_BASE}/manager/team`, label: 'My Team', icon: <Users size={18} /> },
    { href: `${OPS_BASE}/manager/approvals`, label: 'Approvals', icon: <CheckSquare size={18} /> },
  ],
};

export function OpsShell({
  profile,
  children,
  mobile = false,
}: {
  profile: Profile;
  children: React.ReactNode;
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const nav = NAV_BY_ROLE[profile.role] ?? [];

  async function logout() {
    await fetch(`${OPS_BASE}/api/auth/logout`, { method: 'POST' });
    router.push(`${OPS_BASE}/login`);
    router.refresh();
  }

  const sidebar = (
    <>
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/[0.08]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0b5c63] to-[#22c55e] flex items-center justify-center text-lg font-bold">
          𓆣
        </div>
        <div>
          <div className="font-semibold text-sm leading-tight">Sphinx Healing</div>
          <div className="text-[10px] uppercase tracking-wider text-white/45">sphinixOps</div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== nav[0]?.href && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active ? 'bg-[#22c55e]/15 text-[#22c55e]' : 'text-white/70 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/[0.08]">
        <div className="text-xs text-white/45 mb-1">Signed in as</div>
        <div className="text-sm font-semibold truncate">{profile.fullName}</div>
        <div className="text-xs text-white/45 capitalize mb-3">{profile.role.replace('_', ' ')}</div>
        <button type="button" onClick={logout} className="ops-btn-ghost w-full flex items-center justify-center gap-2 text-sm">
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </>
  );

  if (mobile) {
    return (
      <div className="ops-root min-h-screen pb-20">
        <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-[#0a1628]/95 backdrop-blur border-b border-white/[0.08]">
          <button type="button" onClick={() => setOpen(true)} className="p-2 text-white/70" aria-label="Menu">
            <Menu size={22} />
          </button>
          <span className="font-semibold text-sm">sphinixOps</span>
          <span className="w-9" />
        </header>
        {open && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
            <aside className="relative w-72 max-w-[85vw] bg-[#0f1f35] flex flex-col h-full shadow-2xl">{sidebar}</aside>
            <button type="button" className="absolute top-4 right-4 p-2 text-white" onClick={() => setOpen(false)} aria-label="Close">
              <X size={22} />
            </button>
          </div>
        )}
        <main className="px-4 py-4">{children}</main>
      </div>
    );
  }

  return (
    <div className="ops-root min-h-screen flex">
      <aside className="hidden lg:flex w-60 flex-col bg-[#0f1f35] border-r border-white/[0.08] shrink-0 fixed inset-y-0 left-0">
        {sidebar}
      </aside>
      <div className="flex-1 lg:ml-60 min-h-screen">
        <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-[#0a1628]/95 backdrop-blur border-b border-white/[0.08]">
          <button type="button" onClick={() => setOpen(true)} className="p-2" aria-label="Menu">
            <Menu size={22} />
          </button>
          <span className="font-semibold text-sm">sphinixOps</span>
          <button type="button" onClick={logout} className="p-2 text-white/50" aria-label="Sign out">
            <LogOut size={18} />
          </button>
        </header>
        {open && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
            <aside className="relative w-72 bg-[#0f1f35] flex flex-col h-full">{sidebar}</aside>
          </div>
        )}
        <main className="p-4 lg:p-8 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}
