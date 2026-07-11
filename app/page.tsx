"use client";
import { useEffect, useState } from "react";
import { getCategory, getProduct } from "@/lib/segments";
import { recommend } from "@/lib/recommend";
import { computeScore } from "@/lib/scoring";
import { personalize } from "@/lib/personalize";
import { buildCheckoutUrl } from "@/lib/shopify";
import { persistUTM, getStoredUTM } from "@/lib/utm";
import type { CategoryId, Contact, Personalization, Recommendation } from "@/lib/types";
import { ProgressBar } from "@/components/ProgressBar";
import { Landing } from "@/components/Landing";
import { CategoryStep } from "@/components/CategoryStep";
import { ProblemsStep } from "@/components/ProblemsStep";
import { ContactForm } from "@/components/ContactForm";
import { ThankYou } from "@/components/ThankYou";
const MAKE_URL = process.env.NEXT_PUBLIC_MAKE_WEBHOOK_URL;
type Step = "landing" | "category" | "problems" | "contact" | "thankyou";
const PROGRESS: Record<Step, number> = {
  landing: 0,
  category: 33,
  problems: 66,
  contact: 90,
  thankyou: 100,
};
type Result = {
  personalization: Personalization;
  recommendation: Recommendation;
  checkoutUrl: string;
};
export default function Page() {
  const [step, setStep] = useState<Step>("landing");
  const [categoryId, setCategoryId] = useState<CategoryId | null>(null);
  const [codes, setCodes] = useState<string[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    persistUTM();
  }, []);
  const category = categoryId ? getCategory(categoryId) : null;
  const showBar = step === "category" || step === "problems" || step === "contact";
  function selectCategory(id: CategoryId) {
    setCategoryId(id);
    setCodes([]);
    setStep("problems");
  }
  function toggle(code: string) {
    setCodes((c) => (c.includes(code) ? c.filter((x) => x !== code) : [...c, code]));
  }
  function handleContact(contact: Contact) {
    if (!categoryId || !category) return;
    setSubmitting(true);
    const recommendation = recommend(categoryId, codes);
    const scoring = computeScore(category.scoreBase, codes.length, !!contact.telefon);
    const personalization = personalize(categoryId, contact.ime, codes);
    const checkoutUrl = buildCheckoutUrl(recommendation.products, contact);
    const payload = {
      lead: {
        ime: contact.ime,
        prezime: contact.prezime,
        email: contact.email,
        telefon: contact.telefon ?? null,
        telefon_ostavljen: !!contact.telefon,
      },
      kviz: {
        kategorija: category.label,
        kategorija_id: categoryId,
        problemi: codes.map((code) => ({
          kod: code,
          tekst: category.problems.find((p) => p.code === code)?.label ?? code,
        })),
        preporuceni_proizvod: recommendation.products.map((id) => getProduct(id).name).join(" + "),
        bundle: recommendation.isBundle,
        checkout_url: checkoutUrl,
      },
      scoring,
      izvor: getStoredUTM(),
      meta: { submitted_at: new Date().toISOString(), funnel: "noro-quiz-v1" },
    };
    // Static hosting (GitHub Pages): šaljemo direktno na Make webhook iz browsera.
    // Fire-and-forget — ne blokiramo prelaz na Thank You.
    if (MAKE_URL) {
      fetch(MAKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }
    setResult({ personalization, recommendation, checkoutUrl });
    setStep("thankyou");
    setSubmitting(false);
  }
  return (
    <main className="min-h-screen bg-white">
      {showBar && (
        <div className="sticky top-0 z-10 bg-white/90 px-5 py-3 backdrop-blur">
          <div className="mx-auto max-w-md">
            <ProgressBar value={PROGRESS[step]} />
          </div>
        </div>
      )}
      {step === "landing" && <Landing onStart={() => setStep("category")} />}
      {step === "category" && <CategoryStep onSelect={selectCategory} />}
      {step === "problems" && category && (
        <ProblemsStep
          category={category}
          selected={codes}
          onToggle={toggle}
          onNext={() => setStep("contact")}
          onBack={() => setStep("category")}
        />
      )}
      {step === "contact" && (
        <ContactForm
          onSubmit={handleContact}
          onBack={() => setStep("problems")}
          submitting={submitting}
        />
      )}
      {step === "thankyou" && result && <ThankYou {...result} />}
    </main>
  );
}
