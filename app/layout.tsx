import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ScrollProgressBar, BackToTop } from "@/components/SiteWideUX";
import WhatsAppButton from "@/components/WhatsAppButton";
import BottomServiceSlider from "@/components/BottomServiceSlider";
import PopupForm from "@/components/PopupForm";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JP Technologies — Web Development & Social Media Marketing Agency",
  description:
    "Top-rated web development and social media marketing agency in India. We build stunning websites and drive real business growth with data-driven strategies.",
  keywords: [
    "web development",
    "social media marketing",
    "SEO",
    "PPC",
    "digital marketing agency",
    "website design",
    "India",
  ],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "JP Technologies — Web Development & Social Media Marketing",
    description:
      "We build stunning websites and drive real business growth with data-driven strategies.",
    type: "website",
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "JP Technologies",
              url: "https://jptechnologies.com",
              founder: { "@type": "Person", name: "Abhishek Tiwari" },
              description:
                "Web development and social media marketing agency.",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-8826916476",
                contactType: "sales",
              },
              sameAs: [
                "https://facebook.com/jptechnologies",
                "https://instagram.com/jptechnologies",
                "https://linkedin.com/company/jptechnologies",
              ],
            }),
          }}
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
