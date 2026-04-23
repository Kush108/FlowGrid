'use client';

import { useEffect, useState } from 'react';
import { FlowMark, FlowWordmark } from '@/components/marketing/FlowBrand';

const links = [
  { href: '#services', label: 'Services' },
  { href: '#how', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#demo', label: 'Demo' },
];

export default function NavBar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={[
          'sticky top-0 z-50 transition-all',
          solid ? 'bg-brand-bg/90 backdrop-blur border-b border-brand-border shadow-[0_10px_30px_rgba(0,0,0,.25)]' : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-3 select-none">
            <FlowMark />
            <FlowWordmark />
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm text-brand-muted">
            {links.map((l) => (
              <a key={l.href} className="hover:text-brand-text transition-colors" href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a className="text-sm text-brand-muted hover:text-brand-text transition-colors" href="mailto:hello@flowgrid.ca">
              hello@flowgrid.ca
            </a>
            <a
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-brand-green text-brand-bg font-medium text-sm hover:bg-brand-green/90 transition-colors"
              href="#contact"
            >
              Get Free Demo
            </a>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-brand-border bg-white/5"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <span className="text-xl leading-none">≡</span>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute inset-0 p-5">
            <div className="h-full rounded-2xl border border-brand-border bg-brand-bg shadow-[0_12px_30px_rgba(0,0,0,.35)] overflow-hidden">
              <div className="p-5 flex items-center justify-between border-b border-brand-border">
                <div className="flex items-center gap-3">
                  <FlowMark />
                  <FlowWordmark />
                </div>
                <button
                  className="w-10 h-10 rounded-xl border border-brand-border bg-white/5 inline-flex items-center justify-center"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-xl leading-none">×</span>
                </button>
              </div>
              <div className="p-5">
                <div className="space-y-3 text-brand-text/90">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      className="block py-2 text-lg"
                      href={l.href}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </a>
                  ))}
                  <a className="block py-2 text-lg" href="#contact" onClick={() => setOpen(false)}>
                    Get Free Demo
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-brand-border">
                  <a className="text-brand-muted hover:text-brand-text transition-colors" href="mailto:hello@flowgrid.ca">
                    hello@flowgrid.ca
                  </a>
                  <div className="mt-4">
                    <a
                      className="inline-flex w-full items-center justify-center px-4 py-3 rounded-full bg-brand-green text-brand-bg font-medium hover:bg-brand-green/90 transition-colors"
                      href="#contact"
                      onClick={() => setOpen(false)}
                    >
                      Get Free Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

