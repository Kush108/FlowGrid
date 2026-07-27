import { APP_NAME, COMPANY_NAME } from '@/lib/hydroflo/constants';

type HydrofloLogoProps = {
  size?: number;
  showText?: boolean;
  className?: string;
};

export function HydrofloLogo({ size = 72, showText = true, className = '' }: HydrofloLogoProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div
        className="rounded-full flex items-center justify-center ring-2 ring-[#0ea5e9]/40 shadow-lg shadow-[#0ea5e9]/15 bg-gradient-to-br from-[#0c4a6e] to-[#0369a1]"
        style={{ width: size, height: size }}
        aria-hidden
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
            stroke="#7dd3fc"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="3" fill="#f97316" />
        </svg>
      </div>
      {showText && (
        <div className="text-center">
          <div className="text-xl font-bold text-[var(--ops-text,#f1f5f9)]">{APP_NAME}</div>
          <div className="text-xs text-[#0ea5e9] font-medium tracking-wide mt-0.5">{COMPANY_NAME}</div>
        </div>
      )}
    </div>
  );
}

export function HydrofloLogoMark({ size = 38 }: { size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center bg-gradient-to-br from-[#0c4a6e] to-[#0369a1] ring-1 ring-[#0ea5e9]/30"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"
          stroke="#7dd3fc"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="3" fill="#f97316" />
      </svg>
    </div>
  );
}
