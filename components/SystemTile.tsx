'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

export type SystemStatus = 'live-demo' | 'available' | 'build';

export interface SystemTileData {
  id: string;
  title: string;
  description: string;
  status: SystemStatus;
  icon: string;
  href?: string; // live demo link
  highlights?: string[];
}

export default function SystemTile({
  data,
  onRequest,
}: {
  data: SystemTileData;
  onRequest: (system: SystemTileData) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const badge = useMemo(() => {
    switch (data.status) {
      case 'live-demo':
        return { text: '● LIVE', className: 'bg-brand-green/10 text-brand-green border-brand-green/25' };
      case 'available':
        return { text: '◎ AVAILABLE', className: 'bg-brand-blue/10 text-brand-blue border-brand-blue/25' };
      case 'build':
      default:
        return { text: '○ COMING SOON', className: 'bg-white/5 text-brand-muted border-brand-border' };
    }
  }, [data.status]);

  const handleClick = () => {
    if (data.status === 'live-demo' && data.href) {
      window.open(data.href, '_blank', 'noopener,noreferrer');
      return;
    }
    onRequest(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className="relative group cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      <motion.div
        whileHover={{ scale: 1.012, y: -3 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        className="rounded-2xl p-6 h-full border border-brand-border bg-brand-surface relative overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,.25)]"
      >
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: isHovered ? 0.55 : 0,
            scale: isHovered ? 1.08 : 1,
          }}
          className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-brand-green/12 to-transparent blur-xl -z-10"
        />

        <div
          aria-hidden="true"
          className={[
            'absolute inset-0 rounded-2xl pointer-events-none border',
            isHovered ? 'border-brand-green/25' : 'border-transparent',
          ].join(' ')}
        />

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl select-none">{data.icon}</div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-brand-text/90 group-hover:text-brand-text transition-colors">
                {data.title}
              </h3>
              <p className="text-brand-muted text-sm mt-1">{data.description}</p>
            </div>
          </div>
        </div>

        {data.highlights?.length ? (
          <ul className="mt-4 space-y-2">
            {data.highlights.slice(0, 3).map((h) => (
              <li key={h} className="text-xs text-brand-muted flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-green/70" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 flex items-center justify-between">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${badge.className}`}>
            {badge.text}
          </div>

          <div className="text-brand-muted text-xs">
            {data.status === 'live-demo' ? 'See live demo →' : 'Request demo →'}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

