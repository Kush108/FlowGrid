'use client';

import { motion } from 'framer-motion';

function ProblemCard({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="border border-brand-border bg-brand-bg/40 rounded-2xl p-6 hover:shadow-[0_18px_40px_rgba(0,0,0,.35)] transition-shadow"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center text-orange-200">
          {icon}
        </div>
        <div className="font-semibold text-brand-text/90">{title}</div>
      </div>
      <div className="mt-4 text-brand-muted leading-relaxed">{body}</div>
    </motion.div>
  );
}

export default function ProblemSection() {
  return (
    <section className="bg-brand-surface py-20" id="problem">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">WHY FLOWGRID EXISTS</div>
          <h2 className="font-[var(--font-display)] mt-3 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            Running a field team on <br />
            WhatsApp and paper <br />
            is costing you money.
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProblemCard
            icon="⏱️"
            title="You don’t know who’s actually on site"
            body="When staff call in hours at the end of the week, how accurate is it really? You’re trusting people you can’t see."
          />
          <ProblemCard
            icon="🚗"
            title="Mileage goes untracked or unclaimed"
            body="Every km your team drives is either a CRA deduction or a reimbursable expense. Most businesses recover less than 60% of what they’re owed."
          />
          <ProblemCard
            icon="📄"
            title="Payroll takes hours it shouldn’t"
            body="Chasing timesheets, checking mileage receipts, manually calculating — every pay period. That time is worth more than the software costs."
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center italic text-brand-green"
        >
          → FlowGrid solves all three. Demo in 48 hours.
        </motion.div>
      </div>
    </section>
  );
}

