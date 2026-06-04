import { getSiteOverviews } from '@/lib/sphinxops/mock-data';
import { SiteCard } from '@/components/sphinxops/SiteCard';
import { PROGRAMS } from '@/lib/sphinxops/constants';

export default function DirectorSitesPage() {
  const sites = getSiteOverviews();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Sites</h1>
      <p className="text-white/45 text-sm mb-6">
        Six locations — each with a dedicated manager. Programs per{' '}
        <a href="https://sphinxhealing.org/our-services/" className="text-[#0ea5e9] hover:underline" target="_blank" rel="noreferrer">
          Sphinx Healing services
        </a>
        .
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
