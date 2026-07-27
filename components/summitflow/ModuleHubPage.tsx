import Link from 'next/link';
import { OPS_BASE } from '@/lib/summitflow/constants';

type ModuleHubPageProps = {
  title: string;
  description: string;
  highlights: string[];
  relatedHref?: string;
  relatedLabel?: string;
};

export function ModuleHubPage({
  title,
  description,
  highlights,
  relatedHref,
  relatedLabel,
}: ModuleHubPageProps) {
  return (
    <div className="max-w-3xl">
      <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#0ea5e9] bg-[#0ea5e9]/10 px-2.5 py-1 rounded-full mb-4">
        Preview module
      </span>
      <h1 className="text-2xl font-bold text-[#f1f5f9] mb-2">{title}</h1>
      <p className="text-white/45 text-sm mb-6 leading-relaxed">{description}</p>
      <ul className="ops-card p-5 space-y-3 text-sm text-white/70 mb-6">
        {highlights.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-[#22c55e] shrink-0">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {relatedHref && relatedLabel && (
        <Link href={relatedHref} className="text-sm text-[#0ea5e9] hover:underline">
          {relatedLabel} →
        </Link>
      )}
      <p className="text-xs text-white/35 mt-8">
        Configured for programs on{' '}
        <a href="https://flowgrid.ca/summitflow/" className="text-[#22c55e] hover:underline" target="_blank" rel="noreferrer">
          flowgrid.ca/summitflow
        </a>{' '}
        — Group Care, Family Living, PDD, and Transition to Adulthood.
      </p>
    </div>
  );
}
