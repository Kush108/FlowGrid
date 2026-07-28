'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useOnceInView } from '@/components/marketing/useOnceInView';

function Counter({ to, label, prefix = '' }: { to: number; label: string; prefix?: string }) {
  const { ref, inView } = useOnceInView<HTMLDivElement>({ threshold: 0.12, rootMargin: '0px 0px -12% 0px' });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (to === 0) {
      setV(0);
      return;
    }

    const duration = 900;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return (
    <div ref={ref} className="rounded-2xl p-6 border border-brand-border bg-brand-surface shadow-[0_12px_30px_rgba(0,0,0,.25)]">
      <div className="font-[var(--font-mono)] text-brand-green text-3xl">
        {prefix}
        {v}
      </div>
      <div className="text-sm text-brand-muted mt-1">{label}</div>
    </div>
  );
}

const workflows = [
  {
    icon: '❄️',
    title: 'HVAC dispatch under pressure',
    body: 'Cold-snap open-shift board, emergency claiming, van tracking, and payroll export — modeled in the SummitFlow prototype.',
  },
  {
    icon: '🏠',
    title: 'Multi-site home care ops',
    body: 'Scheduling, visit logs, fleet reimbursement, and funder-ready reports — modeled in the Sphinx Ops prototype.',
  },
  {
    icon: '🛠️',
    title: 'Demo before you commit',
    body: 'Every engagement starts with a working branded prototype in 48 hours. No PDF decks, no mockups — a real app you can click through.',
  },
];

export default function ReviewsSection() {
  return (
    <section id="proof" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">WHAT WE&apos;VE BUILT</div>
          <h2 className="font-[var(--font-display)] mt-3 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            Live prototypes — not slide decks.
          </h2>
          <p className="mt-4 text-brand-muted max-w-3xl">
            FlowGrid ships working demos per vertical so prospects and partners can evaluate the product themselves.
            We&apos;re pre-revenue and onboarding founding pilot partners now.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {workflows.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="rounded-2xl p-6 border border-brand-border bg-brand-surface shadow-[0_12px_30px_rgba(0,0,0,.25)]"
            >
              <div className="text-2xl">{item.icon}</div>
              <div className="mt-3 font-semibold text-brand-text/90">{item.title}</div>
              <div className="mt-2 text-brand-muted leading-relaxed text-sm">{item.body}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Counter to={48} label="Hour demo delivery" />
          <Counter to={0} label="$ to see demo" prefix="$" />
          <Counter to={2} label="Live niche prototypes" />
          <Counter to={3} label="Pilot spots available" />
        </div>
      </div>
    </section>
  );
}
