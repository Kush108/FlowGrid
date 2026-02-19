'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowGrid(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 grid-background opacity-20" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-violet/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 text-center max-w-4xl">
        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 px-4"
        >
          <span className="bg-gradient-to-r from-white via-neon-blue to-neon-violet bg-clip-text text-transparent">
            Welcome to FlowGrid
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-lg sm:text-xl md:text-2xl text-white/70 mb-12 px-4"
        >
          A grid of intelligent utilities.
        </motion.p>

        {/* Grid preview fade-in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: showGrid ? 1 : 0, scale: showGrid ? 1 : 0.9 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16"
        >
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: showGrid ? 0.3 : 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="aspect-square glass rounded-lg border border-white/10"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/40"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
