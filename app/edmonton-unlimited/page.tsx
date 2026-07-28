import type { Metadata } from 'next';
import EdmontonPitchSection from '@/components/marketing/EdmontonPitchSection';
import { FlowWordmark } from '@/components/marketing/FlowBrand';

export const metadata: Metadata = {
  title: 'Edmonton Unlimited · Traction',
  description: 'FlowGrid traction deck for Edmonton Unlimited — niche HVAC ops software with live prototypes.',
  robots: { index: false, follow: false },
};

export default function EdmontonUnlimitedPage() {
  return (
    <main className="relative min-h-screen bg-brand-bg text-brand-text">
      <header className="border-b border-brand-border bg-brand-bg/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 select-none">
            <FlowWordmark />
          </a>
          <a href="/" className="text-sm text-brand-muted hover:text-brand-text transition-colors">
            ← Back to FlowGrid
          </a>
        </div>
      </header>
      <EdmontonPitchSection />
    </main>
  );
}
