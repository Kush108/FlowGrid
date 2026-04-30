import type { Metadata } from 'next';
import './globals.css';

import { DM_Sans, Fraunces, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://flowgrid.ca'),
  title: {
    default: 'FlowGrid — FieldTrack for field teams (demo first)',
    template: '%s · FlowGrid',
  },
  description:
    'FlowGrid builds operational software for businesses with field teams. FieldTrack is our flagship product for time + mileage + live status. We build a working demo in 48 hours — pay only if you love it.',
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
    title: 'FlowGrid — FieldTrack for field teams (demo first)',
    description:
      'FieldTrack is FlowGrid’s flagship product for time + mileage + live team status. Get a working demo in 48 hours — pay only if you love it.',
    images: [{ url: '/logo-badge.svg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlowGrid — FieldTrack for field teams',
    description:
      'FieldTrack is FlowGrid’s flagship product for time + mileage + live team status. Get a working demo in 48 hours — pay only if you love it.',
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
    name: 'FieldTrack',
    description: 'Time tracking, mileage per job, and live team status for field teams.',
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
