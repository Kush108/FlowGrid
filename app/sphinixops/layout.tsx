import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'sphinixOps — Sphinx Healing Services',
  description: 'Field operations, scheduling, mileage, and visit logs for Sphinx Healing Services.',
  robots: { index: false, follow: false },
};

export default function SphinixOpsLayout({ children }: { children: React.ReactNode }) {
  return <div className="ops-root font-[family-name:var(--font-body)]">{children}</div>;
}
