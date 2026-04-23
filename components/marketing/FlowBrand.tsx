export function FlowMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 32 32"
      role="img"
      aria-label="FlowGrid"
    >
      <rect x="1" y="1" width="30" height="30" rx="8" fill="#0a1628" stroke="rgba(255,255,255,0.10)" />
      {/* connecting square */}
      <path
        d="M10 10h12v12H10z"
        fill="none"
        stroke="#22c55e"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      {/* dots */}
      <circle cx="10" cy="10" r="2.2" fill="#22c55e" />
      <circle cx="22" cy="10" r="2.2" fill="#22c55e" />
      <circle cx="10" cy="22" r="2.2" fill="#22c55e" />
      <circle cx="22" cy="22" r="2.2" fill="#0ea5e9" />
    </svg>
  );
}

export function FlowWordmark({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const textSize = size === 'lg' ? 'text-xl' : 'text-lg';
  return (
    <div className={`font-[var(--font-display)] ${textSize} leading-none`}>
      <span className="text-brand-text italic">Flow</span>
      <span className="text-brand-green italic">Grid</span>
    </div>
  );
}
