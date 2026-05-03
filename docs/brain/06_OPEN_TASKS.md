# 06 — Open Tasks

Sortiert nach Priorität. Jede Aufgabe klein und konkret.

## Stage-Status (Mapping zu Tasks)
- Stages 1–11 **inhaltlich fertig** — letzter Sprint hat T-01 (Blog-Fakten), T-02 (Werte-Section), T-03 (Team-Cards Cinema), T-04 (Detail-Pages), T-05 (Marken-Filter) und T-06 (Wizard-Polish) erledigt.
- Bevor Merge in main: T-07 Cross-Browser, T-08 Lighthouse, T-09 Commit/PR.

## Nächste konkrete Teilaufgabe
**User-Review im Browser**: Alle Stage 5/6/7-Änderungen visuell testen (uber-uns Cinema-Cards, Fahrzeugbereich Brand-Filter, 4 Detail-Pages neue Sections, Verkaufs-Wizard Step-Pips + Brand-Picker). Anschließend T-07 (Cross-Browser), T-08 (Lighthouse), dann T-09 (Commit + PR + Merge).

---

## ✅ T-01 · Blog-Content auf korrekte Team-Fakten — fertig
**Umgesetzt:** "Bruder/Brüder"-Erwähnungen ersetzt durch "bester Freund / Geschäftspartner". `autoankauf-hemau-ablauf.html` (René-Perspektive) auf Verkaufsberater-Tonfall + Moritz für Technik-Aussagen verlagert. `gebrauchtwagenkauf-checkliste.html` (Moritz-Perspektive) "wir beide KFZ-Mechatroniker" entfernt — Quote zu Moritz umsigniert. `blog/index.html` Header umformuliert. Author-Role-Boxes konsistent: Moritz = "KFZ-Mechatroniker · Mitgründer R&M", René = "Vertrieb & Organisation · Mitgründer R&M". Bonus: "René Müller" → "René Grüber" Namens-Korrektur in art-meta + author-photo alt + author-name.
**Verifikation:** `Grep "Bruder|beide gelernte|René M[üu]ller"` im /blog/ liefert 0 Treffer.

---

## ✅ Stage 5 — Erledigt (Verifikation User offen)

### T-02 · uber-uns Werte-Section v2-Stil  *(Stage 5 — fertig)*
**Umgesetzt:** `.values-grid`/`.val` von 1px-Border-Grid auf v2-Bento (border-radius `var(--r-lg)`, Glass-Hover, transform translateY(-6px), Radial-Glow ::before, grn-soft Icon-Badge 54px, Number-Eyebrow `01 — Ehrlichkeit`); Texte auf v2-Tonfall (Ehrlichkeit zuerst / Technische Tiefe / Klare Sprache).
**Verifikation:** User-Review im Browser ausstehend.

### T-03 · uber-uns Team-Bilder einheitliche Größe  *(Stage 5 — fertig)*
**Umgesetzt:** `.tp-img` aspect-ratio von 3/4 auf 4/5 (Container, nicht img); object-position einheitlich `center 22%`; Hover auf Card-Level (border-grn + bg-c3 + img scale + Overlay fade); Mobile aspect-ratio 5/4 für Querformat-Card. Beide Quellbilder ~800x800 → in 4/5 Container fast unverzerrt.
**Verifikation:** User-Review im Browser ausstehend.

---

## ✅ Stage 6 — Erledigt (Verifikation User offen)

### T-04 · Fahrzeug-Detail-Pages füllen  *(Stage 6 — fertig)*
**Umgesetzt:** Neue zentrale `styles/v2-detail.css` für History-Timeline, Vor-Ankauf-Check (24-Punkte-Card mit Pulse-Badge "Alle Punkte bestanden"), Garantie-3-Card-Block (Sachmängel/HU/Tausch), Detail-FAQ (collapsible mit Pulse-Toggle). 4 Pages erweitert: BMW 320d (vollständige Sections + 6 BMW-spezifische FAQ inkl. B47-Steuerkette), Hyundai i10 (Stadtwagen-History + 6 i10-FAQ inkl. 67-PS-Frage), Opel Corsa (Pendler-History + 6 Corsa-FAQ), Seat Ibiza (4-Punkte-History bis "Verkauft 04/2026", keine Check/Garantie/FAQ-Sections). FAQ-Toggle-JS pro Page. Neue Stylesheet-Links eingefügt.
**Verifikation:** User-Review im Browser ausstehend.

