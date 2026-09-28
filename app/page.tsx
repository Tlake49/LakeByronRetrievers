import Image from "next/image";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { sitePath } from "./sitePath";

export const metadata = {
  title: "Lake Byron Retrievers | Gun Dog Training in South Dakota",
  description: "Purpose-built retriever and gun dog training by Jackson Lake near Lake Byron and Huron, South Dakota.",
};
export const dynamic = "force-static";

const programs = [
  { no: "01", name: "Puppy Head Start", age: "3–7 months", note: "Confidence, birds, water, gunfire and first obedience.", href: "/training/#puppy-head-start" },
  { no: "02", name: "Gun Dog Training", age: "9 months+", note: "A practical foundation shaped around the hunt you want.", href: "/training/#gun-dog-training" },
  { no: "03", name: "Advanced Gun Dog", age: "1 year+", note: "Handling, blinds, doubles and steadiness for experienced dogs.", href: "/training/#advanced-gun-dog" },
  { no: "04", name: "Boarding", age: "All dogs", note: "Clean, secure accommodations with thoughtful daily airing.", href: "/training/#boarding" },
];

const facilityTicker = "Air-conditioned kennels · 5 × 5 runs · Room for up to 15 dogs · Elevated Kuranda beds · Fenced play spaces · Open bird-retrieving grounds · Purpose-built dog trailers · ";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="hero">
        <div className="hero-image" role="img" aria-label="A trained retriever holding a pheasant in tall South Dakota grass" style={{ backgroundImage: `url("${sitePath("/images/retriever-hold.jpg")}")` }} />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow reveal-delay-1" data-reveal>Lake Byron, South Dakota · Bird dog country</p>
          <div className="hero-copy-grid">
            <h1 className="hero-title">Raised, Trained,<br />and Ready for the Hunt.</h1>
            <div className="hero-support reveal-delay-3" data-reveal>
              <p className="lede">Practical, purpose-driven retriever training by hunting guide and dog trainer Jackson Lake.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={sitePath("/training/")}>View training programs</a>
                <a className="button button-ghost" href="tel:+16052210649">Call Jackson</a>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-stamp" aria-label="Capacity for up to 15 dogs"><strong>15</strong><span>DOG<br />CAPACITY</span></div>
      </section>

      <section className="facility-ticker" aria-label="Facility features">
        <div className="facility-ticker-track">
          <span>{facilityTicker}</span>
          <span aria-hidden="true">{facilityTicker}</span>
        </div>
      </section>

      <section className="section programs-section">
        <div className="section-heading">
          <p className="kicker">Programs / 2026</p>
          <h2>Every good dog starts somewhere.</h2>
          <p>Training is built around the dog in front of us and the hunter waiting at home—including puppy raising and starting from eight weeks.</p>
        </div>
        <div className="program-grid">
          {programs.map((program) => (
            <a className="program-card" href={sitePath(program.href)} key={program.name} aria-label={`View ${program.name} details`}>
              <span className="card-no">{program.no}</span>
              <p className="program-age">{program.age}</p>
              <h3>{program.name}</h3>
              <p>{program.note}</p>
              <span className="program-card-cta">See program details <span aria-hidden="true">→</span></span>
            </a>
          ))}
        </div>
      </section>

      <section className="feature-story">
        <div className="feature-image-wrap">
          <div className="feature-image" role="img" aria-label="Open water and prairie training grounds near Lake Byron" style={{ backgroundImage: `url("${sitePath("/images/facility/water-grounds.jpg")}")` }} />
          <span className="photo-caption">TRAINING GROUNDS / LAKE BYRON, SOUTH DAKOTA</span>
        </div>
        <div className="feature-copy">
          <p className="kicker">Room to work</p>
          <h2>Good habits need real ground.</h2>
          <p>Dogs train across large open grounds built for bird retrieving, with the space to run realistic marks, cover changes and hunting scenarios.</p>
          <ul className="check-list">
            <li>Capacity for up to 15 dogs at a time</li>
            <li>Air-conditioned kennels</li>
            <li>State-of-the-art dog trailers</li>
            <li>Secure, fenced-in play spaces</li>
            <li>Elevated, easy-to-sanitize Kuranda beds</li>
          </ul>
          <a className="text-link" href={sitePath("/about/")}>Tour the facility <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="lodge-band">
        <div className="lodge-logo"><Image src={sitePath("/images/lakes-lodge-logo.webp")} alt="Lake’s Lodge" width={140} height={140} /></div>
        <div>
          <p className="kicker">Born from the hunt</p>
          <h2>Connected to Lake’s Lodge.</h2>
          <p>Lake Byron Retrievers grows directly from the guiding tradition at Lake’s Lodge & Hunting Preserve. The same South Dakota cover, birds and practical field knowledge shape every training plan.</p>
        </div>
        <a className="button button-dark" href="https://www.lakeslodgesd.com" target="_blank" rel="noreferrer">Visit Lake’s Lodge</a>
      </section>

      <section className="section split-cta">
        <div>
          <p className="kicker">Start a conversation</p>
          <h2>Tell Jackson what you want from your dog.</h2>
        </div>
        <div className="contact-mini">
          <a href="tel:+16052210649">(605) 221-0649</a>
          <a href="mailto:info@lakeslodgesd.com">info@lakeslodgesd.com</a>
          <p>Lake Byron near Huron, South Dakota</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
