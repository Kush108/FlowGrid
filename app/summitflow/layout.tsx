import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeRoot } from '@/components/summitflow/ThemeRoot';
import { APP_NAME, COMPANY_NAME } from '@/lib/summitflow/constants';

export const metadata: Metadata = {
  title: `${APP_NAME} — ${COMPANY_NAME}`,
  description:
    'SummitFlow Ops — workforce, fleet, CRM, payroll, and field programs for Summit Heating & Cooling (flowgrid.ca/summitflow).',
  robots: { index: false, follow: false },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: APP_NAME,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#090f1a' },
    { media: '(prefers-color-scheme: light)', color: '#f0f2f5' },
  ],
};

export default function SphinxLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRoot>
      <div className="ops-root font-[family-name:var(--font-body)]">{children}</div>
    </ThemeRoot>
  );
}
