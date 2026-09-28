import Image from "next/image";
import { PageHero, SiteFooter, SiteHeader } from "../components/SiteChrome";
import { sitePath } from "../sitePath";

export const metadata = {
  title: "About Jackson & the Facility",
  description: "Meet Jackson Lake and explore the retriever training grounds, kennels and facilities near Lake Byron, South Dakota.",
};
export const dynamic = "force-static";

const features = [
  ["15", "dogs at a time", "A deliberately limited working capacity keeps the program personal and hands-on."],
  ["AC", "kennel comfort", "Air-conditioned indoor kennel space helps dogs rest and recover between sessions."],
  ["5×5", "stand-up runs", "Clean boarding runs with elevated Kuranda beds and secure airing space."],
  ["360°", "field experience", "Open ground, bird cover, water access and purpose-built dog trailers support realistic work."],
];

const facilityPhotos = [
  { src: "/images/facility/kennel-row.jpg", alt: "Rows of spacious indoor kennels at Lake Byron Retrievers", caption: "Air-conditioned indoor kennels", className: "facility-photo-wide" },
  { src: "/images/facility/kennel-exterior.jpg", alt: "Exterior entrance to the Lake Byron Retrievers kennel building", caption: "Purpose-built kennel facility" },
  { src: "/images/facility/kennel-aisle.jpg", alt: "Clean central aisle between indoor dog runs", caption: "Clean, secure runs" },
  { src: "/images/facility/wash-station.jpg", alt: "Indoor dog washing station", caption: "On-site wash station" },
  { src: "/images/facility/kennel-overview.jpg", alt: "Elevated overview of the kennel facility", caption: "Room for up to 15 dogs", className: "facility-photo-wide" },
  { src: "/images/facility/kennel-runs.jpg", alt: "Large individual indoor kennel runs", caption: "Space to rest and recover" },
  { src: "/images/facility/play-yard-entry.jpg", alt: "Fenced outdoor exercise yard overlooking open ground", caption: "Secure outdoor access" },
  { src: "/images/facility/play-yard.jpg", alt: "Large fenced play yard beside the kennel building", caption: "Fenced play spaces", className: "facility-photo-wide" },
  { src: "/images/facility/dog-trailer-dog.jpg", alt: "Young retriever standing in a ventilated dog trailer", caption: "Field-ready transport" },
  { src: "/images/facility/dog-trailer.jpg", alt: "State-of-the-art aluminum dog trailer", caption: "Purpose-built dog trailers" },
  { src: "/images/facility/open-grounds.jpg", alt: "Open South Dakota training grounds near Lake Byron", caption: "Open bird-retrieving ground" },
  { src: "/images/facility/water-grounds.jpg", alt: "Water and prairie cover used for retriever training", caption: "Water and varied cover", className: "facility-photo-wide" },
];

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow="Trainer / guide / dog man" title="About us & our facilities" copy="For Jackson Lake, retrievers are not a side interest. They are a profession, a passion and a daily way of life." image="/images/training-handoff.jpg" imageAlt="Jackson working with a young retriever in the field" />
      <section className="section about-jackson">
        <div>
          <p className="kicker">Meet Jackson Lake</p>
          <h2>A practical trainer shaped by real hunting.</h2>
        </div>
        <div className="story-copy">
          <p className="drop-cap">Jackson began training dogs at age 21 and has built his work around the hunting and retriever dogs he cares about most.</p>
          <p>As a hunting guide and dog trainer at Lake’s Lodge, he sees firsthand what separates a dog that knows drills from a dog that understands the field. That experience informs a patient, honest program grounded in clear standards and realistic expectations.</p>
          <p>Lake Byron Retrievers is a natural sister business to Lake’s Lodge & Hunting Preserve—connected by family, place and a shared belief that a good hunt begins long before opening day.</p>
          <a className="button button-dark lodge-explore" href="https://www.lakeslodgesd.com" target="_blank" rel="noreferrer">Explore Lake’s Lodge <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="facility-grid">
        <div className="facility-copy">
          <p className="kicker">The facility</p>
          <h2>Made to work.<br />Made to recover.</h2>
          <p>The grounds balance safe daily care with the space and equipment needed for serious bird-dog development.</p>
        </div>
        {features.map(([stat, title, body]) => (
          <article className="facility-card" key={title}><strong>{stat}</strong><h3>{title}</h3><p>{body}</p></article>
        ))}
      </section>

      <section className="facility-gallery" aria-label="Lake Byron Retrievers facility gallery">
        {facilityPhotos.map(({ src, alt, caption, className = "" }) => (
          <figure className={`facility-photo ${className}`} key={src}>
            <Image src={sitePath(src)} alt={alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw" />
            <figcaption>{caption}</figcaption>
          </figure>
        ))}
      </section>

      <section className="section faq">
        <div><p className="kicker">Good to know</p><h2>Facility notes</h2></div>
        <div className="faq-list">
          <details><summary>How many dogs can the facility accommodate?</summary><p>Up to 15 dogs at a time, allowing Jackson to keep training and daily care hands-on.</p></details>
          <details><summary>What are the kennels like?</summary><p>Dogs have clean, air-conditioned kennel space, 5 × 5 stand-up runs and secure airing areas. Elevated Kuranda beds are durable, comfortable and easy to sanitize, helping each dog rest off the kennel floor between training sessions.</p></details>
          <details><summary>Where does field training happen?</summary><p>On large open grounds around Lake Byron, with varied prairie cover suited to bird-retrieving work and realistic hunting scenarios.</p></details>
        </div>
      </section>
      <section className="orange-cta"><div><p className="kicker">Come see the ground</p><h2>Start with a conversation.</h2></div><a className="button button-dark" href={sitePath("/contact/")}>Contact Jackson</a></section>
      <SiteFooter />
    </main>
  );
}
