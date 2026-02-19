'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import CursorTrail from '@/components/CursorTrail';
import Hero from '@/components/Hero';
import ToolGrid from '@/components/ToolGrid';
import WhySection from '@/components/WhySection';
import FutureExpansion from '@/components/FutureExpansion';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    // Add parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.5');
        const yPos = -(scrolled * speed);
        (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen">
      <CursorTrail />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Interactive Grid Section */}
      <section className="py-24 px-4 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-neon-blue to-neon-violet bg-clip-text text-transparent"
          >
            The Grid
          </motion.h2>
          <ToolGrid />
        </div>
      </section>

      {/* Why FlowGrid Exists */}
      <WhySection />

      {/* Future Expansion */}
      <FutureExpansion />

      {/* Footer */}
      <Footer />
    </main>
  );
}
