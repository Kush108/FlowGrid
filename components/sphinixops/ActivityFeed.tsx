import type { ActivityEvent } from '@/lib/sphinixops/types';
import { SITE_COLORS, type SiteCode } from '@/lib/sphinixops/constants';

function timeAgo(iso: string) {
  const sec = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (sec < 60) return 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  return `${hr}h ago`;
}

export function ActivityFeed({ events }: { events: ActivityEvent[] }) {
  return (
    <div className="ops-card divide-y divide-white/[0.06]">
      <div className="px-4 py-3 font-semibold text-sm border-b border-white/[0.06]">Recent activity — all sites</div>
      <ul className="max-h-80 overflow-y-auto">
        {events.map((e) => (
          <li key={e.id} className="px-4 py-3 flex gap-3 text-sm">
            <span
              className="w-2 h-2 rounded-full mt-1.5 shrink-0"
              style={{ background: SITE_COLORS[e.siteCode as SiteCode] ?? '#22c55e' }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-white/85 leading-snug">{e.message}</p>
              <p className="text-xs text-white/40 mt-1">{timeAgo(e.createdAt)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
