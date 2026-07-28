'use client';

import { motion } from 'framer-motion';

const reasons = [
  {
    icon: '❄️',
    title: 'We know Alberta HVAC',
    body: 'Cold snaps, maintenance plans, warranty callbacks, seasonal hiring — we built FlowGrid around how Edmonton HVAC companies actually operate, not a Silicon Valley template.',
  },
  {
    icon: '🛠️',
    title: 'Demo first, always',
    body: 'Before you sign anything, we build a working prototype with your branding and job types. Click through dispatch, fleet, and payroll — then decide.',
  },
  {
    icon: '⚡',
    title: 'Live in days, not months',
    body: 'No 6-month implementation. Demo in 48 hours. Full deployment in a week. Your techs punch in on their phones the same week you say yes.',
  },
  {
    icon: '📍',
    title: 'Built in Edmonton',
    body: 'Local founder, local support, Alberta compliance (CRA mileage, provincial labour). Your ops software should be built here — not imported from California.',
  },
  {
    icon: '🔗',
    title: 'One platform, not five apps',
    body: 'Dispatch board, fleet tracking, job logs, mileage, leave, and payroll export — stop paying for QuickBooks Time + Deputy + spreadsheets.',
  },
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">WHY FLOWGRID</div>
          <h2
            className="font-[var(--font-display)] mt-3 leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
          >
            Purpose-built for HVAC. <br />
            Not retrofitted from generic SaaS.
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="rounded-2xl border border-brand-border bg-brand-bg/40 p-6 hover:shadow-[0_18px_40px_rgba(0,0,0,.35)] transition-shadow"
            >
              <div className="text-2xl">{r.icon}</div>
              <div className="mt-3 font-semibold text-brand-text/90">{r.title}</div>
              <div className="mt-2 text-brand-muted leading-relaxed text-sm">{r.body}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
