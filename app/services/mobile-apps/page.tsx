import type { Metadata } from "next";
import ServicePage from "@/components/services/ServicePage";
import { getServicePage } from "@/lib/service-pages";

const service = getServicePage("mobile-apps")!;

export const metadata: Metadata = {
  title: "Mobile App Development | JP Technology",
  description:
    "Native and cross-platform apps for customers and field teams, with offline support and clean mobile UX.",
  alternates: { canonical: "/services/mobile-apps" },
  openGraph: {
    title: "Mobile App Development | JP Technology",
    description:
      "Native and cross-platform apps for customers and field teams, with offline support and clean mobile UX.",
    url: "/services/mobile-apps",
    type: "website",
  },
};

export default function Page() {
  return <ServicePage data={service} />;
}
