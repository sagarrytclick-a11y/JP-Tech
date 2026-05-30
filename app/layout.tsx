import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import { ScrollProgressBar, BackToTop } from "@/components/SiteWideUX";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const PopupForm = dynamic(() => import("@/components/PopupForm"));
const BottomServiceSlider = dynamic(() => import("@/components/BottomServiceSlider"));

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: `Top-rated web development and social media marketing agency in ${site.location}. ${site.description}`,
  keywords: [
    "web development",
    "social media marketing",
    "SEO",
    "PPC",
    "digital marketing agency",
    "website design",
    site.name,
    `${site.location} web development`,
    `${site.location} digital marketing`,
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: `${site.name} — Web Development & Social Media Marketing`,
    description: site.description,
    type: "website",
    locale: "en_IN",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: site.faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.png`,
  founder: { "@type": "Person", name: site.founder },
  description: "Web development and social media marketing agency.",
  foundingDate: String(site.stats.foundedYear),
  numberOfEmployees: { "@type": "QuantitativeValue", minValue: 50, maxValue: 100 },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phone.replace(/\s/g, '-'),
    contactType: "sales",
    email: site.email,
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    site.social.facebook,
    site.social.instagram,
    site.social.linkedin,
    site.social.twitter,
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${site.url}/search?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col pb-14">
        <ScrollProgressBar />
        {children}
        <PopupForm />
        <WhatsAppButton />
        <BottomServiceSlider />
        <BackToTop />
      </body>
    </html>
  );
}
