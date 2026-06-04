import { PLATFORM_MODULES } from '@/lib/sphinxops/constants';

export function PlatformModules({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? 'grid grid-cols-2 gap-2'
          : 'grid sm:grid-cols-2 gap-3'
      }
    >
      {PLATFORM_MODULES.map((mod) => (
        <div
          key={mod.id}
          className="rounded-xl border border-white/[0.08] bg-[#0a1628]/40 p-3.5"
        >
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-sm font-semibold text-[#f1f5f9]">{mod.title}</span>
            <span
              className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${
                mod.status === 'live'
                  ? 'bg-[#22c55e]/15 text-[#22c55e]'
                  : 'bg-[#0ea5e9]/15 text-[#0ea5e9]'
              }`}
            >
              {mod.status === 'live' ? 'Live' : 'Preview'}
            </span>
          </div>
          {!compact && <p className="text-xs text-white/45 leading-relaxed">{mod.description}</p>}
        </div>
      ))}
    </div>
  );
}
