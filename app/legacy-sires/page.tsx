import Image from "next/image";
import { PageHero, SiteFooter, SiteHeader } from "../components/SiteChrome";
import { sitePath } from "../sitePath";

export const metadata = {
  title: "Legacy Sires",
  description: "Explore the Lake Byron Retrievers legacy sire collection and inquire about frozen semen availability for your breeding program.",
};
export const dynamic = "force-static";

type Sire = {
  name: string;
  image?: string;
  alt?: string;
  identity: Array<[string, string]>;
  record: Array<[string, string]>;
  health: string[];
  note: string;
};

const sires: Sire[] = [
  {
    name: "FC AFC Abby’s Physician Of Antioch NDC QA2",
    image: "/images/sires/luke.jpg",
    alt: "FC AFC Abby’s Physician Of Antioch NDC QA2 sitting beside water",
    identity: [["Call name", "Luke"], ["Gender", "Male"], ["Color", "BLK"], ["Whelp date", "2/22/2013"], ["Owner", "Dan Hurst"], ["Breeder", "Dan Hurst"]],
    record: [["AKC registration", "SR76971107"], ["FT champion points", "77"], ["Derby points", "98"]],
    health: ["OFA hips: LR-213279G24M-VPI (Good)", "Eye CERF/CAER: LR-EYE4560/17M-VPI (Normal)", "OFA elbow: LR-EL66731M24-VPI (Normal)", "CNM: Clear", "EIC: Clear"],
    note: "A proven black-field pedigree preserved for breeders looking to carry forward a serious retriever program.",
  },
  {
    name: "2008 NFC FC Two Rivers Lucky Willie",
    image: "/images/sires/willie.jpg",
    alt: "2008 NFC FC Two Rivers Lucky Willie in a field",
    identity: [["Call name", "Willie"], ["Gender", "Male"], ["Color", "BLK"], ["Coat genotype", "Black — no hidden color — EEBB"], ["Whelp date", "5/27/2003"], ["Date of death", "2012"], ["Owner", "Brady Oman"], ["Breeder", "John Broucek & Bob Jones"]],
    record: [["AKC registration", "SR08371202"], ["FT champion points", "61"]],
    health: ["OFA hips: LR-153051E25M-PI (Excellent)", "Eye CERF/CAER: LR-43078 (Normal)", "OFA elbow: LR-EL27583M25-PI (Normal)", "CNM: LR-CNM05-028-M-PI", "EIC: Clear (per owner)", "Thyroid: LR-TH189/25M-PI (Normal)"],
    note: "A 2008 National Field Champion and Field Champion whose legacy carries deep retriever field-trial influence.",
  },
  {
    name: "FC AFC Painter’s Major Motion",
    identity: [["Gender", "Male"], ["Color", "BLK"], ["Whelp date", "10/24/1987"]],
    record: [["AKC registration", "SF083476"]],
    health: ["OFA hips: LR-65384G93M (Good)"],
    note: "A foundational field-trial name available in the Lake Byron legacy collection. Historical portrait coming soon.",
  },
  {
    name: "FC Hawkeye’s Red, White And Blue",
    image: "/images/sires/banner.webp",
    alt: "FC Hawkeye’s Red, White And Blue sitting in prairie cover",
    identity: [["Call name", "Banner"], ["Gender", "Male"], ["Color", "BLK"], ["Coat genotype", "Black — hidden yellow — EeBB"], ["Whelp date", "3/2/2003"], ["Owner", "Marion B. Stroud Swingle"]],
    record: [["AKC registration", "SR07493702"]],
    health: ["OFA hips: LR-150581G24M-NOPI"],
    note: "A black retriever with a distinctive pedigree and preserved frozen semen for the right breeding program.",
  },
  {
    name: "FC Pike of Castlebay",
    image: "/images/sires/pike.jpg",
    alt: "FC Pike of Castlebay sitting in a field",
    identity: [["Call name", "Pike"], ["Gender", "Male"], ["Color", "BLK"], ["Coat genotype", "Black — no hidden color — EEBB"], ["Whelp date", "11/12/1999"], ["Owner", "Marion B. Stroud Swingle"]],
    record: [["AKC registration", "SN69350603"], ["FT champion points", "86"], ["Derby points", "41"]],
    health: ["OFA hips: LR-146199G58M-NOPI (Good)", "Eye CERF/CAER: LR-30985 (Normal)", "OFA elbows: LR-EL24443M58-NOPI (Normal)", "DNA: V186013"],
    note: "A field champion option for breeders seeking performance depth, black coat genetics and a documented record.",
  },
  {
    name: "Star Lab’s Calif Pannin’ Pete",
    image: "/images/sires/pete.jpeg",
    alt: "Star Lab’s Calif Pannin’ Pete sitting in tall grass",
    identity: [["Call name", "Pete"], ["Gender", "Male"], ["Color", "YLW"], ["Coat genotype", "Yellow — hidden black and chocolate — eeBb"], ["Whelp date", "1/21/1993"], ["Owner", "Stanwood L. & Carolyn A. Krycinski"], ["Breeder", "Albert Uhalde"]],
    record: [["AKC registration", "SN04329411"]],
    health: ["OFA hips: LR-61515G24M", "Eye CERF/CAER: LR-8923/1999-13 (Clear)", "OFA elbows: LR-EL2016M24 (Normal)", "Other health certifications: CHIC 3921"],
    note: "A yellow retriever with versatile color genetics and an established health-record foundation.",
  },
];

