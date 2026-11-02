/**
 * Site copy and configuration — edit these values directly to update the
 * site. Contact details fall back to env vars (.env.local) if set, so you
 * can change them without a code edit; otherwise edit the literal strings
 * below directly.
 */

import type { ProcessStep, Service } from "@/lib/content/types";

export const siteConfig = {
  name: "HOOKD",
  legalName: "HOOKD Creative Growth Agency",
  tagline: "Built on creativity. Driven by growth.",
  secondaryTagline: "Stop the scroll. Drive growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hookd.agency",
  market: "Egypt",
};

export const defaultContact = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+201026400332",
  whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || "01026400332 / 01099272650",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "omarhosssam504@gmail.com",
};

export function isPlaceholderContact(contact: { whatsappNumber: string; email: string }) {
  return contact.whatsappNumber.includes("X") || contact.email.includes("UPDATE-THIS-EMAIL");
}

export const defaultHero = {
  eyebrow: "CREATIVE GROWTH AGENCY",
  headlineLine1: "BUILT ON CREATIVITY.",
  headlineLine2: "DRIVEN BY GROWTH.",
  subtext:
    "We help ambitious brands grow through strategic content, creative production, and performance-driven advertising.",
  primaryCta: "LET'S TALK ABOUT YOUR BRAND",
  secondaryCta: "EXPLORE OUR SERVICES",
  credibility: "CREATIVE STRATEGY. CONTENT PRODUCTION. PERFORMANCE.",
};

export const defaultBrandsSection = {
  headline: "BRANDS WE'VE WORKED WITH.",
  subtext: "Creative partnerships built around ambitious brands and meaningful growth.",
};

export const defaultAbout = {
  headline: "CREATIVITY WITH A CLEAR DIRECTION.",
  paragraph1:
    "HOOKD is a creative growth agency combining strategic thinking, creative production, and performance-focused content to help brands build stronger digital presences and grow.",
  paragraph2:
    "We believe great creative work should do more than look good. It should capture attention, communicate value, connect with audiences, and inspire action.",
  stats: [
    { label: "Market", value: "Egypt" },
    { label: "Discipline", value: "Full-Service" },
    { label: "Focus", value: "Growth" },
  ],
};

export const defaultServices: Service[] = [
  {
    id: "content-production",
    number: "01",
    slug: "content-production",
    title: "Content Production",
    description:
      "From concept to final cut — video, photography, and campaigns built to represent your brand at its best.",
    deliverables: [
      "Short-form video production",
      "Commercial video production",
      "Product photography",
      "Creative campaigns",
      "Social media content",
      "Professional video editing",
    ],
    mediaUrl: "/content-production-teaser.mp4",
  },
  {
    id: "performance-creatives",
    number: "02",
    slug: "performance-creatives",
    title: "Performance Creatives",
    description:
      "Advertising creative engineered to stop the scroll and perform — built for testing, iteration, and results.",
    deliverables: [
      "Paid advertising creatives",
      "UGC advertising videos",
      "Ad concepts and hooks",
      "Creative variations",
      "Static advertising creatives",
      "Creative testing concepts",
    ],
    mediaUrl: "/performance-creatives-teaser.mp4",
  },
  {
    id: "organic-growth",
    number: "03",
    slug: "organic-growth",
    title: "Organic Growth",
    description:
      "Content strategy and storytelling that builds real audience connection across your organic channels.",
    deliverables: [
      "Organic content strategy",
      "Viral video concepts",
      "Social media storytelling",
      "Trend research",
      "Content planning",
      "Creative direction",
    ],
    mediaUrl: "/organic.png",
  },
  {
    id: "ugc-creator-management",
    number: "04",
    slug: "ugc-creator-management",
    title: "UGC & Creator Management",
    description:
      "Access to vetted creators, managed end-to-end — from sourcing to licensing.",
    deliverables: [
      "UGC creator sourcing",
      "Creator management",
      "Influencer coordination",
      "Creator campaigns",
      "UGC production",
      "Content licensing coordination",
    ],
    mediaUrl: "/ugc-creator-teaser.mp4",
  },
];

export const defaultProcessSteps: ProcessStep[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    description: "We understand your brand, audience, objectives, and challenges.",
  },
  {
    id: "strategize",
    number: "02",
    title: "Strategize",
    description: "We develop creative concepts, content direction, and a production plan.",
  },
  {
    id: "create",
    number: "03",
    title: "Create",
    description: "We produce videos, photography, and advertising creatives.",
  },
  {
    id: "distribute",
    number: "04",
    title: "Distribute",
    description: "We prepare creative assets for organic platforms and paid advertising.",
  },
  {
    id: "optimize",
    number: "05",
    title: "Optimize",
    description: "We analyze performance, identify opportunities, and improve future creative output.",
  },
];

export const defaultWhyHookd = {
  headline: "MORE THAN JUST CONTENT CREATION.",
  points: [
    {
      title: "Strategy before production",
      description: "Every deliverable starts with a plan, not a camera.",
    },
    {
      title: "Creative built for performance",
      description: "Work designed to be measured, tested, and improved.",
    },
    {
      title: "Multiple content formats",
      description: "Short-form, commercial, static, and organic — covered in one place.",
    },
    {
      title: "Access to creators and talent",
      description: "A managed network of creators ready to produce for your brand.",
    },
    {
      title: "Consistent creative execution",
      description: "Reliable output and quality across every deliverable.",
    },
    {
      title: "A partnership focused on growth",
      description: "We measure our work by your business outcomes.",
    },
  ],
};

export const defaultFinalCta = {
  headline: "LET'S BUILD SOMETHING THAT GROWS.",
  subtext:
    "Tell us about your brand, your goals, and what you're looking to achieve. Let's explore how the right creative strategy can move your business forward.",
  primaryCta: "START YOUR PROJECT",
  secondaryCta: "TALK TO OUR TEAM",
};

export const industryOptions = [
  "Fashion",
  "Beauty",
  "Fitness",
  "Food & Beverage",
  "Lifestyle",
  "E-commerce",
  "Other",
] as const;

export const serviceInterestOptions = [
  "Content Production",
  "Performance Creatives",
  "Organic Growth",
  "UGC & Creator Management",
  "Multiple Services",
  "Other",
] as const;

export const budgetOptions = [
  "Under $1,000 / month",
  "$1,000 – $3,000 / month",
  "$3,000 – $7,000 / month",
  "$7,000+ / month",
  "Project-based",
  "Not sure yet",
] as const;

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];
