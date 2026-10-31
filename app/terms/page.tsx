import type { Metadata } from "next";
import LegalPage, {
  LegalLink,
  LegalList,
  LegalSectionBlock,
} from "@/components/legal/LegalPage";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern use of the JP Technology website, proposals, project engagements, ownership of work, and payment.",
  path: "/terms",
});

const sections = [
  { id: "acceptance", title: "Acceptance of these terms" },
  { id: "use-of-site", title: "Use of this website" },
  { id: "services", title: "Services and proposals" },
  { id: "pricing", title: "Pricing and payment" },
  { id: "client-responsibilities", title: "Client responsibilities" },
  { id: "intellectual-property", title: "Intellectual property" },
  { id: "confidentiality", title: "Confidentiality" },
  { id: "third-party", title: "Third-party services" },
  { id: "liability", title: "Limitation of liability" },
  { id: "termination", title: "Suspension and termination" },
  { id: "law", title: "Governing law" },
  { id: "changes", title: "Changes to these terms" },
  { id: "contact", title: "Contact" },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      summary="The ground rules for using this website and working with us — scope, payment, ownership, and what happens if something goes wrong."
      updated="October 2026"
      path="/terms"
      sections={sections}
      other={{ label: "Read our Privacy Policy", href: "/privacy" }}
    >
      <LegalSectionBlock id="acceptance" title="Acceptance of these terms">
        <p>
          By using this website or engaging {site.legalName} (&ldquo;JP
          Technology&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), you agree to
          these terms. If you do not agree, please stop using the site.
        </p>
        <p>
          If you are agreeing on behalf of a company, you confirm that you have
          authority to do so. Where a signed proposal or master agreement exists,
          that document takes priority over these website terms.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="use-of-site" title="Use of this website">
        <p>You agree not to:</p>
        <LegalList
          items={[
            "Attempt to gain unauthorised access to the site, admin area, or any connected system.",
            "Submit false, misleading, or third-party information through our forms.",
            "Scrape, copy, or republish substantial parts of the site without permission.",
            "Use the site to distribute malware, spam, or unlawful content.",
            "Interfere with the availability or performance of the site for others.",
          ]}
        />
        <p>
          We may suspend access where we reasonably believe these rules have been
          broken.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="services" title="Services and proposals">
        <p>
          We provide design, engineering, and support services for websites,
          custom CRMs and dashboards, educational platforms, mobile apps, SaaS
          products, and automation.
        </p>
        <p>
          Every engagement starts with a written proposal that describes scope,
          deliverables, assumptions, milestones, timeline, and payment schedule.
          Anything not listed in that proposal is out of scope and will be
          estimated separately before work begins.
        </p>
        <p>
          Timelines depend on timely feedback and access from your side. If
          approvals or content are delayed, the schedule shifts accordingly.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="pricing" title="Pricing and payment">
        <p>
          Prices shown on the pricing page are indicative starting points in INR,
          exclusive of applicable taxes. A final figure is confirmed in the
          proposal for your specific scope.
        </p>
        <LegalList
          items={[
            "Projects are typically split into milestone payments, with an advance before work starts.",
            "Invoices are due within the period stated on the invoice.",
            "Ongoing care plans and retainers are billed monthly in advance.",
            "Third-party costs — domains, hosting, paid APIs, app store fees, licences — are billed at actuals unless included in the proposal.",
          ]}
        />
        <p>
          Work may be paused on overdue accounts. We will always tell you before
          pausing anything, and we will not hold your existing code or data
          hostage over a disputed line item.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock
        id="client-responsibilities"
        title="Client responsibilities"
      >
        <p>To keep a project moving, you agree to:</p>
        <LegalList
          items={[
            "Nominate a decision-maker who can approve scope, design, and releases.",
            "Provide content, brand assets, and access credentials when requested.",
            "Respond to review requests within the agreed review window.",
            "Ensure any data or material you supply can lawfully be used in the project.",
            "Keep your own accounts, domains, and third-party subscriptions in good standing.",
          ]}
        />
      </LegalSectionBlock>

      <LegalSectionBlock id="intellectual-property" title="Intellectual property">
        <p>
          On full payment, you own the custom deliverables created for your
          project: the application code, design files, and documentation specific
          to your engagement.
        </p>
        <p>
          We retain ownership of our pre-existing tools, internal libraries,
          reusable components, and general know-how, and grant you a perpetual,
          non-exclusive licence to use them as part of the delivered product.
        </p>
        <p>
          Open-source packages remain governed by their own licences. Unless
          agreed otherwise, we may reference the project name and a short
          description in our portfolio.
        </p>
        <p>
          All branding, copy, and design assets on this website belong to{" "}
          {site.legalName} and may not be reproduced without permission.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="confidentiality" title="Confidentiality">
        <p>
          Each side may receive information that is not public — business plans,
          customer data, credentials, pricing, or technical designs. Both sides
          agree to use that information only for the project, protect it with
          reasonable care, and not disclose it to third parties without
          permission.
        </p>
        <p>
          These obligations do not apply to information that is already public,
          independently developed, or required to be disclosed by law. They
          survive the end of the engagement.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="third-party" title="Third-party services">
        <p>
          Projects often rely on services we do not control, such as payment
          gateways, cloud hosting, messaging APIs, email providers, and app
          stores. We integrate them in good faith, but their availability,
          pricing, and policy changes are outside our control.
        </p>
        <p>
          Where a third-party outage affects your product, we will help
          investigate and communicate status, but we are not liable for the
          third party&apos;s failure.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="liability" title="Limitation of liability">
        <p>
          We deliver work with reasonable skill and care. To the extent permitted
          by law, our total liability for any claim arising from an engagement is
          limited to the fees paid to us for the specific service giving rise to
          the claim.
        </p>
        <p>
          We are not liable for indirect or consequential losses, including lost
          profits, lost revenue, or loss of data, where those losses were not
          reasonably foreseeable. Nothing in these terms excludes liability that
          cannot legally be excluded.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="termination" title="Suspension and termination">
        <p>
          Either side may end an engagement with written notice as set out in the
          proposal. On termination, you pay for work completed and approved up to
          that date, and we hand over the deliverables produced so far once
          outstanding invoices are settled.
        </p>
        <p>
          We may suspend or terminate access to this website immediately if these
          terms are breached in a way that risks our systems, our team, or other
          users.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="law" title="Governing law">
        <p>
          These terms are governed by the laws of India. Disputes will first be
          raised with us in writing so both sides can attempt an amicable
          resolution. If that fails, the courts at our registered office location
          will have jurisdiction, unless a signed agreement specifies otherwise.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="changes" title="Changes to these terms">
        <p>
          We may update these terms as our services evolve. The date at the top
          shows the current version. Continued use of the site after an update
          means you accept the revised terms. Active engagements remain governed
          by the agreement signed for that project.
        </p>
      </LegalSectionBlock>

      <LegalSectionBlock id="contact" title="Contact">
        <p>
          Questions about these terms can be sent to{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            {site.email}
          </a>{" "}
          or {site.phone}. Our registered entity is {site.legalName}.
        </p>
        <p>
          For how we handle personal information, see our{" "}
          <LegalLink href="/privacy">Privacy Policy</LegalLink>.
        </p>
      </LegalSectionBlock>
    </LegalPage>
  );
}
