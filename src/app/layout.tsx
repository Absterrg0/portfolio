import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { site } from "./data/portfolio";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "Full-stack developer in Bengaluru, building Kurambit, a game studio that plays what it builds, and Circe, a voice-first control plane for coding agents.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description,
  applicationName: site.name,
  keywords: ["Parv Jain", "Abstergo", "Kurambit", "Circe", "full-stack developer", "TypeScript", "Next.js"],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: site.name,
    description,
    url: "/",
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description,
    creator: "@notabbytwt",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0e" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={mono.variable}>
      <body>{children}</body>
    </html>
  );
}
