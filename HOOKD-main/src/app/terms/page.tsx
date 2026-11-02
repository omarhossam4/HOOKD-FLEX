import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ink px-6 py-16 text-paper">
      <div className="mx-auto max-w-2xl">
        <Link href="/">
          <Logo imgClassName="h-8 w-auto" />
        </Link>
        <h1 className="mt-10 text-3xl font-black uppercase">Terms &amp; Conditions</h1>
        <p className="mt-2 text-sm text-gray-soft">Last updated: placeholder — replace before launch.</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-soft">
          <p className="rounded-xl border border-lime/30 bg-lime/5 p-4 text-paper">
            This is placeholder legal copy generated during development. Replace it with terms
            reviewed for your jurisdiction and service agreements before launch.
          </p>
          <p>
            By submitting an inquiry through this website, you agree to be contacted by HOOKD about
            your project. Any proposals, scopes of work, pricing, or deliverables will be governed
            by a separate agreement between HOOKD and the client.
          </p>
          <p>
            All content on this website — including the HOOKD name, logo, and portfolio work shown —
            is the property of HOOKD or its respective clients and may not be reproduced without
            permission.
          </p>
        </div>
      </div>
    </div>
  );
}
