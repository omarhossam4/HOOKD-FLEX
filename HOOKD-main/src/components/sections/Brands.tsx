import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { defaultBrandsSection } from "@/lib/content/defaults";
import type { Brand } from "@/lib/content/types";

function BrandLogo({ brand }: { brand: Brand }) {
  const content = (
    <div className="relative mr-8 h-28 w-28 shrink-0 overflow-hidden rounded-full border border-line grayscale transition-all duration-300 hover:scale-105 hover:grayscale-0 hover:border-lime/60 sm:h-32 sm:w-32">
      <Image
        src={brand.logoUrl}
        alt={brand.name}
        width={240}
        height={240}
        className="h-full w-full object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"
      />
    </div>
  );

  if (brand.websiteUrl) {
    return (
      <a href={brand.websiteUrl} target="_blank" rel="noopener noreferrer" aria-label={brand.name}>
        {content}
      </a>
    );
  }
  return content;
}

export function Brands({
  brands,
  content = defaultBrandsSection,
}: {
  brands: Brand[];
  content?: typeof defaultBrandsSection;
}) {
  if (brands.length === 0) {
    return (
      <section id="brands" className="scroll-mt-20 border-y border-line bg-ink-soft/40 py-14">
        <div className="container-edge text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-soft">
            Brand logos appear here once added to src/lib/content/collections.ts.
          </p>
        </div>
      </section>
    );
  }

  const track = [...brands, ...brands, ...brands, ...brands];

  return (
    <section id="brands" className="scroll-mt-20 border-y border-line bg-ink-soft/40 py-20">
      <div className="container-edge mb-10 text-center">
        <SectionHeading
          eyebrow="Trusted Partnerships"
          headline={content.headline}
          subtext={content.subtext}
          align="center"
        />
      </div>

      <div className="scrollbar-none overflow-hidden">
        <div className="marquee-track flex w-max">
          {track.map((brand, i) => (
            <BrandLogo key={`${brand.id}-${i}`} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
