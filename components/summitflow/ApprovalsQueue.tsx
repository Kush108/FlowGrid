'use client';

import { useState } from 'react';
import { MOCK_MILEAGE } from '@/lib/summitflow/mock-data';
import { SITE_COLORS } from '@/lib/summitflow/constants';
import type { MileageEntry } from '@/lib/summitflow/types';

export function ApprovalsQueue({ title }: { title?: string }) {
  const [items, setItems] = useState<MileageEntry[]>(MOCK_MILEAGE);
  const [toast, setToast] = useState('');

  function act(id: string, status: 'approved' | 'rejected') {
    setItems((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    setToast(status === 'approved' ? 'Approved — added to payroll export' : 'Rejected — employee notified');
    setTimeout(() => setToast(''), 3000);
  }

  const pending = items.filter((m) => m.status === 'pending');

  return (
    <div>
      {title && <h1 className="text-2xl font-bold mb-2">{title}</h1>}
      <p className="text-white/45 text-sm mb-6">
        Company vehicle trips are tracked for fleet only. Personal vehicle KM eligible for reimbursement after approval.
      </p>

      {pending.length === 0 ? (
        <div className="ops-card p-8 text-center text-white/45">No pending approvals</div>
      ) : (
        <div className="space-y-3">
          {pending.map((m) => (
            <div key={m.id} className="ops-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-semibold">{m.employeeName}</div>
                <div className="text-sm text-white/55 mt-1 flex flex-wrap gap-2 items-center">
                  <span className="w-2 h-2 rounded-full" style={{ background: SITE_COLORS[m.siteCode] }} />
                  {m.kmTotal} km · {m.vehicleType === 'company' ? 'Company vehicle (no reimbursement)' : 'Personal vehicle'}
                </div>
                {m.reimbursementEligible && (
                  <div className="text-sm text-[#22c55e] mt-1">Est. reimbursement: ${m.reimbursementAmount.toFixed(2)}</div>
                )}
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => act(m.id, 'approved')} className="ops-btn-primary text-sm py-2 px-4">
                  Approve
                </button>
                <button type="button" onClick={() => act(m.id, 'rejected')} className="ops-btn-ghost text-sm py-2 px-4">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-sm font-semibold uppercase tracking-wider text-white/45 mt-10 mb-3">Processed</h2>
      <div className="ops-card divide-y divide-white/[0.06]">
        {items
          .filter((m) => m.status !== 'pending')
          .map((m) => (
            <div key={m.id} className="p-4 flex justify-between text-sm">
              <span>
                {m.employeeName} — {m.kmTotal} km ({m.vehicleType})
              </span>
              <span className={m.status === 'approved' ? 'text-[#22c55e]' : 'text-red-400'}>{m.status}</span>
            </div>
          ))}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0f1f35] border border-[#22c55e]/40 text-white px-4 py-3 rounded-xl text-sm z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
