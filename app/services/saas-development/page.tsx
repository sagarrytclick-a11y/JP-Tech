import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";
import { getServicePage } from "@/lib/service-pages";

const service = getServicePage("saas-development")!;

export const metadata: Metadata = {
  title: "SaaS Product Development | JP Technology",
  description:
    "Multi-tenant SaaS platforms with subscriptions, onboarding, roles, billing, and an internal admin console.",
  alternates: { canonical: "/services/saas-development" },
  openGraph: {
    title: "SaaS Product Development | JP Technology",
    description:
      "Multi-tenant SaaS platforms with subscriptions, onboarding, roles, billing, and an internal admin console.",
    url: "/services/saas-development",
    type: "website",
  },
};

export default function Page() {
  return <ServicePage data={service} />;
}
