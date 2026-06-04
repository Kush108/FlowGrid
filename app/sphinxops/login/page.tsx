import { LoginClient } from './LoginClient';
import { ThemeToggle } from '@/components/sphinxops/ThemeToggle';
import { APP_NAME, COMPANY_NAME } from '@/lib/sphinxops/constants';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[var(--ops-bg,#0a1628)] relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0b5c63] to-[#22c55e] items-center justify-center text-2xl mb-4">
            𓆣
          </div>
          <h1 className="text-2xl font-bold text-[var(--ops-text,#f1f5f9)]">{APP_NAME}</h1>
          <p className="text-sm ops-text-muted mt-2 max-w-sm mx-auto">
            Operations platform for {COMPANY_NAME} — scheduling, fleet mileage, visit logs, and
            approvals across 6 sites. Programs include Group Care, Family Living, PDD, and Transition to Adulthood.
          </p>
        </div>
        <LoginClient />
        <p className="text-center text-xs text-white/35 mt-8">
          Replaces limited BrightHR workflows · Built by{' '}
          <a href="https://flowgrid.ca" className="text-[#22c55e] hover:underline">
            FlowGrid
          </a>
        </p>
      </div>
    </div>
  );
}
