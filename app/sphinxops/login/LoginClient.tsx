'use client';

import { Suspense } from 'react';
import { LoginForm } from '@/components/sphinxops/LoginForm';

export function LoginClient() {
  return (
    <Suspense fallback={<div className="ops-card p-6 ops-text-muted text-sm">Loading…</div>}>
      <LoginForm />
    </Suspense>
  );
}
