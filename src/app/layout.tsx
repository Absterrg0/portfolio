import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope, Newsreader } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abstergo.fyi/"),
  title: {
    default: "Parv Jain — Product & Full-stack Developer",
    template: "%s — Parv Jain / Abstergo",
  },
  description:
    "Selected product systems, frontend interfaces, and developer tools by Parv Jain—a full-stack developer in Bengaluru building as Abstergo.",
  applicationName: "Parv Jain / Abstergo",
  keywords: [
    "Parv Jain",
    "Abstergo",
    "full-stack developer",
    "frontend developer",
    "product engineer",
    "Next.js",
    "TypeScript",
    "Solana",
  ],
  authors: [{ name: "Parv Jain", url: "https://abstergo.fyi/" }],
  creator: "Parv Jain",
  publisher: "Parv Jain / Abstergo",
  category: "technology",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title: "Parv Jain — Editorial Ledger",
    description:
      "Selected product systems and interface work by Parv Jain / Abstergo.",
    url: "/",
    siteName: "Parv Jain / Abstergo",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Parv Jain Editorial Ledger portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parv Jain — Editorial Ledger",
    description: "Selected product systems and interface work by Parv Jain / Abstergo.",
    creator: "@notabbytwt",
    images: [
      {
        url: "/opengraph-image",
        alt: "Parv Jain Editorial Ledger portfolio",
      },
    ],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#171513",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${ibmPlexMono.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
