import Link from 'next/link';
import { StatCard } from '@/components/sphinxops/StatCard';
import { ActivityFeed } from '@/components/sphinxops/ActivityFeed';
import { getCurrentProfile } from '@/lib/sphinxops/session';
import { MOCK_ACTIVITY, MOCK_SITES } from '@/lib/sphinxops/mock-data';
import { shifts } from '@/lib/sphinxops/shift-store';
import { isOpenShift } from '@/lib/sphinxops/shift-utils';
import { OPS_BASE } from '@/lib/sphinxops/constants';
import { Sparkles } from 'lucide-react';

export default async function ManagerDashboard() {
  const profile = await getCurrentProfile();
  const site = MOCK_SITES.find((s) => s.id === profile?.siteId) ?? MOCK_SITES[0];
  const siteShifts = shifts.filter((s) => s.siteId === site.id || s.siteCode === site.code);
  const openShifts = siteShifts.filter(isOpenShift);
  const assignedShifts = siteShifts.filter((s) => !isOpenShift(s));
  const siteActivity = MOCK_ACTIVITY.filter((a) => a.siteCode === site.code);

  return (
    <div>
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 rounded-full" style={{ background: site.color }} />
          <span className="text-xs font-semibold uppercase tracking-wider text-white/45">{site.name}</span>
        </div>
        <h1 className="text-2xl font-bold">Site dashboard</h1>
        <p className="text-white/45 text-sm mt-1">Hello {profile?.fullName} — your team only</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <StatCard label="On shift now" value={9} accent={site.color} />
        <StatCard label="Assigned today" value={assignedShifts.length} />
        <StatCard label="Open shifts" value={openShifts.length} accent="#f59e0b" sub="Awaiting claims" />
        <StatCard label="KM today (site)" value={86} accent="#0ea5e9" />
      </div>

      {openShifts.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider ops-text-muted flex items-center gap-2">
              <Sparkles size={14} className="text-[var(--ops-amber)]" />
              Open shifts
            </h2>
            <Link href={`${OPS_BASE}/manager/schedule`} className="text-xs text-[var(--ops-blue)] hover:underline">
              Manage →
            </Link>
          </div>
          <div className="ops-card divide-y divide-[var(--ops-border)] mb-8">
            {openShifts.map((s) => (
              <div key={s.id} className="p-4 flex justify-between gap-4">
                <div>
                  <div className="font-medium">{s.title}</div>
                  <div className="text-sm ops-text-muted">{s.location}</div>
                </div>
                <span className="ops-badge ops-badge-amber shrink-0">Open</span>
              </div>
            ))}
          </div>
        </>
      )}

      <h2 className="text-sm font-semibold uppercase tracking-wider ops-text-muted mb-3">Today&apos;s assigned shifts</h2>
      <div className="ops-card divide-y divide-[var(--ops-border)] mb-8">
        {assignedShifts.length ? (
          assignedShifts.map((s) => (
            <div key={s.id} className="p-4 flex justify-between gap-4">
              <div>
                <div className="font-medium">{s.employeeName}</div>
                <div className="text-sm ops-text-muted">{s.title}</div>
              </div>
              <span
                className={`text-xs font-bold uppercase px-2 py-1 rounded shrink-0 ${
                  s.status === 'in_progress' ? 'bg-[#f97316]/20 text-[#f97316]' : s.status === 'completed' ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'bg-white/10 ops-text-muted'
                }`}
              >
                {s.status.replace('_', ' ')}
              </span>
            </div>
          ))
        ) : (
          <p className="p-4 ops-text-muted text-sm">No assigned shifts at this site today.</p>
        )}
      </div>

      <Link href={`${OPS_BASE}/manager/approvals`} className="text-sm text-[#0ea5e9] hover:underline mb-6 inline-block">
        Review mileage approvals for your site →
      </Link>

      <ActivityFeed events={siteActivity.length ? siteActivity : MOCK_ACTIVITY.slice(0, 3)} />
    </div>
  );
}