function SirePhoto({ sire }: { sire: Sire }) {
  if (!sire.image) {
    return <div className="sire-no-photo" role="img" aria-label={`Historical portrait of ${sire.name} not available`}><span>Legacy archive</span><strong>Portrait<br />coming soon</strong></div>;
  }

  return <div className="sire-photo"><Image src={sitePath(sire.image)} alt={sire.alt ?? sire.name} fill sizes="(max-width: 860px) 100vw, 43vw" /></div>;
}

export default function LegacySiresPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero eyebrow="Frozen semen collection" title="Legacy sires" copy="Preserving proven retriever bloodlines for the next generation of field dogs." image="/images/sires/willie.jpg" imageAlt="2008 NFC FC Two Rivers Lucky Willie in a field" />

      <section className="section legacy-intro">
        <div><p className="kicker">Built to carry forward</p><h2>Proven blood, preserved.</h2></div>
        <div className="story-copy">
          <p>Lake Byron Retrievers maintains a select frozen-semen collection from influential retrievers of past generations. Each pairing deserves thoughtful consideration—pedigree, health history, goals and fit all matter.</p>
          <p>If you are interested in using a legacy sire, call Jackson or send an email with your female’s registered name, pedigree, health clearances, breeding goals and anticipated timing. We will confirm current availability and discuss whether the match makes sense.</p>
          <div className="legacy-contact"><a href="tel:+16052210649">(605) 221-0649</a><a href="mailto:info@lakeslodgesd.com?subject=Legacy%20Sire%20Breeding%20Inquiry">info@lakeslodgesd.com</a></div>
        </div>
      </section>

      <section className="legacy-list" aria-label="Legacy sire collection">
        {sires.map((sire, index) => (
          <article className={`sire-profile ${index % 2 ? "sire-profile-reverse" : ""}`} key={sire.name}>
            <SirePhoto sire={sire} />
            <div className="sire-copy">
              <p className="kicker">Legacy sire {String(index + 1).padStart(2, "0")}</p>
              <h2>{sire.name}</h2>
              <p className="sire-note">{sire.note}</p>
              <dl className="sire-details">
                {sire.identity.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
                {sire.record.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
              </dl>
              <div className="sire-health"><p className="label">Recorded health information</p><ul>{sire.health.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <a className="button sire-inquire" href={`mailto:info@lakeslodgesd.com?subject=${encodeURIComponent(`Legacy Sire Inquiry: ${sire.name}`)}`}>Inquire about this sire</a>
            </div>
          </article>
        ))}
      </section>

      <section className="orange-cta legacy-cta"><div><p className="kicker">Breeding inquiry</p><h2>Let’s talk through the right match.</h2></div><a className="button button-dark" href={sitePath("/contact/")}>Contact Jackson</a></section>
      <SiteFooter />
    </main>
  );
}
