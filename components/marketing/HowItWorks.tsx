'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    n: '01',
    title: 'Tell us your problem',
    body: '15-minute call or email. No formal brief needed.',
  },
  {
    n: '02',
    title: 'We build your demo',
    body: '48 hours. Real working app. Your branding.',
  },
  {
    n: '03',
    title: 'You decide',
    body: 'Love it → we deploy it. Don’t love it → you owe nothing.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">THE PROCESS</div>
          <h2 className="font-[var(--font-display)] mt-3 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            Demo first. <br />
            Always.
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute left-0 right-0 top-16 border-t border-dashed border-brand-border" />
          {steps.map((s) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="border border-brand-border bg-brand-surface rounded-2xl p-6 hover:shadow-[0_18px_40px_rgba(0,0,0,.35)] transition-shadow"
            >
              <div className="font-[var(--font-display)] text-brand-green/20" style={{ fontSize: 72, lineHeight: 0.9 }}>
                {s.n}
              </div>
              <div className="mt-3 font-semibold text-brand-text/90">{s.title}</div>
              <div className="mt-2 text-brand-muted leading-relaxed">{s.body}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 border border-brand-border bg-brand-surface rounded-2xl p-6"
        >
          <div className="border-l-4 border-brand-green pl-4 italic text-brand-text/85">
            “Most software companies make you pay before you see anything real. We think that’s backwards.”
          </div>
        </motion.div>
      </div>
    </section>
  );
}

