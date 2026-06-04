import { redirect } from 'next/navigation';
import { OPS_BASE } from '@/lib/sphinxops/constants';
import { getSession, homeForRole } from '@/lib/sphinxops/session';

export default async function SphinxOpsIndex() {
  const session = await getSession();
  if (session) redirect(homeForRole(session.role));
  redirect(`${OPS_BASE}/login`);
}
