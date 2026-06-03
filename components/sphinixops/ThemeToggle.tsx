'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/sphinixops/theme';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isLight = theme === 'light';

  function toggle() {
    setTheme(isLight ? 'dark' : 'light');
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Dark mode' : 'Light mode'}
      className="ops-theme-switch"
    >
      {isLight ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
}
