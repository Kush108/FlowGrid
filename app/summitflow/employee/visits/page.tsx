import { getCurrentProfile } from '@/lib/summitflow/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/summitflow/constants';
import { EmployeeVisitsList } from '@/components/summitflow/EmployeeVisitsList';

export default async function EmployeeVisitsPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <EmployeeVisitsList profile={profile} />;
}
