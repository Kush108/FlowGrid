import { getCurrentProfile } from '@/lib/sphinxops/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/sphinxops/constants';
import { EmployeeShiftPanel } from '@/components/sphinxops/EmployeeShiftPanel';

export default async function EmployeeHomePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <EmployeeShiftPanel profile={profile} />;
}
