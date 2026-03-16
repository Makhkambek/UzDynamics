import type { Metadata } from "next";
import { VT323, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Shell from "./components/Shell";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
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
    <html lang="en" className={`${vt323.variable} ${shareTechMono.variable}`}>
      <body className="antialiased bg-[#0a0a0a] text-[#00ff88] font-mono flicker">
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
