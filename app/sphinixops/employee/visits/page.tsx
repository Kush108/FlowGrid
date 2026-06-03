import { getCurrentProfile } from '@/lib/sphinixops/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/sphinixops/constants';
import { EmployeeVisitsList } from '@/components/sphinixops/EmployeeVisitsList';

export default async function EmployeeVisitsPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <EmployeeVisitsList profile={profile} />;
}
