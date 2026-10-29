import type { Metadata } from "next";
import localFont from "next/font/local";
import ChatWidget from "@/components/chat/ChatWidget";
import { ContactProvider } from "@/components/contact/ContactProvider";
import { site } from "@/lib/site";
import "./globals.css";

const neverMind = localFont({
  src: [
    { path: "./fonts/NeverMind-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/NeverMind-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/NeverMind-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/NeverMind-DemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/NeverMind-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-nevermind",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.tagline} | ${site.name}`,
  description:
    "JP Technology is a web and IT agency building business websites, custom CRM dashboards, native apps, SaaS platforms, and AI automation for growing businesses in India and worldwide.",
  keywords: [
    "web development agency",
    "business website development",
    "custom CRM development",
    "CRM dashboard development",
    "native app development",
    "mobile app development company",
    "SaaS platform development",
    "AI automation agency",
    "educational platform development",
    site.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} \u2014 ${site.tagline}`,
    description:
      "Websites, CRMs, native apps, and AI automation built by one senior product team.",
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} \u2014 ${site.tagline}`,
    description:
      "Websites, CRMs, native apps, and AI automation built by one senior product team.",
  },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "S0-2, Geniefolks Building (2nd Floor), Block A, Plot No. A-28, Sector 4",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201301",
    addressCountry: "IN",
  },
  description:
    "Web and IT agency building business websites, custom CRM dashboards, native apps, SaaS platforms, and AI automation.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phoneHref,
    contactType: "sales",
    email: site.email,
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [site.social.linkedin],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: site.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={neverMind.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
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
