'use client';

import { ThemeProvider } from '@/lib/summitflow/theme';

export function ThemeRoot({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
