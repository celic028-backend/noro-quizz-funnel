# Noro Kviz Funnel

Personalizovani quiz funnel: landing → izbor problema → pod-problemi → kontakt → **Make webhook** → personalizovani Thank You sa preporukom proizvoda + Shopify checkout.

Stack: **Next.js (App Router, static export) + TypeScript + Tailwind v4**.

## Pokretanje (lokalno)
```bash
npm install
cp .env.example .env.local   # pa popuni vrednosti
npm run dev                  # http://localhost:3000
npm run build                # static export u ./out
```

## Deploy — GitHub Pages (preko gita, automatski)
Push na `main` → GitHub Action build-uje static export i deploy-uje na Pages.
Jednokratno podešavanje u repo-u:
1. **Settings → Pages → Build and deployment → Source → „GitHub Actions"**.
2. (za webhook) **Settings → Secrets and variables → Actions → New repository secret**:
   `NEXT_PUBLIC_MAKE_WEBHOOK_URL` = Make hook URL.

Live URL: `https://celic028-backend.github.io/noro-quizz-funnel/`

> Static hosting nema server — webhook ide **direktno iz browsera**, pa je URL javan (u JS bundle-u). Za skriveni webhook treba server host (Netlify/Render/VPS + vraćanje `/api/lead` rute).

## Env varijable (`.env.local` lokalno / Action secret na Pages)
| Var | Opis |
|---|---|
| `NEXT_PUBLIC_MAKE_WEBHOOK_URL` | Make webhook (client-side). Uključi scenario na Make-u. |
| `NEXT_PUBLIC_SHOPIFY_DOMAIN` | npr. `noro.rs` |
| `NEXT_PUBLIC_DISCOUNT_CODE` | Shopify kod za popust (ide u checkout link) |
| `NEXT_PUBLIC_DISCOUNT_PERCENT` | % za prikaz precrtane cene |

## Placeholderi za popuniti (handoff)
- **Shopify variant ID-jevi** → `lib/segments.ts` (`variantId`).
- **Prave cene** → `lib/segments.ts` (`price`).
- **Kod za popust + %** → env.
- **Social proof** (fotke/izjave, logoi, recenzije, video) → `components/SocialProof.tsx`.
- **Slike proizvoda** (sad 📦) → `components/ThankYou.tsx`.
- **Make scenario** — uključiti da prima lidove.

## Struktura
```
app/        page.tsx (funnel state machine + client webhook → Make)
components/ Landing · CategoryStep · ProblemsStep · ContactForm · ThankYou
           Countdown · SocialProof · ProgressBar · ui/*
lib/        segments.ts · recommend.ts · scoring.ts · personalize.ts
           vocative.ts · shopify.ts · validation.ts · utm.ts
.github/workflows/deploy.yml   GitHub Pages deploy (Action)
CONTENT-SPEC.md  odobreni copy + logika
```
