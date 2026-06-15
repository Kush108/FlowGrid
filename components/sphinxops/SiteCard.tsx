import Link from 'next/link';
import type { SiteOverview } from '@/lib/sphinxops/types';
import { OPS_BASE } from '@/lib/sphinxops/constants';

export function SiteCard({ site }: { site: SiteOverview }) {
  return (
    <Link
      href={`${OPS_BASE}/director/sites?site=${site.code}`}
      className="ops-card p-4 sm:p-5 block hover:border-[var(--ops-border-2)] transition-colors active:scale-[0.99]"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-3 h-3 rounded-full shrink-0" style={{ background: site.color }} />
        <span className="font-semibold text-sm">{site.name}</span>
      </div>
      <div className="text-xs ops-text-muted mb-1">{site.city}</div>
      <div className="flex justify-between items-end mt-3 gap-3">
        <div>
          <div className="text-2xl font-bold text-[var(--ops-green)]">
            {site.staffOnShift}
            <span className="text-sm font-normal ops-text-muted"> / {site.staffTotal}</span>
          </div>
          <div className="text-[10px] uppercase tracking-wide ops-text-muted">on shift</div>
        </div>
        <div className="text-right text-xs ops-text-muted shrink-0">
          Manager
          <div className="text-[var(--ops-text)] font-medium">{site.managerName}</div>
        </div>
      </div>
    </Link>
  );
}
