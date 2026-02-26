import type { Metadata } from "next";
import "./globals.css";

//datafa.st

import Script from "next/script";

export const metadata: Metadata = {
  title: "FlowGrid — A Grid of Intelligent Utilities",
  description: "A collection of AI-powered micro-tools across different niches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
