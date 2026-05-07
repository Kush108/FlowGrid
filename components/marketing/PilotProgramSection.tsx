'use client';

import { motion } from 'framer-motion';

export default function PilotProgramSection() {
  return (
    <section id="pilot" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">PILOT PROGRAM</div>
          <h2 className="font-[var(--font-display)] mt-3 leading-tight max-w-3xl" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            Now accepting pilot partners in Edmonton
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mt-10 rounded-2xl p-6 sm:p-8 border border-brand-border bg-brand-surface shadow-[0_12px_30px_rgba(0,0,0,.25)]"
        >
          <p className="text-brand-text/90 leading-relaxed max-w-3xl">
            We&apos;re onboarding 3 Edmonton field-service businesses as founding pilot clients. You get the full system, white-glove setup, and
            locked-in pricing — in exchange for honest feedback that shapes the product.
          </p>
          <ul className="mt-6 space-y-3 text-brand-text/85">
            {[
              'Full setup included ($500 value, waived for pilots)',
              'Locked-in rate: $18/staff/month, never increases',
              'Direct line to the founder for support',
            ].map((text) => (
              <li key={text} className="flex gap-3">
                <span className="text-brand-green mt-0.5 shrink-0">✓</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-green text-brand-bg font-semibold hover:bg-brand-green/90 transition-colors"
            >
              Apply for a Pilot Spot →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
