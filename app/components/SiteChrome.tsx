"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { sitePath } from "../sitePath";

export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const moved = currentScrollY - lastScrollY.current;

      if (currentScrollY < 80) setHidden(false);
      else if (moved > 7) {
        setHidden(true);
        setMenuOpen(false);
      }
      else if (moved < -7) setHidden(false);

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], .section h2, .section-heading > p, .feature-copy > h2, .feature-copy > .kicker, .lodge-band h2, .lodge-band .kicker, .facility-copy h2, .facility-copy .kicker, .orange-cta h2, .orange-cta .kicker, .contact-prompt .kicker"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.documentElement.classList.add("motion-ready");
    items.forEach((item) => { item.dataset.reveal = "true"; });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-header${hidden ? " site-header-hidden" : ""}`} onFocusCapture={() => setHidden(false)}>
      <a className="brand" href={sitePath("/")} aria-label="Lake Byron Retrievers home">
        <Image src={sitePath("/images/lbr-logo.png")} alt="Lake Byron Retrievers" width={270} height={135} priority />
      </a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen((open) => !open)}>
        <span /><span /><span />
      </button>
      <nav id="site-navigation" className={menuOpen ? "nav-open" : ""} aria-label="Main navigation">
        <a href={sitePath("/")} onClick={() => setMenuOpen(false)}>Home</a>
        <a href={sitePath("/training/")} onClick={() => setMenuOpen(false)}>Training</a>
        <a href={sitePath("/about/")} onClick={() => setMenuOpen(false)}>About & Facility</a>
        <a href={sitePath("/contact/")} onClick={() => setMenuOpen(false)}>Contact</a>
        <a href={sitePath("/merch/")} onClick={() => setMenuOpen(false)}>Merch</a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Image src={sitePath("/images/lbr-logo.png")} alt="Lake Byron Retrievers" width={240} height={120} />
        <p>Purpose-built retrievers for South Dakota birds and beyond.</p>
      </div>
      <div className="footer-links">
        <p className="label">Navigate</p>
        <a href={sitePath("/training/")}>Training programs</a>
        <a href={sitePath("/about/")}>About & facility</a>
        <a href={sitePath("/contact/")}>Contact Jackson</a>
      </div>
      <div>
        <p className="label">Lake Byron, SD</p>
        <a href="tel:+16052210649">(605) 221-0649</a><br />
        <a href="mailto:info@lakeslodgesd.com">info@lakeslodgesd.com</a>
        <p className="fine-print">A sister business to Lake’s Lodge & Hunting Preserve.</p>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, copy, image, imageAlt }: { eyebrow: string; title: string; copy: string; image: string; imageAlt: string }) {
  return (
    <section className="page-hero">
      <Image src={sitePath(image)} alt={imageAlt} fill sizes="100vw" className="page-hero-image" priority />
      <div className="page-hero-shade" />
      <div className="page-hero-copy">
        <p className="eyebrow reveal-delay-1" data-reveal>{eyebrow}</p>
        <h1 className="reveal-delay-2" data-reveal>{title}</h1>
        <p className="reveal-delay-3" data-reveal>{copy}</p>
      </div>
    </section>
  );
}
