import { MOCK_PROFILES, MOCK_SITES } from '@/lib/summitflow/mock-data';
import { SITE_COLORS, type SiteCode } from '@/lib/summitflow/constants';

export default function DirectorStaffPage() {
  const employees = MOCK_PROFILES.filter((p) => p.role === 'employee' || p.role === 'manager');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">All Staff</h1>
      <p className="text-white/45 text-sm mb-6">70+ staff across 6 service zones — prototype shows sample records</p>
      <div className="ops-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-white/45 text-xs uppercase border-b border-white/[0.08]">
              <th className="p-4">Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">Site</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((p) => {
              const site = MOCK_SITES.find((s) => s.id === p.siteId);
              return (
                <tr key={p.id} className="border-b border-white/[0.06] hover:bg-white/[0.02]">
                  <td className="p-4 font-medium">{p.fullName}</td>
                  <td className="p-4 capitalize">{p.role}</td>
                  <td className="p-4">
                    {site && (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: SITE_COLORS[site.code as SiteCode] }} />
                        {site.name}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-white/55">{p.email}</td>
                  <td className="p-4 text-[#22c55e]">Active</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
