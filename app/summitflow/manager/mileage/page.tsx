import { getCurrentProfile } from '@/lib/summitflow/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/summitflow/constants';
import { MOCK_MILEAGE } from '@/lib/summitflow/mock-data';
import { MileageTable } from '@/components/summitflow/MileageTable';

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
