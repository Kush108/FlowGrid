import Link from 'next/link';
import { MOCK_MILEAGE, MOCK_SITES } from '@/lib/summitflow/mock-data';
import { OPS_BASE, SITE_COLORS, type SiteCode } from '@/lib/summitflow/constants';

export default function HrReportsPage() {
  const pending = MOCK_MILEAGE.filter((m) => m.status === 'pending');
  const hoursBySite = MOCK_SITES.map((s, i) => ({
    site: s.name,
    code: s.code,
    hours: [142, 68, 54, 48, 61, 39][i] ?? 50,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Reports</h1>
      <p className="ops-text-muted text-sm mb-6">Payroll-ready mileage and hours summaries for HR export</p>

      {pending.length > 0 && (
        <div className="ops-card p-4 mb-6 border-[var(--ops-amber)]/30 bg-[var(--ops-amber)]/5">
          <p className="font-semibold text-[var(--ops-amber)]">{pending.length} pending mileage approvals</p>
          <Link href={`${OPS_BASE}/hr/approvals`} className="text-sm text-[var(--ops-blue)] mt-2 inline-block hover:underline">
            Open approvals queue →
          </Link>
        </div>
      )}

      <h2 className="ops-section-title">Weekly mileage</h2>
      <div className="ops-card overflow-x-auto mb-8">
        <table className="ops-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Site</th>
              <th>KM</th>
              <th>Reimbursement</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_MILEAGE.map((m) => (
              <tr key={m.id}>
                <td>{m.employeeName}</td>
                <td>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: SITE_COLORS[m.siteCode] }} />
                    {m.siteCode.toUpperCase()}
                  </span>
                </td>
                <td className="tabular-nums">{m.kmTotal}</td>
                <td className="tabular-nums">
                  {m.reimbursementEligible ? `$${m.reimbursementAmount.toFixed(2)}` : '—'}
                </td>
                <td>{m.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="ops-section-title">Hours by site</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {hoursBySite.map((row) => (
          <div key={row.code} className="ops-card p-4 flex justify-between items-center">
            <span className="flex items-center gap-2 text-sm font-medium">
              <span className="w-3 h-3 rounded-full" style={{ background: SITE_COLORS[row.code as SiteCode] }} />
              {row.site}
            </span>
            <span className="text-xl font-bold text-[var(--ops-green)] tabular-nums">{row.hours}h</span>
          </div>
        ))}
      </div>
    </div>
  );
}
