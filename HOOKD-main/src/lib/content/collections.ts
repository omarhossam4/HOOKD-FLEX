/**
 * Manually-managed content. No database, no admin panel — add real items
 * here directly, with the matching image/video file dropped in `/public`.
 *
 * The order you list items in is the order they appear on the site.
 * Only add REAL clients, work, and testimonials — never placeholders.
 */

import type { Brand, CaseStudy, Testimonial } from "@/lib/content/types";

// -----------------------------------------------------------------------
// Brands — shown in the "Brands We've Worked With" marquee.
// Put logo files in /public/brands/ (e.g. /public/brands/acme.png) and
// reference them as "/brands/acme.png" below.
// -----------------------------------------------------------------------
export const brands: Brand[] = [
  { id: "zia", name: "Zia", logoUrl: "/brands/zia.png" },
  { id: "common-culture", name: "Common Culture", logoUrl: "/brands/common-culture.png" },
  { id: "orys-essence", name: "Orys Essence", logoUrl: "/brands/orys-essence.png" },
  { id: "cotmasr", name: "Cotmasr", logoUrl: "/brands/cotmasr.png" },
  { id: "vivaldi", name: "Vivaldi", logoUrl: "/brands/vivaldi.png" },
  { id: "valce", name: "Valce", logoUrl: "/brands/valce.png" },
  { id: "neutral", name: "Neutral", logoUrl: "/brands/neutral.png" },
  { id: "vale", name: "Vale", logoUrl: "/brands/vale.png" },
  // {
  //   id: "acme",
  //   name: "Acme Co.",
  //   logoUrl: "/brands/acme.png",
  //   websiteUrl: "https://acme.com", // optional
  // },
];

// -----------------------------------------------------------------------
// Case studies — optional. Section is hidden entirely if this stays empty.
// -----------------------------------------------------------------------
export const caseStudies: CaseStudy[] = [
  // {
  //   id: "acme-growth",
  //   slug: "acme-growth",
  //   title: "Scaling Acme's Paid Social",
  //   clientName: "Acme Co.",
  //   coverImageUrl: "/work/acme-case-cover.jpg",
  //   background: "Acme came to us after plateauing on paid social for two quarters.",
  //   challenge: "Ad fatigue was driving CPMs up and ROAS down.",
  //   strategy: "We rebuilt their creative testing pipeline around UGC-style hooks.",
  //   production: "Produced 24 ad variations across 3 creator partners in 2 weeks.",
  //   execution: "Launched a structured A/B testing framework across Meta and TikTok.",
  //   deliverables: "24 ad creatives, 3 creator partnerships, a repeatable testing framework.",
  //   results: "ROAS improved from 1.4x to 3.2x over 60 days.", // optional — only if verified
  // },
];

// -----------------------------------------------------------------------
// Testimonials — section is hidden entirely until this has at least one
// REAL, approved quote. Put photos in /public/testimonials/ if you have them.
// -----------------------------------------------------------------------
export const testimonials: Testimonial[] = [
  // {
  //   id: "jane-acme",
  //   clientName: "Jane Doe",
  //   brandName: "Acme Co.",
  //   position: "Marketing Director", // optional, only if approved to show
  //   quote: "HOOKD completely changed how we approach paid creative.",
  //   photoUrl: "/testimonials/jane.jpg", // optional
  // },
];
