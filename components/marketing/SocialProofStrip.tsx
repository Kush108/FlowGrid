'use client';

import { motion } from 'framer-motion';

const pills = ['🏥 Home Care', '🔧 HVAC', '🧹 Cleaning', '🔒 Security', '🌿 Landscaping', '📦 Delivery'];

export default function SocialProofStrip() {
  return (
    <section className="border-y border-brand-border bg-brand-bg/60">
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm text-brand-muted"
        >
          <span className="text-brand-text/85">Trusted by field service organizations in:</span>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-2">
          {pills.map((p) => (
            <span
              key={p}
              className="px-3 py-1.5 rounded-full border border-brand-border bg-white/5 text-xs text-brand-muted"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

