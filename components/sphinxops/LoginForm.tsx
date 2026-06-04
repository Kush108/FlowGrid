'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { OPS_BASE } from '@/lib/sphinxops/constants';

const DEMO_ACCOUNTS = [
  { id: 'p-dir', label: 'Stephanie R.', role: 'Director', desc: 'All sites · reports · settings' },
  { id: 'p-hr', label: 'Priya N.', role: 'HR', desc: 'Schedule builder · approvals' },
  { id: 'p-mgr-main', label: 'Marcus T.', role: 'Site Manager', desc: 'Edmonton Main only' },
  { id: 'p-emp-1', label: 'Danielle M.', role: 'Field Staff', desc: 'Mobile · visits · mileage' },
];

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function signInDemo(profileId: string) {
    setLoading(profileId);
    setError('');
    const res = await fetch(`${OPS_BASE}/api/auth/demo-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileId }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Login failed');
      setLoading(null);
      return;
    }
    const next = search.get('next');
    router.push(next && next.startsWith(OPS_BASE) ? next : data.redirect);
    router.refresh();
  }

  return (
    <div className="ops-card p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#22c55e] mb-4">Secure demo access</p>
      <p className="text-sm text-white/55 mb-5">
        Select a role to preview Sphinx Ops — scheduling, fleet, visit logs, CRM, and payroll workflows tailored for
        Sphinx Healing Services. Production will use email login via Supabase.
      </p>
      <div className="space-y-2">
        {DEMO_ACCOUNTS.map((acc) => (
          <button
            key={acc.id}
            type="button"
            disabled={!!loading}
            onClick={() => signInDemo(acc.id)}
            className="w-full text-left p-4 rounded-xl border border-white/[0.08] bg-[#0a1628]/50 hover:border-[#22c55e]/40 hover:bg-[#22c55e]/5 transition-colors disabled:opacity-50"
          >
            <div className="flex justify-between items-start gap-2">
              <div>
                <div className="font-semibold text-[#f1f5f9]">{acc.label}</div>
                <div className="text-xs text-[#22c55e] font-medium mt-0.5">{acc.role}</div>
                <div className="text-xs text-white/40 mt-1">{acc.desc}</div>
              </div>
              {loading === acc.id && <span className="text-xs text-white/45">…</span>}
            </div>
          </button>
        ))}
      </div>
      {error && <p className="text-sm text-red-400 mt-4">{error}</p>}
      <p className="text-[11px] text-white/35 mt-6 leading-relaxed">
        Confidential client data is not stored in this demo. Mock data reflects Sphinx programs: Group Care, Family
        Living, PDD, and Transition to Adulthood per{' '}
        <a href="https://sphinxhealing.org/our-services/" className="text-[#0ea5e9] hover:underline" target="_blank" rel="noreferrer">
          sphinxhealing.org
        </a>
        .
      </p>
    </div>
  );
}
