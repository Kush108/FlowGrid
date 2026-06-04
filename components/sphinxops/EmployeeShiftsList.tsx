'use client';

import { useMemo } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { MOCK_SHIFTS } from '@/lib/sphinxops/mock-data';
import { SITE_COLORS, PROGRAMS } from '@/lib/sphinxops/constants';
import type { Profile } from '@/lib/sphinxops/types';

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function EmployeeShiftsList({ profile }: { profile: Profile }) {
  const shifts = useMemo(
    () => MOCK_SHIFTS.filter((s) => s.employeeId === profile.id).sort((a, b) => a.startsAt.localeCompare(b.startsAt)),
    [profile.id],
  );

  const programLabel = (id: string) => PROGRAMS.find((p) => p.id === id)?.label ?? id;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">My Shifts</h1>
      <p className="ops-text-muted text-sm mb-6">Upcoming and recent shifts across Group Care, Family Living, PDD &amp; TAP</p>

      <div className="space-y-3 max-w-2xl">
        {shifts.map((s) => (
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
                  {formatDate(s.startsAt)} · {formatTime(s.startsAt)} – {formatTime(s.endsAt)}
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
            {s.notes && <p className="text-xs ops-text-muted mt-3 pt-3 border-t border-[var(--ops-border)]">{s.notes}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
