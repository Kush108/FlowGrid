'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'flowgrid_announce_dismissed_v1';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = window.localStorage.getItem(STORAGE_KEY) === '1';
      setVisible(!dismissed);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="w-full border-b border-brand-border bg-brand-bg">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span
            aria-hidden="true"
            className="inline-block w-2 h-2 rounded-full bg-brand-green"
            style={{
              boxShadow: '0 0 0 rgba(34,197,94,0.45)',
              animation: 'pulse 1.8s ease-in-out infinite',
            }}
          />
          <div className="text-brand-muted">
            <span className="text-brand-text/90">New:</span>{' '}
            FieldTrack now live for an Edmonton home care organization with 60+ staff —{' '}
            <a
              className="text-brand-green hover:text-brand-green/90 transition-colors"
              href="https://sphinx-healing-demo.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              See the demo →
            </a>
          </div>
        </div>

        <button
          aria-label="Dismiss"
          className="text-brand-muted hover:text-brand-text/90 transition-colors"
          onClick={() => {
            setVisible(false);
            try {
              window.localStorage.setItem(STORAGE_KEY, '1');
            } catch {}
          }}
        >
          <span className="text-lg leading-none">×</span>
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.45);
            opacity: 0.9;
          }
          70% {
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
            opacity: 1;
          }
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}

