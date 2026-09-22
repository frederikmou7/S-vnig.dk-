# CLAUDE.md — SOMIRA.DK

## 1. Projektet

Dette repository er den officielle kodebase for **Somira.dk**.

Somira er et dansk e-commerce brand inden for søvn, komfort, aftenrutiner og sleep accessories.

Shopify bruges til:

- produkter
- priser
- varianter
- lager
- kurv
- checkout
- betaling
- ordre
- kunder
- hosting
- Theme Editor

GitHub er source of truth for theme-koden.

Claude må gerne hjælpe med at udvikle, vedligeholde og forbedre projektet, men skal altid følge reglerne i denne fil.

---

# 2. BRAND

Brandnavn:

**SOMIRA**

Domæne:

**somira.dk**

Primært marked:

**Danmark**

Primært sprog:

**Dansk**

Brug korrekt:

- æ
- ø
- å

Brug dansk valutaformat:

**129 kr.**

Ikke:

**DKK 129**
eller
**129 DKK**

---

# 3. BRANDPOSITIONERING

Somira er et moderne dansk sleep/wellness-brand.

Brandet skal føles:

- moderne
- dansk
- roligt
- enkelt
- troværdigt
- minimalistisk
- skandinavisk
- varmt
- ungt
- premium
- tilgængeligt

Somira skal være:

**premium uden at være luksus**

**sleep wellness uden at være medicinsk**

**ungt uden at være useriøst**

**skandinavisk uden at være kedeligt**

**e-commerce uden at ligne dropshipping**

Somira skal IKKE ligne:

- apotek
- medicinsk hjemmeside
- klassisk sengetøjsbutik
- aggressiv dropshipping-shop
- discountwebshop
- ekstremt dyrt luksusbrand
- generisk Shopify-template

---

# 4. PRODUKTSTRATEGI

Somira er en dropshipping-forretning i opstartsfasen. Produkterne kommer fra udvalgte leverandører i EU — ikke fra egen produktion. Det kan ændre sig senere, men er udgangspunktet for alt herunder, indtil andet er besluttet.

Brandet skal ikke kun handle om dyre produkter.

Produktstrukturen er:

## Entry products

Ca. 99–249 kr.

Eksempler:

- næsestrips
- ørepropper
- duftpose med lavendel
- silke scrunchie

Næsestrips og ørepropper må **kun** sælges under det navngivne, CE-mærkede mærke, de allerede har (se punkt 16 og 17) — aldrig under navnet Somira.

## Bundles

Ca. 349–599 kr.

Eksempel:

- Rejsesæt (fx sovemaske + scrunchie + duftpose)

Bland ikke medicinsk udstyr eller høreværn ind i et sæt. Det gør Somira til juridisk fabrikant af hele sættet, ikke kun af det enkelte produkt.

## Silke-serien

Ca. 250–600 kr.

Eksempler:

- Silke Sovemaske
- Silke Pudebetræk

Sourcet hos en leverandør, der tilbyder white-label/dropshipping (pr. nu under afklaring: Moonsilk, Estland). Disse produkter må gerne bære Somira-navnet, når leverandøren tillader det.

## Hero products

Endnu ikke afklaret.

Et større, dyrere hovedprodukt (fx en pude) har ikke en leverandør endnu og er ikke en del af det aktuelle sortiment. Tilføj det først, når en leverandør og en reel pris er på plads.

Forretningsidéen er, at en kunde kan opdage Somira gennem et mindre produkt og senere købe dyrere produkter.

Hjemmesiden skal understøtte denne kunderejse.

---

# 5. FREMTIDIGE PRODUKTKATEGORIER

Brandet skal kunne vokse til blandt andet:

- silke-tilbehør (pudebetræk, sovemasker, scrunchies)
- næsestrips
- ørepropper
- duftprodukter til aftenrutiner
- puder
- sengetøj
- dyner
- cooling products
- mørklægningsprodukter
- travel sleep products

Undgå at bygge theme-arkitekturen så snævert, at den kun fungerer til nuværende produkter.

---

# 6. DESIGN — MEGET VIGTIGT

Den oprindelige Somira-prototype er den **visuelle source of truth**.

Referencefilerne ligger i:

`/reference/index.html`

`/reference/style.css`

`/reference/script.js`

Ved designændringer skal disse filer bruges som visuel reference.

Den nuværende Shopify-version skal så vidt muligt ligne den originale prototype.

Claude må IKKE ændre det visuelle design efter egen vurdering.

Claude må IKKE:

- modernisere designet uden besked
- "forbedre" layoutet uden besked
- ændre typografi efter egen smag
- ændre farver efter egen smag
- ændre spacing markant
- ændre produktkort-layout
- ændre hero-layout
- ændre section order
- ændre button styling
- introducere nye designtrends
- ændre brandudtrykket

Hvis en ændring kræver en visuel afvigelse, skal Claude gøre opmærksom på det først.

