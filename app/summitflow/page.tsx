import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/summitflow/constants';
import { getSession, homeForRole } from '@/lib/summitflow/session';

export default async function SphinxOpsIndex() {
  const session = await getSession();
  if (session) redirect(homeForRole(session.role));
  redirect(`${OPS_BASE}/login`);
}
