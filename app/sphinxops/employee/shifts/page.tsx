import { Suspense } from 'react';
import { getCurrentProfile } from '@/lib/sphinxops/session';
import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/sphinxops/constants';
import { EmployeeShiftsHub } from '@/components/sphinxops/EmployeeShiftsHub';

function ShiftsLoading() {
  return (
    <div className="ops-card p-10 flex items-center justify-center ops-text-muted text-sm">
      Loading shifts…
    </div>
  );
}

export default async function EmployeeShiftsPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect(`${OPS_BASE}/login`);

  return (
    <Suspense fallback={<ShiftsLoading />}>
      <EmployeeShiftsHub profile={profile} />
    </Suspense>
  );
}
