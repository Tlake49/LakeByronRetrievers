import { PageHero, SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata = {
  title: "Contact",
  description: "Contact Jackson Lake about retriever training and boarding near Lake Byron, South Dakota.",
};
export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow="Let’s talk dogs" title="Contact Jackson" copy="Tell us about your dog, your hunting style and what you want to accomplish. We’ll talk through the right next step." image="/images/field-retrieve.jpg" imageAlt="Retriever working through open grass near Lake Byron" />
      <section className="section contact-layout">
        <div className="contact-primary">
          <p className="kicker">Direct contact</p>
          <a className="big-contact" href="tel:+16052210649">(605) 221-0649</a>
          <a className="big-contact" href="mailto:info@lakeslodgesd.com">info@lakeslodgesd.com</a>
          <p className="contact-note">Call or email to ask about program fit, timing, current capacity and boarding availability.</p>
        </div>
        <aside className="contact-card">
          <p className="label">Training location</p>
          <h2>Lake Byron<br />near Huron, South Dakota</h2>
          <p>Lake Byron Retrievers shares its location and hunting-country roots with Lake’s Lodge & Hunting Preserve.</p>
          <a className="text-link" href="https://www.lakeslodgesd.com/contact/" target="_blank" rel="noreferrer">Lake’s Lodge location details <span aria-hidden="true">→</span></a>
        </aside>
      </section>
      <section className="contact-prompt">
        <p className="kicker">Helpful details to include</p>
        <div className="prompt-grid"><span>01 / Dog’s age & breed</span><span>02 / Prior training</span><span>03 / Your hunting style</span><span>04 / Your goals & timeline</span></div>
      </section>
      <SiteFooter />
    </main>
  );
}
