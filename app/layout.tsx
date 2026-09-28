import type { Metadata } from "next";
import "./globals.css";
import { InquiryModal } from "./components/InquiryModal";
import { sitePath } from "./sitePath";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Lake Byron Retrievers", template: "%s | Lake Byron Retrievers" },
  description: "Retriever training, gun dog development, and boarding near Lake Byron and Huron, South Dakota.",
  keywords: ["retriever training", "gun dog training", "bird dog training", "South Dakota", "Lake Byron", "Huron SD"],
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
  return <html lang="en"><body>{children}<InquiryModal /></body></html>;
}
