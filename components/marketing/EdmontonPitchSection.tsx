'use client';

import { motion } from 'framer-motion';

const proof = [
  {
    stat: '2',
    label: 'Live niche prototypes',
    detail: 'SummitFlow (HVAC) + Sphinx Ops (social services) — click-through demos, not mockups.',
  },
  {
    stat: '48h',
    label: 'Demo delivery SLA',
    detail: 'Branded prototype before any contract — how we win skeptical HVAC owners.',
  },
  {
    stat: '$299',
    label: 'Entry price vs $800–2k',
    detail: 'Purpose-built for 10–20 tech shops — not enterprise field-service bloat.',
  },
];

export default function EdmontonPitchSection() {
  return (
    <section id="traction" className="py-20 bg-brand-surface border-y border-brand-border">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">EDMONTON UNLIMITED · TRACTION</div>
          <h2
            className="font-[var(--font-display)] mt-3 leading-tight max-w-3xl"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
          >
            Niche-first ops software with demos investors and customers can actually use.
          </h2>
          <p className="mt-4 text-brand-muted max-w-3xl leading-relaxed">
            FlowGrid is not another generic automation pitch. We ship working tenant apps per vertical — starting with HVAC
            in Alberta — and use those prototypes to onboard founding customers while keeping implementation cost low.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {proof.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="rounded-2xl border border-brand-border bg-brand-bg/40 p-6"
            >
              <div className="font-[var(--font-mono)] text-4xl text-brand-green">{item.stat}</div>
              <div className="mt-2 font-semibold text-brand-text/90">{item.label}</div>
              <div className="mt-2 text-sm text-brand-muted leading-relaxed">{item.detail}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-2xl border border-brand-green/20 bg-brand-green/5 p-6 sm:p-8"
        >
          <div className="font-semibold text-brand-text/90">What we&apos;re asking Edmonton Unlimited to back</div>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-brand-text/85">
            {[
              'Introduce 3–5 Edmonton HVAC owners for founding pilot spots',
              'Validate pricing and positioning with Alberta field-service operators',
              'Support go-to-market: local events, mentor intros, and grant navigation',
            ].map((text) => (
              <li key={text} className="flex gap-2">
                <span className="text-brand-green shrink-0">→</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="/summitflow/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-green text-brand-bg font-semibold hover:bg-brand-green/90 transition-colors"
            >
              Open SummitFlow HVAC Demo
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-brand-text/90 hover:border-white/30 hover:bg-white/5 transition-colors"
            >
              Book founder call
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
