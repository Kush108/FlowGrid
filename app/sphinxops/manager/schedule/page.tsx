import { ScheduleBoard } from '@/components/sphinxops/ScheduleBoard';
import { getCurrentProfile } from '@/lib/sphinxops/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/sphinxops/constants';

export default async function ManagerSchedulePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <ScheduleBoard profile={profile} />;
}
