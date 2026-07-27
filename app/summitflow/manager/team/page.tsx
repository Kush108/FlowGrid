import { getCurrentProfile } from '@/lib/summitflow/session';
import { MOCK_PROFILES, MOCK_SITES } from '@/lib/summitflow/mock-data';

export default async function ManagerTeamPage() {
  const profile = await getCurrentProfile();
  const site = MOCK_SITES.find((s) => s.id === profile?.siteId);
  const team = MOCK_PROFILES.filter((p) => p.siteId === profile?.siteId && p.role === 'employee');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">My team</h1>
      <p className="text-white/45 text-sm mb-6">{site?.name} — field staff you supervise</p>
      <ul className="space-y-2">
        {team.map((p) => (
          <li key={p.id} className="ops-card p-4 flex justify-between items-center">
            <span className="font-medium">{p.fullName}</span>
            <span className="text-xs text-[#22c55e]">On shift</span>
          </li>
        ))}
        {team.length === 0 && <li className="text-white/45 text-sm">No demo staff at this site — switch to Marcus (Main) on login.</li>}
      </ul>
    </div>
  );
}
