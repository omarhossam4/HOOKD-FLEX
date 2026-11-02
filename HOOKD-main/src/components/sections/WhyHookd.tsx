import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { defaultWhyHookd } from "@/lib/content/defaults";

export function WhyHookd() {
  return (
    <section className="scroll-mt-20 bg-ink py-28">
      <div className="container-edge">
        <SectionHeading eyebrow="Why HOOKD" headline={defaultWhyHookd.headline} />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {defaultWhyHookd.points.map((point, i) => (
            <RevealItem key={point.title}>
              <span className="text-xs font-black text-lime">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-bold uppercase leading-tight text-paper sm:text-xl">
                {point.title}
              </h3>
              <p className="mt-3 text-sm text-gray-soft">{point.description}</p>
              <span className="mt-6 block h-px w-full bg-line" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
