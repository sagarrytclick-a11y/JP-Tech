import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";
import { getServicePage } from "@/lib/service-pages";
import { pageMetadata } from "@/lib/seo";

const service = getServicePage("saas-development")!;

export const metadata: Metadata = pageMetadata({
  title: "SaaS Product Development",
  description:
    "Multi-tenant SaaS platforms with subscriptions, onboarding, roles, billing, and an internal admin console.",
  path: "/services/saas-development",
  ogTitle: "SaaS Product Development | JP Technology",
});

export default function Page() {
  return <ServicePage data={service} />;
}
