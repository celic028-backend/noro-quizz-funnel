# Noro Kviz - Content Spec (Deliverable 1)
> Draft copy za odobrenje. Sve je predlog - koriguj ton, reči, sve. Kodiranje kreće tek kad ovo potvrdiš.
> Legenda: `{ime}` = umeće se ime · `{…}` = uslovni deo (prikazuje se samo ako je taj problem izabran)

---

## 0. Landing / Hook
- **Naslov:** Otkrij koje Noro rešenje je pravo baš za tebe
- **Podnaslov:** Odgovori na par pitanja (30 sekundi) i dobij personalizovanu preporuku na osnovu tvog problema.
- **CTA dugme:** Započni kviz →
- **Proof traka (odmah ispod):** 75.000+ zadovoljnih kupaca · Garancija 30 dana · Naučno dokazano
- *(ispod: sekcija sa borcima/influenserima/logoima - kad pošalješ materijale)*

---

## 1. Korak 1 - Glavni problem (izbor 1 od 6)
**Pitanje:** Šta te najviše muči?

| # | Kategorija (labela) | Podtekst |
|---|---|---|
| 1 | 😴 Loš san | Ne spavam kvalitetno, budim se umoran |
| 2 | 💤 Hrkanje | Ja ili partner hrčemo |
| 3 | 🏋️ Sport i performanse | Želim više kiseonika i bolji oporavak |
| 4 | 👃 Teško dišem na nos | Zapušen nos, alergije, devijacija |
| 5 | 📈 Optimizacija i fokus | Pratim san/recovery, hoću maksimum |
| 6 | ✨ Estetika lica i disanje | Pravilno disanje i izgled lica |

---

## 2. Korak 2 - Pod-problemi (multi-select) + preporuka + Thank You

### 1) LOŠ SAN
- **Pitanje:** Kako izgleda tvoj san? *(izaberi sve što važi)*
- **Opcije:**
  - `sleep_A` Budim se umoran
  - `sleep_B` Budim se tokom noći
  - `sleep_C` Partner mi remeti san (hrkanje / pokreti / buka)
  - `sleep_D` Umoran sam tokom dana
