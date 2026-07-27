import { redirect } from 'next/navigation';
import { OpsShell } from '@/components/summitflow/OpsShell';
import { getCurrentProfile } from '@/lib/summitflow/session';
import { OPS_BASE } from '@/lib/summitflow/constants';

export default async function HrLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== 'hr') redirect(`${OPS_BASE}/login`);
  return <OpsShell profile={profile}>{children}</OpsShell>;
}
