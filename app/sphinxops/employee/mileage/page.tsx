import { getCurrentProfile } from '@/lib/sphinxops/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/sphinxops/constants';
import { EmployeeMileagePanel } from '@/components/sphinxops/EmployeeMileagePanel';

export default async function EmployeeMileagePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <EmployeeMileagePanel profile={profile} />;
}
