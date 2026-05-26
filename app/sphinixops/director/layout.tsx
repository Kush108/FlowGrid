import { redirect } from 'next/navigation';
import { OpsShell } from '@/components/sphinixops/OpsShell';
import { getCurrentProfile } from '@/lib/sphinixops/session';
import { OPS_BASE } from '@/lib/sphinixops/constants';

export default async function DirectorLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== 'director') redirect(`${OPS_BASE}/login`);
  return <OpsShell profile={profile}>{children}</OpsShell>;
}
