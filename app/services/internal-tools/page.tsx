import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";
import { getServicePage } from "@/lib/service-pages";
import { pageMetadata } from "@/lib/seo";

const service = getServicePage("internal-tools")!;

export const metadata: Metadata = pageMetadata({
  title: "Internal Tools & Operations Software",
  description:
    "Custom operations, inventory, HR, and approval tools that replace fragile spreadsheets and manual follow-ups.",
  path: "/services/internal-tools",
  ogTitle: "Internal Tools & Operations Software | JP Technology",
});

export default function Page() {
  return <ServicePage data={service} />;
}
