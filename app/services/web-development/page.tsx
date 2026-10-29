import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";
import { getServicePage } from "@/lib/service-pages";

const service = getServicePage("web-development")!;

export const metadata: Metadata = {
  title: "Web Development | JP Technology",
  description:
    "Custom business websites, portals, and e-commerce builds that are fast, SEO-ready, and easy to run.",
  alternates: { canonical: "/services/web-development" },
  openGraph: {
    title: "Web Development | JP Technology",
    description:
      "Custom business websites, portals, and e-commerce builds that are fast, SEO-ready, and easy to run.",
    url: "/services/web-development",
    type: "website",
  },
};

export default function Page() {
  return <ServicePage data={service} />;
}
