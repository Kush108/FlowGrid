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
          <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">THE HVAC OPS PROBLEM</div>
          <h2 className="font-[var(--font-display)] mt-3 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            When it hits -30°C, your dispatch <br />
            can&apos;t run on WhatsApp <br />
            and a whiteboard.
          </h2>
          <p className="mt-4 text-brand-muted max-w-3xl">
            Edmonton has hundreds of HVAC companies — most still juggle ServiceTitan or Housecall Pro with spreadsheets,
            group texts, and manual mileage. It works until cold-snap season, and then it costs you.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProblemCard
            icon="❄️"
            title="Emergency calls pile up with no visibility"
            body="When furnaces fail across the city, who's available? Who's closest? Generic apps don't show open-shift claiming the way HVAC dispatch actually works."
          />
          <ProblemCard
            icon="🚐"
            title="Van KM and job costs go untracked"
            body="Every service call has drive time — personal vehicles, company vans, callbacks. Most shops recover less than 60% of reimbursable KM because it's tracked in three places."
          />
          <ProblemCard
            icon="💸"
            title="You're paying enterprise prices for generic tools"
            body="ServiceTitan runs $800–$2,000+/month for a 15-tech shop. You're paying for features you'll never use — while still re-keying hours into payroll every two weeks."
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center italic text-brand-green"
        >
          → FlowGrid is built for HVAC. Working demo in 48 hours.{' '}
          <a href="/summitflow/login" className="underline hover:text-brand-green/80">
            See SummitFlow →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
