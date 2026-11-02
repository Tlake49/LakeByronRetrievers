import Image from "next/image";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { sitePath } from "../sitePath";

export const metadata = {
  title: "Upcoming Labrador Litter: Brooks × Pete",
  description: "Meet the planned Brooks × Pete Labrador retriever litter at Lake Byron Retrievers in South Dakota. Explore the parents, health information and pedigrees, then inquire by phone or email.",
  alternates: { canonical: "/litters/" },
};
export const dynamic = "force-static";

const email = "info@lakebyronretrievers.com";
const subject = encodeURIComponent("Brooks × Pete Upcoming Litter Inquiry");
const body = encodeURIComponent("Hello Lake Byron Retrievers,\n\nI would like to learn more about the upcoming Brooks × Pete litter.\n\nMy name:\nPhone number:\nLocation:\nWhat I hope to do with my dog:\nQuestions:\n");

const parents = [
  {
    role: "Sire / 01",
    callName: "Pete",
    name: "Star Lab’s Calif Pannin’ Pete",
    image: "/images/sires/pete.jpeg",
    alt: "Pete, a yellow Labrador retriever, sitting in tall green grass",
    imageClass: "litter-parent-pete",
    clearances: ["OFA hips · Good", "OFA elbows · Normal", "CERF eye exam · Tested"],
    pedigree: ["FC AFC Black Gold’s Kate’s Rascal", "Westwind’s Flash of Joy"],
  },
  {
    role: "Dam / 02",
    callName: "Brooks",
    name: "HR Bohamidi’s Bird Mouth Brooks",
    image: "/images/litters/brooks.webp",
    alt: "Brooks, a yellow Labrador retriever, sitting outdoors with hunting retriever ribbons",
    imageClass: "litter-parent-brooks",
    clearances: ["OFA hips · Excellent", "OFA elbows · Normal", "OFA evaluations · October 2026"],
    pedigree: ["CPR SHR FSR Dakota’s One Shot One Kill", "RGD Rushmore’s Gonna Rock You DJ"],
  },
];

export default function LittersPage() {
  return (
    <main className="litters-page">
      <SiteHeader />
      <section className="litter-hero" aria-labelledby="litter-title">
        <div className="litter-hero-photo" role="img" aria-label="Yellow retriever carrying a pheasant through South Dakota field grass" style={{ backgroundImage: `url('${sitePath("/images/litters/field-retrieve.webp")}')` }} />
        <div className="litter-hero-wash" />
        <div className="litter-hero-content">
          <p className="eyebrow" data-reveal>Lake Byron Retrievers / Upcoming litter</p>
          <h1 id="litter-title" data-reveal>Born for<br /><em>the field.</em></h1>
          <p className="litter-hero-lede" data-reveal>Meet the planned pairing of <strong>Brooks × Pete</strong>—two yellow Labradors with field-minded pedigrees and documented health information.</p>
          <a className="litter-down-link" href="#the-pair" data-reveal>Meet the pair <span aria-hidden="true">↓</span></a>
        </div>
        <div className="litter-hero-side" aria-hidden="true">01 / A NEW GENERATION</div>
      </section>

      <div className="litter-ribbon" aria-label="Upcoming Brooks and Pete litter">
        <div className="litter-ribbon-track" aria-hidden="true">
          <span>Brooks × Pete <b>✳</b> Yellow Labradors <b>✳</b> Built for the field <b>✳</b>&nbsp;</span>
          <span>Brooks × Pete <b>✳</b> Yellow Labradors <b>✳</b> Built for the field <b>✳</b>&nbsp;</span>
        </div>
      </div>

      <section className="litter-intro section" id="the-pair">
        <div data-reveal><p className="kicker">The pairing</p><h2>Two lines.<br />One next chapter.</h2></div>
        <div className="litter-intro-copy" data-reveal>
          <p>This upcoming litter brings together Pete and Brooks. Explore each parent below, including the health information and immediate pedigree shown on the pairing announcement.</p>
          <p>Interested in learning more? Contact Jackson to ask about plans, timing and whether this pairing is right for the kind of dog you hope to raise and train.</p>
        </div>
      </section>

      <section className="litter-parents" aria-label="Meet the parents">
        {parents.map((parent, index) => (
          <article className={`litter-parent ${index === 1 ? "litter-parent-reverse" : ""}`} key={parent.callName}>
            <div className={`litter-parent-image ${parent.imageClass}`} data-reveal>
              <Image src={sitePath(parent.image)} alt={parent.alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
              <span className="litter-image-tag">{parent.role}</span>
            </div>
            <div className="litter-parent-info" data-reveal>
              <p className="kicker">{parent.role}</p>
              <h2>{parent.callName}<span className="litter-name-mark" aria-hidden="true">↗</span></h2>
              <p className="litter-registered">{parent.name}</p>
              <div className="litter-stat-list">
                {parent.clearances.map((clearance) => <p key={clearance}>{clearance}</p>)}
              </div>
              <details className="litter-pedigree">
                <summary>View immediate pedigree <span aria-hidden="true">+</span></summary>
                <div><p>By {parent.pedigree[0]}</p><p>Out of {parent.pedigree[1]}</p></div>
              </details>
            </div>
          </article>
        ))}
      </section>

      <section className="litter-future section">
        <p className="kicker" data-reveal>Next chapter / South Dakota</p>
        <h2 data-reveal>Good dogs have<br /><em>good beginnings.</em></h2>
        <div className="litter-future-bottom" data-reveal>
          <p>The announcement introduces the planned pairing; details about timing and next steps are best discussed directly. We’d love to hear what you hope to do with your future retriever.</p>
          <span aria-hidden="true">B × P</span>
        </div>
      </section>

      <section className="litter-contact" aria-labelledby="litter-contact-title">
        <div data-reveal><p className="kicker">Start a conversation</p><h2 id="litter-contact-title">Ask about<br />Brooks × Pete.</h2></div>
        <div className="litter-contact-actions" data-reveal>
          <p>Tell us a little about yourself, your hunting or training goals, and what you’d like to know about the upcoming litter.</p>
          <a className="button button-dark" href={`mailto:${email}?subject=${subject}&body=${body}`}>Inquire by email <span aria-hidden="true">↗</span></a>
          <a className="litter-phone" href="tel:+16052210649">Or call (605) 221-0649 <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
