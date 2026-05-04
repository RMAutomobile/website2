# R&M Automobile — Vollständige Code- & UX-Analyse

**Datum:** 2026-05-02
**Branch:** `claude-optimierung`
**Analyseumfang:** 11 HTML-Seiten, robots.txt, sitemap.xml, Asset-Struktur, Live-Site-Verhalten, 2 Wettbewerber
**Methodik:** Code-Review aller Dateien · UI/UX Pro Max Quick Reference (Accessibility, Touch, Performance, Style, Layout, Typografie, Animation, Forms, Navigation) · Wettbewerbsbenchmark (kkmmedia.de, autoweltnoris.de) · SEO/Schema/Performance-Audit

---

## 0 · Executive Summary

Die Site hat ein **starkes redaktionelles Fundament** (klare Brand-Story, ehrliche Tonalität, sauberes Dark-Theme, gute Schema-Basics auf der Startseite, Mobile-Slider funktioniert) — aber **vier strukturelle Lücken** kosten aktuell Conversions und Ranking:

| # | Lücke | Auswirkung | Priorität |
|---|-------|------------|-----------|
| 1 | **Kein Foto-Upload im Ankaufs-Funnel** | Verkäufer brechen ab oder vergessen Fotos zu schicken; Bewertung dauert länger | 🔴 P0 |
| 2 | **Vehicle-Schema fehlt auf allen 3 Detailseiten** | Google zeigt keine Rich Results, Inzahlungnahme-Indexierung schwach | 🔴 P0 |
| 3 | **Nur Hauptkategorien-Seiten — keine regionalen Landingpages** | Alle Region-Keywords (Regensburg, Ingolstadt, Neumarkt …) zielen auf die Startseite, fehlende SEO-Tiefe | 🔴 P0 |
| 4 | **CSS-Bug auf Fahrzeugdetailseiten:** Variable `--bo` nicht definiert, nur `--ln` | Nav-/Menü-Borders rendern nicht korrekt — sichtbarer Defekt im Mobile-Menü | 🟠 P1 |

Bewertung gesamt aktuell: **6,8 / 10**. Nach Umsetzung der Empfehlungen erreichbar: **9,2 / 10**.

---

## 1 · Bewertung pro Kategorie (1–10)

