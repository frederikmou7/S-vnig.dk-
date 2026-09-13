# Søvnig — Shopify-tema

Søvnig er et dansk DTC-brand for produkter til søvn, komfort og aftenrutiner.
Dette repository indeholder brandets **Shopify Online Store 2.0-tema** —
konverteret fra en statisk HTML/CSS/JS design-prototype (se
[`reference/`](reference/)) til et rigtigt tema med sections, blocks,
JSON-templates og en fungerende Shopify-kurv.

Designet er bevaret så tæt på prototypen som muligt. Al produktdata (titel,
pris, billeder, varianter, lager) kommer nu fra Shopify i stedet for at være
hardcodet.

## Indhold

- [Arkitektur](#arkitektur)
- [Lokal udvikling](#lokal-udvikling)
- [Forbind repository til en Shopify-butik](#forbind-repository-til-en-shopify-butik)
- [Push og preview](#push-og-preview)
- [Hvad er dynamisk vs. placeholder](#hvad-er-dynamisk-vs-placeholder)
- [Ting der skal konfigureres i Shopify Admin](#ting-der-skal-konfigureres-i-shopify-admin)

## Arkitektur

```
layout/
  theme.liquid          Overordnet HTML-skelet, indlæser CSS/JS, header/footer
templates/
  index.json             Forside — samler sections i rækkefølge
  product.json            Produktside
  collection.json          Kategoriside
  cart.json                 Kurv-side (fallback)
  page.json                  Generisk indholdsside
  search.json                  Søgeresultater
  404.json                      404-side
sections/
  header.liquid, footer.liquid, announcement-bar.liquid
  hero.liquid, intro.liquid, featured-products.liquid,
  editorial.liquid, principles.liquid, featured-product.liquid,
  reviews.liquid, bundle-promo.liquid, newsletter.liquid   (forside-sektioner)
  main-product.liquid, related-products.liquid              (produktside)
  main-collection.liquid                                       (kategoriside)
  main-cart.liquid, cart-drawer.liquid                            (kurv)
  main-page.liquid, main-search.liquid, main-404.liquid            (øvrige sider)
snippets/
  product-card.liquid, price.liquid, cart-item.liquid,
  cart-item-page.liquid, mobile-nav.liquid, search-drawer.liquid,
  icon-*.liquid
assets/
  theme.css               Al styling — porteret fra reference/style.css
  global.js                 Header-scroll, menuer, søgeoverlay, accordion, reveal
  cart.js                     AJAX-kurv (add/change/quick-add), kun via Shopify cart API
  product-form.js               Variant-valg, antal, galleri, relaterede produkter
  predictive-search.js            Shopify Predictive Search (/search/suggest.json)
config/
  settings_schema.json + settings_data.json   Temaindstillinger (farver, kurv, sociale medier)
locales/
  da.default.json          Alle synlige tekststrenge på dansk
reference/
  index.html, style.css, script.js   Den oprindelige statiske design-prototype (kun til reference)
```

## Lokal udvikling

Kræver [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) og en Shopify Partner- eller butikskonto.

```bash
# Installer Shopify CLI (macOS via Homebrew)
brew tap shopify/shopify
brew install shopify-cli

# Log ind
shopify auth login

# Start lokal udviklingsserver mod en testbutik
shopify theme dev --store=din-butik.myshopify.com
```

`shopify theme dev` starter en lokal server (typisk `http://127.0.0.1:9292`)
med hot reload af Liquid/CSS/JS mod en rigtig, midlertidig forhåndsvisning af
temaet på den valgte butik — inklusiv rigtig kurv, checkout og produktdata.

## Forbind repository til en Shopify-butik

1. Opret eller brug en eksisterende Shopify-butik (en gratis udviklingsbutik
   via [Shopify Partners](https://partners.shopify.com) er fint til test).
2. Kør `shopify auth login` og vælg butikken.
3. Kør `shopify theme dev --store=din-butik.myshopify.com` fra roden af dette
   repository for at forhåndsvise temaet lokalt.
4. Når temaet er klar til rigtig test på butikken, brug `shopify theme push`
   (se næste afsnit) — det opretter/opdaterer temaet i butikkens
   Admin → Temaer.
5. GitHub forbliver source of truth: al temakode committes og pushes til
   dette repository. Overvej senere at koble et branch direkte til Shopify
   via **Admin → Temaer → Tilføj tema → Forbind fra GitHub**, så hvert push
   til branchen automatisk opdaterer et tema i butikken.

## Push og preview

```bash
# Push til et NYT, unpublished tema (sikkert — påvirker ikke live-butikken)
shopify theme push --unpublished --store=din-butik.myshopify.com

# Hent et preview-link uden at publicere
shopify theme push --store=din-butik.myshopify.com --theme=<theme-id>

# Publicer temaet som butikkens live tema (kør først når I er klar)
shopify theme publish --theme=<theme-id> --store=din-butik.myshopify.com
```

Brug altid `--unpublished` eller et development-tema, indtil designet er
godkendt — så påvirker det aldrig den aktive butik.

## Hvad er dynamisk vs. placeholder

**Dynamisk fra Shopify:**
- Produkttitel, pris, compare-at price, billeder, varianter, lager/availability
- Kurv (tilføj, ret antal, fjern, subtotal, item count) — rigtig Shopify AJAX-kurv
- Checkout — går til Shopifys rigtige checkout
- Navigation (header-menu og footer-kolonner via Shopify-menuer)
- Søgning — rigtig Predictive Search + søgeresultatside
- Nyhedsbrev — rigtig Shopify customer-formular (opretter/tagger en kunde)
- Relaterede produkter — Shopifys Product Recommendations API
- Farver, fri fragt-beløb, sociale medie-links — Temaindstillinger
- Hero, intro, udvalgte produkter, editorial, principper, hero-produkt,
  anmeldelser, sæt-promo, nyhedsbrevstekst — alt redigerbart via
  Temaeditoren (sections + blocks)

**Stadig placeholder / kræver jeres input (markeret i koden):**
- Produktbeskrivelser, materialer og accordion-tekster på produktsiden er
  standard-tekst pr. tema (ikke pr. produkt via metafields endnu) — se
  `templates/product.json` og note i `sections/main-product.liquid`.
- USP-listen ("Premium komfort" osv.) er tydeligt markeret med `*` og en
  disclaimer-tekst, både på forsiden og produktsiden.
- De tre anmeldelser i `reviews`-sektionen er demo-indhold med et synligt
  "Demo-anmeldelser"-mærkat — udskift med rigtige anmeldelser (eller kobl et
  rigtigt anmeldelses-app til) før lancering.
- `reference/`-mappen er den oprindelige statiske prototype og indgår ikke i
  det byggede tema — den er kun bevaret som visuel facitliste.

## Ting der skal konfigureres i Shopify Admin

1. **Opret produkter** svarende til Søvnig-sortimentet (Puden, Næsestrips,
   Sovemasken, Sættet m.fl.) med rigtige billeder, priser og varianter.
2. **Vælg produkter** i Temaeditoren for sektionerne "Udvalgte produkter",
   "Hero-produkt" og "Sæt-promo" (de er tomme/placeholder, indtil et produkt
   er valgt).
3. **Opret navigationsmenuer** under Admin → Online Store → Navigation:
   - en hovedmenu (fx håndtag `main-menu`) til header/mobilmenu
   - en footer-menu (håndtag `footer`) med topniveau-links som kolonneoverskrifter
     (fx "Shop", "Om Søvnig", "Hjælp") og underliggende links som kolonneindhold
4. **Opret collections** (Alle produkter, Aftenrutine, Mørke & ro, Komfort,
   Puder, Kits) og evt. tilføj dem til navigationsmenuen.
5. **Butikkens valuta og prisformat**: sæt korrekt dansk prisformat under
   Admin → Settings → General → Store currency formatting, så priser vises
   som "799 kr." osv.
6. **Sociale medie-links**: udfyld Instagram/TikTok/Pinterest-URL'er under
   Temaindstillinger → Sociale medier (tomme felter skjuler ikonet — der er
   ikke gættet på rigtige profil-URL'er).
7. **Fri fragt-beløb**: sat til 499 kr. som foreløbig værdi under
   Temaindstillinger → Kurv — ret det når det rigtige beløb er besluttet.
8. **Betaling og fragtmetoder** sættes op under Admin → Settings → Payments
   / Shipping, som med enhver anden Shopify-butik.
