import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";
import { getServicePage } from "@/lib/service-pages";

const service = getServicePage("crm-development")!;

export const metadata: Metadata = {
  title: "CRM & Dashboard Development | JP Technology",
  description:
    "Custom CRMs, sales pipelines, lead routing, approvals, and reporting dashboards built around your workflow.",
  alternates: { canonical: "/services/crm-development" },
  openGraph: {
    title: "CRM & Dashboard Development | JP Technology",
    description:
      "Custom CRMs, sales pipelines, lead routing, approvals, and reporting dashboards built around your workflow.",
    url: "/services/crm-development",
    type: "website",
  },
};

export default function Page() {
  return <ServicePage data={service} />;
}
