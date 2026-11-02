import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { defaultAbout } from "@/lib/content/defaults";

export function About({ content = defaultAbout }: { content?: typeof defaultAbout }) {
  return (
    <section id="about" className="scroll-mt-20 bg-ink py-28">
      <div className="container-edge grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow="About HOOKD" headline={content.headline} />

          <div className="mt-8 space-y-6 max-w-xl">
            <Reveal delay={0.1}>
              <p className="text-base text-gray-soft sm:text-lg">{content.paragraph1}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-base text-gray-soft sm:text-lg">{content.paragraph2}</p>
            </Reveal>
          </div>

          <RevealGroup className="mt-12 grid grid-cols-3 gap-6 max-w-lg border-t border-line pt-8">
            {content.stats.map((stat) => (
              <RevealItem key={stat.label}>
                <p className="text-xl font-black uppercase text-lime sm:text-2xl">{stat.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-gray-soft">
                  {stat.label}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.2} className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-ink-soft">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/home.png" alt="Behind the scenes on a HOOKD production" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(214,255,69,0.12),transparent_60%)]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
