'use client';

import { motion } from 'framer-motion';

const demos = [
  {
    name: 'SummitFlow Ops',
    tag: 'HVAC prototype',
    desc: 'Fictional Edmonton HVAC company (Summit Heating & Cooling) — dispatch, emergency calls, fleet, job logs, and payroll. Built to show investors and HVAC owners what FlowGrid looks like in their world.',
    href: '/summitflow/login',
    color: '#0ea5e9',
    features: ['Cold-snap dispatch board', 'Open-shift claiming', 'Van + personal vehicle KM', 'Warranty callback tracking'],
  },
  {
    name: 'Sphinx Ops',
    tag: 'Social services (live)',
    desc: 'Real prototype for a 60+ staff home care organization — scheduling, fleet, visit logs, and multi-site management across Edmonton.',
    href: '/sphinxops/login',
    color: '#22c55e',
    features: ['Multi-site scheduling', 'Trauma-informed visit logs', 'Fleet reimbursement', 'Funder-ready reports'],
  },
];

export default function DemoShowcaseSection() {
  return (
    <section id="demo" className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 25%, rgba(14,165,233,.08), rgba(14,165,233,0) 55%)',
        }}
      />
      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">LIVE PROTOTYPES</div>
          <h2
            className="font-[var(--font-display)] mt-3 leading-tight italic text-brand-green"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
          >
            This isn&apos;t a screenshot.
            <br />
            Click in and explore.
          </h2>
          <p className="mt-4 text-brand-muted max-w-3xl mx-auto">
            FlowGrid builds working demos for each niche. Pick a role, log in as Owner, Dispatch Lead, or Technician — and
            see dispatch, fleet, and payroll in action. No sales call required.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {demos.map((demo) => (
            <motion.div
              key={demo.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-brand-border bg-brand-surface overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,.35)]"
            >
              <div className="p-6 border-b border-brand-border">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: `${demo.color}20`, color: demo.color, border: `1px solid ${demo.color}40` }}
                  >
                    {demo.tag}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-brand-text/90">{demo.name}</h3>
                <p className="mt-2 text-brand-muted text-sm leading-relaxed">{demo.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {demo.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-brand-text/85">
                      <span className="text-brand-green">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={demo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-green text-brand-bg font-semibold hover:bg-brand-green/90 transition-colors"
                >
                  Open {demo.name} Demo →
                </a>
              </div>
              <div className="bg-brand-bg/30">
                <iframe
                  title={`${demo.name} live demo`}
                  src={demo.href}
                  className="w-full"
                  style={{ height: 420 }}
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm text-brand-muted"
        >
          Want one branded for your HVAC company? We&apos;ll build a prototype in 48 hours —{' '}
          <a href="#contact" className="text-brand-green hover:underline">
            request your free demo
          </a>
          .
        </motion.p>
      </div>
    </section>
  );
}
