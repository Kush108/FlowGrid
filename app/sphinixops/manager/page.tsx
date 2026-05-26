import Link from 'next/link';
import { StatCard } from '@/components/sphinixops/StatCard';
import { ActivityFeed } from '@/components/sphinixops/ActivityFeed';
import { getCurrentProfile } from '@/lib/sphinixops/session';
import { MOCK_ACTIVITY, MOCK_SITES, MOCK_SHIFTS } from '@/lib/sphinixops/mock-data';
import { OPS_BASE } from '@/lib/sphinixops/constants';

export default async function ManagerDashboard() {
  const profile = await getCurrentProfile();
  const site = MOCK_SITES.find((s) => s.id === profile?.siteId) ?? MOCK_SITES[0];
  const siteShifts = MOCK_SHIFTS.filter((s) => s.siteId === site.id || s.siteCode === site.code);
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
        <StatCard label="Shifts today" value={siteShifts.length} />
        <StatCard label="Pending visit logs" value={2} accent="#f97316" />
        <StatCard label="KM today (site)" value={86} accent="#0ea5e9" />
      </div>

      <h2 className="text-sm font-semibold uppercase tracking-wider text-white/45 mb-3">Today&apos;s shifts</h2>
      <div className="ops-card divide-y divide-white/[0.06] mb-8">
        {siteShifts.length ? (
          siteShifts.map((s) => (
            <div key={s.id} className="p-4 flex justify-between gap-4">
              <div>
                <div className="font-medium">{s.employeeName}</div>
                <div className="text-sm text-white/55">{s.title}</div>
              </div>
              <span
                className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                  s.status === 'in_progress' ? 'bg-[#f97316]/20 text-[#f97316]' : s.status === 'completed' ? 'bg-[#22c55e]/20 text-[#22c55e]' : 'bg-white/10 text-white/45'
                }`}
              >
                {s.status.replace('_', ' ')}
              </span>
            </div>
          ))
        ) : (
          <p className="p-4 text-white/45 text-sm">No shifts at this site today in demo data.</p>
        )}
      </div>

      <Link href={`${OPS_BASE}/manager/approvals`} className="text-sm text-[#0ea5e9] hover:underline mb-6 inline-block">
        Review mileage approvals for your site →
      </Link>

      <ActivityFeed events={siteActivity.length ? siteActivity : MOCK_ACTIVITY.slice(0, 3)} />
    </div>
  );
}
