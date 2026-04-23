import type { Metadata } from "next";
import "./globals.css";

import { DM_Sans, Fraunces, JetBrains_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "FlowGrid — Operational software for field teams (demo first)",
  description:
    "FlowGrid builds operational software for businesses with field teams. We build a working demo in 48 hours before you pay anything.",
};

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}>
      <script
        defer
        data-website-id="dfid_0XtNYfkptwLKftXYSIiG3"
        data-domain="flowgrid.ca"
        src="https://datafa.st/js/script.js">
      </script>
      <body>{children}</body>
    </html>
  );
}
