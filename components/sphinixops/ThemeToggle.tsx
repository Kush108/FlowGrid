'use client';
import { useTheme } from '@/lib/sphinixops/theme';

const options = [
  { value: 'dark',  label: '🌑 Dark'  },
  { value: 'light', label: '☀️ Light' },
  { value: 'slate', label: '🌫 Slate'  },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div style={{ display: 'flex', gap: 4, background: 'var(--ops-surface-2)',
      borderRadius: 10, padding: 3, border: '1px solid var(--ops-border)' }}>
      {options.map(o => (
        <button
          key={o.value}
          onClick={() => setTheme(o.value)}
          style={{
            background: theme === o.value ? 'var(--ops-surface)' : 'transparent',
            color: theme === o.value ? 'var(--ops-text)' : 'var(--ops-muted)',
            border: theme === o.value ? '1px solid var(--ops-border)' : '1px solid transparent',
            borderRadius: 7, padding: '4px 10px',
            fontSize: 12, cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}