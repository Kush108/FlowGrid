'use client';
import { useState } from 'react';
import { MOCK_PROFILES, MOCK_SITES } from '@/lib/summitflow/mock-data';
import { SITE_COLORS, type SiteCode } from '@/lib/summitflow/constants';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = ['7am','8am','9am','10am','11am','12pm','1pm','2pm',
               '3pm','4pm','5pm','6pm','7pm'];

// Mock schedule data — replace with DB calls
const MOCK_SHIFTS = MOCK_PROFILES
  .filter(p => p.role === 'employee')
  .slice(0, 12)
  .flatMap((p, i) => ([
    { staffId: p.id, day: DAYS[i % 5], start: '9am', end: '5pm',
      siteId: p.siteId, type: 'regular' },
    { staffId: p.id, day: DAYS[(i + 2) % 7], start: '8am', end: '4pm',
      siteId: p.siteId, type: 'regular' },
  ]));

export default function SchedulePage() {
  const [selectedSite, setSelectedSite] = useState('all');
  const employees = MOCK_PROFILES.filter(p =>
    p.role === 'employee' || p.role === 'manager'
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 className="text-2xl font-bold">Weekly Schedule</h1>
          <p style={{ color: 'var(--ops-muted)', fontSize: 13, marginTop: 2 }}>
            Week of May 26 – Jun 1, 2026
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select
            className="ops-input"
            style={{ width: 'auto', padding: '8px 12px' }}
            value={selectedSite}
            onChange={e => setSelectedSite(e.target.value)}
          >
            <option value="all">All Sites</option>
            {MOCK_SITES.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <button className="ops-btn-primary" style={{ fontSize: 13 }}>
            + Add Shift
          </button>
        </div>
      </div>

      <div className="ops-card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse',
                        minWidth: 700, fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--ops-border)' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left',
                           color: 'var(--ops-muted)', width: 160,
                           fontSize: 11, textTransform: 'uppercase' }}>
                Staff Member
              </th>
              {DAYS.map(d => (
                <th key={d} style={{ padding: '12px 8px', textAlign: 'center',
                  color: 'var(--ops-muted)', fontSize: 11,
                  textTransform: 'uppercase', fontWeight: 600 }}>
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.slice(0, 15).map((emp, i) => {
              const site = MOCK_SITES.find(s => s.id === emp.siteId);
              const empShifts = MOCK_SHIFTS.filter(s => s.staffId === emp.id);
              return (
                <tr key={emp.id}
                  style={{ borderBottom: '1px solid var(--ops-border)',
                           background: i % 2 === 0 ? 'transparent'
                             : 'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{ fontWeight: 500 }}>{emp.fullName}</div>
                    {site && (
                      <div style={{ display: 'flex', alignItems: 'center',
                                    gap: 5, marginTop: 2 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%',
                          background: SITE_COLORS[site.code as SiteCode] }} />
                        <span style={{ fontSize: 11,
                                       color: 'var(--ops-muted)' }}>
                          {site.name}
                        </span>
                      </div>
                    )}
                  </td>
                  {DAYS.map(day => {
                    const shift = empShifts.find(s => s.day === day);
                    return (
                      <td key={day} style={{ padding: '6px 4px',
                                             textAlign: 'center' }}>
                        {shift ? (
                          <div style={{
                            background: 'rgba(34,197,94,0.12)',
                            border: '1px solid rgba(34,197,94,0.25)',
                            borderRadius: 6, padding: '4px 6px',
                            fontSize: 11, color: 'var(--ops-green)',
                            fontWeight: 500,
                          }}>
                            {shift.start}–{shift.end}
                          </div>
                        ) : (
                          <span style={{ color: 'var(--ops-border)',
                                         fontSize: 16 }}>—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}