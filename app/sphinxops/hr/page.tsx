import Link from 'next/link';
import { StatCard } from '@/components/sphinxops/StatCard';
import { ActivityFeed } from '@/components/sphinxops/ActivityFeed';
import { getCurrentProfile } from '@/lib/sphinxops/session';
import { MOCK_ACTIVITY, MOCK_MILEAGE, MOCK_PROFILES, MOCK_SITES } from '@/lib/sphinxops/mock-data';
import { shifts } from '@/lib/sphinxops/shift-store';
import { isOpenShift } from '@/lib/sphinxops/shift-utils';
import { OPS_BASE } from '@/lib/sphinxops/constants';
import { CalendarDays, CheckSquare, Sparkles, Users } from 'lucide-react';

export default async function HrDashboard() {
  const profile = await getCurrentProfile();
  const openCount = shifts.filter(isOpenShift).length;
  const assignedToday = shifts.filter((s) => s.assignmentType === 'assigned').length;
  const pendingMileage = MOCK_MILEAGE.filter((m) => m.status === 'pending').length;
  const staffCount = MOCK_PROFILES.filter((p) => p.role === 'employee').length;

  return (
    <div>
      <header className="mb-6 sm:mb-8">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ops-blue)] mb-1">HR operations</p>
        <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
        <p className="text-sm ops-text-muted mt-1">Hello {profile?.fullName} — org-wide scheduling &amp; approvals</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 sm:mb-8">
        <StatCard label="Open shifts" value={openCount} accent="#f59e0b" sub="Awaiting field staff" />
        <StatCard label="Shifts today" value={assignedToday + openCount} accent="#22c55e" />
        <StatCard label="Pending approvals" value={pendingMileage + 1} accent="#0ea5e9" />
        <StatCard label="Field staff" value={staffCount} />
      </div>

      <h2 className="text-sm font-semibold uppercase tracking-wider ops-text-muted mb-3">Quick actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        <Link href={`${OPS_BASE}/hr/schedule`} className="ops-card p-4 hover:border-[var(--ops-green)] transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--ops-green-dim)] flex items-center justify-center text-[var(--ops-green)]">
              <CalendarDays size={20} />
            </div>
            <div>
              <div className="font-semibold group-hover:text-[var(--ops-green)] transition-colors">Schedule builder</div>
              <div className="text-xs ops-text-muted">Assign or post open shifts</div>
            </div>
          </div>
        </Link>
        <Link href={`${OPS_BASE}/hr/schedule`} className="ops-card p-4 hover:border-[var(--ops-amber)] transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(245,158,11,0.12)] flex items-center justify-center text-[var(--ops-amber)]">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="font-semibold group-hover:text-[var(--ops-amber)] transition-colors">{openCount} open shifts</div>
              <div className="text-xs ops-text-muted">Coverage needs posted</div>
            </div>
          </div>
        </Link>
        <Link href={`${OPS_BASE}/hr/approvals`} className="ops-card p-4 hover:border-[var(--ops-blue)] transition-colors group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--ops-blue-dim)] flex items-center justify-center text-[var(--ops-blue)]">
              <CheckSquare size={20} />
            </div>
            <div>
              <div className="font-semibold group-hover:text-[var(--ops-blue)] transition-colors">Approvals queue</div>
              <div className="text-xs ops-text-muted">Mileage &amp; visit logs</div>
            </div>
          </div>
        </Link>
        <Link href={`${OPS_BASE}/hr/staff`} className="ops-card p-4 hover:border-[var(--ops-purple)] transition-colors group sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(167,139,250,0.12)] flex items-center justify-center text-[var(--ops-purple)]">
              <Users size={20} />
            </div>
            <div>
              <div className="font-semibold">Staff roster</div>
              <div className="text-xs ops-text-muted">All sites &amp; programs</div>
            </div>
          </div>
        </Link>
      </div>

      <h2 className="text-sm font-semibold uppercase tracking-wider ops-text-muted mb-3">Open shifts by site</h2>
      <div className="ops-card divide-y divide-[var(--ops-border)] mb-8">
        {MOCK_SITES.map((site) => {
          const siteOpen = shifts.filter((s) => isOpenShift(s) && s.siteId === site.id);
          return (
            <div key={site.id} className="p-4 flex justify-between items-center gap-4">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: site.color }} />
                <span className="font-medium truncate">{site.name}</span>
              </div>
              <span className={`text-xs font-bold uppercase px-2 py-1 rounded shrink-0 ${siteOpen.length ? 'bg-[rgba(245,158,11,0.15)] text-[var(--ops-amber)]' : 'ops-badge-muted'}`}>
                {siteOpen.length ? `${siteOpen.length} open` : 'None'}
              </span>
            </div>
          );
        })}
      </div>

      <ActivityFeed events={MOCK_ACTIVITY.slice(0, 4)} />
    </div>
  );
}
