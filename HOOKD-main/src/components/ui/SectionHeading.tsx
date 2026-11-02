import clsx from "clsx";
import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  headline,
  subtext,
  align = "left",
  className,
}: {
  eyebrow?: string;
  headline: string;
  subtext?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={clsx(align === "center" && "text-center mx-auto", className)}>
      {eyebrow && (
        <Reveal>
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-lime justify-start">
            {align === "center" && <span className="h-px w-6 bg-lime" />}
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={clsx(
            "font-black uppercase leading-[0.95] tracking-tight text-paper",
            "text-[clamp(2rem,5.5vw,4.5rem)]",
            align === "center" && "max-w-4xl mx-auto"
          )}
        >
          {headline}
        </h2>
      </Reveal>
      {subtext && (
        <Reveal delay={0.16}>
          <p
            className={clsx(
              "mt-5 text-base sm:text-lg text-gray-soft max-w-xl",
              align === "center" && "mx-auto"
            )}
          >
            {subtext}
          </p>
        </Reveal>
      )}
    </div>
  );
}
