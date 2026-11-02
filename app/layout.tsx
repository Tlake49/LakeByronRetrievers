import type { Metadata } from "next";
import "./globals.css";
import { sitePath } from "./sitePath";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lakebyronretrievers.com";
const googleAnalyticsId = "G-L1GPVTVGTC";
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://lakebyronretrievers.com/#organization",
  name: "Lake Byron Retrievers",
  url: "https://lakebyronretrievers.com/",
  logo: "https://lakebyronretrievers.com/images/lbr-logo.png",
  description: "Retriever and hunting dog training near Lake Byron and Huron, South Dakota.",
  email: "info@lakebyronretrievers.com",
  telephone: "+1-605-221-0649",
  areaServed: { "@type": "Place", name: "South Dakota" },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Lake Byron Retrievers", template: "%s | Lake Byron Retrievers" },
  description: "Retriever training, gun dog development, and boarding near Lake Byron and Huron, South Dakota.",
  keywords: ["Labrador retriever training", "hunting dog training", "gun dog training", "bird dog training", "South Dakota", "Lake Byron", "Huron SD"],
  icons: { icon: sitePath("/images/lbr-logo.png") },
  openGraph: {
    type: "website",
    title: "Lake Byron Retrievers",
    description: "Raised, trained, and ready for the hunt.",
    images: [{ url: sitePath("/og.png"), width: 1200, height: 630, alt: "Lake Byron Retrievers — Raised, trained, and ready for the hunt" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lake Byron Retrievers",
    description: "Raised, trained, and ready for the hunt.",
    images: [sitePath("/og.png")],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
