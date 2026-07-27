'use client';

import { ThemeProvider } from '@/lib/summitflow/theme';

/** Legacy Hydroflo route tree — theme matches SummitFlow (same HVAC demo). */
export function ThemeRoot({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
