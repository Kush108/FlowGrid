import { getSiteOverviews } from '@/lib/summitflow/mock-data';
import { SiteCard } from '@/components/summitflow/SiteCard';
import { PROGRAMS } from '@/lib/summitflow/constants';

export default function DirectorSitesPage() {
  const sites = getSiteOverviews();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Service zones</h1>
      <p className="text-white/45 text-sm mb-6">
        Six Edmonton-area zones — each with a dedicated dispatch lead. Job types include furnace install, AC service,
        emergency repair, and maintenance plans.
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {PROGRAMS.map((p) => (
          <span key={p.id} className="text-xs px-3 py-1 rounded-full bg-white/[0.06] text-white/60">
            {p.label}
          </span>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {sites.map((s) => (
          <SiteCard key={s.id} site={s} />
        ))}
      </div>
    </div>
  );
}
