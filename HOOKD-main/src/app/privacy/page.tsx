import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { defaultContact } from "@/lib/content/defaults";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ink px-6 py-16 text-paper">
      <div className="mx-auto max-w-2xl">
        <Link href="/">
          <Logo imgClassName="h-8 w-auto" />
        </Link>
        <h1 className="mt-10 text-3xl font-black uppercase">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-soft">Last updated: placeholder — replace before launch.</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-gray-soft">
          <p className="rounded-xl border border-lime/30 bg-lime/5 p-4 text-paper">
            This is placeholder legal copy generated during development. Replace it with a privacy
            policy reviewed for your jurisdiction (Egypt and any markets you serve) before launch.
          </p>
          <p>
            HOOKD collects information you submit through our project inquiry form — including your
            name, brand/company name, email, phone number, and project details — solely to respond
            to your inquiry and discuss a potential engagement. We do not sell your information to
            third parties.
          </p>
          <p>
            If analytics tools (Google Analytics, Meta Pixel, Google Tag Manager) are enabled, they
            may collect standard usage data such as pages visited and device/browser information, in
            line with each provider&rsquo;s own privacy practices.
          </p>
          <p>
            To request access to, correction of, or deletion of your data, contact us at{" "}
            {defaultContact.email}.
          </p>
        </div>
      </div>
    </div>
  );
}
