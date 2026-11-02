import { PageHero, SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata = {
  title: "Contact Jackson Lake About Retriever Training",
  description: "Ask Jackson Lake about Labrador puppy training, hunting dog programs, boarding, gun dogs for sale or legacy sire breeding inquiries near Huron, South Dakota.",
  alternates: { canonical: "/contact/" },
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
          <a className="big-contact" href="mailto:info@lakebyronretrievers.com">info@lakebyronretrievers.com</a>
          <p className="contact-note">Call or email to ask about program fit, timing, current capacity and boarding availability.</p>
          <a className="button button-primary contact-inquiry-button" href="mailto:info@lakebyronretrievers.com?subject=Training%20Inquiry">Start a training inquiry</a>
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
