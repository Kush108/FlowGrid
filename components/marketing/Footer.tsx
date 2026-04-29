'use client';

import { FlowWordmark } from '@/components/marketing/FlowBrand';

export default function Footer() {
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || '';
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || '';
  const hasSocial = Boolean(instagramUrl || linkedinUrl);

  return (
    <footer className="bg-[#060e1a] border-t border-brand-border py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <FlowWordmark />
            </div>
            <p className="mt-4 text-brand-muted leading-relaxed">Operational software for businesses that move.</p>
            <p className="mt-3 text-brand-muted text-sm">
              Built in Edmonton, serving businesses everywhere.
            </p>
            {hasSocial ? (
              <div className="mt-4 flex items-center gap-3 text-brand-muted">
                {instagramUrl ? (
                  <a
                    className="hover:text-brand-text transition-colors"
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    Instagram
                  </a>
                ) : null}
                {linkedinUrl ? (
                  <a
                    className="hover:text-brand-text transition-colors"
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    LinkedIn
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          <div>
            <div className="font-semibold text-brand-text/90">Services</div>
            <div className="mt-4 space-y-2 text-brand-muted">
              <a className="block hover:text-brand-text transition-colors" href="#services">
                FieldTrack
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#services">
                BookingFlow
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#services">
                OpsDash
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#services">
                StaffHub
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#services">
                ClientPortal
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#services">
                Custom Build
              </a>
            </div>
          </div>

          <div>
            <div className="font-semibold text-brand-text/90">Company</div>
            <div className="mt-4 space-y-2 text-brand-muted">
              <a className="block hover:text-brand-text transition-colors" href="#how">
                How It Works
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#pricing">
                Pricing
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#demo">
                Demo
              </a>
              <a className="block hover:text-brand-text transition-colors" href="#contact">
                Free Demo
              </a>
              <a className="block hover:text-brand-text transition-colors" href="mailto:hello@flowgrid.ca">
                hello@flowgrid.ca
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
          <div>© {new Date().getFullYear()} FlowGrid. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <a className="hover:text-brand-text transition-colors" href="/privacy">
              Privacy Policy
            </a>
            <span>·</span>
            <a className="hover:text-brand-text transition-colors" href="/terms">
              Terms
            </a>
            <span>·</span>
            <span>Built in Edmonton, CA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

