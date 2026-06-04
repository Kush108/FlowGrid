'use client';

import { useState, useEffect } from 'react';
import { OPS_BASE } from '@/lib/sphinxops/constants';
import type { Profile } from '@/lib/sphinxops/types';

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  pending: { bg: 'rgba(234,179,8,0.12)', color: '#ca8a04' },
  approved: { bg: 'rgba(34,197,94,0.12)', color: '#16a34a' },
  denied: { bg: 'rgba(239,68,68,0.12)', color: '#dc2626' },
};

type LeaveRecord = {
  id: string;
  staffName: string;
  type: string;
  startDate: string;
  endDate: string;
  note?: string;
  status: string;
};

export function LeavePanel({
  profile,
  mode = 'approve',
}: {
  profile: Profile;
  mode?: 'approve' | 'request';
}) {
  const [requests, setRequests] = useState<LeaveRecord[]>([]);
  const [type, setType] = useState('vacation');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetch(`${OPS_BASE}/api/leave`)
      .then((r) => r.json())
      .then(setRequests);
  }, []);

  async function updateStatus(id: string, status: 'approved' | 'denied') {
    const res = await fetch(`${OPS_BASE}/api/leave`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    const updated = await res.json();
    setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)));
    setToast(status === 'approved' ? 'Leave approved' : 'Leave denied');
    setTimeout(() => setToast(''), 3000);
  }

  async function submitRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!startDate || !endDate) return;
    setSubmitting(true);
    const res = await fetch(`${OPS_BASE}/api/leave`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, startDate, endDate, note }),
    });
    const record = await res.json();
    if (res.ok) {
      setRequests((prev) => [record, ...prev]);
      setStartDate('');
      setEndDate('');
      setNote('');
      setToast('Leave request submitted — HR will review');
      setTimeout(() => setToast(''), 3000);
    }
    setSubmitting(false);
  }

  const canApprove = mode === 'approve' && ['director', 'hr', 'manager'].includes(profile.role);
  const myRequests =
    mode === 'request'
      ? requests.filter((r) => r.staffName === profile.fullName)
      : requests;
  const pending = myRequests.filter((r) => r.status === 'pending');
  const rest = myRequests.filter((r) => r.status !== 'pending');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        {mode === 'request' ? 'Request Leave' : 'Leave Requests'}
      </h1>
      <p className="ops-text-muted text-sm mb-6">
        {mode === 'request'
          ? 'Submit vacation, sick, or personal leave. HR and your site manager will review.'
          : `${pending.length} pending approval`}
      </p>

      {mode === 'request' && (
        <form onSubmit={submitRequest} className="ops-card p-5 mb-8 max-w-lg space-y-4">
          <div>
            <label className="ops-section-title block mb-2">Leave type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="ops-input">
              <option value="vacation">Vacation</option>
              <option value="sick">Sick leave</option>
              <option value="personal">Personal</option>
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="text-sm ops-text-muted">
              Start date
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="ops-input mt-1"
                required
              />
            </label>
            <label className="text-sm ops-text-muted">
              End date
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="ops-input mt-1"
                required
              />
            </label>
          </div>
          <label className="text-sm ops-text-muted block">
            Notes (optional)
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="ops-input mt-1 resize-none"
              placeholder="Coverage arrangements, reason…"
            />
          </label>
          <button type="submit" disabled={submitting} className="ops-btn-primary text-sm">
            {submitting ? 'Submitting…' : 'Submit request'}
          </button>
        </form>
      )}

      {[...pending, ...rest].map((r) => (
        <div
          key={r.id}
          className="ops-card"
          style={{
            padding: 16,
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>
              {r.staffName}
              <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--ops-muted)' }}>{r.type}</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ops-muted)' }}>
              {r.startDate} → {r.endDate}
              {r.note && <span> · {r.note}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: 6,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                ...STATUS_STYLES[r.status],
              }}
            >
              {r.status}
            </span>
            {canApprove && r.status === 'pending' && (
              <>
                <button
                  type="button"
                  className="ops-btn-primary"
                  style={{ fontSize: 12, padding: '6px 12px' }}
                  onClick={() => updateStatus(r.id, 'approved')}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="ops-btn-ghost"
                  style={{ fontSize: 12, padding: '6px 12px', color: 'var(--ops-red)' }}
                  onClick={() => updateStatus(r.id, 'denied')}
                >
                  Deny
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {myRequests.length === 0 && (
        <div className="ops-card p-8 text-center ops-text-muted text-sm">No leave requests yet</div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 ops-card px-4 py-3 text-sm z-50 border-[var(--ops-green)]/40">
          {toast}
        </div>
      )}
    </div>
  );
}
