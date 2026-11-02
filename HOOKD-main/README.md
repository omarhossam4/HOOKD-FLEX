# HOOKD® — Creative Growth Agency Website

A single-page marketing site for HOOKD, built with Next.js (App Router),
TypeScript, Tailwind CSS, and Framer Motion. No database, no admin
dashboard — content is edited directly in code, and the contact form
writes straight to a Google Sheet.

## 1. Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The site works with no configuration — it
renders with placeholder copy and empty states until you add real content
and connect the contact form.

## 2. Add your real content

Everything lives in two plain TypeScript files — no CMS, no build step,
just edit and save (the dev server hot-reloads automatically):

- **`src/lib/content/collections.ts`** — brands, case studies, testimonials.
  Each is an empty array with a commented-out example showing the exact
  shape to copy. Uncomment, fill in, done.
- **`src/lib/content/defaults.ts`** — everything else: hero headline/CTA
  text, about copy, the 4 services (including each service's preview
  image/video), the 5 process steps, contact details.

For brands/testimonials, put the image or video file in `/public` first
(e.g. `/public/brands/acme.png`), then reference it as `"/brands/acme.png"`
in the content file.

**Only add real clients and real testimonials** — the Testimonials section
stays hidden entirely until at least one real quote is added; Brands shows
a clear "nothing here yet" message instead of fake placeholders.

## 3. Set your real contact details

Edit the fallback values directly in `defaultContact` in
`src/lib/content/defaults.ts`, **or** set these in `.env.local` (copy
`.env.local.example`) so you don't need a code change later:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=201234567890
NEXT_PUBLIC_WHATSAPP_DISPLAY=+20 123 456 7890
NEXT_PUBLIC_CONTACT_EMAIL=hello@hookd.agency
```

Until these are set, the WhatsApp CTA and footer show a visible
placeholder warning instead of a fake number — the site never invents
contact info.

## 4. Connect the contact form to a Google Sheet

No Google Cloud account or API keys needed — just a free Apps Script
Web App attached to your sheet.

1. Create a new Google Sheet. In row 1, add these column headers:
   `Timestamp | Full Name | Company | Email | Phone | Website | Industry | Services | Budget | Message`
2. In the sheet, go to **Extensions → Apps Script**.
3. Delete any starter code and paste this:

   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([
       data.submittedAt || new Date(),
       data.fullName || "",
       data.company || "",
       data.email || "",
       data.phone || "",
       data.website || "",
       data.industry || "",
       data.services || "",
       data.budget || "",
       data.message || ""
     ]);
     return ContentService
       .createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. Click **Deploy → New deployment**.
   - Click the gear icon next to "Select type" → choose **Web app**.
   - **Execute as**: Me
   - **Who has access**: Anyone
   - Click **Deploy**, then **Authorize access** and approve the Google
     prompts (it'll warn the app is unverified — click Advanced → Go to
     [project name] → Allow; this is normal for your own script).
5. Copy the **Web app URL** it gives you (ends in `/exec`).
6. Paste it into `.env.local` as:
   ```
   GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/XXXXXXXX/exec
   ```
7. Restart `npm run dev`. Submit a test inquiry on the site and confirm a
   new row appears in your sheet.

If you ever edit the Apps Script code again, you must create a **new
deployment version** (Deploy → Manage deployments → edit → New version)
for the change to take effect — saving the script alone isn't enough.

## 5. Optional integrations

All are no-ops until configured — nothing breaks if you skip them.

- **Lead email notifications**: set `RESEND_API_KEY` and
  `LEAD_NOTIFICATION_EMAIL` (via [resend.com](https://resend.com)) to get
  an email on every form submission, in addition to the Google Sheet row.
- **Analytics**: set any of `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`,
  `NEXT_PUBLIC_GTM_ID` to load that integration. Tracked events: CTA
  clicks, WhatsApp clicks, form start/submit, portfolio filter/open,
  service selection, nav clicks (see `src/lib/analytics.ts`).

## 6. The logo

`src/components/ui/Logo.tsx` is a code-built recreation of the HOOKD
wordmark (hook glyph + "HOOKD®" + tagline) made to match the brand
reference, since the original artwork file wasn't available to this build.
If you have the vector logo file, drop it at `public/brand/logo.svg` and
swap the markup in that component for an `<Image>` reference.

## 7. Deploy

Any Next.js host works (Vercel is the simplest — connect the repo, add
the same environment variables from `.env.local`, deploy). Set
`NEXT_PUBLIC_SITE_URL` to your real domain for correct SEO metadata and
sitemap URLs.

## Project structure

```
src/app/page.tsx              Home page — assembles every section
src/components/sections/      One component per section (Hero, Services, CaseStudies, …)
src/components/layout/        Navbar, Footer, sticky mobile CTA
src/app/api/leads/route.ts    Contact form endpoint (validation, rate limit, honeypot, Sheets webhook)
src/lib/content/defaults.ts   All site copy — hero, about, services, process, contact
src/lib/content/collections.ts  Brands, portfolio, case studies, testimonials — edit directly
src/lib/content/types.ts      Plain TypeScript shapes for the content above
```

## Notes

- The entire public site is one route (`/`) — nav links are anchors
  (`#about`, `#services`, …) with native smooth scrolling and
  `scroll-mt-*` offsets so the sticky header never covers a heading.
- `/privacy` and `/terms` are separate routes (legal pages, not part of
  the single-page nav) with clearly-marked placeholder copy — have them
  reviewed before launch.
