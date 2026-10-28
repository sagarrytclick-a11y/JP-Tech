import Link from "next/link";
import type { Metadata } from "next";
import Logo from "@/components/site/Logo";

export const metadata: Metadata = {
  title: "Terms of Service | JP Technology",
  description: "Terms governing the use of the JP Technology website and services.",
};

export default function TermsPage() {
  return (
    <div className="shell py-10 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Logo />

        <div className="mt-10 rounded-[28px] border border-line bg-[#141414] p-6 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-white/50">Last updated: October 2026</p>

          <div className="mt-8 space-y-7 text-[15px] leading-[1.8] text-white/65">
            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">
                Use of this website
              </h2>
              <p>
                The content on this website is provided for general information
                about our services. You agree not to misuse the site, attempt
                unauthorised access, or submit false information through our
                forms.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">
                Proposals and engagements
              </h2>
              <p>
                Pricing and timelines shown on this site are indicative. Every
                project is governed by a separate written proposal and agreement
                that defines scope, deliverables, payment terms, and ownership.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">
                Intellectual property
              </h2>
              <p>
                All branding, copy, and design assets on this website belong to
                JP Technology Private Limited and may not be reproduced
                without permission.
              </p>
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold text-white">Contact</h2>
              <p>
                Questions about these terms can be sent to{" "}
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