- **Preporuka:** **Mouth Tape** (default).
  - Izuzetak: ako je izabran **samo** `sleep_C` → **EarPlugs** (problem je spoljna buka, ne tvoje disanje).
  - Ako `sleep_C` + drugi → **bundle Mouth Tape + EarPlugs** („San paket").
- **Thank You:**
  > {ime}, tvoj san ti ne vraća energiju. {Budiš se iscrpljeno i to se prenosi na ceo dan. }**Noro Mouth Tape** forsira disanje na nos za dublji, mirniji san - osetićeš razliku već prve nedelje.{ A **Noro EarPlugs** blokiraju buku i partnera koji te budi. }
- **Scoring baza:** 38

### 2) HRKANJE
- **Pitanje:** Kako izgleda tvoje hrkanje?
- **Opcije:**
  - `snore_A` Spavam s partnerom - smeta meni
  - `snore_B` Spavam s partnerom - smeta partneru
  - `snore_C` Spavam sam, suva usta ujutru
  - `snore_D` Spavam sam, budim se umoran
- **Preporuka:** **Mouth Tape** (svi slučajevi).
- **Thank You:**
  > {ime}, hrkanje ti kvari san{, i partneru pored tebe}. **Noro Mouth Tape** forsira disanje na nos i smiruje hrkanje već prve noći.{ I ona suva usta ujutru - nestaju. }
  > *(„partneru pored tebe" se prikazuje ako je snore_A ili snore_B; „suva usta" ako je snore_C)*
- **Scoring baza:** 40

### 3) SPORT
- **Pitanje:** Šta ti je najvažnije u treningu?
- **Opcije:**
  - `sport_A` Gubim vazduh pred kraj treninga
  - `sport_B` Dišem na usta tokom treninga
  - `sport_C` Želim brži oporavak
  - `sport_D` Želim bolji kardio i izdržljivost
- **Preporuka:** **Trakice za Nos** (default). Ako je izabran `sport_C` (oporavak) → **bundle Trakice + Mouth Tape** (trening danju + recovery noću).
- **Thank You:**
  > {ime}, tvoje telo traži više kiseonika{ pred kraj treninga}. **Noro Trakice za Nos** otvaraju disanje i daju do 80% više protoka vazduha - bolji kardio i veća izdržljivost.{ A Mouth Tape noću ubrzava oporavak kroz kvalitetniji san. }
- **Scoring baza:** 28

### 4) OTEŽANO DISANJE NA NOS
- **Pitanje:** Zašto ti je nos zapušen?
- **Opcije:**
  - `nose_A` Sezonske alergije
  - `nose_B` Devijacija septuma
  - `nose_C` Privremena prehlada
  - `nose_D` Loše dišem dok spavam
- **Preporuka:** **Trakice za Nos** (default). Ako je izabran `nose_D` → **bundle Trakice + Mouth Tape**.
- **Thank You:**
  > {ime}, zapušen nos ti otežava{ i dan i san}. **Noro Trakice za Nos** mehanički šire nozdrve i otvaraju protok vazduha - instant olakšanje, bez lekova.{ A Mouth Tape ti pomaže da dišeš na nos i dok spavaš. }
- **Scoring baza:** 32

### 5) OPTIMIZACIJA I FOKUS
- **Pitanje:** Šta želiš da podigneš na viši nivo? *(publika koja tracka san/recovery - Whoop tip)*
- **Opcije:**
  - `opt_A` Veći recovery i bolje performanse
  - `opt_B` Bolji fokus i bistrina
  - `opt_C` Kvalitetniji san (HRV)
  - `opt_D` Manje stresa
- **Preporuka:** **Drops + Mouth Tape (bundle)**. Ako je izabran **samo** `opt_B` (fokus) → **Drops** primarni.
- **Thank You:**
  > {ime}, ti već pratiš svoje telo - sad mu daj alat. **Noro Drops** otključavaju dublje disanje i fokus za 3 sekunde, a **Mouth Tape** podiže recovery kroz kvalitetniji san. Tvoj HRV će to osetiti.
- **Scoring baza:** 30

### 6) ESTETIKA LICA I PRAVILNO DISANJE
- **Pitanje:** Šta ti je cilj?
- **Opcije:**
  - `face_A` Da ne razvijem „mouthbreather" izgled
  - `face_B` Pravilno disanje na nos
  - `face_C` Definisanija linija vilice
- **Preporuka:** **Trakice + Mouth Tape (bundle)** - dan (Trakice) + noć (Mouth Tape).
- **Thank You:**
  > {ime}, disanje na usta vremenom menja crte lica. **Noro kombinacija - Trakice danju + Mouth Tape noću -** trenira nazalno disanje 24/7 i čuva pravilan položaj vilice i lica.
- **Scoring baza:** 25

---

## 3. Korak 3 - Kontakt forma
- **Naslov:** Skoro gotovo! Gde da ti pošaljemo tvoju personalizovanu preporuku?
- **Polja:** Ime · Prezime · Email *(obavezno, validirano)* · Telefon *(opciono)*
- **Microcopy uz telefon:** Ostavi broj da ti pošaljemo preporuku i na WhatsApp i da te posavetujemo.
- **Dugme (šalje webhook → Thank You):** Prikaži moju preporuku →

---

## 4. Thank You page (struktura)
1. Personalizovani naslov + rečenica (iz šablona gore)
2. Kartica preporučenog proizvoda/bundle-a (slika, ime, 3 ključna benefita, cena)
3. **Popust + vizuelni countdown** (npr. „Tvoj popust važi još 14:59")
4. **CTA:** Naruči uz popust → *(Shopify checkout, pre-filled + kod za popust)*
5. Social proof: Garancija 30 dana · 75.000+ kupaca · recenzije

---

## 5. Scoring model (predlog)
`score(0-100) = baza_segmenta + (broj_izabranih_problema × 8) + (telefon_ostavljen ? 10 : 0)` → klamp 0-100

| Segment | Baza | Tier granice |
|---|---|---|
| Hrkanje | 40 | **Hot ≥ 70** |
| Loš san | 38 | **Warm 45-69** |
| Otežano disanje na nos | 32 | **Cold < 45** |
| Optimizacija | 30 | |
| Sport | 28 | |
| Estetika | 25 | |

---

## 6. Bundle definicije
| Bundle | Sastav | Okidač |
|---|---|---|
| San paket | Mouth Tape + EarPlugs | Loš san + „partner remeti san" |
| Sport/Recovery | Trakice + Mouth Tape | Sport + „brži oporavak" |
| Disanje 24/7 | Trakice + Mouth Tape | Otežano disanje + „loše diše dok spava" |
| Optimizacija | Drops + Mouth Tape | Optimizacija (osim ako samo fokus) |
| Estetika | Trakice + Mouth Tape | Estetika (default) |

---

## Otvoreno / za tebe
- Potvrdi/koriguj **copy** (ton, reči, benefite).
- Potvrdi/koriguj **scoring težine** i **tier granice**.
- Potvrdi **bundle** logiku.
- Cene proizvoda + **kod za popust (%)** - za Thank You i checkout.
