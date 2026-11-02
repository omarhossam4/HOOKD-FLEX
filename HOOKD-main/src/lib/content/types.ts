export type Brand = {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl?: string;
};

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  coverImageUrl: string;
  background: string;
  challenge: string;
  strategy: string;
  production: string;
  execution: string;
  deliverables: string;
  results?: string;
};

export type Testimonial = {
  id: string;
  clientName: string;
  brandName: string;
  position?: string;
  quote: string;
  photoUrl?: string;
};

export type Service = {
  id: string;
  number: string;
  slug: string;
  title: string;
  description: string;
  deliverables: string[];
  mediaUrl?: string;
};

export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};
