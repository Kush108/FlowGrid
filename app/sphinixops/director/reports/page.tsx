import Link from 'next/link';
import { MOCK_MILEAGE, MOCK_SITES } from '@/lib/sphinixops/mock-data';
import { OPS_BASE } from '@/lib/sphinixops/constants';
import { SITE_COLORS, type SiteCode } from '@/lib/sphinixops/constants';

export default function DirectorReportsPage() {
  const pending = MOCK_MILEAGE.filter((m) => m.status === 'pending');
  const hoursBySite = MOCK_SITES.map((s) => ({
    site: s.name,
    code: s.code,
    hours: [142, 68, 54, 48, 61, 39][MOCK_SITES.indexOf(s)] ?? 50,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Reports</h1>
      <p className="text-white/45 text-sm mb-6">Weekly mileage, hours by site, export-ready for funders and payroll</p>

      {pending.length > 0 && (
        <div className="ops-card p-4 mb-6 border-[#f97316]/30 bg-[#f97316]/5">
          <p className="font-semibold text-[#f97316]">{pending.length} pending mileage approvals</p>
          <p className="text-sm text-white/55 mt-1">HR and site managers can approve; director has full visibility.</p>
          <Link href={`${OPS_BASE}/hr/approvals`} className="text-sm text-[#0ea5e9] mt-2 inline-block hover:underline">
            Open approvals queue →
          </Link>
        </div>
      )}

      <h2 className="text-sm font-semibold uppercase tracking-wider text-white/45 mb-3">Weekly mileage by employee</h2>
      <div className="ops-card overflow-x-auto mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase text-white/45 border-b border-white/[0.08]">
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Site</th>
              <th className="p-3 text-left">Vehicle</th>
              <th className="p-3 text-right">KM</th>
              <th className="p-3 text-right">Reimbursement</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_MILEAGE.map((m) => (
              <tr key={m.id} className="border-b border-white/[0.06]">
                <td className="p-3">{m.employeeName}</td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ background: SITE_COLORS[m.siteCode] }} />
                    {m.siteCode.toUpperCase()}
                  </span>
                </td>
                <td className="p-3 capitalize">{m.vehicleType}</td>
                <td className="p-3 text-right tabular-nums">{m.kmTotal}</td>
                <td className="p-3 text-right tabular-nums">
                  {m.reimbursementEligible ? `$${m.reimbursementAmount.toFixed(2)}` : '—'}
                </td>
                <td className="p-3">
                  <span className={m.status === 'approved' ? 'text-[#22c55e]' : 'text-[#f97316]'}>{m.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-sm font-semibold uppercase tracking-wider text-white/45 mb-3">Hours worked per site this week</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {hoursBySite.map((row) => (
          <div key={row.code} className="ops-card p-4 flex justify-between items-center">
            <span className="flex items-center gap-2 text-sm font-medium">
              <span className="w-3 h-3 rounded-full" style={{ background: SITE_COLORS[row.code as SiteCode] }} />
              {row.site}
            </span>
            <span className="text-xl font-bold text-[#22c55e] tabular-nums">{row.hours}h</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" className="ops-btn-primary text-sm">
          Export Excel (demo)
        </button>
        <button type="button" className="ops-btn-ghost text-sm">
          Funder report PDF (demo)
        </button>
      </div>
    </div>
  );
}
