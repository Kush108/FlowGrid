import { MOCK_PROFILES, MOCK_SITES } from '@/lib/sphinixops/mock-data';

export default function HrStaffPage() {
  const staff = MOCK_PROFILES.filter((p) => p.role === 'employee');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Staff roster</h1>
      <p className="text-white/45 text-sm mb-6">Manage assignments and contact info — import from BrightHR in production</p>
      <ul className="grid sm:grid-cols-2 gap-3">
        {staff.map((p) => {
          const site = MOCK_SITES.find((s) => s.id === p.siteId);
          return (
            <li key={p.id} className="ops-card p-4">
              <div className="font-semibold">{p.fullName}</div>
              <div className="text-sm text-white/45">{site?.name}</div>
              <div className="text-xs text-white/35 mt-2">{p.email}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
