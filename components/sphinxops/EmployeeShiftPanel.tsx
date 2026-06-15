'use client';

import { useMemo, useState } from 'react';
import { Car, User, MapPin, Clock, FileText } from 'lucide-react';
import { MOCK_SHIFTS, MOCK_TIME_ENTRIES } from '@/lib/sphinxops/mock-data';
import { SITE_COLORS, VEHICLE_TYPES } from '@/lib/sphinxops/constants';
import type { Profile, Shift } from '@/lib/sphinxops/types';

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' });
}

export function EmployeeShiftPanel({ profile }: { profile: Profile }) {
  const myShifts = useMemo(
    () => MOCK_SHIFTS.filter((s) => s.employeeId === profile.id).sort((a, b) => a.startsAt.localeCompare(b.startsAt)),
    [profile.id],
  );

  const [activeId, setActiveId] = useState<string | null>(() => myShifts.find((s) => s.status === 'in_progress')?.id ?? null);
  const [vehicle, setVehicle] = useState<'company' | 'personal'>('company');
  const [kmStart, setKmStart] = useState('184220');
  const [kmEnd, setKmEnd] = useState('184226');
  const [visitLog, setVisitLog] = useState('');
  const [statuses, setStatuses] = useState<Record<string, Shift['status']>>(() =>
    Object.fromEntries(myShifts.map((s) => [s.id, s.status])),
  );
  const [logs, setLogs] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    MOCK_TIME_ENTRIES.filter((t) => t.employeeId === profile.id && t.visitLog).forEach((t) => {
      init[t.shiftId] = t.visitLog!;
    });
    return init;
  });
  const [toast, setToast] = useState('');

  const active = myShifts.find((s) => s.id === activeId);
  const nextScheduled = myShifts.find((s) => (statuses[s.id] ?? s.status) === 'scheduled');

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3200);
  }

  function punchIn(id: string) {
    setActiveId(id);
    setStatuses((prev) => ({ ...prev, [id]: 'in_progress' }));
    notify('Punched in — GPS timestamp recorded (demo)');
  }

  function punchOut(id: string) {
    const shift = myShifts.find((s) => s.id === id);
    if (shift?.requiresVisitLog && !visitLog.trim() && !logs[id]) {
      notify('Visit log required before punch-out');
      return;
    }
    if (visitLog.trim()) setLogs((prev) => ({ ...prev, [id]: visitLog }));
    setStatuses((prev) => ({ ...prev, [id]: 'completed' }));
    setActiveId(null);
    setVisitLog('');
    const km = Math.max(0, Number(kmEnd) - Number(kmStart));
    notify(
      `Punched out — ${km} km logged (${vehicle === 'company' ? 'fleet only' : `~$${(km * 0.7).toFixed(2)} pending`})`,
    );
  }

  return (
    <div className="max-w-lg mx-auto pb-4">
      <header className="mb-5 sm:mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ops-green)] mb-1">Field dashboard</p>
        <h1 className="text-xl sm:text-2xl font-bold">Today&apos;s visits</h1>
        <p className="text-sm ops-text-muted mt-1">{profile.fullName}</p>
      </header>

      <div className="space-y-3 mb-6">
        {myShifts.map((s) => {
          const st = statuses[s.id] ?? s.status;
          const isActive = activeId === s.id;
          return (
            <article
              key={s.id}
              className={`ops-card p-4 sm:p-5 transition-all ${st === 'completed' ? 'opacity-75' : ''} ${isActive ? 'ring-2 ring-[var(--ops-green)]/40' : ''}`}
            >
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                style={{ background: `${SITE_COLORS[s.siteCode]}22`, color: SITE_COLORS[s.siteCode] }}
              >
                {s.program.replace('_', ' ')}
              </span>
              <h2 className="font-semibold mt-2 text-base">{s.title}</h2>
              <p className="text-xs ops-text-muted flex items-center gap-1.5 mt-1.5">
                <MapPin size={13} className="shrink-0" />
                {s.location}
              </p>
              <p className="text-xs ops-text-muted flex items-center gap-1.5 mt-1">
                <Clock size={13} className="shrink-0" />
                {formatTime(s.startsAt)} – {formatTime(s.endsAt)}
              </p>

              {logs[s.id] && (
                <p className="text-xs mt-3 p-3 rounded-lg bg-[var(--ops-green-dim)] text-[var(--ops-green)] border border-[var(--ops-green)]/20 leading-relaxed">
                  <FileText size={12} className="inline mr-1.5 -mt-0.5" />
                  {logs[s.id]}
                </p>
              )}

              {st === 'scheduled' && (
                <button type="button" onClick={() => punchIn(s.id)} className="ops-btn-primary w-full mt-4 text-sm">
                  Punch in now
                </button>
              )}

              {st === 'in_progress' && isActive && (
                <div className="mt-4 space-y-4 border-t border-[var(--ops-border)] pt-4">
                  <div>
                    <p className="ops-section-title mb-2">Vehicle for this trip</p>
                    <div className="grid grid-cols-2 gap-2">
                      {VEHICLE_TYPES.map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setVehicle(v.id as 'company' | 'personal')}
                          className={`p-3.5 rounded-xl border text-left text-xs min-h-[72px] transition-colors ${
                            vehicle === v.id
                              ? 'border-[var(--ops-green)] bg-[var(--ops-green-dim)]'
                              : 'border-[var(--ops-border)]'
                          }`}
                        >
                          {v.id === 'company' ? <Car size={18} className="mb-1.5" /> : <User size={18} className="mb-1.5" />}
                          <div className="font-semibold">{v.label}</div>
                          <div className="ops-text-muted mt-0.5">{v.reimbursement ? 'Reimbursable KM' : 'Fleet only'}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {vehicle === 'personal' && (
                    <div className="grid grid-cols-2 gap-3">
                      <label className="text-xs ops-text-muted">
                        Start KM
                        <input
                          value={kmStart}
                          onChange={(e) => setKmStart(e.target.value)}
                          className="ops-input mt-1"
                          inputMode="numeric"
                        />
                      </label>
                      <label className="text-xs ops-text-muted">
                        End KM
                        <input
                          value={kmEnd}
                          onChange={(e) => setKmEnd(e.target.value)}
                          className="ops-input mt-1"
                          inputMode="numeric"
                        />
                      </label>
                    </div>
                  )}

                  <label className="block text-xs ops-text-muted">
                    Visit log <span className="text-[var(--ops-amber)]">*</span> (required at client site)
                    <textarea
                      value={visitLog}
                      onChange={(e) => setVisitLog(e.target.value)}
                      rows={4}
                      className="ops-input mt-1.5 resize-none"
                      placeholder="What happened during this visit? Incidents, youth engagement, cultural activities…"
                    />
                  </label>

                  <button type="button" onClick={() => punchOut(s.id)} className="ops-btn-primary w-full text-sm">
                    Complete visit &amp; punch out
                  </button>
                </div>
              )}

              {st === 'completed' && (
                <div className="mt-3 text-xs font-bold text-[var(--ops-green)] flex items-center gap-1">
                  ✓ Completed
                </div>
              )}
            </article>
          );
        })}
      </div>

      {nextScheduled && !active && (
        <div className="ops-punch-bar lg:hidden">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider ops-text-muted font-semibold">Up next</p>
            <p className="text-sm font-semibold truncate">{nextScheduled.title}</p>
          </div>
          <button
            type="button"
            onClick={() => punchIn(nextScheduled.id)}
            className="ops-btn-primary text-sm shrink-0 px-4"
          >
            Punch in
          </button>
        </div>
      )}

      {toast && <div className="ops-toast">{toast}</div>}
    </div>
  );
}
