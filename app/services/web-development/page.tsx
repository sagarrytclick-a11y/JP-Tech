import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";
import { getServicePage } from "@/lib/service-pages";
import { pageMetadata } from "@/lib/seo";

const service = getServicePage("web-development")!;

export const metadata: Metadata = pageMetadata({
  title: "Web Development Company in Noida",
  description:
    "Custom business websites, portals, and e-commerce builds that are fast, SEO-ready, and easy to run.",
  path: "/services/web-development",
  ogTitle: "Web Development Company in Noida | JP Technology",
});

export default function Page() {
  return <ServicePage data={service} />;
}
