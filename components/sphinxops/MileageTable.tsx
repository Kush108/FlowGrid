import { MOCK_MILEAGE } from '@/lib/sphinxops/mock-data';
import { SITE_COLORS, type SiteCode } from '@/lib/sphinxops/constants';
import type { MileageEntry } from '@/lib/sphinxops/types';

function statusClass(status: MileageEntry['status']) {
  if (status === 'approved') return 'text-[var(--ops-green)]';
  if (status === 'pending') return 'text-[var(--ops-amber)]';
  return 'text-[var(--ops-red)]';
}

export function MileageTable({
  entries = MOCK_MILEAGE,
  title = 'Mileage entries',
  description = 'Company vehicles tracked for fleet compliance. Personal vehicle KM eligible for reimbursement after approval.',
}: {
  entries?: MileageEntry[];
  title?: string;
  description?: string;
}) {
  const pending = entries.filter((m) => m.status === 'pending').length;

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-2">{title}</h1>
      <p className="ops-text-muted text-sm mb-5 sm:mb-6 leading-relaxed">{description}</p>

      {pending > 0 && (
        <div className="ops-card p-4 mb-5 sm:mb-6 border-[var(--ops-amber)]/30 bg-[var(--ops-amber)]/5">
          <p className="font-semibold text-[var(--ops-amber)]">
            {pending} pending approval{pending !== 1 ? 's' : ''}
          </p>
          <p className="text-sm ops-text-muted mt-1">Review in Approvals to include in payroll export.</p>
        </div>
      )}

      {/* Desktop / tablet table */}
      <div className="ops-card overflow-x-auto ops-table-desktop">
        <table className="ops-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Site</th>
              <th>Vehicle</th>
              <th className="text-right">KM</th>
              <th className="text-right">Reimbursement</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center ops-text-muted py-8">
                  No mileage entries this week
                </td>
              </tr>
            ) : (
              entries.map((m) => (
                <tr key={m.id}>
                  <td>{m.employeeName}</td>
                  <td>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: SITE_COLORS[m.siteCode as SiteCode] }} />
                      {m.siteCode.toUpperCase()}
                    </span>
                  </td>
                  <td className="capitalize">{m.vehicleType}</td>
                  <td className="text-right tabular-nums">{m.kmTotal}</td>
                  <td className="text-right tabular-nums">
                    {m.reimbursementEligible ? `$${m.reimbursementAmount.toFixed(2)}` : '—'}
                  </td>
                  <td>
                    <span className={statusClass(m.status)}>{m.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card stack */}
      <div className="ops-table-mobile-cards">
        {entries.length === 0 ? (
          <div className="ops-card p-8 text-center ops-text-muted text-sm">No mileage entries this week</div>
        ) : (
          entries.map((m) => (
            <article key={m.id} className="ops-mobile-data-card">
              <div className="ops-mobile-data-card-header">
                <span className="font-semibold text-sm">{m.employeeName}</span>
                <span className={`ops-badge ops-badge-${m.status === 'approved' ? 'green' : m.status === 'pending' ? 'amber' : 'red'}`}>
                  {m.status}
                </span>
              </div>
              <div className="ops-mobile-data-card-grid">
                <div>
                  <span className="ops-mobile-data-label">Site</span>
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <span className="w-2 h-2 rounded-full" style={{ background: SITE_COLORS[m.siteCode as SiteCode] }} />
                    {m.siteCode.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="ops-mobile-data-label">Vehicle</span>
                  <span className="text-sm capitalize">{m.vehicleType}</span>
                </div>
                <div>
                  <span className="ops-mobile-data-label">KM</span>
                  <span className="text-sm font-semibold tabular-nums">{m.kmTotal}</span>
                </div>
                <div>
                  <span className="ops-mobile-data-label">Reimbursement</span>
                  <span className="text-sm font-semibold tabular-nums">
                    {m.reimbursementEligible ? `$${m.reimbursementAmount.toFixed(2)}` : '—'}
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
