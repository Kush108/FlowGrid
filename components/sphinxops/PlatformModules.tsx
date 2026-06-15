import { PLATFORM_MODULES } from '@/lib/sphinxops/constants';

export function PlatformModules({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="ops-modules-scroll sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible">
        {PLATFORM_MODULES.map((mod) => (
          <div key={mod.id} className="ops-module-chip sm:flex-none sm:w-auto sm:rounded-xl sm:p-3.5">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-sm font-semibold text-[var(--ops-text)]">{mod.title}</span>
              <span
                className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                  mod.status === 'live'
                    ? 'bg-[var(--ops-green-dim)] text-[var(--ops-green)]'
                    : 'bg-[var(--ops-blue-dim)] text-[var(--ops-blue)]'
                }`}
              >
                {mod.status === 'live' ? 'Live' : 'Preview'}
              </span>
            </div>
            <p className="text-xs ops-text-muted leading-relaxed line-clamp-2 sm:line-clamp-none">
              {mod.description}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {PLATFORM_MODULES.map((mod) => (
        <div key={mod.id} className="ops-card p-4">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-sm font-semibold text-[var(--ops-text)]">{mod.title}</span>
            <span
              className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                mod.status === 'live'
                  ? 'bg-[var(--ops-green-dim)] text-[var(--ops-green)]'
                  : 'bg-[var(--ops-blue-dim)] text-[var(--ops-blue)]'
              }`}
            >
              {mod.status === 'live' ? 'Live' : 'Preview'}
            </span>
          </div>
          <p className="text-xs ops-text-muted leading-relaxed">{mod.description}</p>
        </div>
      ))}
    </div>
  );
}
