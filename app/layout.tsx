import type { Metadata } from "next";
import { JetBrains_Mono, Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import Shell from "./components/Shell";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "UzDynamics — TACTICAL SYSTEMS TERMINAL",
  description:
    "UzDynamics — Advanced autonomous robotics and defense systems. Classified.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${spaceMono.variable} ${inter.variable}`}
    >
      <body className="antialiased bg-[#0a0a0a] text-[#e5e5e5]">
        {/* CRT Scanlines overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[9999]"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)",
          }}
        />
        {/* CRT vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[9998]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)",
          }}
        />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
