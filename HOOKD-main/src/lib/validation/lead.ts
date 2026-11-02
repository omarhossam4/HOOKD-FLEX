import { z } from "zod";
import { budgetOptions, industryOptions, serviceInterestOptions } from "@/lib/content/defaults";

export const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  company: z.string().trim().min(2, "Enter your brand or company name").max(120),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(6, "Enter a valid phone / WhatsApp number").max(32),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  industry: z.enum(industryOptions, { message: "Select an industry" }),
  services: z.array(z.enum(serviceInterestOptions)).min(1, "Select at least one service"),
  budget: z.enum(budgetOptions).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more about your project").max(2000),
  /** Honeypot field — must stay empty. Bots that fill every input trip this. */
  website_hp: z.string().max(0).optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
