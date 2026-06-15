import { LoginClient } from './LoginClient';
import { ThemeToggle } from '@/components/sphinxops/ThemeToggle';
import { SphinxLogo } from '@/components/sphinxops/SphinxLogo';
import { PlatformModules } from '@/components/sphinxops/PlatformModules';
import { APP_TAGLINE, COMPANY_WEBSITE } from '@/lib/sphinxops/constants';

export default function LoginPage() {
  return (
    <div className="ops-login-page min-h-screen min-h-[100dvh] flex flex-col items-center justify-center px-4 py-12 bg-[var(--ops-bg,#0a1628)] relative">
      <div className="ops-login-theme absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-lg">
        <div className="text-center mb-6 sm:mb-8">
          <SphinxLogo size={80} className="mx-auto mb-4 sm:mb-5" />
          <p className="text-sm ops-text-muted mt-1 max-w-md mx-auto leading-relaxed px-2">{APP_TAGLINE}</p>
          <a
            href={COMPANY_WEBSITE}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-xs text-[#22c55e] hover:underline mt-3"
          >
            sphinxhealing.org
          </a>
        </div>
        <LoginClient />
        <div className="mt-6 sm:mt-8">
          <p className="text-xs font-semibold uppercase tracking-wider ops-text-muted text-center mb-3 px-2">
            More than BrightHR — built for Sphinx Healing
          </p>
          <PlatformModules compact />
        </div>
        <p className="text-center text-xs text-white/35 mt-8">
          Powered by{' '}
          <a href="https://flowgrid.ca" className="text-[#22c55e] hover:underline">
            FlowGrid
          </a>
        </p>
      </div>
    </div>
  );
}
