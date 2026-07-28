'use client';

import { motion } from 'framer-motion';
import { typicalShopMonthly } from '@/lib/marketing/pricing';

const rows = [
  {
    feature: 'Built for HVAC workflows',
    generic: 'Generic field service — you configure everything',
    flowgrid: 'Job types, zones, emergency dispatch, warranty callbacks out of the box',
  },
  {
    feature: 'Cold-snap emergency dispatch',
    generic: 'Manual phone tree or WhatsApp chaos',
    flowgrid: 'Open-shift board — first available tech claims the job',
  },
  {
    feature: 'Fleet + mileage per job',
    generic: 'Separate GPS app, spreadsheets, or nothing',
    flowgrid: 'Van tracking + CRA-ready KM logs tied to each service call',
  },
  {
    feature: 'Payroll export',
    generic: 'Re-key hours from 3 different systems',
    flowgrid: 'Approved hours + drive time → one-click payroll export',
  },
  {
    feature: 'Monthly cost (15 techs)',
    generic: '$800–$2,000+/mo (ServiceTitan, Housecall Pro, etc.)',
    flowgrid: `~$${typicalShopMonthly()}/mo (15 techs + 1 manager) — built for Alberta HVAC margins`,
  },
  {
    feature: 'See it before you pay',
    generic: 'Sales demo + 30-day trial, then lock-in',
    flowgrid: 'Working prototype in 48 hours — $0 until you love it',
  },
];

export default function ComparisonSection() {
  return (
    <section id="compare" className="py-20 bg-brand-surface">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-xs tracking-[0.18em] uppercase text-brand-muted">WHY NOT GENERIC TOOLS?</div>
          <h2
            className="font-[var(--font-display)] mt-3 leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
          >
            ServiceTitan wasn&apos;t built for a <br />
            15-van Edmonton HVAC shop.
          </h2>
          <p className="mt-4 text-brand-muted max-w-3xl">
            Generic field service software is powerful — but expensive, bloated, and still doesn&apos;t match how HVAC
            companies actually run dispatch, emergency calls, and seasonal surges.
          </p>
        </motion.div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-brand-border text-left text-sm">
                <th className="py-3 pr-4 text-brand-muted font-medium w-[28%]">Capability</th>
                <th className="py-3 px-4 text-brand-muted font-medium w-[36%]">Generic tools</th>
                <th className="py-3 pl-4 text-brand-green font-medium w-[36%]">FlowGrid for HVAC</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-brand-border/60"
                >
                  <td className="py-4 pr-4 text-brand-text/90 font-medium text-sm">{row.feature}</td>
                  <td className="py-4 px-4 text-brand-muted text-sm">{row.generic}</td>
                  <td className="py-4 pl-4 text-brand-text/85 text-sm">{row.flowgrid}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
