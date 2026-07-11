import { getProduct } from "@/lib/segments";
import type { Personalization, Recommendation } from "@/lib/types";
import { buttonClasses } from "@/components/ui/Button";
import { ChevronRight } from "@/components/ui/icons";
import { Countdown } from "@/components/Countdown";
import { ProofStrip } from "@/components/SocialProof";

// TODO: uskladiti sa pravim popustom (isti % kao Shopify kod).
const DISCOUNT_PCT = Number(process.env.NEXT_PUBLIC_DISCOUNT_PERCENT || "20");

export function ThankYou({
  personalization,
  recommendation,
  checkoutUrl,
}: {
  personalization: Personalization;
  recommendation: Recommendation;
  checkoutUrl: string;
}) {
  const products = recommendation.products.map(getProduct);
  const isBundle = recommendation.isBundle;
  const fullTotal = products.reduce((s, p) => s + p.price, 0);
  const discounted = Math.round((fullTotal * (100 - DISCOUNT_PCT)) / 100);
  const fmt = (n: number) => `${n.toLocaleString("sr-RS")} RSD`;

  const benefits = isBundle
    ? [products[0].benefits[0], products[1]?.benefits[0], products[0].benefits[1]].filter(
        Boolean,
      )
    : products[0].benefits;

  return (
    <div className="min-h-screen bg-brand-mist/40">
      <div className="bg-brand-gradient px-5 pb-16 pt-12 text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-wide opacity-80">
          Tvoja personalizovana preporuka
        </p>
        <h1 className="mx-auto mt-3 max-w-md text-2xl font-extrabold leading-snug sm:text-3xl">
          {personalization.headline}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base opacity-90">{personalization.body}</p>
      </div>

      <div className="mx-auto -mt-10 max-w-md px-5 pb-12">
        <div className="rounded-2xl bg-white p-6 shadow-xl">
          {/* Proizvod / komplet — prikazano kao JEDNA celina */}
          <div className="flex gap-4">
            <div className="relative h-24 w-24 flex-none">
              <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-brand-mist text-3xl">
                📦
              </div>
              {isBundle && (
                <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-lg border-4 border-white bg-brand-mist text-xl">
                  📦
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              {isBundle && (
                <span className="inline-block rounded-full bg-brand-purple/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-purple">
                  Noro komplet
                </span>
              )}
              <h2 className="mt-1 text-lg font-extrabold leading-tight text-brand-ink">
                {isBundle ? recommendation.bundleName : products[0].name}
              </h2>
              {isBundle && (
                <p className="text-sm text-brand-ink/60">{products.map((p) => p.name).join(" + ")}</p>
              )}
            </div>
          </div>

          <ul className="mt-4 grid gap-1.5 text-sm text-brand-ink/80">
            {benefits.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="font-bold text-brand-purple">✓</span>
                {b}
              </li>
            ))}
          </ul>

          {/* Cena — popust odmah vidljiv, stara cena precrtana */}
          <div className="mt-5 flex items-center justify-between rounded-xl bg-brand-mist px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-brand-danger/10 px-2 py-1 text-xs font-extrabold text-brand-danger">
                -{DISCOUNT_PCT}%
              </span>
              <span className="text-sm text-brand-ink/50 line-through">{fmt(fullTotal)}</span>
            </div>
            <span className="text-2xl font-extrabold text-brand-ink">{fmt(discounted)}</span>
          </div>

          {/* Suptilan countdown */}
          <p className="mt-2 text-center text-xs text-brand-ink/50">
            Popust važi još <Countdown seconds={900} />
          </p>

          <a href={checkoutUrl} className={buttonClasses("primary", "mt-4 w-full")}>
            Naruči uz popust <ChevronRight />
          </a>
          <p className="mt-2 text-center text-xs text-brand-ink/50">
            Plaćanje pouzećem · Garancija 30 dana
          </p>

          <div className="mt-5">
            <ProofStrip />
          </div>
        </div>
      </div>
    </div>
  );
}
