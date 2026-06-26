import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AetherOS - Autonomous Intelligence Platform",
  description: "AetherOS unifies your data, automates workflows, and turns intelligence into real-world impact. Secure, developer-first infrastructure.",
  keywords: ["Autonomous Intelligence", "AetherOS", "Workflow Automation", "Smart Analytics", "Developer API", "AI Platform"],
  metadataBase: new URL("https://aetheros.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AetherOS - Autonomous Intelligence Platform",
    description: "AetherOS unifies your data, automates workflows, and turns intelligence into real-world impact.",
    url: "https://aetheros.dev",
    siteName: "AetherOS",
    images: [
      {
        url: "https://aetheros.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "AetherOS Autonomous Intelligence Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AetherOS - Autonomous Intelligence Platform",
    description: "AetherOS unifies your data, automates workflows, and turns intelligence into real-world impact.",
    images: ["https://aetheros.dev/og-image.png"],
    creator: "@aetheros",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`} suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased min-h-screen flex flex-col bg-[#172B36] text-[#F1F6F4] selection:bg-[#FFC801] selection:text-[#172B36] relative overflow-x-hidden">
        
        {/* Global blueprint grid background at low opacity */}
        <div className="absolute inset-0 opacity-[0.012] pointer-events-none z-40" style={{ backgroundImage: 'linear-gradient(to right, #114C5A 1px, transparent 1px), linear-gradient(to bottom, #114C5A 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        
        {/* Global Noise Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.022] pointer-events-none z-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

        {/* Page Content wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
          {children}
        </div>
      </body>
    </html>
  );
}
