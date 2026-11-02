import { Navbar } from "@/components/layout/Navbar";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Brands } from "@/components/sections/Brands";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { WhyHookd } from "@/components/sections/WhyHookd";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { brands, caseStudies, testimonials } from "@/lib/content/collections";
import {
  defaultContact,
  defaultProcessSteps,
  defaultServices,
  isPlaceholderContact,
} from "@/lib/content/defaults";

export default function Home() {
  const contact = { ...defaultContact, isPlaceholder: isPlaceholderContact(defaultContact) };

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Brands brands={brands} />
        <About />
        <Services services={defaultServices} />
        <CaseStudies studies={caseStudies} />
        <WhyHookd />
        <Process steps={defaultProcessSteps} />
        <Testimonials testimonials={testimonials} />
        <Contact contact={contact} />
      </main>
      <Footer contact={contact} />
      <StickyMobileCta />
    </>
  );
}
