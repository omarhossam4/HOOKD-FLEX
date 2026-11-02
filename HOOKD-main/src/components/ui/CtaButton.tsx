"use client";

import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { trackEvent } from "@/lib/analytics";

export function CtaButton({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  trackLabel,
  icon = true,
  onClick,
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  trackLabel?: string;
  icon?: boolean;
  onClick?: () => void;
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-wide transition-colors focus-lime";
  const sizes = {
    md: "px-6 py-3 text-xs sm:text-sm",
    lg: "px-8 py-4 text-sm sm:text-base",
  };
  const variants = {
    primary: "bg-lime text-ink hover:bg-paper",
    secondary: "border border-paper/30 text-paper hover:border-lime hover:text-lime",
    ghost: "text-paper hover:text-lime",
  };

  return (
    <MagneticButton
      href={href}
      className={clsx(base, sizes[size], variants[variant], className)}
      onClick={() => {
        trackEvent("cta_click", { label: trackLabel ?? children?.toString(), href });
        onClick?.();
      }}
    >
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </MagneticButton>
  );
}
