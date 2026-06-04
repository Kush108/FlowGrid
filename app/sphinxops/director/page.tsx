import Link from 'next/link';
import { StatCard } from '@/components/sphinxops/StatCard';
import { SiteCard } from '@/components/sphinxops/SiteCard';
import { ActivityFeed } from '@/components/sphinxops/ActivityFeed';
import { getCurrentProfile } from '@/lib/sphinxops/session';
import {
  getDirectorStats,
  getSiteOverviews,
  MOCK_ACTIVITY,
} from '@/lib/sphinxops/mock-data';
import { OPS_BASE } from '@/lib/sphinxops/constants';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default async function DirectorDashboard() {
  const profile = await getCurrentProfile();
  const stats = getDirectorStats();
  const sites = getSiteOverviews();

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#f1f5f9]">
          {greeting()}, {profile?.fullName?.split(' ')[0] ?? 'Stephanie'}
        </h1>
        <p className="text-white/45 mt-2 text-sm">
          Organization-wide view · 6 sites · 70+ field staff · replaces BrightHR gaps with fleet + visit logging
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8">
        <StatCard label="Staff on shift now" value={stats.staffOnShift} sub="Across all programs" />
        <StatCard label="KM claimed this week" value={stats.kmThisWeek.toLocaleString()} accent="#0ea5e9" sub="Company + personal" />
        <StatCard
          label="Pending approvals"
          value={stats.pendingApprovals}
          accent="#f97316"
          sub={
            <Link href={`${OPS_BASE}/director/reports`} className="text-[#0ea5e9] hover:underline">
              Review in Reports →
            </Link>
          }
        />
        <StatCard label="Active sites" value={stats.activeSites} sub="Edmonton region + Leduc" />
      </div>

      <h2 className="text-sm font-semibold uppercase tracking-wider text-white/45 mb-4">Sites at a glance</h2>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {sites.map((s) => (
          <SiteCard key={s.id} site={s} />
        ))}
      </div>

      <ActivityFeed events={MOCK_ACTIVITY} />
    </div>
  );
}
