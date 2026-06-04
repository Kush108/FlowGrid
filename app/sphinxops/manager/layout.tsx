import { redirect } from 'next/navigation';
import { OpsShell } from '@/components/sphinxops/OpsShell';
import { getCurrentProfile } from '@/lib/sphinxops/session';
import { OPS_BASE } from '@/lib/sphinxops/constants';

export default async function ManagerLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== 'manager') redirect(`${OPS_BASE}/login`);
  return <OpsShell profile={profile}>{children}</OpsShell>;
}
