'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface GridTileProps {
  title: string;
  description: string;
  status: 'live' | 'beta' | 'coming-soon';
  subdomain?: string;
  icon?: React.ReactNode;
  onComingSoonClick: () => void;
}

export default function GridTile({
  title,
  description,
  status,
  subdomain,
  icon,
  onComingSoonClick,
}: GridTileProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (status === 'live' && subdomain) {
      window.location.href = `https://${subdomain}.flowgrid.ca`;
    } else if (status === 'coming-soon') {
      onComingSoonClick();
    }
  };

  const statusColors = {
    live: 'bg-neon-green/20 text-neon-green border-neon-green/30',
    beta: 'bg-neon-blue/20 text-neon-blue border-neon-blue/30',
    'coming-soon': 'bg-white/10 text-white/60 border-white/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className="relative group cursor-pointer"
    >
      <motion.div
        whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="glass rounded-xl p-6 h-full border border-white/10 relative overflow-hidden"
      >
        {/* Glow effect on hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          className="absolute inset-0 bg-gradient-to-br from-neon-blue/30 via-neon-violet/30 to-neon-green/30 blur-xl -z-10"
        />

        {/* Animated border */}
        <motion.div
          animate={{
            borderColor: isHovered
              ? ['rgba(0, 212, 255, 0.5)', 'rgba(139, 92, 246, 0.5)', 'rgba(0, 212, 255, 0.5)']
              : 'rgba(255, 255, 255, 0.1)',
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          className="absolute inset-0 rounded-xl border-2 pointer-events-none"
        />

        {/* Icon */}
        {icon && (
          <div className="mb-4 text-4xl">
            <motion.div
              animate={{ rotate: isHovered ? [0, 10, -10, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-neon-blue transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-white/60 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Status badge */}
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[status]}`}>
          {status === 'live' && '● Live'}
          {status === 'beta' && '● Beta'}
          {status === 'coming-soon' && '○ Coming Soon'}
        </div>

        {/* Click indicator */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-4 right-4 text-white/40 text-xs"
          >
            {status === 'live' ? '→' : '...'}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
