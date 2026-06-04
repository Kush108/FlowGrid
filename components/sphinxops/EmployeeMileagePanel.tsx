'use client';

import { useMemo, useState } from 'react';
import { MOCK_MILEAGE } from '@/lib/sphinixops/mock-data';
import { SITE_COLORS } from '@/lib/sphinixops/constants';
import type { Profile } from '@/lib/sphinixops/types';

export function EmployeeMileagePanel({ profile }: { profile: Profile }) {
  const entries = useMemo(
    () => MOCK_MILEAGE.filter((m) => m.employeeId === profile.id),
    [profile.id],
  );
  const [km, setKm] = useState('');
  const [vehicle, setVehicle] = useState<'company' | 'personal'>('personal');
  const [toast, setToast] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const kmNum = Number(km);
    if (!kmNum || kmNum <= 0) return;
    setToast(
      vehicle === 'company'
        ? `${kmNum} km logged for fleet tracking (no reimbursement)`
        : `${kmNum} km submitted — ~$${(kmNum * 0.7).toFixed(2)} pending approval`,
    );
    setKm('');
    setTimeout(() => setToast(''), 3200);
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-2">Mileage</h1>
      <p className="ops-text-muted text-sm mb-6">
        Log kilometres for client visits. Personal vehicle trips are reimbursed at $0.70/km after manager approval.
      </p>

      <form onSubmit={submit} className="ops-card p-5 mb-8 space-y-4">
        <p className="ops-section-title mb-0">Log trip</p>
        <div className="grid grid-cols-2 gap-2">
          {(['company', 'personal'] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVehicle(v)}
              className={`p-3 rounded-xl border text-left text-xs ${
                vehicle === v ? 'border-[var(--ops-green)] bg-[var(--ops-green-dim)]' : 'border-[var(--ops-border)]'
              }`}
            >
              <div className="font-semibold capitalize">{v} vehicle</div>
              <div className="ops-text-muted mt-0.5">{v === 'personal' ? 'Reimbursable' : 'Fleet only'}</div>
            </button>
          ))}
        </div>
        <label className="text-sm ops-text-muted block">
          Kilometres
          <input
            type="number"
            min={1}
            value={km}
            onChange={(e) => setKm(e.target.value)}
            className="ops-input mt-1"
            placeholder="e.g. 14"
            required
          />
        </label>
        <button type="submit" className="ops-btn-primary text-sm w-full">
          Submit mileage
        </button>
      </form>

      <h2 className="ops-section-title">This week</h2>
      <div className="ops-card divide-y divide-[var(--ops-border)]">
        {entries.length === 0 ? (
          <p className="p-4 text-sm ops-text-muted text-center">No entries yet</p>
        ) : (
          entries.map((m) => (
            <div key={m.id} className="p-4 flex justify-between items-center text-sm">
              <div>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: SITE_COLORS[m.siteCode] }} />
                  {m.kmTotal} km · {m.vehicleType}
                </span>
              </div>
              <span className={m.status === 'approved' ? 'text-[var(--ops-green)]' : 'text-[var(--ops-amber)]'}>
                {m.status}
              </span>
            </div>
          ))
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 ops-card px-4 py-3 text-sm z-50 max-w-sm text-center">
          {toast}
        </div>
      )}
    </div>
  );
}
