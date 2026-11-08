import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Newsreader } from "next/font/google";
import { site } from "./data/portfolio";
import "./globals.css";

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Full-stack developer in Bengaluru. Building Kurambit, a Linux app that makes games with your coding agent, and Circe, which runs coding agents by voice.";

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
    <html lang="en-IN" className={`${mono.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
