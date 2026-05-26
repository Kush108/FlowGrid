import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/sphinixops/constants';
import { getSession, homeForRole } from '@/lib/sphinixops/session';

export default async function SphinixOpsIndex() {
  const session = await getSession();
  if (session) redirect(homeForRole(session.role));
  redirect(`${OPS_BASE}/login`);
}
