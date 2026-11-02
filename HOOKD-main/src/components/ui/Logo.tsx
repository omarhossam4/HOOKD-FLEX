import Image from "next/image";
import clsx from "clsx";
import type { CSSProperties } from "react";

/**
 * Official HOOKD lockup (hook glyph + "HOOKD®" + tagline), baked into one
 * image at /public/HookdLogo.png. Used wherever the full logo appears
 * (navbar, footer, legal pages).
 */
export function Logo({
  className,
  imgClassName = "h-8 w-auto",
  priority = false,
}: {
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}) {
  return (
    <span className={clsx("inline-flex items-center", className)}>
      <Image
        src="/HookdLogo.png"
        alt="HOOKD — Creative Growth Agency"
        width={2172}
        height={724}
        priority={priority}
        className={clsx("object-contain", imgClassName)}
      />
    </span>
  );
}

/**
 * Standalone hook glyph, drawn in code, used only as large ambient
 * background decoration (Hero, Contact) — not a literal logo placement,
 * since the official asset is a single flattened lockup with no separate
 * icon-only crop available.
 */
export function HookMark({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M34 8 L34 52 C34 68 46 76 58 72 C68 68.5 72 58 68 48"
        stroke="var(--color-lime)"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
