import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { siteConfig, defaultContact, isPlaceholderContact } from "@/lib/content/defaults";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}® — Creative Growth Agency`,
    template: `%s — ${siteConfig.name}®`,
  },
  description:
    "HOOKD is a creative growth agency helping ambitious brands in Egypt grow through strategic content production, performance-driven advertising creatives, organic content strategy, and creator management.",
  keywords: [
    "creative agency Egypt",
    "content production",
    "UGC agency",
    "performance creative",
    "social media content agency",
    "video production Egypt",
    "creator management",
  ],
  authors: [{ name: siteConfig.legalName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.name}®`,
    title: `${siteConfig.name}® — Built on Creativity. Driven by Growth.`,
    description:
      "A creative growth agency helping ambitious brands grow through strategic content, creative production, and performance-driven advertising.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${siteConfig.name}® — Creative Growth Agency` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name}® — Built on Creativity. Driven by Growth.`,
    description:
      "A creative growth agency helping ambitious brands grow through strategic content, creative production, and performance-driven advertising.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${siteConfig.name}® Creative Growth Agency`,
  description:
    "Creative growth agency offering content production, performance creatives, organic growth strategy, and UGC & creator management.",
  url: siteConfig.url,
  email: isPlaceholderContact(defaultContact) ? undefined : defaultContact.email,
  areaServed: siteConfig.market,
  address: { "@type": "PostalAddress", addressCountry: "EG" },
  sameAs: [],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
        <AnalyticsScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
