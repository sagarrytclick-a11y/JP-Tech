import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";
import { getServicePage } from "@/lib/service-pages";

const service = getServicePage("internal-tools")!;

export const metadata: Metadata = {
  title: "Internal Tools & Automation | JP Technology",
  description:
    "Custom operations, inventory, HR, and approval tools that replace fragile spreadsheets and manual follow-ups.",
  alternates: { canonical: "/services/internal-tools" },
  openGraph: {
    title: "Internal Tools & Automation | JP Technology",
    description:
      "Custom operations, inventory, HR, and approval tools that replace fragile spreadsheets and manual follow-ups.",
    url: "/services/internal-tools",
    type: "website",
  },
};

export default function Page() {
  return <ServicePage data={service} />;
}
