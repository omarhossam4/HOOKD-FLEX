"use client";

import { Logo } from "@/components/ui/Logo";
import { navLinks, defaultServices } from "@/lib/content/defaults";
import { trackEvent } from "@/lib/analytics";

export function Footer({
  contact,
}: {
  contact: { whatsappNumber: string; whatsappDisplay: string; email: string; isPlaceholder: boolean };
}) {
  const year = new Date().getFullYear();
  const waHref = `https://wa.me/${contact.whatsappNumber.replace(/[^\d]/g, "")}`;

  return (
    <footer id="footer" className="border-t border-line bg-ink">
      <div className="container-edge py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo imgClassName="h-11 w-auto" />
            <p className="mt-6 max-w-xs text-sm text-gray-soft">
              A full-service creative growth agency helping ambitious brands in Egypt grow
              through content, creative, and performance.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-paper">
              Navigate
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-soft transition-colors hover:text-lime focus-lime"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-paper">
              Services
            </h3>
            <ul className="space-y-3">
              {defaultServices.map((s) => (
                <li key={s.slug}>
                  <a
                    href="#services"
                    className="text-sm text-gray-soft transition-colors hover:text-lime focus-lime"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-paper">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-gray-soft">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-lime focus-lime"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { source: "footer" })}
                  className="transition-colors hover:text-lime focus-lime"
                >
                  WhatsApp: {contact.whatsappDisplay}
                </a>
              </li>
              <li>{"Egypt"}</li>
            </ul>
            {contact.isPlaceholder && (
              <p className="mt-3 text-[11px] text-lime/80">
                Placeholder contact info — set it in .env.local or src/lib/content/defaults.ts.
              </p>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-gray-soft sm:flex-row sm:items-center">
          <p>
            &copy; {year} HOOKD®. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-lime focus-lime">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-lime focus-lime">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
