import { getCurrentProfile } from '@/lib/summitflow/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/summitflow/constants';
import { EmployeeShiftPanel } from '@/components/summitflow/EmployeeShiftPanel';

export default async function EmployeeHomePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <EmployeeShiftPanel profile={profile} />;
}
