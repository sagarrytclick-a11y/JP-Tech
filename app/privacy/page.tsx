import type { Metadata } from "next";
import LegalPage, {
  LegalLink,
  LegalList,
  LegalSectionBlock,
} from "@/components/legal/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | JP Technology",
  description:
    "How JP Technology collects, uses, stores, and protects the information you share through our website, enquiry forms, and project work.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  { id: "overview", title: "Overview" },
  { id: "information-we-collect", title: "Information we collect" },
  { id: "how-we-use-it", title: "How we use your information" },
  { id: "cookies", title: "Cookies and analytics" },
  { id: "sharing", title: "Sharing and third parties" },
  { id: "retention", title: "Retention and security" },
  { id: "your-rights", title: "Your rights and choices" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      summary="What we collect when you enquire, how we use it, and the choices you have. Written so you can actually read it."
      updated="October 2026"
      sections={sections}
      other={{ label: "Read our Terms", href: "/terms" }}
    >
      <LegalSectionBlock id="overview" title="Overview">
        <p>
          {site.legalName} (&ldquo;JP Technology&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;) builds websites, CRMs, mobile apps, SaaS products,
          and automation for businesses. This policy explains how we handle
          personal information collected through this website and during
          conversations that start here.
        </p>
        <p>
          We keep the policy short on purpose. If something is unclear, email{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            {site.email}
          </a>{" "}
          and we will explain it in plain language.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="information-we-collect"
        title="Information we collect"
      >
        <p>We collect information in three ways:</p>
        <p className="font-medium text-white/75">
          1. Information you give us directly
        </p>
        <LegalList
          items={[
            "Your name, email address, and phone number when you submit an enquiry, request a quote, or book a call.",
            "Company name, industry, budget range, and project description included in your enquiry.",
            "Messages you send by email, WhatsApp, or through a contact form.",
            "Documents you share during scoping, such as briefs, spreadsheets, or access instructions.",
          ]}
        />
        <p className="mt-4 font-medium text-white/75">
          2. Information collected automatically
        </p>
        <LegalList
          items={[
            "Basic technical data such as browser type, device category, approximate region, and pages viewed.",
            "Referring source, so we know which channel brought you to the site.",
            "Error and performance signals used to keep pages loading reliably.",
          ]}
        />
        <p className="mt-4 font-medium text-white/75">
          3. Information from project work
        </p>
        <p>
          When we work on a product, we may process data on your behalf as a
          processor — for example, test accounts or sample records needed to
          build and verify a feature. That data is governed by the project
          agreement, not by this public policy.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="how-we-use-it" title="How we use your information">
        <p>We use the information above to:</p>
        <LegalList
          items={[
            "Respond to your enquiry and understand what you are trying to build.",
            "Prepare a scope, estimate, proposal, or discovery call.",
            "Deliver and support a project you have engaged us for.",
            "Send occasional updates about our work, only if you asked for them.",
            "Keep the website secure, diagnose errors, and improve page performance.",
            "Meet accounting, tax, and legal obligations.",
          ]}
        />
        <p>
          We do not sell your personal information, and we do not use enquiry
          details to build advertising profiles.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="cookies" title="Cookies and analytics">
        <p>
          This site uses a small number of cookies and similar technologies. They
          fall into two groups:
        </p>
        <LegalList
          items={[
            "Essential cookies that keep the admin session secure and the site functioning. These cannot be switched off without breaking the site.",
            "Analytics that help us understand which pages are useful. Where an analytics tool is enabled, it is configured to avoid collecting sensitive details from forms.",
          ]}
        />
        <p>
          You can block or delete cookies in your browser at any time. Blocking
          essential cookies may prevent the admin area from working, but the
          public pages will still be readable.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="sharing" title="Sharing and third parties">
        <p>
          We share information only where it is needed to run the business or
          deliver a project:
        </p>
        <LegalList
          items={[
            "Infrastructure and email providers that host this site and deliver notifications.",
            "Payment and accounting providers, for invoicing and statutory records.",
            "Collaboration tools used by the team to plan and deliver work.",
            "Professional advisers, where required for legal or financial reasons.",
          ]}
        />
        <p>
          These providers only receive what they need to perform their function.
          We do not authorise them to use your information for their own
          marketing. We may also disclose information if the law requires it or
          to protect our legal rights.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="retention" title="Retention and security">
        <p>
          Enquiry records are kept while we are in conversation and for a
          reasonable period afterwards so we can pick the thread back up. Project
          records and invoices are retained for the period required by tax and
          company law.
        </p>
        <p>
          Access is limited to team members who need it. We use encrypted
          connections, role-based access, and standard hardening on the systems
          we control. No system is completely immune to failure, so we also keep
          backups and a documented recovery path for the products we host.
        </p>
        <p>
          If a security incident affects your information, we will notify you and
          the relevant authority where the law requires it.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="your-rights" title="Your rights and choices">
        <p>
          Depending on where you live, you may have the right to access, correct,
          delete, or restrict the use of your personal information, and to object
          to certain processing.
        </p>
        <p>
          To make a request, email{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            {site.email}
          </a>{" "}
          with enough detail for us to find your record. We aim to respond within
          30 days. If you have asked for marketing updates, every message
          includes a way to stop them, or you can ask us directly.
        </p>
        <p>
          You can also contact your local data protection authority if you believe
          we have handled your information incorrectly.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="changes" title="Changes to this policy">
        <p>
          We update this page when our tools or processes change. The date at the
          top always reflects the latest version. Material changes that affect how
          we use existing information will be communicated to active clients
          directly.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="contact" title="Contact">
        <p>
          For any privacy question, correction, or deletion request, write to{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            {site.email}
          </a>{" "}
          or call {site.phone}. Our registered entity is {site.legalName}.
        </p>
        <p>
          For the rules that govern use of this website, see our{" "}
          <LegalLink href="/terms">Terms of Service</LegalLink>.
        </p>
      </LegalSectionBlock>
    </LegalPage>
  );
}
