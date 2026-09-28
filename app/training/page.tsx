import { PageHero, SiteFooter, SiteHeader } from "../components/SiteChrome";
import { sitePath } from "../sitePath";

export const metadata = {
  title: "Training Programs",
  description: "Puppy raising from eight weeks, Puppy Head Start, Gun Dog, Advanced Gun Dog and boarding programs at Lake Byron Retrievers.",
};
export const dynamic = "force-static";

const programs = [
  {
    id: "puppy-head-start",
    number: "01",
    title: "Puppy Head Start",
    age: "For dogs 3–7 months",
    duration: "Typical program: 6–8 weeks",
    intro: "An intentional first step that builds confidence, curiosity and the habits a young retriever will need later.",
    items: ["Crate training", "Introduction to water (weather dependent)", "Introduction to dead and live birds", "Conditioning to gunfire", "Introduction to quartering and using the nose", "Puppy singles off white coats", "Intro obedience: here, heel, sit, kennel and place"],
  },
  {
    id: "gun-dog-training",
    number: "02",
    title: "Gun Dog Training",
    age: "For dogs 9 months+ after puppy class",
    duration: "Typical program: 3–6 months",
    intro: "The complete working foundation, tailored to the dog and the kind of hunting its owner expects to do.",
    items: ["Obedience", "Collar conditioning", "Hold conditioning", "Force fetch", "Singles off multiple guns", "Customizable upland, waterfowl or combination hunting scenarios"],
  },
  {
    id: "advanced-gun-dog",
    number: "03",
    title: "Advanced Gun Dog",
    age: "For dogs 1 year+ after Gun Dog Training",
    duration: "Typical program: 6+ months",
    intro: "For owners who want a steadier, more capable dog that can handle technical work on land and water.",
    items: ["Pile work", "Double-T", "Swim-by", "Steadying for marks", "Pattern blinds", "Long water singles", "Land doubles", "Simple water doubles"],
  },
  {
    id: "boarding",
    number: "04",
    title: "Boarding",
    age: "Clean, secure stays",
    duration: "Availability by request",
    intro: "Thoughtful accommodations for dogs that need a safe home base near Lake Byron.",
    items: ["5 × 5 stand-up kennel", "Kuranda dog bed", "Secure, clean airing yard", "Dogs aired based on sex, age and owner preference", "Air-conditioned kennel space"],
  },
];

export default function TrainingPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow="Four ways to start" title="Training programs" copy="Straightforward programs, honest expectations and real field work—built around your dog’s age, experience and job." image="/images/training-bird.jpg" imageAlt="Retriever accepting a pheasant during field training" />
      <section className="section puppy-raising">
        <div>
          <p className="kicker">Starting from eight weeks</p>
          <h2>Puppy raising &amp; starting</h2>
        </div>
        <div>
          <p>For owners who want a hunting or competition dog but do not want to manage every stage of early puppy development, Jackson can begin the process from eight weeks old.</p>
          <p>This is distinct from Puppy Head Start: it is a more complete raising-and-starting path focused on building the daily habits, confidence, exposure and foundation a young working dog needs before formal gun-dog training.</p>
          <a className="button button-dark" href="mailto:info@lakeslodgesd.com?subject=Lake%20Byron%20Retrievers%20Inquiry%3A%20Puppy%20Raising%20%26%20Starting">Inquire about puppy raising</a>
        </div>
      </section>
      <section className="section training-list">
        {programs.map((program) => (
          <article className="training-program" id={program.id} key={program.title}>
            <div className="program-index">{program.number}</div>
            <div className="program-title-block">
              <p className="kicker">{program.age}</p>
              <h2>{program.title}</h2>
              <p className="program-duration">{program.duration}</p>
              <p>{program.intro}</p>
              <a className="button button-dark program-inquire" href={`mailto:info@lakeslodgesd.com?subject=${encodeURIComponent(`Lake Byron Retrievers Inquiry: ${program.title}`)}`}>Inquire about {program.title}</a>
            </div>
            <ul>
              {program.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </section>
      <section className="contact-prompt program-email-notes">
        <div>
          <p className="kicker">What to include in your email</p>
          <h2>Help Jackson understand your dog.</h2>
        </div>
        <div className="prompt-grid"><span>01 / Dog’s age &amp; breed</span><span>02 / Prior training</span><span>03 / Hunting or competition goals</span><span>04 / Preferred timing</span></div>
      </section>
      <section className="orange-cta">
        <div><p className="kicker">Every dog is different</p><h2>Let’s find the right starting point.</h2></div>
        <a className="button button-dark" href={sitePath("/contact/")}>Ask about availability</a>
      </section>
      <SiteFooter />
    </main>
  );
}
