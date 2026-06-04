'use client';

import { ThemeProvider } from '@/lib/sphinxops/theme';

export function ThemeRoot({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
