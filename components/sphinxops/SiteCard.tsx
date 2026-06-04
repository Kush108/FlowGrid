import Link from 'next/link';
import type { SiteOverview } from '@/lib/sphinxops/types';
import { OPS_BASE } from '@/lib/sphinxops/constants';

export function SiteCard({ site }: { site: SiteOverview }) {
  return (
    <Link
      href={`${OPS_BASE}/director/sites?site=${site.code}`}
      className="ops-card p-4 block hover:border-white/20 transition-colors"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-3 h-3 rounded-full shrink-0" style={{ background: site.color }} />
        <span className="font-semibold text-sm">{site.name}</span>
      </div>
      <div className="text-xs text-white/45 mb-1">{site.city}</div>
      <div className="flex justify-between items-end mt-3">
        <div>
          <div className="text-2xl font-bold text-[#22c55e]">
            {site.staffOnShift}
            <span className="text-sm font-normal text-white/45"> / {site.staffTotal}</span>
          </div>
          <div className="text-[10px] uppercase tracking-wide text-white/45">on shift</div>
        </div>
        <div className="text-right text-xs text-white/45">
          Manager
          <div className="text-white/80 font-medium">{site.managerName}</div>
        </div>
      </div>
    </Link>
  );
}
