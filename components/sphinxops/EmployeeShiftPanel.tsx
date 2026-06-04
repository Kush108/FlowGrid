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
    const reimb = vehicle === 'personal';
    notify(
      `Punched out — ${km} km logged (${vehicle === 'company' ? 'fleet only, no reimbursement' : `~$${(km * 0.7).toFixed(2)} pending approval`})`,
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <header className="mb-6">
        <h1 className="text-xl font-bold">Today&apos;s visits</h1>
        <p className="text-sm text-white/45 mt-1">{profile.fullName}</p>
      </header>

      <div className="space-y-3 mb-6">
        {myShifts.map((s) => {
          const st = statuses[s.id] ?? s.status;
          const isActive = activeId === s.id;
          return (
            <article
              key={s.id}
              className={`ops-card p-4 ${st === 'completed' ? 'opacity-80' : ''} ${isActive ? 'ring-2 ring-[#22c55e]/50' : ''}`}
            >
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                style={{ background: `${SITE_COLORS[s.siteCode]}22`, color: SITE_COLORS[s.siteCode] }}
              >
                {s.program.replace('_', ' ')}
              </span>
              <h2 className="font-semibold mt-2">{s.title}</h2>
              <p className="text-xs text-white/45 flex items-center gap-1 mt-1">
                <MapPin size={12} />
                {s.location}
              </p>
              <p className="text-xs text-white/45 flex items-center gap-1 mt-1">
                <Clock size={12} />
                {formatTime(s.startsAt)} – {formatTime(s.endsAt)}
              </p>

              {logs[s.id] && (
                <p className="text-xs mt-3 p-2 rounded-lg bg-[#22c55e]/10 text-[#86efac] border border-[#22c55e]/20">
                  <FileText size={12} className="inline mr-1" />
                  {logs[s.id]}
                </p>
              )}

              {st === 'scheduled' && (
                <button type="button" onClick={() => punchIn(s.id)} className="ops-btn-primary w-full mt-4 text-sm">
                  Punch in
                </button>
              )}

              {st === 'in_progress' && isActive && (
                <div className="mt-4 space-y-3 border-t border-white/[0.08] pt-4">
                  <div>
                    <p className="text-xs text-white/45 mb-2">Vehicle for this trip</p>
                    <div className="grid grid-cols-2 gap-2">
                      {VEHICLE_TYPES.map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setVehicle(v.id as 'company' | 'personal')}
                          className={`p-3 rounded-xl border text-left text-xs ${
                            vehicle === v.id ? 'border-[#22c55e] bg-[#22c55e]/10' : 'border-white/[0.08]'
                          }`}
                        >
                          {v.id === 'company' ? <Car size={16} className="mb-1" /> : <User size={16} className="mb-1" />}
                          <div className="font-semibold">{v.label}</div>
                          <div className="text-white/40 mt-0.5">{v.reimbursement ? 'Reimbursable KM' : 'Fleet tracking only'}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {vehicle === 'personal' && (
                    <div className="grid grid-cols-2 gap-2">
                      <label className="text-xs text-white/45">
                        Start KM
                        <input value={kmStart} onChange={(e) => setKmStart(e.target.value)} className="ops-input mt-1" inputMode="numeric" />
                      </label>
                      <label className="text-xs text-white/45">
                        End KM
                        <input value={kmEnd} onChange={(e) => setKmEnd(e.target.value)} className="ops-input mt-1" inputMode="numeric" />
                      </label>
                    </div>
                  )}

                  <label className="block text-xs text-white/45">
                    Visit log <span className="text-[#f97316]">*</span> (required at client site)
                    <textarea
                      value={visitLog}
                      onChange={(e) => setVisitLog(e.target.value)}
                      rows={3}
                      className="ops-input mt-1 resize-none"
                      placeholder="What happened during this visit? Incidents, youth engagement, cultural activities…"
                    />
                  </label>

                  <button type="button" onClick={() => punchOut(s.id)} className="ops-btn-primary w-full text-sm">
                    Complete visit &amp; punch out
                  </button>
                </div>
              )}

              {st === 'completed' && <div className="mt-3 text-xs font-bold text-[#22c55e]">✓ Completed</div>}
            </article>
          );
        })}
      </div>

      {active && (
        <p className="text-center text-xs text-white/35 mb-4">Employees can request schedule changes — manager/HR approves in Phase 2</p>
      )}

      {toast && (
        <div className="fixed bottom-24 left-4 right-4 mx-auto max-w-lg bg-[#0f1f35] border border-[#22c55e]/30 text-white text-sm text-center py-3 px-4 rounded-xl z-50 shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}
