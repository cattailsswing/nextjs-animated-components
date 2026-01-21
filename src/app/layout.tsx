import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Awwwards UI - Premium Animation Components",
  description: "The ultimate web animation toolkit. GSAP + Framer Motion + Lenis + Three.js + 50+ premium components. Build Awwwards-worthy sites.",
  keywords: ["animation", "react", "nextjs", "gsap", "framer-motion", "three.js", "tailwindcss", "awwwards", "ui-components"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
