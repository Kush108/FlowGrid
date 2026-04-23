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
            FlowGrid builds operational systems.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-lg sm:text-xl md:text-2xl text-white/70 mb-12 px-4"
        >
          Edmonton + Calgary. Booking, staff tracking, dashboards.
        </motion.p>

        {/* Secondary line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          className="text-sm sm:text-base text-white/55 px-6 max-w-2xl mx-auto"
        >
          Built like a demo first. If you like it, we ship the real version for your business.
        </motion.p>

        {/* Mini proof module (subtle, not salesy) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: showGrid ? 1 : 0, scale: showGrid ? 1 : 0.9 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10"
        >
          <div className="glass border border-white/10 rounded-2xl max-w-xl mx-auto overflow-hidden">
            <div className="px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4">
              <div className="text-left">
                <div className="text-white/80 text-sm">What you get</div>
                <div className="text-white/55 text-xs mt-0.5">A working prototype before any big commitment.</div>
              </div>
              <div className="text-white/40 text-xs">Live module preview</div>
            </div>

            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
                {Array.from({ length: 9 }).map((_, i) => {
                  const row = Math.floor(i / 3);
                  const col = i % 3;
                  const baseDelay = (row + col) * 0.14;

                  return (
                    <motion.div
                      key={i}
                      className="aspect-square rounded-lg border border-white/10 bg-white/[0.03] overflow-hidden"
                      initial={{ opacity: 0.16, scale: 1 }}
                      animate={{
                        opacity: [0.16, 0.7, 0.16],
                        boxShadow: [
                          '0 0 0px rgba(0,212,255,0)',
                          '0 0 14px rgba(0,212,255,0.35)',
                          '0 0 0px rgba(0,212,255,0)',
                        ],
                      }}
                      transition={{
                        duration: 1.7,
                        ease: 'easeInOut',
                        delay: 0.6 + baseDelay,
                        repeat: Infinity,
                        repeatDelay: 1.6,
                      }}
                    >
                      <motion.div
                        className="h-full w-full bg-gradient-to-br from-neon-blue/25 via-neon-violet/15 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{
                          duration: 1.7,
                          ease: 'easeInOut',
                          delay: 0.6 + baseDelay,
                          repeat: Infinity,
                          repeatDelay: 1.6,
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {[
                  { k: 'Demo first', v: 'See it working' },
                  { k: 'Build fast', v: '1st version quickly' },
                  { k: 'Scale later', v: 'Add modules' },
                ].map((x) => (
                  <div key={x.k} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-3">
                    <div className="text-white/70">{x.k}</div>
                    <div className="text-white/45 mt-0.5">{x.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showGrid ? 1 : 0, y: showGrid ? 0 : 10 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
        >
          <motion.button
            type="button"
            className="relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base font-medium text-white/90 w-full sm:w-auto justify-center"
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
              const el = document.getElementById('systems');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-violet opacity-70" />
            <span className="absolute inset-[1px] rounded-full bg-background" />
            <span className="relative z-10">See systems</span>
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

          <motion.button
            type="button"
            className="relative inline-flex items-center justify-center rounded-full px-6 py-3 text-sm sm:text-base font-medium text-white/80 w-full sm:w-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              window.dispatchEvent(new CustomEvent('flowgrid:intake-open', { detail: { source: 'hero' } }));
            }}
          >
            <span className="absolute inset-0 rounded-full bg-white/[0.04]" />
            <span className="absolute inset-0 rounded-full border border-white/10" />
            <span className="relative">Get a build plan</span>
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
