import { getCurrentProfile } from '@/lib/sphinxops/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/sphinxops/constants';
import { EmployeeShiftsList } from '@/components/sphinxops/EmployeeShiftsList';

export default async function EmployeeShiftsPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <EmployeeShiftsList profile={profile} />;
}
