import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";
import { getServicePage } from "@/lib/service-pages";
import { pageMetadata } from "@/lib/seo";

const service = getServicePage("mobile-apps")!;

export const metadata: Metadata = pageMetadata({
  title: "Mobile App Development Company",
  description:
    "Native and cross-platform apps for customers and field teams, with offline support and clean mobile UX.",
  path: "/services/mobile-apps",
  ogTitle: "Mobile App Development Company | JP Technology",
});

export default function Page() {
  return <ServicePage data={service} />;
}
