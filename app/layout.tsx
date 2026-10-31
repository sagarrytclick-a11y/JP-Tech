import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import ChatWidget from "@/components/chat/ChatWidget";
import { ContactProvider } from "@/components/contact/ContactProvider";
import JsonLd from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { siteDescription, siteGraph } from "@/lib/seo";
import "./globals.css";

const neverMind = localFont({
  src: [
    { path: "./fonts/NeverMind-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/NeverMind-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/NeverMind-DemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/NeverMind-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-nevermind",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} in Noida`,
    template: `%s | ${site.name}`,
  },
  description: siteDescription,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.name,
  publisher: site.legalName,
  category: "technology",
  classification:
    "Web development, custom CRM development, mobile app development, SaaS platforms, AI automation",
  keywords: [
    "JP Technology",
    "web development company in Noida",
    "web development agency India",
    "business website development",
    "custom CRM development",
    "CRM dashboard development",
    "mobile app development company",
    "SaaS platform development",
    "internal tools development",
    "AI automation agency",
    "educational platform development",
    "e-commerce development company",
    "Next.js development agency",
  ],
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${site.url}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    countryName: "India",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { email: false, address: false, telephone: false },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "black-translucent",
  },
  other: {
    "geo.region": "IN-UP",
    "geo.placename": "Noida, Uttar Pradesh",
    "geo.position": "28.5355;77.3910",
    ICBM: "28.5355, 77.3910",
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? {
          other: {
            "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
          },
        }
      : {}),
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#070707",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={neverMind.variable}>
      <head>
        <JsonLd id="site-schema" data={siteGraph()} />
      </head>
      <body className="min-h-screen bg-ink text-white">
        <ContactProvider>
          {children}
          <ChatWidget />
        </ContactProvider>
      </body>
    </html>
  );
}
