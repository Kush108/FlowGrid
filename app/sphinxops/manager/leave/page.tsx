import { getCurrentProfile } from '@/lib/sphinxops/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/sphinxops/constants';
import { LeavePanel } from '@/components/sphinxops/LeavePanel';

export default async function ManagerLeavePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <LeavePanel profile={profile} mode="approve" />;
}
