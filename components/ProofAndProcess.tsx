'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

const outcomes = [
  { title: 'Less admin.', desc: 'Automate the busywork that slows teams down.' },
  { title: 'Cleaner records.', desc: 'Auditable timestamps. Exportable reports. No guesswork.' },
  { title: 'Faster scheduling.', desc: 'Booking and dispatch that stays readable under pressure.' },
  { title: 'Payroll-ready.', desc: 'Hours + mileage summaries, week by week.' },
];

const steps = [
  {
    name: 'Map',
    headline: 'We map your workflow.',
    body: '15–30 minutes. We capture jobs, staff, approvals, reports — then define a clean first version.',
  },
  {
    name: 'Build',
    headline: 'We build the system.',
    body: 'Mobile-first web app. Your branding. Your rules. A tight UI that your team will actually use.',
  },
  {
    name: 'Operate',
    headline: 'We keep it running.',
    body: 'Fixes, improvements, and clear support. Systems should stay stable as you grow.',
  },
];

export default function ProofAndProcess() {
  const [active, setActive] = useState(0);

  const activeStep = useMemo(() => steps[active] ?? steps[0], [active]);

  return (
    <section className="py-24 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-neon-blue to-neon-violet bg-clip-text text-transparent">
            Systems that feel calm.
          </h2>
          <p className="text-white/60 mt-3 max-w-2xl mx-auto">
            No hype. Just clean tools that reduce friction in day-to-day operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Outcomes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {outcomes.map((o, idx) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ delay: idx * 0.05 }}
                className="glass rounded-xl p-5 border border-white/10"
              >
                <div className="text-white/90 font-medium">{o.title}</div>
                <div className="text-white/60 text-sm mt-2">{o.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Process */}
          <div className="glass rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div className="text-white/85 font-medium">How it works</div>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('flowgrid:intake-open', { detail: { source: 'process' } }))}
                  className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors"
                >
                  Request a build plan →
                </button>
              </div>

              <div className="mt-5 flex gap-2">
                {steps.map((s, i) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setActive(i)}
                    className={[
                      'px-3 py-2 rounded-full text-xs sm:text-sm border transition-all',
                      i === active
                        ? 'border-neon-blue/30 text-white/90 bg-neon-blue/10'
                        : 'border-white/10 text-white/55 hover:text-white/75 hover:bg-white/[0.03]',
                    ].join(' ')}
                  >
                    {s.name}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeStep.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-6"
              >
                <div className="text-xl sm:text-2xl font-semibold text-white/90">{activeStep.headline}</div>
                <div className="text-white/60 mt-2 leading-relaxed">{activeStep.body}</div>
              </motion.div>

              <div className="mt-7 grid grid-cols-3 gap-2">
                {steps.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1.5 rounded-full bg-white/10 overflow-hidden"
                    aria-hidden="true"
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-neon-blue to-neon-violet"
                      initial={false}
                      animate={{ width: i <= active ? '100%' : '0%' }}
                      transition={{ duration: 0.35 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Preview panel (pure HTML/CSS, lightweight) */}
            <div className="border-t border-white/10 p-6 sm:p-7 bg-white/[0.02]">
              <div className="flex items-center justify-between text-xs text-white/45">
                <span>Preview</span>
                <span>Ops snapshot</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: 'On shift', value: '7' },
                  { label: 'KM today', value: '284' },
                  { label: 'Jobs', value: '12' },
                ].map((k) => (
                  <div key={k.label} className="rounded-xl border border-white/10 p-4 bg-white/[0.03]">
                    <div className="text-white/80 text-lg font-semibold">{k.value}</div>
                    <div className="text-white/45 text-xs mt-1">{k.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

