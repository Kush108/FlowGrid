import type { Metadata } from 'next';
import OutreachTool from '@/components/tools/OutreachTool';

export const metadata: Metadata = {
  title: 'Outreach Tool — FlowGrid (internal)',
  robots: { index: false, follow: false },
};

export default function OutreachPage() {
  return <OutreachTool />;
}
