import Link from "next/link";
import type { Metadata } from "next";
import Logo from "@/components/site/Logo";

export const metadata: Metadata = {
  title: "Privacy Policy | JP Technology",
  description: "How JP Technology collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <div className="shell py-10 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Logo />

        <div className="mt-10 rounded-[28px] border border-line bg-[#141414] p-6 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-white/50">Last updated: October 2026</p>

          <div className="mt-8 space-y-7 text-[15px] leading-[1.8] text-white/65">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">
                Information we collect
              </h2>
              <p>
                When you submit an enquiry, we collect the details you provide,
                including your name, email address, phone number, company
                industry, budget range, and project description.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">
                How we use your information
              </h2>
              <p>
                We use your information to respond to your enquiry, prepare a
                proposal, schedule a discovery call, and improve our services. We
                do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">
                Data retention and security
              </h2>
              <p>
                Enquiry records are stored securely and retained only as long as
                needed for business and legal purposes. Access is limited to
                authorised team members.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">Contact</h2>
              <p>
                For privacy questions, email us at{" "}
                <a
                  href="mailto:info@jptechnology.com"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  info@jptechnology.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          {"\u2190"} Back to home
        </Link>
      </div>
    </div>
  );
}
