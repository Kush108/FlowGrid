'use client';
import { useTheme } from '@/lib/sphinixops/theme';

const OPTIONS = [
  { value: 'dark',  label: 'Dark',  dot: '#0ea5e9' },
  { value: 'light', label: 'Light', dot: '#f59e0b' },
  { value: 'slate', label: 'Slate', dot: '#a78bfa' },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="ops-theme-toggle" role="group" aria-label="Choose theme">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setTheme(o.value)}
          className={`ops-theme-btn${theme === o.value ? ' active' : ''}`}
          aria-pressed={theme === o.value}
        >
          <span
            aria-hidden="true"
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: o.dot,
              display: 'inline-block',
              flexShrink: 0,
              opacity: theme === o.value ? 1 : 0.5,
            }}
          />
          {o.label}
        </button>
      ))}
    </div>
  );
}