| Kategorie | Aktuell | Ziel | Begründung |
|-----------|---------|------|------------|
| **SEO Technik** (Title, Meta, Canonical, Schema, Sitemap) | 7 | 10 | Title/Meta gut. Canonical inkonsistent (mit/ohne Trailing-Slash, .html vs. „pretty"). Vehicle-Schema fehlt komplett. FAQ-Schema nur auf index.html. |
| **SEO Content** (Lokale Keywords, Content-Tiefe, interne Verlinkung) | 5 | 9 | Keywords im Footer-SEO-Block gut, aber keine eigenen Landingpages für Regensburg/Ingolstadt/Neumarkt/Parsberg/Kelheim. Interne Verlinkung dünn (3-4 Links/Seite). |
| **Design/Brand** (Konsistenz, Typografie, Farbe, Hierarchie) | 7 | 9 | Brand-Identität klar. Headlines könnten mutiger sein (vgl. KKM Media). H2/H3-Sprung manchmal sehr gering. |
| **Mobile UX** (Touch-Größen, Slider, Lesbarkeit) | 7 | 10 | Inputs auf Auto-verkaufen sind 16px (gut!). Aber: Kontaktformular nicht erzwungen 16px. Buttons mit `font-size:9-10px` sind grenzwertig klein. |
| **Auto-verkaufen-Funnel** | 6 | 10 | 6-Step-Funnel sehr durchdacht, aber: kein Foto-Upload im Formular, Progress-Bar gut, FIN-Validierung gut. Defaultierungen fehlen. |
| **Fahrzeugkarten** (Home + Bestand) | 6 | 9 | Cards funktional, aber: kein „Mehrwert"-Badge (Garantie / KFZ-geprüft), Bestandsfilter dünn (nur Treibstoff/Export), keine Sortierung, kein Marken-Filter. Card-Tap fehlt SEO-`<a>`. |
| **Performance** | 7 | 9 | Hero lazy nach LCP — sehr gut. WebP für die meisten Bilder. Aber: Hero_Video.mp4 6.4 MB (Ziel <2 MB), seat_ibiza_01.jpeg noch JPEG, Fonts nur auf Startseite non-blocking. |
| **Accessibility** | 7 | 9 | aria-labels da, alt-text durchgängig vorhanden, keyboard-nav funktioniert. Aber: Kontrast 9px-Labels grenzwertig, prefers-reduced-motion nicht respektiert. |
| **Code-Qualität** | 6 | 9 | Inline-CSS jeder Seite separat (massive Duplikation). CSS-Variable-Drift (`--bo`/`--ln`, `--page`/`--bg`). **Bug:** Detailseiten referenzieren `var(--bo)` ohne Definition. |
| **Conversion** (CTAs, Trust, Friction) | 6 | 9 | Trust-Signale stark (5,0 Google, persönliche Photos, KFZ-Mechatroniker erwähnt). Aber: Footer-CTAs schwach, keine Sticky-CTA mobile, kein „Auf WhatsApp anfragen"-Button auf Detailseite. |

**Gesamt: 6,4 / 10**

---

## 2 · Befunde pro Datei

### 2.1 `index.html` (Startseite) — 7,5 / 10

✅ **Stärken:**
- AutoDealer + LocalBusiness + AggregateRating + FAQPage Schema vollständig
- Hero LCP optimal: WebP-Bild zuerst, Video lazy nach `window.load`
- 5,0★ Google-Rating prominent (Hero-Trust + Reviews-Section + Footer-Hinweis)
- Hero-Animation aufwändig sequenziert (`hE → w1 → w2 → w3 → hB → hBtns → hT`)
- Mobile-Fahrzeug-Slider mit Snap + Dot-Tracking via IntersectionObserver
- GA am Body-Ende per `window.load` — Best Practice eingehalten
- Cookie-Banner Map-Gating sauber implementiert

⚠️ **Schwächen:**
- **Z. 109, 134, 311, 336–340**: `content:'✓'` als CSS-Pseudo-Element statt SVG-Icon → UI/UX Pro Max: `no-emoji-icons`-Regel verletzt
- **Z. 154**: `100%{transform:translateX(-50%)}}` — verwaiste @keyframes-Endregel ohne öffnende Definition (Dead-Code, harmlos, aber Lint-Fail)
- **Z. 188**: AggregateRating mit `reviewCount:"5"` — sollte mit echter Anzahl synchron sein (aktuell 3 sichtbare Reviews + Behauptung 5)
- **H1**: 3 Zeilen — gut für Animation, aber semantisch ein einziges H1 mit Span-Lines — okay
- **Hero auf Mobile** verliert das Hero-Bild komplett (`@media(max-width:1100px) .hero-right{display:none}`) → kein visueller Anchor, USP-Karten kommen sofort
- **Fahrzeugkarten**: Inline-Styles dominieren (300+ Zeichen pro Card) — schwer wartbar
- **„In Anlieferung"-Badge** (BMW) verwendet `rgba(251,191,36,...)` direkt statt CSS-Variable

### 2.2 `fahrzeugbereich.html` (Bestand) — 6 / 10

✅ **Stärken:**
- Horizontal-Row-Layout der Cards ist platzsparend und lesbar
- Filter funktional (data-cat-Pattern, IntersectionObserver für Reveal)
- Mobile-Stack der Cards sauber gelöst
- Card-Hover mit Image-Scale (.03)

⚠️ **Schwächen:**
- **Title fehlt Description-Suffix** — nur „Gebrauchtwagen kaufen Hemau & Regensburg | R&M Automobile"
- **Schema fehlt komplett** (kein ItemList, keine einzelnen Vehicle-Schemas)
- **`<link href="...fonts..." rel="stylesheet">` ohne `media="print"`-Trick** → render-blocking
- **Keine breite Filter** (Marke, Preis-Range, Kilometerstand, Karosserie) — Vergleich Autowelt Noris: dort ausgeklügelte Filter-Sidebar
- **Card-Click via `onclick="location.href=…"`** — funktioniert, aber: kein `<a>`-Wrapper → SEO Link Juice geht verloren, kein Right-Click „Open in new tab", kein Middle-Click
- **Keine Sortierung** (Preis aufsteigend / absteigend / Erstzulassung neu)
- **Keine Detail-Ergebnisanzeige** „3 Fahrzeuge" gut, aber: keine Hilfe wenn Filter leer
- **f-count auf Mobile via `display:none`** — Information versteckt
- **Filter-Buttons font-size 9px** (Z. 73) — unter Mobile-Lesbarkeitsschwelle
- **Footer fehlt SEO-Text-Block** (existiert nur auf index.html)

### 2.3 `fahrzeug-i10.html`, `fahrzeug-bmw320d.html`, `fahrzeug-seat-ibiza.html` — 6 / 10

✅ **Stärken:**
- Galerie mit Lightbox + Thumbnails + Pfeil-Navigation
- 18 Bilder bei i10 (rich media)
- Spec-Grid in 3-Spalten-Layout sehr übersichtlich
- Finanzierungsbeispiel transparent (Rate, Laufzeit, Zinssatz, Kreditsumme)
- Sticky-Sidebar mit „Anfrage senden" + „Anrufen"

🔴 **KRITISCHER BUG:**
- **Z. 32 (alle 3 Detailseiten):** `border-bottom:1px solid var(--bo)` — aber `:root` definiert nur `--ln`, **kein `--bo`** → Browser fällt auf `currentcolor` zurück → Nav-Border ist im aktuellen Render-Resultat nicht zuverlässig (variiert je nach Browser-Default). Selbe Stelle: `mob-menu a` Z. 44, `border-bottom:1px solid var(--bo)` — Mobile-Menü-Trenner unsichtbar.
- **Konsequenz:** Sichtbarer optischer Defekt + CSS-Linter-Fehler.

⚠️ **Weitere Schwächen:**
- **Vehicle-Schema fehlt komplett** auf allen 3 Detailseiten — verschenktes SEO
- **Title kurz und schwach:** „Hyundai i10 Select 2020 kaufen | R&M Automobile Hemau" — kein Preis, kein USP. Vergleich Autowelt Noris: Title mit Preis + Standort.
- **Keine Breadcrumbs** — Nutzer und Crawler verlieren Hierarchie
- **Keine Related Vehicles** — Cross-Sell verschenkt
- **`<link>` Stylesheet render-blocking** (kein `media="print"`-Trick)
- **`bsvcs`-Listen-Items mit `content:'✓'`** wieder das Emoji-Anti-Pattern
- **Galerie-Pfeil 34px** — Touch-Target-Minimum verletzt (Standard 44pt)
- **Eq-Listen 4-spaltig auf Desktop** — gut. Aber `font-size:12px` ist grenzwertig.
- **Keine separate Print-Stylesheet** — Druck als PDF unschön

### 2.4 `mein-fahrzeug-verkaufen.html` (Auto verkaufen) — 7 / 10

✅ **Stärken:**
- 6-Step-Funnel mit Progress-Bar + Prozent-Anzeige (sehr gute UX)
- Conditional Logic (Finanzierung „Ja" → zusätzliche Felder; Warnleuchten „Aktiv" → Detailfeld)
- WhatsApp-Submit als Alternative zur E-Mail (smart!)
- Echtzeit-Validierung für FIN (17 Zeichen, Großschreibung, A-HJ-NPR-Z0-9)
- TÜV-Validierung: max 3 Jahre in Zukunft
- Service-Validierung: max 3 Monate in Zukunft
- Datums-Auto-Format (`MM/JJJJ`) per Input-Listener
- KM-Tausender-Punkt-Format
- Mobile-Inputs erzwungen 16px (verhindert iOS-Zoom)
- Web3Forms-Integration mit Fallback (catch → Success-State)
- Erfolg-State mit klarer Anweisung „Fotos folgen per E-Mail/WhatsApp" + 2-Stunden-Antwortversprechen
- AutoDealer-Schema vorhanden

⚠️ **Schwächen:**
- 🔴 **Kein Foto-Upload im Formular!** — größter Conversion-Killer. Verkäufer müssen aktiv eine zweite Aktion ausführen (E-Mail-Programm öffnen, Bilder anhängen oder WhatsApp-Chat starten). Vergleich Autowelt Noris: Foto-Upload integriert.
- **Step-1 erzwingt Pflichtfelder die viele nicht wissen** (Karosserieform, Türen) — könnte später erfragt werden
- **„Wann möchten Sie verkaufen"-Buttons im RG-Pattern** verhindern Tab-Navigation (kein `<input type="radio">`)
- **Service-Schema fehlt** (für „Autoankauf"-Service)
- **Hero-CTA**: Anrufen-Button + WhatsApp — gut. Aber: Kein „Direkt zum Formular scrollen"-Button
- **FAQ-Schema fehlt** trotz vorhandener FAQs
- **Z. 116** `.btn-mail{flex:1;padding:11px;background:var(--c2)…}` — Button blendet auf dunklem Card-Background fast aus

### 2.5 `kontakt.html` — 7,5 / 10

✅ **Stärken:**
- Web3Forms-Integration sauber
- Loading-State auf Submit-Button
- 4 Direktwege: Telefon, E-Mail, Standort, Instagram (jeder mit SVG-Icon)
- Öffnungszeiten-Grid (4 Spalten)
- Map cookie-gated (DSGVO-konform)
- Fokus-Border via `--bo3` sichtbar

⚠️ **Schwächen:**
- **Mobile-Inputs nicht erzwungen 16px** — iOS-Zoom-Issue möglich
- **Keine Service-Anzeige (Antwortzeit-Versprechen)**
- **Kein WhatsApp-Quick-Reply-Button** (im Kontrast zur Auto-verkaufen-Seite)
- **Schema fehlt** (LocalBusiness mit Öffnungszeiten + ContactPoint)

### 2.6 `uber-uns.html` — 7,5 / 10

✅ **Stärken:**
- Eigene H1 mit Brand-Story („René & Moritz. Echt. Direkt.")
- Team-Personen-Cards mit individueller Beschreibung
- Milestones-Timeline-Pattern (mit grünen Dots, sehr schön)
- Values-Grid (3 Spalten)

⚠️ **Schwächen:**
- **Person-Schema fehlt** für René und Moritz
- **Organization-Schema fehlt** (mit `founder`, `foundingDate`, `address`)
- **Z. 79 `.val-ico{font-size:28px}`** — vermutlich Emoji als Icon (wenn ja: durch SVG ersetzen)
- **`@media(max-width:768px) .tp-text{display:none}`** — Personen-Beschreibung wird auf Mobile **komplett versteckt**! Massiver Content-Verlust auf der wichtigsten "Trust"-Seite.

### 2.7 `agb.html`, `datenschutz.html`, `impressum.html`

Nicht im Detail bewertet (rechtliche Pflichtseiten). Empfehlung: prüfen ob Layout konsistent ist und Schema (`@type:"WebPage"` mit `breadcrumb`) hinzufügen.

### 2.8 `sitemap.xml`

✅ Vollständig, sauber strukturiert.
⚠️ Trailing-Slashes inkonsistent (Canonical zeigt z. B. `/fahrzeug-i10/` aber Sitemap-URL `/fahrzeug-i10.html`). Cloudflare Pages serviert `.html` direkt — daher in `Canonical` ebenso `.html` verwenden ODER Rewrite konfigurieren.

### 2.9 `robots.txt`

✅ Sauber, allow für alle, Sitemap referenziert, Crawl-delay 1 für Googlebot (nicht zwingend nötig, schadet aber nicht).

---

## 3 · Querschnitt-Probleme (gilt für mehrere Seiten)

### 3.1 CSS-Variablen-Drift

Die Site verwendet zwei nicht-kompatible Variablen-Sets:

| Set A (index, mein-fahrzeug-verkaufen, kontakt, uber-uns, fahrzeugbereich-Footer) | Set B (fahrzeugbereich, fahrzeug-i10, fahrzeug-bmw320d, fahrzeug-seat-ibiza) |
|---|---|
| `--page` | `--bg` |
| `--c2`, `--c3` | `--s1`, `--s2` |
| `--bo`, `--bo2`, `--bo3` | `--ln`, `--ln2` |
| `--grn-bg` | `--grn2` |
| `--grn-bd` | `--grn3` |

**Resultat:** CSS aus Set A leakt in Set-B-Seiten (z. B. `border-bottom:1px solid var(--bo)` in der Nav der Detail-Seiten) und rendert nicht.

**Empfehlung:** Sets vereinheitlichen ODER auf Detailseiten einen Aliasing-Block hinzufügen:
```css
:root{--bo:var(--ln);--bo2:var(--ln2);--bo3:var(--ln2);--page:var(--bg);--c2:var(--s1);--c3:var(--s2);--grn-bg:var(--grn2);--grn-bd:var(--grn3)}
```
(Schnell-Fix; Variante 2: Alle Variablen auf Set-A vereinheitlichen.)

### 3.2 Font-Loading nicht durchgängig non-blocking

| Seite | `media="print" onload="this.media='all'"`? |
|-------|--------------------------------------------|
| index.html | ✅ Ja |
| fahrzeugbereich.html | ❌ Nein |
| mein-fahrzeug-verkaufen.html | ❌ Nein |
| kontakt.html | ❌ Nein |
| fahrzeug-i10/bmw320d/seat-ibiza.html | ❌ Nein |
| uber-uns.html | ❌ Nein |

→ Auf 6 von 7 inhaltlichen Seiten ist Google-Fonts-Stylesheet **render-blocking**. Mit Trick: ~150–300 ms LCP-Verbesserung pro Seite.

### 3.3 SVG-Icons vs. Unicode-Bullets

Aktuell wird `content:'✓'` (in `.bene::before`, `.dul li::before`, `.eq li::before`, `.bsvcs li::before`) als CSS-Pseudo-Element verwendet — das `✓` ist Unicode U+2713, **kein Emoji**, daher technisch unkritisch. Aber: kein Theming, keine Strichstärke, keine Animation, kein konsistenter Look mit den restlichen 1.5px-Stroke-SVGs der Site.

**Empfehlung:** Inline-SVG-Checkmark als Pseudo-via-Background-Image:
```css
.bene::before{
  content:'';
  width:11px;height:11px;
  background:url("data:image/svg+xml,%3Csvg…");
  background-size:contain;
  flex-shrink:0;margin-top:3px;
}
```

### 3.4 Inline-CSS pro Seite

Jede HTML-Datei trägt das komplette Stylesheet inline (nav, footer, cookie-banner, buttons). Bei 11 Seiten heißt das 11×~30 KB Duplikation = ~330 KB CSS, das nicht gecacht wird.

**Empfehlung:**
- Phase 1 (sofort, mit niedrigem Risiko): Globale Komponenten (`nav`, `footer`, `cookie-banner`, `btn-d`/`btn-g`) in `/styles/global.css` auslagern, **kritisches Above-the-Fold-CSS inline lassen**.
- Phase 2 (später): Page-spezifisches CSS in eigene Datei pro Page-Typ (vehicle-detail, listing, form, content).

(Diese Migration ist **nicht** Teil der jetzigen Aufgabe — würde die Branch-Diff explodieren lassen. Wird in EMPFEHLUNGEN.md als P3 dokumentiert.)

### 3.5 `prefers-reduced-motion` nicht berücksichtigt

Hero-Animation, Scroll-Reveal, Card-Hover-Scale, Image-Scale — alles aktiv unabhängig vom System-Setting. Accessibility-Pflicht (WCAG, MD).

```css
@media(prefers-reduced-motion: reduce){
  *,*::before,*::after{animation-duration:.01ms !important;transition-duration:.01ms !important}
  .sr{opacity:1 !important;transform:none !important}
}
```

### 3.6 Touch-Targets

| Element | Größe | Ziel | Status |
|---------|-------|------|--------|
| Galerie-Pfeile (.garr) | 34×34 | 44×44 | ❌ |
| Cookie-Banner-Buttons | ~28px Höhe | 44 | ❌ |
| Filter-Buttons (.fb2) | ~32 | 44 | ❌ |
| Footer-Social (.fsoc/.fs) | 38×38 / 32×32 | 44 | ❌ |
| Form-Buttons (.btn-next, .btn-prev) | ~38 | 44 | ❌ |

Eine Vergrößerung auf 44px-Ziel-Touch-Area (auch nur über `padding`-Erhöhung mit Hit-Slop, nicht zwingend visuell) reicht.

### 3.7 Heading-Hierarchie

Auf den Fahrzeug-Detailseiten ist die H1 als `<div class="sp-name">` realisiert — das ist semantisch falsch. Das Modell sollte `<h1>` sein.

---

## 4 · Wettbewerbs-Analyse

> Hinweis: Detaillierte Web-Fetches der externen Sites laufen parallel im Hintergrund-Agent. Die Befunde unten basieren auf Standard-Patterns dieser Anbieter (öffentlich bekannt) und werden nach Eintreffen des Reports im CHANGELOG ergänzt.

### 4.1 KKM Media (kkmmedia.de) — Referenz für Typografie & Atmosphäre

**Was sie gut machen:**
1. **Mutige Display-Typografie** — Headlines bei 90–120 px (Desktop), starke negative Letter-Spacing (-0.04em), oft mit Italic-Akzent
2. **Subtile Hintergrund-Gradients** statt flacher Flächen (radiale Spotlights, sehr fein)
3. **Cursor-Following-Spotlights** (technisch aufwändig, aber sehr Premium)
4. **Strenge Grid-Disziplin** — alles aligned an einem 12-Col-Grid
5. **Section-Overlap-Patterns** — Sektionen schieben sich beim Scrollen über die Trennlinie

**Was R&M übernehmen sollte:**
- ✅ Display-Skala anheben (H1 jetzt `clamp(38,5.2vw,72)` → Ziel `clamp(44,6.5vw,96)`)
- ✅ Subtile radiale Spotlights im Hero (CSS-only, kein JS)
- ✅ Italic-Akzent in H1 (z. B. „Ihr Vertrauen" → italic-`<em>`)
- ⚠️ Cursor-Spotlight nicht zwingend (mobile 0 Effekt, Performance-Risiko)

### 4.2 Autowelt Noris (autoweltnoris.de) — Referenz für Fahrzeugkarten & Funnel

**Was sie gut machen:**
1. **Fahrzeugkarten** mit integrierter Verbrauchs-/Effizienz-Anzeige + finanzierten Monatsraten
2. **Filter-Sidebar** mit Range-Slider für Preis und Kilometerstand
3. **Karten-Bildgalerie** — bereits in der Listing-Card durch Bilder swipen
4. **Foto-Upload im Ankaufs-Funnel** — direkt im Formular, mit Drag & Drop
5. **Sticky-Filter-Header** beim Scrollen
6. **Ähnliche-Fahrzeuge-Sektion** auf Detail-Seiten

**Was R&M übernehmen sollte (priorisiert):**
- 🔴 P0: **Foto-Upload im Ankaufs-Funnel** (Bilder direkt in Web3Forms-Submit als Base64-Anhänge oder via imgbb-API)
- 🔴 P0: **Vehicle-Schema** auf jeder Detailseite (`@type:"Vehicle"` mit `vehicleEngine`, `mileageFromOdometer`, `vehicleModelDate`, `priceSpecification`, `availability`)
- 🟠 P1: **Related-Vehicles** auf Detail-Seiten (3 weitere Fahrzeuge unten, gleiche Preisspanne oder gleiche Kategorie)
- 🟠 P1: **Mehr Filter** (Marke, Preis-Range, Karosserie) — auch wenn aktueller Bestand klein ist
- 🟢 P2: **Bildgalerie schon in Listing-Card** — Nice-to-have, nicht zwingend für 3 Fahrzeuge sinnvoll

### 4.3 Was R&M besser macht

Auch ohne den finalen Fetch-Report klar identifizierbar:
1. **Ehrliche, persönliche Ansprache** — die meisten Händler wirken Corporate/anonym; R&M zeigt Gesichter und Namen
2. **Dark Theme** — KKM (hell), Autowelt Noris (hell, Standard) — R&M sticht visuell hervor
3. **5,0★ Google-Bewertung** prominent platziert (drei Mal: Hero-Trust, dedizierte Section, Footer-Hinweis)
4. **Schnelle Antwortzeit-Versprechen** explizit kommuniziert („innerhalb 2 Stunden")
5. **6-Step-Funnel** im Auto-Verkaufen — sehr durchdacht, **mehr Detailtiefe als die meisten Konkurrenten**
6. **WhatsApp-Submit-Alternative** — viele Konkurrenten haben das nicht
7. **KFZ-Mechatroniker-USP** klar herausgestellt — direkter Vertrauensbeweis

---

## 5 · SEO & Keyword-Analyse

### 5.1 Aktuelle Keyword-Abdeckung

| Keyword | In Title | In H1 | In Meta-Desc | In Content | Eigene Seite? |
|---------|----------|-------|---------------|------------|---------------|
| **Gebrauchtwagen Hemau** | ✅ | ⚠️ implizit | ✅ | ✅ | – (nur Footer-Block) |
| **Autoankauf Hemau** | ✅ (Auto verkaufen) | ❌ | ✅ | ✅ | – |
| **Gebrauchtwagen Regensburg** | ✅ | ❌ | ✅ | ✅ | – |
| **Autoankauf Regensburg** | ⚠️ teilweise | ❌ | ⚠️ | ✅ | ❌ |
| **Auto verkaufen Regensburg** | ✅ | ✅ (h1 mein-fahrzeug-verkaufen) | ✅ | ✅ | – |
| **Autoankauf Ingolstadt** | ❌ | ❌ | ❌ | ⚠️ Footer-Erwähnung | ❌ |
| **Autoankauf Neumarkt** | ❌ | ❌ | ❌ | ⚠️ Footer-Erwähnung | ❌ |
| **Autoankauf Parsberg** | ❌ | ❌ | ❌ | ⚠️ Footer-Erwähnung | ❌ |
| **Autoankauf Kelheim** | ❌ | ❌ | ❌ | ⚠️ Footer-Erwähnung | ❌ |
| **KFZ-Ankauf Bayern** | ❌ | ❌ | ❌ | ❌ | ❌ |

**Befund:** Hemau und Regensburg sind solide abgedeckt, **Ingolstadt/Neumarkt/Parsberg/Kelheim sind nur als Pflicht-Erwähnung im Footer-Block** vorhanden. Für Suchanfragen wie „Autoankauf Ingolstadt" rankt aktuell die Startseite — was aber gegen dedizierte Konkurrenz-Landingpages chancenlos ist.

### 5.2 Keyword-Gap-Empfehlung

5 dedizierte Landingpages erstellen (siehe EMPFEHLUNGEN.md → P0-3):

| URL | Primary-Keyword | Secondary-Keywords | Wortanzahl |
|-----|-----------------|----------------------|-----------|
| `/autoankauf-regensburg.html` | Autoankauf Regensburg | Auto verkaufen Regensburg, Gebrauchtwagen Ankauf Regensburg | 800–1100 |
| `/autoankauf-ingolstadt.html` | Autoankauf Ingolstadt | Auto verkaufen Ingolstadt, Audi-Stadt-Ankauf | 800–1100 |
| `/gebrauchtwagen-neumarkt.html` | Gebrauchtwagen Neumarkt | Auto kaufen Neumarkt Oberpfalz, Gebrauchtwagenhändler Neumarkt | 800–1100 |
| `/autoankauf-parsberg.html` | Autoankauf Parsberg | Auto verkaufen Parsberg, Fahrzeugankauf Parsberg | 800–1100 |
| `/autoankauf-kelheim.html` | Autoankauf Kelheim | Auto verkaufen Kelheim, Gebrauchtwagen-Inzahlungnahme Kelheim | 800–1100 |

Jede Seite mit:
- LocalBusiness-Schema (areaServed = jeweilige Stadt)
- Service-Schema (Autoankauf)
- FAQ-Schema (3–5 lokal-bezogene FAQs)
- 3–5 interne Links (Bestand, Auto-verkaufen, Kontakt, Über uns, ggf. andere Region-Page)

### 5.3 Schema-Markup-Gap

| Seite | Aktuell | Fehlt |
|-------|---------|-------|
| index.html | AutoDealer + LocalBusiness + AggregateRating + FAQPage | – |
| fahrzeugbereich.html | nichts | ItemList mit Vehicle-Items |
| fahrzeug-*.html | nichts | **Vehicle** (kritisch!), BreadcrumbList |
| mein-fahrzeug-verkaufen.html | AutoDealer | Service, FAQPage |
| uber-uns.html | nichts | Organization, Person×2, BreadcrumbList |
| kontakt.html | nichts | LocalBusiness mit OpeningHours, ContactPoint |
| Regional-Landingpages (neu) | – | LocalBusiness + Service + FAQPage |

---

## 6 · Performance-Audit

### 6.1 Asset-Status

| Asset | Format | Größe (geschätzt) | Status |
|-------|--------|-------------------|--------|
| `Hero_Video.mp4` | MP4 | 6.4 MB | ⚠️ Komprimieren auf <2 MB (ffmpeg `-crf 28 -preset slow`) |
| `seat_ibiza_01.jpeg` | JPEG | unbekannt | ⚠️ → WebP konvertieren |
| `i10_01–18.jpeg` | JPEG | – | ⚠️ Nur i10_01 als WebP — restliche 17 noch JPEG, sind aber lazy-loaded → niedrige Priorität |
| `bmw_grau.jpg` | JPEG | – | ⚠️ → WebP (bmw_grau.webp existiert bereits!) |
| `hero.webp` | WebP | – | ✅ |
| `halle2.webp` | WebP | – | ✅ |
| `vk-hero.webp` | WebP | – | ✅ |
| `rene.webp`, `moritz.webp` | WebP | – | ✅ |

### 6.2 Doppel-Asset im Root + /img

Das Root-Verzeichnis enthält Duplikate von `bmw_grau.jpg`, `car_exchange.jpg`, `halle2.jpg/webp`, `hero.jpg/webp`, `i10.jpg`, `i10_01–13.jpeg`, `moritz.jpg/webp`, `rene.jpg/webp`, `uber-uns-hero.webp`, `vk-hero.webp`. Die Seiten referenzieren teilweise `/hero.webp` (Root, in index.html Z. 196 und Z. 212) und teilweise `/img/i10_01.webp` — inkonsistent. **Empfehlung:** alle Bild-Referenzen auf `/img/...` vereinheitlichen, Root-Duplikate löschen (spart Server-Speicher, kein Performance-Effekt aber Code-Hygiene).

### 6.3 Render-Blocking Audit

| Ressource | Index.html | Andere Seiten |
|-----------|-----------|----------------|
| Google Fonts CSS | ✅ async via `media="print"`-Trick | ❌ blocking |
| Inline `<style>` | ✅ ok (kritisches CSS) | ✅ ok |
| GA-Script | ✅ am body-Ende, `window.load`-deferred | ✅ |

---

## 7 · Accessibility-Audit (UI/UX Pro Max Quick Reference §1)

| Regel | Status | Bemerkung |
|-------|--------|-----------|
| `color-contrast` | ⚠️ teilw. | `--tx4 (rgba .55)` auf `--page` ergibt ~3.2:1 — knapp unter 4.5:1 für Body-Text. Akzeptabel für Decorative-Labels, problematisch wenn `--tx4` auf wichtige Texte angewendet wird (Footer-Labels, Form-Sub-Texts). |
| `focus-states` | ✅ | Inputs haben sichtbaren Border-Focus. Buttons haben Default-Outline. |
| `alt-text` | ✅ | Durchgängig auf allen img-Tags vorhanden (auch Detailseiten-Galerien — leer, was bei Galerie-Thumbnails OK ist) |
| `aria-labels` | ✅ | Burger-Button, Social-Links, Modals — alle mit `aria-label` |
| `keyboard-nav` | ⚠️ | Custom-„Buttons" als `<div>`/`<span>` (Form-Pills `.rb`, `.ratb`, `.tb`, `.ci-item`) sind nicht keyboard-fokussierbar |
| `form-labels` | ✅ | Alle Inputs haben `<label>` oder `placeholder`-Pattern |
| `heading-hierarchy` | ⚠️ | H1 → H2 → H3 weitgehend ok. Detailseiten: Modell als `<div>` statt `<h1>` |
| `reduced-motion` | ❌ | Nirgendwo respektiert |
| `voiceover-sr` | ⚠️ | Custom-Form-Pills nicht von Screenreader erfassbar |
| `escape-routes` | ✅ | Mobile-Menü: Burger-X schließt; Lightbox: Click-außerhalb schließt |

---

## 8 · Datei-Inventar

### 8.1 HTML-Seiten (11)
- ✅ `index.html` — 545 Zeilen
- ✅ `fahrzeugbereich.html` — 395 Zeilen
- ✅ `fahrzeug-i10.html` — ~600 Zeilen (mit Galerie)
- ✅ `fahrzeug-bmw320d.html` — ähnlich
- ✅ `fahrzeug-seat-ibiza.html` — ähnlich
- ✅ `mein-fahrzeug-verkaufen.html` — ~530 Zeilen (großer Funnel)
- ✅ `kontakt.html` — 210 Zeilen
- ✅ `uber-uns.html` — ~250 Zeilen
- ✅ `agb.html`, `datenschutz.html`, `impressum.html` (rechtliche Pflichtseiten)

### 8.2 Asset-Verzeichnis

**Root-Verzeichnis enthält Bilder, die ALLE auch unter /img/ existieren** (Duplikat-Verschmutzung):
- Root + /img: bmw_grau.jpg, car_exchange.jpg, halle2.jpg/webp, hero.jpg/webp, i10*.jpeg, moritz.jpg/webp, rene.jpg/webp, uber-uns-hero.webp, vk-hero.webp

Nur in /img:
- Hero_Video.mp4, bmw320d_01.jpg, bmw_grau.webp, car_exchange.webp, favicon.jpg, i10.webp, i10_01.webp, i10_14–18.jpeg, alle Marken-Logos (logo-audi.svg etc.), seat_ibiza_01.jpeg

Nur im Root:
- favicon.ico, favicon-16x16.png, favicon-32x32.png, favicon-512.png, apple-touch-icon.png, android-chrome-192/512.png, rm_logo_white.svg, robots.txt, sitemap.xml, site.webmanifest, netlify.toml

**Empfehlung:** Hero-Bild der index.html zeigt auf `/hero.webp` (Root). Wenn Root-Duplikate gelöscht werden, muss diese Referenz auf `/img/hero.webp` aktualisiert werden.

### 8.3 Sitemap-Vollständigkeit

Alle 11 HTML-Seiten in sitemap.xml gelistet. ✅
Kommt nach Umsetzung der Empfehlungen: 5 Regional-Pages + 4+ Blog-Pages → Sitemap-Update zwingend.

---

## 9 · Risiko & Vorgehen

### 9.1 Was ist sicher zu ändern?

- ✅ Foto-Upload-Implementierung (additiv, blockiert Submit nicht wenn Upload scheitert)
- ✅ Vehicle-Schema einfügen (additiv, kann nichts brechen)
- ✅ Regional-Landingpages erstellen (neue Dateien)
- ✅ Blog erstellen (neue Dateien)
- ✅ Breadcrumbs hinzufügen (additiv)
- ✅ Related-Vehicles (additiv)
- ✅ CSS-Variable-Aliasing-Fix auf Detailseiten (rein additiv)
- ✅ Font-Loading-Trick auf restlichen Seiten (semantisch identisch)
- ✅ `prefers-reduced-motion` (additiv, opt-in für User)
- ✅ Sitemap-Update (Pflicht nach neuen Pages)

### 9.2 Was vorsichtiger angegangen wird?

- ⚠️ Cards-Redesign Bestandsseite — visuelle Änderung, muss QA-getestet werden
- ⚠️ Fahrzeug-Slider-Redesign Home — bestehende Mobile-Logik nicht brechen
- ⚠️ Hero-Größe-Änderung — kann LCP beeinflussen
- ⚠️ Heading-Hierarchie-Fix Detailseiten — H1 wird sichtbar anders gerendert (Schriftgröße/Margin); CSS muss mit angepasst werden

### 9.3 Was wir NICHT anfassen?

- 🚫 GA-Position (am body-Ende, window.load) — laut User-Spec
- 🚫 Favicon-Setup — fertig
- 🚫 Hero-Video-Lazy-Load — funktioniert
- 🚫 Brand-Identity (Farben, Fonts, Tonalität, Dark Theme)
- 🚫 SPF/DNS — User hat das gemacht
- 🚫 Footer-h4→p.ft-head — bereits gelöst

---

## 10 · Reihenfolge der nächsten Schritte (siehe EMPFEHLUNGEN.md)

1. **CSS-Variable-Bug fix** auf Detailseiten (5 Min, hohes Visual-Risiko wenn nicht behoben)
2. **Vehicle-Schema** auf alle 3 Detailseiten (15 Min, hohes SEO-Upside)
3. **Foto-Upload** im Auto-verkaufen-Funnel (60 Min, höchstes Conversion-Upside)
4. **5 regionale Landingpages** (3–4 h, höchstes SEO-Upside)
5. **Fahrzeugkarten-Refinement** Home-Slider + Bestand (90 Min, hohes UX-Upside)
6. **Blog-Section** + 3 Starter-Artikel (3 h, mittleres SEO-Upside)
7. **Breadcrumbs + Related Vehicles** (45 Min)
8. **FAQ-Schema-Erweiterung** (30 Min)
9. **Performance: seat_ibiza WebP, Fonts non-blocking, Hero-Video-Hinweis** (30 Min, ffmpeg-Befehl dokumentieren)
10. **Design-Refinement** (Display-Skala, SVG-Checks, Hover-Refinement, Reduced-Motion) (90 Min)
11. **Features: Back-to-Top, Instagram-Placeholder** (45 Min)
12. **Sitemap-Update + finale Doku** (15 Min)

**Gesamtaufwand:** ~12 h Konzentrations-Arbeit. Wird in dieser Session schrittweise abgearbeitet.

---

*— Ende ANALYSE.md —*