---

# 7. DESIGNPRINCIPPER

Designet skal fortsat være:

- minimalistisk
- editorial
- roligt
- skandinavisk
- premium
- luftigt

Prioritér:

**brand > template**

**editorial > cards**

**store billeder > UI**

**whitespace > clutter**

**premium > promotional**

Undgå:

- overdreven brug af cards
- gradients
- neon
- lilla sleep-app-look
- medical blue
- aggressive sales banners
- blinkende elementer
- overdreven animation
- store discount badges
- popups overalt

---

# 8. FARVER

Hold dig til det eksisterende designs farvesystem.

Primære retninger:

- varm off-white
- creme
- sand
- beige
- taupe
- mørk brun
- charcoal

Introducér ikke nye accentfarver uden eksplicit instruktion.

---

# 9. TYPOGRAFI

Bevar den nuværende typografi så tæt som muligt.

Ændr ikke:

- font families
- font sizes
- font weights
- line heights
- letter spacing

uden eksplicit grund eller instruktion.

Hvis Google Fonts fortsat anvendes for at bevare det originale design, er det bevidst.

---

# 10. SPACING OG LAYOUT

Bevar den eksisterende prototype som reference for:

- section heights
- paddings
- margins
- container widths
- grids
- column widths
- image aspect ratios
- alignments
- whitespace

Ved konvertering til Shopify må funktionalitet ikke føre til unødvendige visuelle ændringer.

---

# 11. MOBILE FIRST

Alle ændringer skal testes på mindst:

- ca. 375 px
- ca. 768 px
- ca. 1440 px

Krav:

- ingen horizontal overflow
- touch targets skal fungere
- tekst må ikke klippe
- billeder skal croppe korrekt
- navigation skal fungere
- cart drawer skal fungere

Mobile må ikke behandles som en eftertanke.

---

# 12. SHOPIFY

Projektet er et Shopify Online Store 2.0 theme.

Brug korrekt:

- Liquid
- JSON templates
- sections
- blocks
- snippets
- Shopify product objects
- Shopify menus
- Shopify cart
- Shopify forms
- Theme Editor settings

Hardcode ikke data, som naturligt bør komme fra Shopify.

Eksempler:

- produktnavne
- priser
- varianter
- lager
- produktbilleder
- collection-indhold
- menu-links

---

# 13. SHOPIFY THEME EDITOR

Hvor det giver mening, skal indhold være redigerbart via Theme Editor.

Eksempelvis:

- overskrifter
- brødtekst
- billeder
- CTA-tekst
- CTA-links
- udvalgte produkter
- hero-produkt
- sektion visibility
- enkelte theme settings

Men Theme Editor-fleksibilitet må ikke ødelægge designet.

Undgå overengineering.

---

# 14. PRODUKTSIDER

Produktsiden skal bruge rigtige Shopify-data.

Den skal understøtte:

- produktbilleder
- pris
- compare-at price
- varianter
- quantity
- availability
- add to cart
- information accordions
- relaterede produkter

Hardcode ikke produktspecifikke oplysninger på tværs af alle produkter.

På sigt bør produktdata kunne styres med metafields, hvor det giver mening.

---

# 15. CART

Cart drawer skal bruge Shopifys rigtige cart.

Den skal understøtte:

- add
- remove
- quantity increase
- quantity decrease
- subtotal
- cart count
- checkout

Fri fragt-grænsen er foreløbig:

**499 kr.**

Gør denne indstilling nem at ændre.

---

# 16. CLAIMS OG COMPLIANCE

MEGET VIGTIGT:

Claude må ikke opfinde:

- medicinske claims
- sundhedsclaims
- dokumenterede effekter
- certificeringer
- tests
- materialer
- kundetal
- anmeldelser
- Trustpilot-score
- performance claims

Hvis noget ikke er verificeret, skal det være placeholder eller formuleres neutralt.

Undgå fx formuleringer som:

- "behandler snorken"
- "forbedrer iltoptagelsen"
- "forhindrer søvnapnø"
- "giver dybere søvn"
- "øger REM-søvn"

uden dokumentation.

---

# 17. NÆSESTRIPS OG MUNDTAPE

Disse produkter kræver ekstra forsigtighed.

Brug neutrale produkttekster.

Undgå medicinske eller fysiologiske løfter.

Mundtape skal behandles som et produkt, der kræver særskilt sikkerheds- og compliance-gennemgang før lancering.

---

# 18. ANMELDELSER

Indtil Somira har rigtige kunder:

- brug ikke falske anmeldelser som ægte social proof
- brug ikke falske ratings
- brug ikke falske kundetal
- brug ikke falsk Trustpilot

Demo-anmeldelser skal tydeligt markeres som:

**DEMO**

eller

**PLACEHOLDER**

---

# 19. BRANDTONE

Tekster skal være:

