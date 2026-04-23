'use client';

import { motion } from 'framer-motion';

function Feature({ text }: { text: string }) {
  return (
    <li className="flex gap-2 text-sm text-brand-text/85">
      <span className="text-brand-green mt-0.5">✓</span>
      <span>{text}</span>
    </li>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">TRANSPARENT PRICING</div>
          <h2 className="font-[var(--font-display)] mt-3 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            Start for less than <br />
            you spend on coffee <br />
            for your team.
          </h2>
          <p className="mt-4 text-brand-muted max-w-3xl mx-auto">
            No surprise invoices. No per-feature upsells. One setup fee. One monthly seat price.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Demo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            className="rounded-2xl p-6 border border-brand-border bg-brand-surface shadow-[0_12px_30px_rgba(0,0,0,.25)]"
          >
            <div className="text-xs text-brand-muted tracking-[0.18em] uppercase">DEMO</div>
            <div className="mt-3 font-[var(--font-mono)] text-4xl text-brand-text">$0</div>
            <div className="mt-2 text-brand-muted">See before you pay</div>
            <ul className="mt-5 space-y-2">
              <Feature text="Working prototype in 48 hours" />
              <Feature text="Your branding and job types" />
              <Feature text="Full click-through demo" />
              <Feature text="No credit card" />
              <Feature text="No commitment" />
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex w-full items-center justify-center px-4 py-3 rounded-full bg-brand-green text-brand-bg font-semibold hover:bg-brand-green/90 transition-colors"
            >
              Get My Free Demo
            </a>
          </motion.div>

          {/* Launch (recommended) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            className="rounded-2xl p-6 border border-brand-green/25 bg-brand-surface shadow-[0_12px_30px_rgba(0,0,0,.25)] relative"
          >
            <div className="absolute -top-3 right-4 text-xs px-3 py-1 rounded-full bg-brand-green text-brand-bg font-semibold">
              MOST POPULAR
            </div>
            <div className="text-xs text-brand-muted tracking-[0.18em] uppercase">LAUNCH</div>
            <div className="mt-3 font-[var(--font-mono)] text-4xl text-brand-text">$500</div>
            <div className="mt-2 text-brand-muted">
              setup, then <span className="text-brand-text/85">$18/field staff + $85/manager</span> per month
            </div>
            <div className="mt-2 text-xs text-brand-muted">Minimum $299/month</div>
            <ul className="mt-5 space-y-2">
              <Feature text="Full working application" />
              <Feature text="GPS mileage tracking" />
              <Feature text="Live manager dashboard" />
              <Feature text="Weekly Excel reports" />
              <Feature text="Custom domain setup" />
              <Feature text="30-day support included" />
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex w-full items-center justify-center px-4 py-3 rounded-full bg-brand-green text-brand-bg font-semibold hover:bg-brand-green/90 transition-colors animate-glow-pulse"
            >
              Start With a Demo First
            </a>
          </motion.div>

          {/* Enterprise */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            className="rounded-2xl p-6 border border-brand-border bg-brand-surface shadow-[0_12px_30px_rgba(0,0,0,.25)]"
          >
            <div className="text-xs text-brand-muted tracking-[0.18em] uppercase">LARGE TEAMS</div>
            <div className="mt-3 font-[var(--font-mono)] text-4xl text-brand-text">Custom</div>
            <div className="mt-2 text-brand-muted">Based on team size and features</div>
            <ul className="mt-5 space-y-2">
              <Feature text="Everything in Launch" />
              <Feature text="Scheduling + approvals" />
              <Feature text="Funder/government reports" />
              <Feature text="Multi-location support" />
              <Feature text="Payroll integrations" />
              <Feature text="Dedicated support" />
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex w-full items-center justify-center px-4 py-3 rounded-full border border-white/20 text-brand-text/90 hover:border-white/30 hover:bg-white/5 transition-colors"
            >
              Get a Custom Quote
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm text-brand-muted"
        >
          Honest comparison: QuickBooks Time and Deputy can be similar per-user pricing — but they won’t build around your workflow or handle GPS mileage per job the way FlowGrid does.
        </motion.div>
      </div>
    </section>
  );
}

