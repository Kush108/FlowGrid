'use client';
import { useState, useEffect } from 'react';

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  pending:  { bg: 'rgba(234,179,8,0.12)',  color: '#ca8a04' },
  approved: { bg: 'rgba(34,197,94,0.12)',  color: '#16a34a' },
  denied:   { bg: 'rgba(239,68,68,0.12)',  color: '#dc2626' },
};

export default function LeavePage() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    fetch('/sphinixops/api/leave').then(r => r.json()).then(setRequests);
  }, []);

  async function updateStatus(id: string, status: 'approved' | 'denied') {
    const res = await fetch('/sphinixops/api/leave', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    const updated = await res.json();
    setRequests(prev => prev.map(r => r.id === id ? updated : r));
  }

  const pending = requests.filter(r => r.status === 'pending');
  const rest    = requests.filter(r => r.status !== 'pending');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Leave Requests</h1>
      <p style={{ color: 'var(--ops-muted)', fontSize: 13, marginBottom: 24 }}>
        {pending.length} pending approval
      </p>

      {[...pending, ...rest].map(r => (
        <div key={r.id} className="ops-card"
          style={{ padding: 16, marginBottom: 10,
                   display: 'flex', alignItems: 'center',
                   justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div style={{ fontWeight: 500, marginBottom: 4 }}>
              {r.staffName}
              <span style={{ marginLeft: 8, fontSize: 12,
                             color: 'var(--ops-muted)' }}>
                {r.type}
              </span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ops-muted)' }}>
              {r.startDate} → {r.endDate}
              {r.note && <span> · {r.note}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: '3px 10px',
              borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.03em',
              ...STATUS_STYLES[r.status]
            }}>{r.status}</span>
            {r.status === 'pending' && (
              <>
                <button className="ops-btn-primary"
                  style={{ fontSize: 12, padding: '6px 12px' }}
                  onClick={() => updateStatus(r.id, 'approved')}>
                  Approve
                </button>
                <button className="ops-btn-ghost"
                  style={{ fontSize: 12, padding: '6px 12px',
                           color: '#ef4444' }}
                  onClick={() => updateStatus(r.id, 'denied')}>
                  Deny
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {requests.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0',
                      color: 'var(--ops-muted)', fontSize: 14 }}>
          No leave requests yet
        </div>
      )}
    </div>
  );
}