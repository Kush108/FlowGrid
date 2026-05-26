import { redirect } from 'next/navigation';
import { OpsShell } from '@/components/sphinixops/OpsShell';
import { getCurrentProfile } from '@/lib/sphinixops/session';
import { OPS_BASE } from '@/lib/sphinixops/constants';

export default async function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();
  if (!profile || profile.role !== 'employee') redirect(`${OPS_BASE}/login`);
  return (
    <OpsShell profile={profile} mobile>
      {children}
    </OpsShell>
  );
}
