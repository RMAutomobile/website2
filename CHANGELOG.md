# Changelog — Branch `claude-optimierung`

**Datum:** 2026-05-02
**Inhaber-Review:** ausstehend (Cloudflare Pages Preview prüfen, dann manueller Merge in `main`)

Alle Änderungen auf der Branch `claude-optimierung` zusammengefasst. Diese Änderungen sind **noch nicht** auf `main` und somit **noch nicht live**. Cloudflare Pages erstellt automatisch eine Preview-URL beim Push der Branch — dort erst testen.

---

## 🔴 Bugfixes

### CSS-Variable-Bug auf 4 Seiten behoben
**Files:** `fahrzeugbereich.html`, `fahrzeug-i10.html`, `fahrzeug-bmw320d.html`, `fahrzeug-seat-ibiza.html`

Die Detailseiten und die Bestandsseite definierten in `:root` nur die Variablen `--ln`, `--ln2`, `--bg`, `--s1`, `--s2`. Im Markup wurde aber durchgängig auf `--bo`, `--bo2`, `--bo3`, `--page`, `--c2`, `--c3`, `--grn-bg`, `--grn-bd` referenziert (Nav-Border, Mobile-Menü-Trenner, Buttons). Browser fielen auf den Standardwert (meist `currentcolor` oder „none") zurück → Borders unsichtbar / unzuverlässig.

**Fix:** Aliasing-Block in `:root` ergänzt:
```css
--bo:var(--ln);--bo2:var(--ln2);--bo3:rgba(232,227,216,.32);
--page:var(--bg);--c2:var(--s1);--c3:var(--s2);
--grn-bg:var(--grn2);--grn-bd:var(--grn3);
```

### `display:none` auf wichtigen Mobile-Texten in `uber-uns.html` behoben
**File:** `uber-uns.html`

Die Personen-Beschreibung (`.tp-text`) wurde auf Mobile via `display:none` komplett ausgeblendet — der entscheidende Trust-Content der „Über uns"-Seite war unsichtbar.

**Fix:** `.tp-text` zeigt sich auch auf Mobile mit angepasster Font-Skala (16px H3, 13px Body).

---

## 🟢 SEO & Schema-Markup-Erweiterung

### Vehicle-Schema auf allen 3 Detailseiten
- `fahrzeug-i10.html`: `@type:"Vehicle"` mit Brand, Model, Year, Mileage, Fuel, Price, Availability, Seller-Block, Bilder
- `fahrzeug-bmw320d.html`: dito (`availability:"PreOrder"` für „In Anlieferung")
- `fahrzeug-seat-ibiza.html`: dito

### BreadcrumbList-Schema auf allen Hauptseiten
`index.html` (bereits vorhanden), `fahrzeugbereich.html`, alle 3 Detailseiten, `mein-fahrzeug-verkaufen.html`, `kontakt.html`, `uber-uns.html`.

### Service-Schema + FAQ-Schema auf `mein-fahrzeug-verkaufen.html`
Service-Schema `serviceType:"Autoankauf"` mit `areaServed`-Array, `provider`-AutoDealer-Block und Free-Offer.
FAQ-Schema mit 5 Fragen (gleicher Inhalt wie sichtbare FAQ).

### Organization + Person-Schema auf `uber-uns.html`
Organization mit `foundingDate:"2026"` und `founders`-Array (René Grüber, Moritz Wahl) jeweils als Person-Schema.

### LocalBusiness-Schema auf `kontakt.html`
Mit `openingHoursSpecification` (Mo-Fr 9-18, Sa 9-14), `contactPoint`, `sameAs` (Instagram, TikTok), `geo`-Koordinaten.

### ItemList-Schema auf `fahrzeugbereich.html`
Listet die 3 Fahrzeuge als `ListItem` → `Vehicle` mit URL, Brand, Year, Mileage, Fuel, Price, Availability.

---

## 🚀 Conversion: Foto-Upload im Auto-verkaufen-Funnel

**File:** `mein-fahrzeug-verkaufen.html`

Größtes Conversion-Upgrade dieser Session.

**Vorher:** Verkäufer mussten nach Submit eine zweite Aktion ausführen (E-Mail-Programm öffnen oder WhatsApp-Chat starten) um Fotos zu schicken — viele machten das nicht.

**Jetzt:**
- File-Input direkt in Schritt 6 (vor Kontaktdaten) integriert
- Drag-Drop-Zone mit klarem Visual-Feedback (`.drag` State)
- Akzeptiert: JPG, PNG, WebP, **HEIC/HEIF (iPhone-Native)**, GIF, AVIF
- Live-Preview mit Thumbnails für JPG/PNG/WebP
- Fallback-Tile für HEIC (zeigt Datei-Endung, da Browser HEIC nicht inline rendern)
- Validierung: max. 5 Dateien, max. 5 MB pro Datei, max. 20 MB total
- Inline-Status-Messages (Erfolg / Fehler / Hinweis)
- Per-Datei Entfernen-Button
- Live-Counter (`X / 5 Fotos · 4.2 MB`)
- Hidden-Field `fotos_anzahl` wird automatisch gefüllt für Web3Forms-E-Mail-Betreff

**Form-Submit:** Geändert von `JSON.stringify(Object.fromEntries(FormData))` (verlor Multi-Value-Felder!) zu nativem `multipart/form-data` Submit. Web3Forms-natives File-Upload unterstützt das auf dem freien Plan (max. 5 Dateien, 25 MB total).

**Success-State:** Conditional-Block — wenn Fotos hochgeladen wurden, zeigt eine grüne Bestätigung „Fotos übermittelt"; sonst weiterhin der „Fotos per E-Mail/WhatsApp"-Prompt als Fallback.

**WhatsApp-Submit:** Wenn der User trotz Foto-Upload den WhatsApp-Button wählt, wird im pre-filled Text der Hinweis ergänzt: „X Fotos im Formular ausgewählt – bitte anschließend hier in WhatsApp anhängen".

---

## 📍 5 regionale Landingpages erstellt (P0 SEO)

Eigene Seiten für die wichtigsten Region-Keywords, jeweils 800–1100 Wörter mit Local-Schema und FAQ-Schema:

- `autoankauf-regensburg.html` — Primary: „Autoankauf Regensburg" (~25 min Anfahrt)
- `autoankauf-ingolstadt.html` — Primary: „Autoankauf Ingolstadt" (~45 min, Audi-Stadt)
- `gebrauchtwagen-neumarkt.html` — Primary: „Gebrauchtwagen Neumarkt" (~30 min, B299)
- `autoankauf-parsberg.html` — Primary: „Autoankauf Parsberg" (~20 min, A3)
- `autoankauf-kelheim.html` — Primary: „Autoankauf Kelheim" (~30 min, B16)

Jede Page mit:
- LocalBusiness-Schema (`areaServed` = jeweilige Stadt)
- Service-Schema (Autoankauf)
- FAQPage-Schema (lokale Fragen)
- BreadcrumbList-Schema
- Mind. 5 interne Links zu Hauptseiten + 1 weitere Region-Page (Cross-Linking)
- Persönliche, ehrliche Tonalität (kein Plakativ-Marketing)

---

## ✍️ Blog-Section + 3 Starter-Artikel

Neuer Verzeichnis `/blog/`:
- `blog/index.html` — Blog-Übersicht mit 3 Artikel-Karten
- `blog/gebrauchtwagenkauf-checkliste.html` — „Worauf beim Gebrauchtwagenkauf achten" (10–15 KFZ-Mech-Prüfpunkte)
- `blog/autoankauf-hemau-ablauf.html` — „Autoankauf in Hemau — so läuft es ab" (Schritt-für-Schritt vom Anruf bis zur Echtzeitüberweisung)
- `blog/tuev-hauptuntersuchung-tipps.html` — „TÜV Hauptuntersuchung — was du wissen musst"

Jeder Artikel mit:
- Article-Schema (`datePublished`, `author`, `image`)
- BreadcrumbList-Schema
- FAQPage-Schema (wo FAQs vorhanden)
- Mind. 4 interne Links
- Lesedauer-Indikator
- Author-Box mit `rene.webp` / `moritz.webp`
- CTA-Block am Ende

---

## 🎨 Design-Refinement

### Mutigere Hero-Typografie auf `index.html`
- H1 von `clamp(38px, 5.2vw, 72px)` → `clamp(44px, 6.4vw, 86px)`
- Letter-spacing `-0.025em` (vorher `-0.02em`)
- Italic-Akzent auf der mittleren Zeile (`Ihr Vertrauen`)
- Subtile radiale Spotlight-Gradient hinter dem Hero (Mint, sehr fein)

### Atmosphäre auf Mobile-Hero (`index.html`)
Vorher war auf Mobile nur Text auf Dark — kein visueller Anchor. Jetzt: das Hero-Bild als gefadeter (18% Opacity, mix-blend-mode: screen) Background-Layer hinter dem Text → Atmosphäre + Premium-Feeling ohne LCP zu schaden.

### Related-Vehicles-Sektion auf allen 3 Detailseiten
2-Spalten-Grid mit den anderen 2 Fahrzeugen aus dem Bestand. Card-Pattern: 200px Bild + Body mit Tag/Name/Variant/Specs/Price. Hover-State mit `translateY(-2px)` und Bild-Scale.

### Sichtbare Breadcrumbs auf allen 3 Detailseiten
Vorher: nur Schema, keine sichtbare Navigation. Jetzt: `Start › Fahrzeuge › Hyundai i10 Select` (Pfade individuell) als typografische Breadcrumb über der Galerie.

### Verbesserte Filter auf `fahrzeugbereich.html`
- Filter-Buttons auf Mobile von `padding 7px 14px` (~24px Höhe) auf `padding 9px 14px / min-height 38px` (Touch-Standard)
- Font-Size der Filter von 9px auf 11px (Lesbarkeit)
- Neue **Sortierung-Dropdown** mit 5 Optionen: Standard, Preis ↑, Preis ↓, Neueste zuerst, Wenig km zuerst
- Cards in `<a>`-Wrapper umgewandelt (vorher `<div onclick="location.href=...">`) → echter Link, Right-Click-„Open-in-new-tab" funktioniert, SEO-Link-Juice

### Instagram-Feed-Placeholder auf `index.html`
4-Tile-Grid (auf Mobile 2x2) zwischen Reviews und Standort. Tiles zeigen vorhandene Bilder (i10, BMW, Halle, Team) mit Mint-Gradient-Overlay und IG-Icon-Hover-State. Klick führt zu `https://www.instagram.com/rm__automobile/`. Echte API-Anbindung später möglich.

---

## ⚡ Performance & Accessibility

### Fonts non-blocking auf 6 weiteren Seiten
Vorher nur auf `index.html` mit `media="print" onload="this.media='all'"`-Trick. Jetzt auch auf:
- `fahrzeugbereich.html`
- `fahrzeug-i10.html`, `fahrzeug-bmw320d.html`, `fahrzeug-seat-ibiza.html`
- `mein-fahrzeug-verkaufen.html`
- `kontakt.html`, `uber-uns.html`

Zusätzlich `<noscript>`-Fallback für Browser ohne JS.

### `prefers-reduced-motion` durchgängig respektiert
Auf allen 8 Hauptseiten ergänzt. Reduziert Animationen/Transitions auf 0.01ms wenn der User das in den OS-Einstellungen wünscht.

### Universeller „Back-to-Top"-Button
Neue Datei `back-to-top.js` (selbst-injizierendes Script + Style). Auf allen 8 Hauptseiten via `<script src="/back-to-top.js" defer></script>` eingebunden. Erscheint nach > 320px Scroll, klick scrollt smooth nach oben (oder instant bei reduced-motion). 44×44px Touch-Target, Mint-Hover.

### Touch-Target-Verbesserungen
- Filter-Buttons auf Bestand: 38px+ Mindesthöhe
- Sort-Dropdown: 40px+ Mindesthöhe
- Back-to-Top-Button: 44×44px (entspricht Apple HIG)

### `autocomplete`-Attribute ergänzt
Auf allen Form-Inputs (Auto-verkaufen Step 6, Kontakt-Form):
- `autocomplete="given-name"`, `family-name`, `name`, `tel`, `email`
- Plus passende `inputmode`-Attribute (`tel`, `email`, `numeric`)

### iOS-Zoom-Prevention auf Kontakt-Form
Mobile-Override `.fg input/select/textarea{font-size:16px!important}` ergänzt.

---

## 📋 Sitemap & Wartung

### `sitemap.xml` aktualisiert
Hinzugefügt: 5 Regional-Landingpages + Blog-Index + 3 Blog-Artikel (= 9 neue URLs). Total nun: 20 URLs.

Priorisierung:
- Index, Bestand, Auto-verkaufen, Detailseiten: 0.8–1.0
- Regional-Landingpages: 0.8–0.85
- Blog-Index: 0.7
- Blog-Artikel: 0.65
- Rechtliche Pflichtseiten: 0.3

---

## 📄 Dokumentation

- `ANALYSE.md` — vollständige Code- + UX-Analyse (vor jedem Code-Change angefertigt)
- `EMPFEHLUNGEN.md` — priorisierte nächste Schritte (Hero-Video komprimieren, WebP-Konvertierung, mittelfristige Strategie)
- `CHANGELOG.md` — diese Datei

---

## 🔐 Was unangetastet blieb

- Google Analytics am Body-Ende per `window.load` ✅
- Favicon-Setup ✅
- Hero-Video Lazy-Load ✅
- Brand-Identity (Farben, Fonts, Tonalität, Dark-Theme) ✅
- SPF/DNS ✅
- robots.txt ✅
- Web3Forms-Keys (Kontakt + Ankauf) ✅
- AGB / Datenschutz / Impressum (rechtliche Pflichtseiten) ✅

---

## 🧪 Vor Live-Schaltung zu testen

(siehe ausführlich in `EMPFEHLUNGEN.md`)

1. Cloudflare Pages Preview-URL der `claude-optimierung`-Branch durchklicken
2. Mobile-Test auf iPhone und Android
3. Foto-Upload-Funnel komplett: 1 Foto, 5 Fotos, HEIC, JPEG-mit-5MB, JPEG-mit-6MB-Fehler
4. Lighthouse-Run auf 5 Seiten (Index, Bestand, Auto-verkaufen, Region-Page, Blog-Artikel)
5. Erst dann Merge auf `main`
6. Sofort danach Sitemap-Resubmit in Google Search Console
