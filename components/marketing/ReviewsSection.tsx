'use client';

import { motion } from 'framer-motion';

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl p-6 border border-brand-border bg-brand-surface shadow-[0_12px_30px_rgba(0,0,0,.25)]">
      <div className="font-[var(--font-mono)] text-brand-green text-3xl">{value}</div>
      <div className="text-sm text-brand-muted mt-1">{label}</div>
    </div>
  );
}

const workflows = [
  {
    icon: '❄️',
    title: 'Cold-snap dispatch board',
    body: 'Open-shift claiming, emergency routing, and van availability — built for Edmonton winters, not a generic calendar.',
  },
  {
    icon: '🚐',
    title: 'Fleet & payroll in one export',
    body: 'Van and personal vehicle KM, job logs, and hours roll into a payroll-ready weekly summary — no more spreadsheet glue.',
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
            FlowGrid ships working HVAC demos so owners can evaluate dispatch, fleet, and payroll themselves — before any
            contract. We&apos;re pre-revenue and onboarding founding pilot partners in Edmonton now.
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
          <StatCard value="48" label="Hour demo delivery" />
          <StatCard value="$0" label="$ to see demo" />
          <StatCard value="2" label="Live niche prototypes" />
          <StatCard value="3" label="Pilot spots available" />
        </div>
      </div>
    </section>
  );
}
