import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
