import { getCurrentProfile } from '@/lib/sphinixops/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/sphinixops/constants';
import { EmployeeShiftPanel } from '@/components/sphinixops/EmployeeShiftPanel';

export default async function EmployeeHomePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <EmployeeShiftPanel profile={profile} />;
}
