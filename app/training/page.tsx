import { PageHero, SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata = {
  title: "Labrador Puppy & Gun Dog Training in South Dakota",
  description: "Explore Labrador puppy raising from eight weeks, Puppy Head Start, gun dog and advanced hunting dog training, plus boarding near Huron, South Dakota.",
  alternates: { canonical: "/training/" },
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
          <p>Housebreaking is part of Puppy Raising &amp; Starting, alongside daily routines and early field exposure. It is not a separate component of Puppy Head Start.</p>
          <a className="button button-dark" href="mailto:info@lakebyronretrievers.com?subject=Puppy%20Raising%20%26%20Starting%20Inquiry">Inquire about puppy raising</a>
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
              <a className="button button-dark program-inquire" href={`mailto:info@lakebyronretrievers.com?subject=${encodeURIComponent(`${program.title} Inquiry`)}`}>Inquire about {program.title}</a>
            </div>
            <ul>
              {program.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </section>
      <section className="section gun-dogs-sale">
        <div>
          <p className="kicker">Built for the hunt</p>
          <h2>Gun dogs for sale.</h2>
        </div>
        <div className="story-copy">
          <p>Looking for a dog that is further along? Ask Jackson about available gun dogs and the training, pedigree and titles behind each one.</p>
          <p>Pricing starts at $4,500 and varies with pedigree, training and titles. Availability and the final price are confirmed for each dog.</p>
          <p>By request, we can develop a dog for your hunting goals—upland, waterfowl, a combination of both, or guide work.</p>
          <a className="button button-dark" href="mailto:info@lakebyronretrievers.com?subject=Gun%20Dogs%20for%20Sale%20Inquiry">Ask about available dogs</a>
        </div>
      </section>
      <section className="section faq training-faq">
        <div><p className="kicker">Training questions</p><h2>Finding the right start.</h2></div>
        <div className="faq-list">
          <details><summary>When can a Labrador puppy begin training?</summary><p>Puppy Raising &amp; Starting can begin at eight weeks. Puppy Head Start is designed for dogs three to seven months old. Jackson can help you choose a path based on your dog’s age and experience.</p></details>
          <details><summary>What is the difference between puppy raising and Puppy Head Start?</summary><p>Puppy Raising &amp; Starting covers daily routines, housebreaking and early field exposure. Puppy Head Start is a shorter introductory program focused on confidence, birds, water, gunfire conditioning and first obedience.</p></details>
          <details><summary>Can training be tailored to upland or waterfowl hunting?</summary><p>Yes. Gun Dog Training can be shaped around upland, waterfowl or combination hunting goals. Tell Jackson how you plan to hunt and what work your dog has already done.</p></details>
          <details><summary>Do you have trained gun dogs for sale?</summary><p>Availability changes. Ask Jackson about current dogs, their training, pedigree and titles. Pricing starts at $4,500 and is confirmed for each dog.</p></details>
        </div>
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
        <a className="button button-dark" href="mailto:info@lakebyronretrievers.com?subject=Training%20Availability%20Inquiry">Ask about availability</a>
      </section>
      <SiteFooter />
    </main>
  );
}
