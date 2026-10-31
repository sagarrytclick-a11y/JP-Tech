import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";
import { getServicePage } from "@/lib/service-pages";
import { pageMetadata } from "@/lib/seo";

const service = getServicePage("crm-development")!;

export const metadata: Metadata = pageMetadata({
  title: "Custom CRM & Dashboard Development",
  description:
    "Custom CRMs, sales pipelines, lead routing, approvals, and reporting dashboards built around your workflow.",
  path: "/services/crm-development",
  ogTitle: "Custom CRM & Dashboard Development | JP Technology",
});

export default function Page() {
  return <ServicePage data={service} />;
}
