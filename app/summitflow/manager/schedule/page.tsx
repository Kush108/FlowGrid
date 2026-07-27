import { ScheduleBoard } from '@/components/summitflow/ScheduleBoard';
import { getCurrentProfile } from '@/lib/summitflow/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/summitflow/constants';

export default async function ManagerSchedulePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return <ScheduleBoard profile={profile} />;
}
