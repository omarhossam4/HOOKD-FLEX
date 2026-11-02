import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation/lead";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > MAX_REQUESTS;
}

/**
 * In-memory rate limiting only holds per server instance — fine for a single
 * Node/edge-free deployment. On a multi-instance host, swap for a shared
 * store (Upstash Redis, etc.) if abuse becomes an issue.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  if (parsed.data.website_hp) {
    // Honeypot tripped — pretend success so the bot doesn't learn anything.
    return NextResponse.json({ ok: true });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      {
        error:
          "The inquiry form isn't connected to a spreadsheet yet. Set GOOGLE_SHEETS_WEBHOOK_URL (see README.md) and try again.",
      },
      { status: 503 }
    );
  }

  const { fullName, company, email, phone, website, industry, services, budget, message } =
    parsed.data;

  try {
    const sheetRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submittedAt: new Date().toISOString(),
        fullName,
        company,
        email,
        phone,
        website: website || "",
        industry,
        services: services.join(", "),
        budget: budget || "",
        message,
      }),
      redirect: "follow",
    });

    if (!sheetRes.ok) {
      throw new Error(`Sheet webhook responded with ${sheetRes.status}`);
    }
  } catch {
    return NextResponse.json(
      { error: "Could not save your inquiry. Please try again." },
      { status: 500 }
    );
  }

  // Integration point: email notification. Set RESEND_API_KEY and
  // LEAD_NOTIFICATION_EMAIL to enable — left as a no-op until configured so
  // we never claim an integration that isn't actually wired up.
  if (process.env.RESEND_API_KEY && process.env.LEAD_NOTIFICATION_EMAIL) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_NOTIFICATION_FROM || "HOOKD Leads <onboarding@resend.dev>",
          to: process.env.LEAD_NOTIFICATION_EMAIL,
          subject: `New project inquiry — ${company}`,
          text: `${fullName} (${email}, ${phone}) from ${company}\nIndustry: ${industry}\nServices: ${services.join(", ")}\nBudget: ${budget || "Not specified"}\nWebsite: ${website || "—"}\n\n${message}`,
        }),
      });
    } catch {
      // Lead is already in the sheet — a notification failure shouldn't fail the request.
    }
  }

  return NextResponse.json({ ok: true });
}
