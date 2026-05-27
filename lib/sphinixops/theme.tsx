'use client';
import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'slate';

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({ theme: 'dark', setTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // On mount: read saved preference or detect system preference
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('ops-theme') as Theme | null;
    if (saved && ['dark', 'light', 'slate'].includes(saved)) {
      setThemeState(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme class to the ops-root div via data attribute on <html>
  // We use a data attribute on <html> so CSS can read it before React hydrates
  useEffect(() => {
    if (!mounted) return;

    // Remove old theme classes from any existing ops-root elements
    document.querySelectorAll('.ops-root').forEach((el) => {
      el.classList.remove('theme-light', 'theme-slate');
      if (theme === 'light') el.classList.add('theme-light');
      if (theme === 'slate') el.classList.add('theme-slate');
    });

    // Also set on <html> as a data attribute for non-ops-root elements
    document.documentElement.setAttribute('data-ops-theme', theme);
  }, [theme, mounted]);

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem('ops-theme', t);
  }

  // Prevent flash of wrong theme — render children only after mount
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
