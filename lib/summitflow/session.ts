import { cookies } from 'next/headers';
import { ROLE_HOME, SESSION_COOKIE, type OpsRole } from './constants';
import { getDemoProfile, getProfileById } from './mock-data';
import type { Profile } from './types';

export interface OpsSession {
  profileId: string;
  role: OpsRole;
  mode: 'demo' | 'supabase';
}

export function parseSession(raw: string | undefined): OpsSession | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as OpsSession;
    if (!data.profileId || !data.role) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<OpsSession | null> {
  const cookieStore = await cookies();
  return parseSession(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const session = await getSession();
  if (!session) return null;
  return getProfileById(session.profileId) ?? getDemoProfile(session.role, session.profileId) ?? null;
}

export function homeForRole(role: OpsRole): string {
  return ROLE_HOME[role];
}
