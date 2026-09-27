import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata = {
  title: "Field Goods — Coming Soon",
  description: "Future field goods and Lake Byron Retrievers merchandise.",
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
        <p className="reveal-delay-3" data-reveal>A small run of Lake Byron Retrievers hats, shirts and field goods is in the works.</p>
        <a className="button button-dark reveal-delay-4" data-reveal href="/">Back to the field</a>
        <span className="shopify-note">Future Shopify storefront placeholder</span>
      </section>
      <SiteFooter />
    </main>
  );
}
