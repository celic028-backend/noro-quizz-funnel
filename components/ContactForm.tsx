"use client";

import { useState } from "react";
import { contactSchema } from "@/lib/validation";
import type { Contact } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { StepShell } from "@/components/ui/StepShell";
import { PhoneField } from "@/components/ui/PhoneField";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";

const TEXT_FIELDS = [
  { name: "ime", label: "Ime", type: "text", ph: "Marko", ac: "given-name" },
  { name: "prezime", label: "Prezime", type: "text", ph: "Marković", ac: "family-name" },
  { name: "email", label: "Email", type: "email", ph: "marko@primer.com", ac: "email" },
] as const;

type FormState = { ime: string; prezime: string; email: string; telefon: string };

export function ContactForm({
  onSubmit,
  onBack,
  submitting,
}: {
  onSubmit: (c: Contact) => void;
  onBack: () => void;
  submitting: boolean;
}) {
  const [form, setForm] = useState<FormState>({ ime: "", prezime: "", email: "", telefon: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function change(name: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = contactSchema.safeParse(form);
    if (!res.success) {
      const fe = res.error.flatten().fieldErrors;
      const map: Record<string, string> = {};
      (Object.keys(fe) as (keyof typeof fe)[]).forEach((k) => {
        const arr = fe[k];
        if (arr && arr[0]) map[k as string] = arr[0];
      });
      setErrors(map);
      return;
    }
    setErrors({});
    onSubmit({ ...res.data, telefon: res.data.telefon || undefined });
  }

  return (
    <StepShell
      title="Skoro gotovo! 🎉"
      subtitle="Gde da ti pošaljemo tvoju personalizovanu preporuku?"
    >
      <form onSubmit={submit} noValidate className="grid gap-4">
        {TEXT_FIELDS.map((f) => (
          <label key={f.name} className="block">
            <span className="mb-1 block text-sm font-semibold text-brand-ink">{f.label}</span>
            <input
              type={f.type}
              value={form[f.name]}
              onChange={(e) => change(f.name, e.target.value)}
              placeholder={f.ph}
              autoComplete={f.ac}
              className={`w-full rounded-xl border-2 px-4 py-3 text-base outline-none transition focus:border-brand-purple ${
                errors[f.name] ? "border-brand-danger" : "border-brand-mist"
              }`}
            />
            {errors[f.name] && (
              <span className="mt-1 block text-xs font-medium text-brand-danger">
                {errors[f.name]}
              </span>
            )}
          </label>
        ))}

        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-brand-ink">Telefon (opciono)</span>
          <PhoneField onChange={(v) => change("telefon", v)} error={errors.telefon} />
          {errors.telefon && (
            <span className="mt-1 block text-xs font-medium text-brand-danger">
              {errors.telefon}
            </span>
          )}
        </label>

        <div className="mt-2 flex gap-3">
          <Button type="button" variant="ghost" onClick={onBack} aria-label="Nazad">
            <ChevronLeft />
          </Button>
          <Button type="submit" className="flex-1" disabled={submitting}>
            {submitting ? (
              "Sekund…"
            ) : (
              <>
                Prikaži moju preporuku <ChevronRight />
              </>
            )}
          </Button>
        </div>
      </form>
    </StepShell>
  );
}
