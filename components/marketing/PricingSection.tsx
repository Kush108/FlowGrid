'use client';

import { motion } from 'framer-motion';
import {
  EXAMPLE_MANAGER_COUNT,
  EXAMPLE_TECH_COUNT,
  FIELD_STAFF_MONTHLY,
  MANAGER_MONTHLY,
  PLATFORM_MINIMUM,
  SETUP_FEE,
  shopMonthlyWithMinimum,
  typicalShopMonthly,
} from '@/lib/marketing/pricing';

function Feature({ text }: { text: string }) {
  return (
    <li className="flex gap-2 text-sm text-brand-text/85">
      <span className="text-brand-green mt-0.5">✓</span>
      <span>{text}</span>
    </li>
  );
}

export default function PricingSection() {
  const typicalTotal = typicalShopMonthly();
  const withMinimum = shopMonthlyWithMinimum();

  return (
    <section id="pricing" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">TRANSPARENT PRICING</div>
          <h2 className="font-[var(--font-display)] mt-3 leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            Priced for Alberta HVAC margins — <br />
            not enterprise SaaS budgets.
          </h2>
          <p className="mt-4 text-brand-muted max-w-3xl mx-auto">
            ServiceTitan charges $800–$2,000+/month for a 15-tech shop. A typical FlowGrid shop ({EXAMPLE_TECH_COUNT} techs +{' '}
            {EXAMPLE_MANAGER_COUNT} manager) runs about <span className="text-brand-text/85">${typicalTotal}/mo</span> — field
            staff at ${FIELD_STAFF_MONTHLY}/tech, manager seats at ${MANAGER_MONTHLY}/mo, billed separately.
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
              Get My Branded Demo →
            </a>
            <a
              href="/summitflow/login"
              className="mt-2 inline-flex w-full items-center justify-center px-4 py-3 rounded-full border border-white/20 text-brand-text/90 hover:border-white/30 hover:bg-white/5 transition-colors text-sm min-h-[44px]"
            >
              Or explore SummitFlow demo
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
            <div className="mt-3 font-[var(--font-mono)] text-4xl text-brand-text">${typicalTotal}</div>
            <div className="mt-2 text-brand-muted">
              typical / mo for {EXAMPLE_TECH_COUNT} techs + {EXAMPLE_MANAGER_COUNT} manager
            </div>
            <div className="mt-2 text-xs text-brand-muted leading-relaxed">
              ${SETUP_FEE} setup, then ${FIELD_STAFF_MONTHLY}/field tech + ${MANAGER_MONTHLY}/manager seat. Platform minimum $
              {PLATFORM_MINIMUM}/mo on field staff (applies to smaller teams — e.g. ${withMinimum}/mo with minimum on{' '}
              {EXAMPLE_TECH_COUNT} techs).
            </div>
            <ul className="mt-5 space-y-2">
              <Feature text="Cold-snap dispatch board" />
              <Feature text="Open-shift claiming for emergencies" />
              <Feature text="Van + personal vehicle KM tracking" />
              <Feature text="Job logs and warranty callbacks" />
              <Feature text="Payroll export (hours + mileage)" />
              <Feature text="Custom domain setup" />
              <Feature text="30-day support included" />
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex w-full items-center justify-center px-4 py-3 rounded-full bg-brand-green text-brand-bg font-semibold hover:bg-brand-green/90 transition-colors animate-glow-pulse min-h-[44px]"
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
              <Feature text="Multi-location support" />
              <Feature text="Payroll integrations" />
              <Feature text="Dedicated support" />
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex w-full items-center justify-center px-4 py-3 rounded-full border border-white/20 text-brand-text/90 hover:border-white/30 hover:bg-white/5 transition-colors min-h-[44px]"
            >
              Get a Custom Quote
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center text-sm text-brand-muted max-w-3xl mx-auto"
        >
          Example: {EXAMPLE_TECH_COUNT} techs × ${FIELD_STAFF_MONTHLY} = ${EXAMPLE_TECH_COUNT * FIELD_STAFF_MONTHLY} +{' '}
          {EXAMPLE_MANAGER_COUNT} manager × ${MANAGER_MONTHLY} = <span className="text-brand-text/85">${typicalTotal}/mo</span>.
          Manager seats are billed separately. Honest comparison: ServiceTitan and Housecall Pro are powerful — but overkill
          for a 10–20 tech HVAC shop.
        </motion.div>
      </div>
    </section>
  );
}
