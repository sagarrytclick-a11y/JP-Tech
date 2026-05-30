import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Terms & Conditions — ${site.name}`,
  description: `Terms and conditions for ${site.name} web development and social media marketing services.`,
  alternates: { canonical: `${site.url}/terms` },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 mb-8">Terms & Conditions</h1>
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-zinc-100 space-y-6 text-zinc-600 leading-relaxed">
            <p>Welcome to {site.name}. By using our services, you agree to the following terms and conditions. Please read them carefully.</p>
            <h3 className="text-xl font-bold text-zinc-900">1. Services</h3>
            <p>We provide web development, social media marketing, SEO, and related digital services. All services are delivered as per the agreed scope of work.</p>
            <h3 className="text-xl font-bold text-zinc-900">2. Payments</h3>
            <p>Payment terms are outlined in the project proposal. Late payments may result in service suspension until the outstanding amount is cleared.</p>
            <h3 className="text-xl font-bold text-zinc-900">3. Intellectual Property</h3>
            <p>Upon full payment, the client retains full ownership of the final deliverables. {site.name} retains the right to display the work in its portfolio.</p>
            <h3 className="text-xl font-bold text-zinc-900">4. Confidentiality</h3>
            <p>We treat all client information as confidential and will not share it with third parties without explicit consent.</p>
            <h3 className="text-xl font-bold text-zinc-900">5. Cancellation & Refund</h3>
            <p>Cancellations must be made within 48 hours of project initiation. Refund eligibility is determined on a case-by-case basis.</p>
            <p>For any questions, contact us at {site.email}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
