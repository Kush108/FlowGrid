export function FlowMark({ className = '' }: { className?: string }) {
  return (
    <img
      src="/logo.svg"
      alt="FlowGrid"
      className={className || 'h-9 w-auto'}
      loading="eager"
      decoding="async"
    />
  );
}

export function FlowWordmark() {
  return null;
}
