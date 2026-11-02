import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { sitePath } from "../sitePath";

export const metadata = {
  title: "Field Goods — Coming Soon",
  description: "Future field goods and Lake Byron Retrievers merchandise.",
  robots: { index: false, follow: true },
};
export const dynamic = "force-static";

export default function MerchPage() {
  return (
    <main>
      <SiteHeader />
      <section className="merch-hero">
        <div className="merch-tag reveal-delay-1" data-reveal>FIELD GOODS / COMING SOON</div>
        <div className="merch-type">LBR</div>
        <h1 className="reveal-delay-2" data-reveal>Gear for<br />dog people.</h1>
        <p className="reveal-delay-3" data-reveal>Lake Byron Retrievers T-shirts, hoodies and hats are being planned. Ordering details will appear here once the collection is ready.</p>
        <a className="button button-dark reveal-delay-4" data-reveal href={sitePath("/")}>Back to the field</a>
        <span className="shopify-note">Store opening later</span>
      </section>
      <SiteFooter />
    </main>
  );
}
