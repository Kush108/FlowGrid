'use client';

import { useMemo } from 'react';
import { FileText } from 'lucide-react';
import { MOCK_SHIFTS, MOCK_TIME_ENTRIES } from '@/lib/sphinixops/mock-data';
import { SITE_COLORS, PROGRAMS } from '@/lib/sphinixops/constants';
import type { Profile } from '@/lib/sphinixops/types';

export function EmployeeVisitsList({ profile }: { profile: Profile }) {
  const visits = useMemo(() => {
    const myShiftIds = new Set(MOCK_SHIFTS.filter((s) => s.employeeId === profile.id).map((s) => s.id));
    return MOCK_TIME_ENTRIES.filter((t) => myShiftIds.has(t.shiftId) && t.visitLog).map((t) => {
      const shift = MOCK_SHIFTS.find((s) => s.id === t.shiftId)!;
      return { ...t, shift };
    });
  }, [profile.id]);

  const programLabel = (id: string) => PROGRAMS.find((p) => p.id === id)?.label ?? id;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Visit Logs</h1>
      <p className="ops-text-muted text-sm mb-6">
        Required notes for client-site shifts — Group Care, Family Living, PDD community visits, and TAP outings.
      </p>

      {visits.length === 0 ? (
        <div className="ops-card p-8 text-center ops-text-muted text-sm">No visit logs submitted yet</div>
      ) : (
        <div className="space-y-3">
          {visits.map((v) => (
            <article key={v.id} className="ops-card p-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${SITE_COLORS[v.shift.siteCode]}22`, color: SITE_COLORS[v.shift.siteCode] }}
                >
                  <FileText size={16} />
                </div>
                <div>
                  <div className="font-semibold text-sm">{v.shift.title}</div>
                  <div className="text-xs ops-text-muted mt-0.5">
                    {programLabel(v.shift.program)} · {v.shift.location}
                  </div>
                  <p className="text-sm mt-3 p-3 rounded-lg bg-[var(--ops-green-dim)] border border-[var(--ops-green)]/20">
                    {v.visitLog}
                  </p>
                  {v.visitLogSubmittedAt && (
                    <div className="text-[11px] ops-text-muted mt-2">
                      Submitted {new Date(v.visitLogSubmittedAt).toLocaleString('en-CA')}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
