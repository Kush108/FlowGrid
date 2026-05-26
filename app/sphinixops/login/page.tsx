import { LoginClient } from './LoginClient';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[#0a1628]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0b5c63] to-[#22c55e] items-center justify-center text-2xl mb-4">
            𓆣
          </div>
          <h1 className="text-2xl font-bold text-[#f1f5f9]">sphinixOps</h1>
          <p className="text-sm text-white/45 mt-2 max-w-sm mx-auto">
            Custom operations platform for Sphinx Healing Services — scheduling, fleet mileage, visit logs, and
            approvals across 6 sites.
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
