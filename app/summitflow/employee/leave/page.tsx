import { getCurrentProfile } from '@/lib/summitflow/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/summitflow/constants';
import { LeavePanel } from '@/components/summitflow/LeavePanel';

export default async function EmployeeLeavePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <LeavePanel profile={profile} mode="request" />;
}
