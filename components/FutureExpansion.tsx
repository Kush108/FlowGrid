'use client';

import { motion } from 'framer-motion';

const futureTools = [
  'Code Review AI',
  'Design System Generator',
  'API Builder',
  'Data Visualizer',
  'Content Optimizer',
];

export default function FutureExpansion() {
  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-light text-white/60 mb-12 text-center"
        >
          More nodes activating soon…
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {futureTools.map((tool, index) => (
            <motion.div
              key={tool}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-lg p-4 border border-white/5 blur-sm hover:blur-none transition-all cursor-default"
            >
              <div className="text-white/30 text-sm text-center">{tool}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
