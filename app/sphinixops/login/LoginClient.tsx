'use client';

import { Suspense } from 'react';
import { LoginForm } from '@/components/sphinixops/LoginForm';

export function LoginClient() {
  return (
    <Suspense fallback={<div className="ops-card p-6 text-white/45 text-sm">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
