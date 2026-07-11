import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

// Strog email: mora imati lokalni deo, @, domen i TLD od bar 2 slova.
// Odbija npr. "12kl@gm.c".
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

// Internacionalni broj: prihvata E.164 (+381...) ili srpski lokalni (06x...).
export function isValidPhone(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  try {
    return isValidPhoneNumber(v) || isValidPhoneNumber(v, "RS");
  } catch {
    return false;
  }
}

export const contactSchema = z
  .object({
    ime: z.string().trim().min(2, "Unesi ime (bar 2 slova)"),
    prezime: z.string().trim().min(2, "Unesi prezime (bar 2 slova)"),
    email: z
      .string()
      .trim()
      .min(1, "Unesi email")
      .regex(EMAIL_RE, "Unesi ispravan email (npr. ime@primer.rs)"),
    telefon: z.string().trim().optional().default(""),
  })
  .refine((d) => !d.telefon || isValidPhone(d.telefon), {
    message: "Unesi ispravan broj (npr. +381 64 123 4567)",
    path: ["telefon"],
  });

export type ContactInput = z.infer<typeof contactSchema>;
