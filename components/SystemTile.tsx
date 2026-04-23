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
        return { text: '● Live demo', className: 'bg-neon-green/15 text-neon-green border-neon-green/25' };
      case 'available':
        return { text: '● Available', className: 'bg-neon-blue/15 text-neon-blue border-neon-blue/25' };
      case 'build':
      default:
        return { text: '○ Build', className: 'bg-white/8 text-white/60 border-white/10' };
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
        whileHover={{ scale: 1.015, rotateY: 5, rotateX: -4 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        className="glass rounded-xl p-6 h-full border border-white/10 relative overflow-hidden"
      >
        <motion.div
          aria-hidden="true"
          animate={{
            opacity: isHovered ? 0.55 : 0,
            scale: isHovered ? 1.08 : 1,
          }}
          className="absolute inset-0 bg-gradient-to-br from-neon-blue/25 via-neon-violet/25 to-neon-green/15 blur-xl -z-10"
        />

        <motion.div
          aria-hidden="true"
          animate={{
            borderColor: isHovered
              ? ['rgba(0, 212, 255, 0.45)', 'rgba(139, 92, 246, 0.45)', 'rgba(0, 212, 255, 0.45)']
              : 'rgba(255, 255, 255, 0.10)',
          }}
          transition={{ duration: 2.2, repeat: isHovered ? Infinity : 0 }}
          className="absolute inset-0 rounded-xl border-2 pointer-events-none"
        />

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl select-none">{data.icon}</div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white/90 group-hover:text-neon-blue transition-colors">
                {data.title}
              </h3>
              <p className="text-white/60 text-sm mt-1">{data.description}</p>
            </div>
          </div>
        </div>

        {data.highlights?.length ? (
          <ul className="mt-4 space-y-2">
            {data.highlights.slice(0, 3).map((h) => (
              <li key={h} className="text-xs text-white/55 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-neon-violet/60" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 flex items-center justify-between">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${badge.className}`}>
            {badge.text}
          </div>

          <div className="text-white/40 text-xs">
            {data.status === 'live-demo' ? 'Open demo →' : 'Request →'}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