- korte
- naturlige
- danske
- moderne
- rolige
- lette at forstå

Undgå corporate-sprog.

Undgå overdreven marketing jargon.

Somira må gerne have lidt personlighed.

Eksempel på tone:

"Alt til en bedre nat."

"Små ting. Bedre nætter."

"Bliv bedre til at sove godt."

"Når verden godt må skrue lidt ned."

Men tonen må ikke blive fjollet eller useriøs.

---

# 20. KODEKVALITET

Før større ændringer:

1. forstå eksisterende kode
2. genbrug eksisterende komponenter hvor muligt
3. undgå unødvendige rewrites

Efter ændringer:

- kør Shopify Theme Check
- ret egentlige errors
- valider relevante JSON-filer
- tjek responsive layouts
- tjek browser console hvis muligt

Målet er:

**0 Shopify Theme Check errors**

Warnings må vurderes konkret.

---

# 21. GIT

GitHub er source of truth.

Lav commits i logiske trin.

Brug tydelige commit messages.

Eksempler:

`Fix product gallery spacing`

`Restore original Somira hero styling`

`Add Shopify metafields for product details`

Undgå kæmpe commits med mange urelaterede ændringer.

---

# 22. BACKUP FØR STORE ÆNDRINGER

Før større:

- refactors
- redesigns
- cart changes
- theme architecture changes
- navigation changes

skal der laves et git commit af den fungerende version først.

Dette gør rollback nemt.

---

# 23. LIVE THEME

Claude må ikke:

- publicere et theme
- overskrive live theme
- pushe direkte til production/live uden eksplicit besked

uden godkendelse.

Arbejd som udgangspunkt på:

- lokal development
- preview theme
- unpublished theme

---

# 24. BEVAR FUNKTIONALITET

Når design ændres, skal eksisterende Shopify-funktionalitet bevares.

Når funktionalitet ændres, skal det eksisterende design bevares så tæt som muligt.

Målet er ikke at vælge mellem design og funktionalitet.

Målet er:

**det originale Somira-design + korrekt Shopify-funktionalitet**

---

# 25. INGEN SELVSTÆNDIGE REDESIGNS

Dette er en vigtig permanent regel:

Claude må ikke selv beslutte, at noget vil "se bedre ud" og derefter ændre designet.

Hvis Claude mener, at en anden løsning er bedre, skal den:

1. forklare problemet
2. foreslå løsningen
3. vente på godkendelse, hvis ændringen er visuelt betydelig

---

# 26. PRIORITERING VED KONFLIKT

Hvis regler eller løsninger konflikter, prioritér i denne rækkefølge:

1. Funktionel og sikker Shopify-butik
2. Bevar Somira-brandet
3. Bevar det originale visuelle design
4. God UX
5. Performance
6. Fleksibilitet i Theme Editor

---

# 27. VED AFSLUTNING AF EN STØRRE OPGAVE

Claude skal kort rapportere:

1. hvilke filer der blev ændret
2. hvad der blev ændret
3. om designet blev påvirket
4. om Shopify Theme Check består
5. om noget stadig er placeholder
6. om der er noget ejeren skal konfigurere i Shopify Admin

Hold rapporten kort og konkret.

---

# 28. TEKNISK ARKITEKTUR (implementeringsnoter)

Denne sektion er ikke en del af brand-/designreglerne ovenfor, men praktiske
noter om hvordan theme'et rent teknisk hænger sammen — til hurtig orientering
i fremtidige sessioner.

- `layout/theme.liquid` sætter CSS-variabler fra Temaindstillinger
  (`settings.color_*`) og eksponerer `window.Somira.routes/strings/moneyFormat`
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
- `.modal-*`-CSS-klasserne bruges til produktsidens layout (ikke en overlay
  længere) — de hedder stadig `.modal-gallery`, `.modal-info` osv. af
  historiske årsager (genbrugt fra prototypens produkt-modal, som stadig
  findes i `reference/`). Ryd ikke op i navngivningen uden at opdatere både
  `sections/main-product.liquid` og `assets/theme.css` samtidig.
- Produktsidens antal-vælger bruger bevidst en synlig `<span>` (matcher
  prototypens `.qty-stepper span`) plus en skjult `<input type="hidden">` til
  selve form-submittet — ikke et synligt `<input type="number">`, som ville
  afvige visuelt fra originalen.

## Kendte forenklinger (uddybet i README.md)

- Produktsidens accordion-indhold (Produktdetaljer/Materialer/Fragt &
  retur/Vedligeholdelse) er sat via `templates/product.json` som samme
  default-tekst for alle produkter — ikke per-produkt via metafields endnu
  (se punkt 14 ovenfor: dette bør flyttes til metafields, når det giver mening).
- Quick-add på produktkort tilføjer altid `selected_or_first_available_variant`
  — der er ingen mini variant-picker i selve kortet.
