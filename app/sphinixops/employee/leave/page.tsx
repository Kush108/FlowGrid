import { getCurrentProfile } from '@/lib/sphinixops/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/sphinixops/constants';
import { LeavePanel } from '@/components/sphinixops/LeavePanel';

export default async function EmployeeLeavePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <LeavePanel profile={profile} mode="request" />;
}
