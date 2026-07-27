import { getCurrentProfile } from '@/lib/summitflow/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/summitflow/constants';
import { EmployeeMileagePanel } from '@/components/summitflow/EmployeeMileagePanel';

export default async function EmployeeMileagePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <EmployeeMileagePanel profile={profile} />;
}
