import { getCurrentProfile } from '@/lib/sphinxops/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/sphinxops/constants';
import { EmployeeVisitsList } from '@/components/sphinxops/EmployeeVisitsList';

export default async function EmployeeVisitsPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <EmployeeVisitsList profile={profile} />;
}
