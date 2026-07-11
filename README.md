# Noro Kviz Funnel

Personalizovani quiz funnel: landing → izbor problema → pod-problemi → kontakt → **Make webhook** → personalizovani Thank You sa preporukom proizvoda + Shopify checkout.

Stack: **Next.js (App Router) + TypeScript + Tailwind v4**.

## Pokretanje
```bash
npm install
cp .env.example .env.local   # pa popuni vrednosti
npm run dev                  # http://localhost:3000
npm run build                # production build
```

## Env varijable (`.env.local`)
| Var | Opis |
|---|---|
| `MAKE_WEBHOOK_URL` | Make webhook (server-only). Uključi scenario na Make-u da prima lidove. |
| `NEXT_PUBLIC_SHOPIFY_DOMAIN` | npr. `noro.rs` |
| `NEXT_PUBLIC_DISCOUNT_CODE` | Shopify kod za popust (ide u checkout link) |
| `NEXT_PUBLIC_DISCOUNT_PERCENT` | % za prikaz precrtane cene (uskladiti sa kodom) |

## Placeholderi za popuniti (handoff)
- **Shopify variant ID-jevi** → `lib/segments.ts` (`variantId`) — bez njih checkout link vodi na product stranu; sa njima postaje cart/checkout permalink sa proizvodima.
- **Prave cene** → `lib/segments.ts` (`price`) — trenutno placeholder.
- **Kod za popust + %** → `.env.local`.
- **Social proof** (fotke/izjave boraca i influensera, logoi, recenzije, video) → `components/SocialProof.tsx`.
- **Slike proizvoda** (sad 📦) → `components/ThankYou.tsx`.
- **Make scenario** — uključiti da webhook prima podatke.

## Struktura
```
app/        page.tsx (funnel state machine) · api/lead/route.ts (webhook → Make)
components/ Landing · CategoryStep · ProblemsStep · ContactForm · ThankYou
           Countdown · SocialProof · ProgressBar · ui/*
lib/        segments.ts (sadržaj+proizvodi) · recommend.ts (engine) · scoring.ts
           personalize.ts · vocative.ts · shopify.ts · validation.ts · utm.ts
CONTENT-SPEC.md  odobreni copy + logika (pitanja, preporuke, scoring, bundle)
```

## Logika (ukratko)
- **Engine preporuke** (`lib/recommend.ts`): kategorija + izabrani problemi → proizvod ili bundle.
- **Scoring** (`lib/scoring.ts`): 0–100 + tier (Hot/Warm/Cold) → za sortiranje lidova u CRM-u.
- **Webhook payload** (`app/page.tsx` → `app/api/lead/route.ts`): `lead / kviz / scoring / izvor(UTM) / meta` → Make → GHL/Kit/WhatsApp.
- **Vokativ** (`lib/vocative.ts`): obraćanje u personalizaciji (Lazar → Lazare).
