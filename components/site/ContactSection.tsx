import ContactForm from "@/components/site/ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="shell py-12 lg:py-16">
      <div className="text-center">
        <span className="section-badge">Contact Us</span>
        <h2 className="section-heading mt-5 text-balance">
          Get <span className="text-accent">In Touch</span>
        </h2>
        <p className="section-copy mt-3">
          Let&apos;s discuss your project. Share your details, and we&apos;ll
          book a call at your preferred time.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-[800px] rounded-[24px] border border-line bg-[#191919] p-4 sm:mt-10 sm:rounded-[28px] sm:p-7 lg:p-8">
        <ContactForm />
      </div>
    </section>
  );
}
