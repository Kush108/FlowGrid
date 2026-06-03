import { getCurrentProfile } from '@/lib/sphinixops/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/sphinixops/constants';
import { MOCK_MILEAGE } from '@/lib/sphinixops/mock-data';
import { MileageTable } from '@/components/sphinixops/MileageTable';

export default async function ManagerMileagePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  const siteCode = profile.siteCode;
  const entries = siteCode ? MOCK_MILEAGE.filter((m) => m.siteCode === siteCode) : MOCK_MILEAGE;

  return (
    <MileageTable
      entries={entries}
      title="Site Mileage"
      description={`Mileage for your site team${siteCode ? ` (${siteCode.toUpperCase()})` : ''} — approve personal vehicle claims in Approvals.`}
    />
  );
}
