'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Clock, Sparkles, Check, AlertCircle, Loader2 } from 'lucide-react';
import { OPS_BASE, PROGRAMS, SITE_COLORS } from '@/lib/summitflow/constants';
import { MOCK_SITES } from '@/lib/summitflow/mock-data';
import { canClaimShift, formatDateShort, formatTimeShort, getEmployeeShifts } from '@/lib/summitflow/shift-utils';
import type { Profile, Shift } from '@/lib/summitflow/types';
import { EmployeeShiftsList } from './EmployeeShiftsList';

type Tab = 'mine' | 'open';

export function EmployeeShiftsHub({ profile }: { profile: Profile }) {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'open' ? 'open' : 'mine';
  const [tab, setTab] = useState<Tab>(initialTab);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  const site = MOCK_SITES.find((s) => s.id === profile.siteId);

  const loadShifts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${OPS_BASE}/api/shifts`);
      if (res.ok) setShifts(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadShifts();
  }, [loadShifts]);

  const myShifts = useMemo(() => getEmployeeShifts(shifts, profile.id), [shifts, profile.id]);
  const openShifts = useMemo(
    () =>
      shifts
        .filter((s) => s.assignmentType === 'open' && !s.employeeId && s.siteId === profile.siteId)
        .sort((a, b) => a.startsAt.localeCompare(b.startsAt)),
    [shifts, profile.siteId],
  );

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  async function claimShift(id: string) {
    setClaiming(id);
    try {
      const res = await fetch(`${OPS_BASE}/api/shifts`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'claim' }),
      });
      const data = await res.json();
      if (!res.ok) {
        notify(data.error ?? 'Could not claim this shift');
        return;
      }
      setShifts((prev) => prev.map((s) => (s.id === data.id ? data : s)));
      notify('Shift claimed — added to your schedule');
      setTab('mine');
    } finally {
      setClaiming(null);
    }
  }

  const programLabel = (id: string) => PROGRAMS.find((p) => p.id === id)?.label ?? id;

  return (
    <div className="pb-6">
      <header className="mb-5">
        <h1 className="text-xl sm:text-2xl font-bold">Shifts</h1>
        <p className="text-sm ops-text-muted mt-1">
          Your assigned shifts and open opportunities{site ? ` at ${site.name}` : ''}
        </p>
      </header>

      <div className="flex gap-1 p-1 rounded-xl bg-[var(--ops-surface-2)] border border-[var(--ops-border)] mb-5 max-w-md">
        <button
          type="button"
          onClick={() => setTab('mine')}
          className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
            tab === 'mine' ? 'bg-[var(--ops-green)] text-[#052e16]' : 'ops-text-muted'
          }`}
        >
          My shifts
          {myShifts.length > 0 && (
            <span className="ml-1.5 text-[10px] opacity-80">({myShifts.length})</span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setTab('open')}
          className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 ${
            tab === 'open' ? 'bg-[var(--ops-amber)] text-[#422006]' : 'ops-text-muted'
          }`}
        >
          <Sparkles size={14} />
          Open
          {openShifts.length > 0 && (
            <span className="min-w-[18px] h-[18px] rounded-full bg-[var(--ops-red)] text-white text-[10px] font-bold flex items-center justify-center">
              {openShifts.length}
            </span>
          )}
        </button>
      </div>

      {tab === 'mine' ? (
        <EmployeeShiftsList profile={profile} shifts={myShifts} loading={loading} embedded />
      ) : loading ? (
        <div className="ops-card p-10 flex flex-col items-center gap-3 ops-text-muted">
          <Loader2 size={28} className="animate-spin" />
          <span className="text-sm">Checking open shifts…</span>
        </div>
      ) : openShifts.length === 0 ? (
        <div className="ops-card p-8 text-center max-w-lg">
          <Sparkles size={32} className="mx-auto mb-3 text-[var(--ops-amber)]" />
          <p className="font-medium">No open shifts right now</p>
          <p className="text-sm ops-text-muted mt-1">
            When HR or your site manager posts coverage needs, they&apos;ll show up here for you to claim.
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-w-2xl">
          <p className="text-xs ops-text-muted px-1">
            Tap <strong className="text-[var(--ops-text)]">Accept shift</strong> to add to your schedule. Shifts that overlap with yours are blocked.
          </p>
          {openShifts.map((s) => {
            const check = canClaimShift(s, myShifts);
            const isClaiming = claiming === s.id;
            return (
              <article key={s.id} className="ops-card p-4 border-l-4" style={{ borderLeftColor: SITE_COLORS[s.siteCode] }}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                      style={{ background: `${SITE_COLORS[s.siteCode]}22`, color: SITE_COLORS[s.siteCode] }}
                    >
                      {programLabel(s.program)}
                    </span>
                    <h2 className="font-semibold mt-2">{s.title}</h2>
                    <p className="text-xs ops-text-muted flex items-center gap-1 mt-1">
                      <MapPin size={12} className="shrink-0" />
                      {s.location}
                    </p>
                    <p className="text-xs ops-text-muted flex items-center gap-1 mt-1">
                      <Clock size={12} className="shrink-0" />
                      {formatDateShort(s.startsAt)} · {formatTimeShort(s.startsAt)} – {formatTimeShort(s.endsAt)}
                    </p>
                    {s.postedBy && (
                      <p className="text-[10px] ops-text-muted mt-2">Posted by {s.postedBy}</p>
                    )}
                  </div>
                  <span className="ops-badge ops-badge-amber shrink-0">Open</span>
                </div>

                {s.notes && (
                  <p className="text-xs ops-text-muted mt-3 pt-3 border-t border-[var(--ops-border)]">{s.notes}</p>
                )}

                <div className="mt-4">
                  {check.ok ? (
                    <button
                      type="button"
                      disabled={isClaiming}
                      onClick={() => claimShift(s.id)}
                      className="ops-btn-primary w-full sm:w-auto flex items-center justify-center gap-2 py-3 sm:py-2.5 text-sm min-h-[44px]"
                    >
                      {isClaiming ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Check size={16} />
                      )}
                      {isClaiming ? 'Claiming…' : 'Accept shift'}
                    </button>
                  ) : (
                    <div className="flex items-start gap-2 text-xs text-[var(--ops-amber)] bg-[rgba(245,158,11,0.08)] rounded-lg p-3">
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      <span>{check.reason}</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {toast && (
        <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 bg-[var(--ops-green)] text-[#052e16] px-4 py-3 rounded-xl text-sm font-semibold shadow-lg z-50 max-w-[90vw] text-center">
          {toast}
        </div>
      )}
    </div>
  );
}
