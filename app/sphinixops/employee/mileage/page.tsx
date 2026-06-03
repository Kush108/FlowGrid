import { getCurrentProfile } from '@/lib/sphinixops/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/sphinixops/constants';
import { EmployeeMileagePanel } from '@/components/sphinixops/EmployeeMileagePanel';

export default async function EmployeeMileagePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <EmployeeMileagePanel profile={profile} />;
}
