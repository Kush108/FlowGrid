'use client';

import { ThemeProvider } from '@/lib/sphinixops/theme';

export function ThemeRoot({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
