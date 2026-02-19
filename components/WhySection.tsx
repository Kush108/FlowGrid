'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const statements = [
  'The internet is noisy.',
  'Tools are scattered.',
  'Intelligence should be modular.',
  'FlowGrid connects it.',
  'Minimal. Powerful.',
];

export default function WhySection() {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    if (visibleIndex < statements.length - 1) {
      const timer = setTimeout(() => {
        setVisibleIndex((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [visibleIndex]);

  return (
    <section className="py-24 px-4 md:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8 min-h-[400px] flex flex-col justify-center">
          {statements.map((statement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{
                opacity: visibleIndex >= index ? 1 : 0,
                x: visibleIndex >= index ? 0 : -30,
              }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-2xl sm:text-3xl md:text-5xl font-light text-white/90"
            >
              {statement}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
