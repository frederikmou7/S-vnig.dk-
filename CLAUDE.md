# CLAUDE.md

Kontekst til fremtidige Claude Code-sessioner i dette repository.

## Hvad er dette

Shopify Online Store 2.0-tema for **Søvnig** (søvnig.dk), et dansk DTC-brand
for søvn-, komfort- og aftenrutine-produkter. Startede som en statisk
HTML/CSS/JS design-prototype (bevaret i `reference/`), og er konverteret til
et fuldt Shopify-tema med Liquid sections/blocks, JSON-templates og en rigtig
Shopify-kurv (ingen localStorage/demo-data længere).

## Vigtige principper

- **Designet er facit.** `reference/index.html` + `reference/style.css` viser
  det godkendte visuelle design 1:1. Ændr ikke layout, farver, spacing eller
  typografi uden eksplicit at blive bedt om det — konverter til Shopify uden
  at redesigne.
- **Sproget er dansk.** Al brugervendt tekst (UI-labels, knapper,
  fejlbeskeder) skal være korrekt dansk med æ/ø/å, og bruge `locales/da.default.json`
  via `{{ 'key' | t }}` frem for hardcodede strenge, så teksten forbliver ét
  sted at redigere.
- **Ingen fake data.** Produktinfo kommer fra rigtige Shopify product-objekter.
  Demo-indhold (anmeldelser, USP'er, rating) SKAL være synligt markeret som
  placeholder/demo — se `sections/reviews.liquid` og USP-blokkene i
  `sections/featured-product.liquid` / `sections/main-product.liquid` for
  mønsteret. Undgå sundheds- eller behandlingspåstande i produkttekst.
- **`.modal-*`-CSS-klasserne bruges nu til produktsiden** (ikke en overlay
  længere) — de hedder stadig `.modal-gallery`, `.modal-info` osv. af
  historiske årsager (genbrugt fra prototypens produkt-modal). Ryd ikke op i
  navngivningen uden at opdatere både `sections/main-product.liquid` og
  `assets/theme.css` samtidig.

## Arkitektur — kort

- `layout/theme.liquid` sætter CSS-variabler fra Temaindstillinger
  (`settings.color_*`) og eksponerer `window.Sovnig.routes/strings/moneyFormat`
  til JS, inden `assets/*.js` indlæses.
- Kurv-draweren (`sections/cart-drawer.liquid`) er en statisk sektion
  (renderes direkte fra `theme.liquid`, ikke fra en JSON-template), så den
  kan gen-hentes via Section Rendering API (`?section_id=cart-drawer`) efter
  hver AJAX cart-mutation — se `assets/cart.js`.
- `/cart`-siden (`sections/main-cart.liquid`) bruger bevidst **native
  formular-submit** (ikke AJAX) for at undgå duplikerede DOM-id'er med
  kurv-draweren og for at virke uden JavaScript. Rør ikke ved dette uden at
  løse id-kollisionen ordentligt igen.
- Produktsidens variant-logik (`assets/product-form.js`) matcher valgte
  optioner mod en JSON-blob af `product.variants`, embedded i
  `sections/main-product.liquid` (`#ProductJSON-*`).

## Kendte forenklinger (dokumenteret i README.md)

- Produktsidens accordion-indhold (Produktdetaljer/Materialer/Fragt &
  retur/Vedligeholdelse) er sat via `templates/product.json` som samme
  default-tekst for alle produkter — ikke per-produkt via metafields. Hvis
  det bliver nødvendigt, er næste skridt at flytte indholdet til metafields
  og læse dem i `sections/main-product.liquid`.
- Quick-add på produktkort tilføjer altid `selected_or_first_available_variant`
  — der er ingen mini variant-picker i selve kortet.

## Hvor tingene bor

Se README.md → "Arkitektur" for den fulde mappeoversigt, og "Hvad er
dynamisk vs. placeholder" for hvad der stadig kræver rigtigt indhold.
