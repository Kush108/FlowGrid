import { LoginClient } from './LoginClient';
import { ThemeToggle } from '@/components/summitflow/ThemeToggle';
import { SummitFlowLogo } from '@/components/summitflow/SummitFlowLogo';
import { PlatformModules } from '@/components/summitflow/PlatformModules';
import { APP_TAGLINE, COMPANY_WEBSITE } from '@/lib/summitflow/constants';

export default function LoginPage() {
  return (
    <div className="ops-login-page min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="ops-login-theme absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-lg">
        <div className="text-center mb-6 sm:mb-8">
          <SummitFlowLogo size={80} className="mx-auto mb-4 sm:mb-5" />
          <p className="text-sm ops-text-muted mt-1 max-w-md mx-auto leading-relaxed px-2">{APP_TAGLINE}</p>
          <a
            href={COMPANY_WEBSITE}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-xs text-[var(--ops-green)] hover:underline mt-3"
          >
            flowgrid.ca/summitflow
          </a>
        </div>
        <LoginClient />
        <div className="mt-6 sm:mt-8">
          <p className="text-xs font-semibold uppercase tracking-wider ops-text-muted text-center mb-3 px-2">
            More than ServiceTitan — built for HVAC
          </p>
          <PlatformModules compact />
        </div>
        <p className="text-center text-xs ops-text-muted mt-8">
          Powered by{' '}
          <a href="https://flowgrid.ca" className="text-[var(--ops-green)] hover:underline">
            FlowGrid
          </a>
        </p>
      </div>
    </div>
  );
}
