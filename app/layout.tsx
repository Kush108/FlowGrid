import type { Metadata } from 'next';
import './globals.css';

import { DM_Sans, Fraunces, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://flowgrid.ca'),
  title: {
    default: 'FlowGrid — HVAC operations software for Alberta (demo first)',
    template: '%s · FlowGrid',
  },
  description:
    'FlowGrid builds operational software for HVAC companies — dispatch, fleet, job logs, and payroll export. Working prototype in 48 hours. From $299/mo. Built in Edmonton.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo-icon.svg',
    shortcut: '/logo-icon.svg',
    apple: '/logo-icon.svg',
  },
  openGraph: {
    type: 'website',
    url: 'https://flowgrid.ca/',
    siteName: 'FlowGrid',
    title: 'FlowGrid — HVAC operations software for Alberta',
    description:
      'Dispatch, fleet, job logs, and payroll export for HVAC companies. Working demo in 48 hours — pay only if you love it.',
    images: [{ url: '/logo-badge.svg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowGrid — HVAC operations software',
    description:
      'Dispatch, fleet, job logs, and payroll export for HVAC companies. Working demo in 48 hours.',
    images: ['/logo-badge.svg'],
  },
};

const bodyFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const displayFont = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FlowGrid',
    url: 'https://flowgrid.ca/',
    email: 'hello@flowgrid.ca',
  };

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'FlowGrid for HVAC',
    description: 'Dispatch, fleet, job logs, and payroll export built for Alberta HVAC companies.',
    brand: { '@type': 'Brand', name: 'FlowGrid' },
    url: 'https://flowgrid.ca/#demo',
  };

  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
      <head>
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      </head>
      <script
        defer
        data-website-id="dfid_0XtNYfkptwLKftXYSIiG3"
        data-domain="flowgrid.ca"
        src="https://datafa.st/js/script.js"
      ></script>
      <body>
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
        />
        {children}
      </body>
    </html>
  );
}