### T-05 · Fahrzeugbereich Marken-Filter  *(Stage 6 — fertig)*
**Umgesetzt:** Sticky Brand-Bar (top:88px) mit 16 Marken-Pills (13 SVG-Logos + Opel/Seat als Text). Pulse-Dot auf "Alle Marken"-Pill. Per-Brand-Counter (Badge mit Anzahl der Treffer; ohne Treffer = dim). Active-Filter-Chips entfernbar mit "Alle zurücksetzen"-Reset. Empty-State mit dynamischer Marke + prefilled Wunsch-CTA. Card-Reveal-Animation `cardEnter` mit Stagger. Sticky-Shadow auf Brand-Bar via IntersectionObserver-Sentinel. URL-Param-Support (`?brand=bmw`, `?cat=diesel`). Kombinierte Filter (brand AND cat). filter-bar verschoben auf top:152px wegen neuer Brand-Bar. Mobile-Brand-Bar (top:72px) mit horizontal-scroll und Counter-Hide.
**Verifikation:** User-Review im Browser ausstehend.

---

## ✅ Stage 7 — Erledigt (Verifikation User offen)

### T-06 · Verkaufs-Wizard Polish  *(Stage 7 — fertig)*
**Umgesetzt:** Bestehender 6-Step-Wizard (Fahrzeug→Ausstattung→Historie→Zustand→Technik→Fotos+Kontakt) mit visuellem Layer aufgewertet. Neue `.step-pips` (6 Dot-Pips mit done/cur-States, Pulse-Ring auf cur, animated connecting-Line `--pips-w` per CSS-Variable). Slide-Transitions zwischen Steps (`stepIn` / `stepInBack` Animations). Brand-Logo-Picker als 5-Spalten-Grid für Top-13-Marken — Klick setzt Marke-Dropdown, Dropdown-Change syncs Picker. Marken-Liste auf 30+ erweitert (Mitsubishi, Subaru, Suzuki, Tesla, Smart, Land Rover, Jaguar ergänzt). Submit-Success-Animation `.success-anim` mit Ring-Pulse + Check-Scale. Progress-Fill mit Glow-Dot. Mobile-Brand-Picker auf 4-Spalten + kompaktere Step-Pips.
**Verifikation:** User-Review im Browser ausstehend.

---

## P2 — Polish & Verifikation

### T-07 · Cross-Browser-Test
**Ziel:** Mobile (iOS Safari + Android Chrome) und Desktop (Chrome + Firefox + Safari) ohne kaputte Layouts.
**Akzeptanzkriterium:** User testet im Browser, meldet was kaputt ist. Fokus-Pages: index, fahrzeugbereich, mein-fahrzeug-verkaufen, faq, kontakt.

### T-08 · Lighthouse-Run + ggf. Optimierungen
**Ziel:** Performance, Accessibility, SEO, Best Practices ≥95.
**Akzeptanzkriterium:** Score-Screenshots; bei <95 die größten Issues fixen.

### T-09 · Commit + PR Review + Merge nach main
**Ziel:** Sprint-Sammel-Commit, User-Review, Merge nach main, Auto-Deploy via Cloudflare.
**Akzeptanzkriterium:** Klare Commit-Message, User-OK, Merge ausgeführt, Live-Site zeigt neue Version.

---

## P3 — Tech-Schulden / Nice-to-have

### T-10 · `.werkstatt` CSS-Klassen umbenennen
**Ziel:** Klassennamen passen zur "keine Werkstatt"-Realität (z.B. `.diagnose-section`).
**Betroffen:** `styles/v2-home.css`, `index.html`

### T-11 · Sitemap auf alle Pages prüfen
**Akzeptanzkriterium:** `sitemap.xml` enthält alle existierenden Pages mit sinnvoller Priorität.

### T-12 · Header/Footer als JS-Inject (optional)
**Ziel:** Single-Source-of-Truth für Header+Footer, weniger Drift-Risiko.
**Akzeptanzkriterium:** UNGEKLÄRT — Architektur-Change, mit User abstimmen ob gewünscht.

---

## UNGEKLÄRT
- T-04: Welche zusätzlichen Sections auf Detail-Pages konkret gewünscht
- T-12: Soll Architektur-Refactor passieren oder nicht
- T-07: Cross-Browser-Test noch nicht durchgeführt
- T-08: Lighthouse-Run noch nicht durchgeführt
