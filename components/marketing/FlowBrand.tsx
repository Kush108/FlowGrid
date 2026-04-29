import Image from 'next/image';

export function FlowMark({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/logo-icon.svg"
      alt="FlowGrid"
      width={36}
      height={36}
      priority
      className={className || 'h-9 w-auto'}
    />
  );
}

export function FlowWordmark() {
  return (
    <Image
      src="/logo.svg"
      alt="FlowGrid"
      width={140}
      height={40}
      priority
      className="h-10 w-auto"
    />
  );
}
