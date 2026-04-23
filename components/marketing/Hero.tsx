'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function TrustItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-brand-muted">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-green" aria-hidden="true" />
      <span>{text}</span>
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section id="top" className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Animated background (subtle city grid / mesh) */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(14,165,233,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.10) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            animation: 'fg-grid 28s linear infinite',
            maskImage: 'radial-gradient(circle at 50% 35%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 72%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34,197,94,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.08) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            animation: 'fg-grid 40s linear infinite',
            animationDirection: 'reverse',
            maskImage: 'radial-gradient(circle at 50% 35%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 74%)',
          }}
        />
        <div
          className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(34,197,94,.09), rgba(34,197,94,0) 62%)',
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[520px] h-[520px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(14,165,233,.11), rgba(14,165,233,0) 62%)',
          }}
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-green/25 bg-brand-green/10 text-brand-green text-xs tracking-[0.18em] uppercase"
            >
              <span
                aria-hidden="true"
                className="inline-block w-1.5 h-1.5 rounded-full bg-brand-green"
                style={{ boxShadow: '0 0 0 rgba(34,197,94,0.45)', animation: 'pulse 1.8s ease-in-out infinite' }}
              />
              Demo first. Pay after. No risk.
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
              }}
              className="font-[var(--font-display)] mt-5 leading-[0.95]"
              style={{ fontSize: 'clamp(36px, 7.5vw, 72px)' }}
            >
              {['Your field team,', 'running like', 'it should.'].map((line, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
                  }}
                >
                  {idx === 2 ? (
                    <>
                      it <span className="text-brand-green italic">should</span>.
                    </>
                  ) : (
                    line
                  )}
                </motion.div>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
              className="mt-5 text-brand-muted leading-relaxed"
              style={{ fontSize: 'clamp(16px, 2.2vw, 20px)' }}
            >
              FlowGrid builds operational software for businesses with field teams — staff tracking, mileage, scheduling, dashboards.
              <span className="text-brand-text/80"> We build your working demo first.</span> You only pay when you love it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
              className="mt-7 flex flex-col sm:flex-row gap-3"
            >
              <a
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-brand-green text-brand-bg font-semibold hover:bg-brand-green/90 transition-colors"
                href="https://sphinx-healing-demo.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                See a Live Demo →
              </a>
              <a
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-white/20 text-brand-text/90 hover:border-white/30 hover:bg-white/5 transition-colors"
                href="#contact"
              >
                Get Your Free Demo Built
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
              className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4"
            >
              <TrustItem text="No credit card" />
              <TrustItem text="No contract" />
              <TrustItem text="Demo delivered in 48 hours" />
            </motion.div>
          </div>

          {/* Floating stat cards */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {[
                { k: '48h', v: 'Average demo delivery', delay: 0.25 },
                { k: '$0', v: 'Cost to see your demo', delay: 0.45 },
                { k: '1 week', v: 'From yes to live app', delay: 0.65 },
              ].map((c) => (
                <motion.div
                  key={c.k}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: c.delay, ease: 'easeOut' }}
                  className="fg-surface rounded-2xl p-5 shadow-[0_12px_30px_rgba(0,0,0,.35)]"
                  style={{ animation: mounted ? 'fg-float 8s ease-in-out infinite' : undefined }}
                >
                  <div className="font-[var(--font-mono)] text-brand-green" style={{ fontSize: 40, lineHeight: 1 }}>
                    {c.k}
                  </div>
                  <div className="mt-1 text-sm text-brand-muted">{c.v}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Demo preview area (browser frame + interactive iframe) */}
        <div className="mt-12">
          <div className="fg-surface rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,.35)]">
            <div className="px-4 py-3 border-b border-brand-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="ml-3 text-xs text-brand-muted">FlowGrid Demo Preview</span>
              </div>
              <div className="text-xs text-brand-muted">← This is interactive. Click anything.</div>
            </div>
            <div className="bg-brand-surface">
              <iframe
                title="FlowGrid live demo"
                src="https://sphinx-healing-demo.netlify.app"
                className="w-full"
                style={{ height: 520 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
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
    </section>
  );
}

