import type { Metadata } from 'next';
import './globals.css';
import { ThemeRoot } from '@/components/sphinxops/ThemeRoot';
import { APP_NAME, COMPANY_NAME } from '@/lib/sphinxops/constants';

export const metadata: Metadata = {
  title: `${APP_NAME} — ${COMPANY_NAME}`,
  description: 'Field operations, scheduling, mileage, and visit logs for Sphinx Healing Services.',
  robots: { index: false, follow: false },
};

export default function SphinxLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRoot>
      <div className="ops-root font-[family-name:var(--font-body)]">{children}</div>
    </ThemeRoot>
  );
}
