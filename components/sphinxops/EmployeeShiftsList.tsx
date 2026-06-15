'use client';

import { MapPin, Clock, Loader2 } from 'lucide-react';
import { SITE_COLORS, PROGRAMS } from '@/lib/sphinxops/constants';
import { formatDateShort, formatTimeShort } from '@/lib/sphinxops/shift-utils';
import type { Profile, Shift } from '@/lib/sphinxops/types';

function programLabel(id: string) {
  return PROGRAMS.find((p) => p.id === id)?.label ?? id;
}

export function EmployeeShiftsList({
  profile,
  shifts,
  loading = false,
  embedded = false,
}: {
  profile: Profile;
  shifts: Shift[];
  loading?: boolean;
  embedded?: boolean;
}) {
  const sorted = [...shifts].sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  if (loading) {
    return (
      <div className="ops-card p-10 flex flex-col items-center gap-3 ops-text-muted max-w-2xl">
        <Loader2 size={28} className="animate-spin" />
        <span className="text-sm">Loading your shifts…</span>
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div className="ops-card p-8 text-center max-w-2xl">
        <p className="font-medium">No shifts on your schedule</p>
        <p className="text-sm ops-text-muted mt-1">
          Check the <strong className="text-[var(--ops-text)]">Open</strong> tab for coverage you can pick up.
        </p>
      </div>
    );
  }

  return (
    <div>
      {!embedded && (
        <>
          <h1 className="text-2xl font-bold mb-2">My Shifts</h1>
          <p className="ops-text-muted text-sm mb-6">
            Upcoming and recent shifts for {profile.fullName}
          </p>
        </>
      )}

      <div className="space-y-3 max-w-2xl">
        {sorted.map((s) => (
          <article key={s.id} className="ops-card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{ background: `${SITE_COLORS[s.siteCode]}22`, color: SITE_COLORS[s.siteCode] }}
                >
                  {programLabel(s.program)}
                </span>
                <h2 className="font-semibold mt-2">{s.title}</h2>
                <p className="text-xs ops-text-muted flex items-center gap-1 mt-1">
                  <MapPin size={12} />
                  {s.location}
                </p>
                <p className="text-xs ops-text-muted flex items-center gap-1 mt-1">
                  <Clock size={12} />
                  {formatDateShort(s.startsAt)} · {formatTimeShort(s.startsAt)} – {formatTimeShort(s.endsAt)}
                </p>
              </div>
              <span
                className={`ops-badge ${
                  s.status === 'completed'
                    ? 'ops-badge-green'
                    : s.status === 'in_progress'
                      ? 'ops-badge-blue'
                      : 'ops-badge-muted'
                }`}
              >
                {s.status.replace('_', ' ')}
              </span>
            </div>
            {s.notes && (
              <p className="text-xs ops-text-muted mt-3 pt-3 border-t border-[var(--ops-border)]">{s.notes}</p>
            )}
            {s.claimedAt && (
              <p className="text-[10px] ops-text-muted mt-2 text-[var(--ops-green)]">You claimed this shift</p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
