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
      {/* Animated neon grid background */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 grid-background opacity-20 pointer-events-none"
        initial={{ backgroundPosition: '0px 0px' }}
        animate={{ backgroundPosition: ['0px 0px', '40px 40px', '0px 0px'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.14) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        initial={{ backgroundPosition: '0px 0px' }}
        animate={{ backgroundPosition: ['0px 0px', '-40px -40px', '0px 0px'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      />
      
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

        {/* Grid preview fade-in with animated tiles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: showGrid ? 1 : 0, scale: showGrid ? 1 : 0.9 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16"
        >
          <div className="grid grid-cols-3 gap-3 max-w-xs sm:max-w-md mx-auto">
            {Array.from({ length: 9 }).map((_, i) => {
              const row = Math.floor(i / 3);
              const col = i % 3;
              const baseDelay = (row + col) * 0.15;

              return (
                <motion.div
                  // Simulated tiles activating across the grid
                  key={i}
                  className="aspect-square rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden"
                  initial={{ opacity: 0.18, scale: 1 }}
                  animate={{
                    opacity: [0.18, 0.85, 0.18],
                    scale: [1, 1.02, 1],
                    boxShadow: [
                      '0 0 0px rgba(0,212,255,0)',
                      '0 0 18px rgba(0,212,255,0.5)',
                      '0 0 0px rgba(0,212,255,0)',
                    ],
                  }}
                  transition={{
                    duration: 1.8,
                    ease: 'easeInOut',
                    delay: 0.6 + baseDelay,
                    repeat: Infinity,
                    repeatDelay: 1.4,
                  }}
                >
                  <motion.div
                    className="h-full w-full bg-gradient-to-br from-neon-blue/30 via-neon-violet/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0] }}
                    transition={{
                      duration: 1.8,
                      ease: 'easeInOut',
                      delay: 0.6 + baseDelay,
                      repeat: Infinity,
                      repeatDelay: 1.4,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showGrid ? 1 : 0, y: showGrid ? 0 : 10 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-10 flex justify-center"
        >
          <motion.button
            type="button"
            className="relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base font-medium text-white/90"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            animate={{
              boxShadow: [
                '0 0 0px rgba(0,212,255,0)',
                '0 0 22px rgba(0,212,255,0.45)',
                '0 0 0px rgba(0,212,255,0)',
              ],
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 2,
            }}
            onClick={() => {
              const targetY = window.innerHeight * 0.9;
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }}
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-violet opacity-70" />
            <span className="absolute inset-[1px] rounded-full bg-background" />
            <span className="relative z-10">Explore the grid</span>
            <span className="relative z-10 hidden sm:inline-flex">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h12M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </motion.button>
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
