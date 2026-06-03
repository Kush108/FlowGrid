import { getCurrentProfile } from '@/lib/sphinixops/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/sphinixops/constants';
import { EmployeeShiftsList } from '@/components/sphinixops/EmployeeShiftsList';

export default async function EmployeeShiftsPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <EmployeeShiftsList profile={profile} />;
}
