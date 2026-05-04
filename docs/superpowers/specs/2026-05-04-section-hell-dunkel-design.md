# Spec — Hell/Dunkel-Theme Refactor (Backlog B2)

**Datum:** 2026-05-04
**Branch:** `claude-optimierung`
**Bezug:** `docs/brain/06_OPEN_TASKS.md` Backlog B2; Memory `feedback_kkm_lessons.md` (Section-BG-Wechsel als KKM-Pattern)

## Kontext und Begründung

Auf der aktuellen Site läuft jeder Section-Hintergrund auf dem gleichen `var(--page) #0f0f0e` (Dark). Das war bewusst nach den drei KKM-Reduktions-Phasen, weil die alten Mesh- und Noise-Effekte raus mussten. Resultat ist aber monoton — KKM erreicht seinen Premium-Eindruck unter anderem durch klare Section-Trennung via Hell-Dunkel-Wechsel.

Eine vollständige KKM-Adaption (jeder zweite Section hell) wurde verworfen, weil R&M ein Auto-Showroom ist und Dark zur Foto/Showroom-Identität gehört. Stattdessen: dominante Dark-Site mit gezielten cremigen Akzent-Sections, die Atemzüge im Dark-Flow einziehen und den KKM-Pattern-Hebel nutzen, ohne die Showroom-Identität zu verlieren.

## Entscheidungen

1. **Pattern β** — Akzent-Sections im Dark-Flow, nicht Vollwechsel
2. **Cream-Token** — Warm Paper `#f5f1e8` (thermal harmonisch zum warmen `--tx #f4eee0`)
3. **Scope γ** — Index, Über-uns, Detail-Pages (Region/Blog/FAQ-Page/Forms später)
4. **Übergänge** — Hard Cut, keine Gradients, keine Curves
5. **Implementation-Hook** — eine generische Modifier-Klasse `.sec-light` (analog zum existierenden `.sec-alt`), die auf beliebige Section-Tags applizierbar ist (Index `stats-strip`/`reviews-section`, Über-uns `.sec`, Detail `.ds`)
6. **Detail-Page Cream-Section** — nur Detail-FAQ; Garantie-Block bleibt dark (Card-Grid-Logik)

## Token-Schema

Neue CSS-Custom-Properties in `:root` von `styles/v2.css`. Bestehende Dark-Tokens (`--page`, `--c1`, `--c2`, `--c3`, `--tx`, `--tx2-5`, `--grn` etc.) bleiben unverändert.

```css
/* Light/Cream Theme */
--page-light: #f5f1e8;
--c1-light:   #ebe5d6;          /* leicht abgesetzte Card-BG auf Cream */
--c2-light:   #e0d9c5;          /* zweite Tonstufe (Hover/Inset) */
--tx-on-light:  #0f0f0e;        /* Primärtext auf Cream — entspricht --page */
--tx2-on-light: rgba(15,15,14,.62);
--tx3-on-light: rgba(15,15,14,.45);
--tx4-on-light: rgba(15,15,14,.28);
--bd-on-light:  rgba(15,15,14,.10);
--grn-soft-on-light: rgba(122,217,158,.18);   /* Mint pastell auf Cream */
--grn-bd-on-light:   rgba(122,217,158,.55);   /* Mint-Border kräftiger auf hell */
```

`--grn` (`#7ad99e`) bleibt unverändert auf beiden Backgrounds — Kontrastprüfung: Mint auf Cream ergibt ein zu helles Grün, daher Mint-CTAs auf Cream-Sections bekommen einen dunklen Pill-Stil (siehe Komponenten-Adaptionen).

## Modifier-Klasse

```css
.sec-light{
  background:var(--page-light);
  color:var(--tx-on-light);
}
.sec-light .eyebrow{ color:var(--tx2-on-light) }
.sec-light .eyebrow::before{
  background:linear-gradient(to right,var(--grn-bd-on-light) 0%,transparent 100%);
}
.sec-light h2.display,
.sec-light h3.section-h3,
.sec-light h3{ color:var(--tx-on-light) }
.sec-light h2.display em{ color:#2f6f49; }     /* dunkleres Mint für Lesbarkeit auf Cream */
.sec-light .lede,
.sec-light .lead,
.sec-light p{ color:var(--tx2-on-light) }
.sec-light .btn-prime{
  background:#0f0f0e;
  color:#f5f1e8;
  border-color:#0f0f0e;
}
.sec-light .btn-prime:hover{ background:#222220 }
.sec-light .btn-glass{
  background:rgba(15,15,14,.04);
  border-color:var(--bd-on-light);
  color:var(--tx-on-light);
}
```

Komponentspezifische Overrides (z.B. `.sec-light .val`, `.sec-light .stats-strip-inner`, `.sec-light .faq-item`) werden im Implementation-Plan pro betroffener Komponente aufgeführt.

## Section-Mapping

### `index.html`
- Hero · dark · keine Änderung
- Stats-Strip · **cremig** — `class="stats-strip sec-light"`
- Logo-Carousel · dark · keine Änderung
- USP-Cards · dark · keine Änderung
- Atmosphere-Collage · dark · keine Änderung
- Diagnose-Section · dark · keine Änderung
- Reviews · **cremig** — `class="reviews-section sec-light"` (HTML-Restructure auf KKM-Quote-Format)
- FAQ · dark · keine Änderung
- Insta+TikTok · dark · keine Änderung
- Footer · dark · keine Änderung

### `uber-uns.html`
- Hero · dark · keine Änderung
- Werte-Section (`.values-grid`) · **cremig** — `class="sec sec-light"`
- Team-Cards · dark · keine Änderung
- restliche Sections · dark · keine Änderung

### Detail-Pages (`fahrzeug-bmw320d.html`, `fahrzeug-i10.html`, `fahrzeug-opel-corsa.html`, `fahrzeug-seat-ibiza.html`)
- Hero · dark
- Sticky-Sidebar · dark
- History-Timeline · dark
- Vor-Ankauf-Check (24-Punkte-Card) · dark
- Garantie-3-Card-Block · dark
- Detail-FAQ · **cremig** — `class="ds sec-light"`

`fahrzeug-seat-ibiza.html` hat keinen FAQ-Section (Verkauft-State, kürzere Page) — keine `.ds--light`-Anwendung dort.

## Out of Scope

Folgende Pages bleiben in diesem Sprint vollständig dark:

- `fahrzeugbereich.html` (dominantes Card-Grid — passt nicht zur "cremig=lesen"-Regel)
- `mein-fahrzeug-verkaufen.html` (Wizard-Form — Forms bleiben dark)
- `kontakt.html` (Form + Map — keine Lese-/Trust-Section)
- `faq.html` (separater Sprint, weil 30+ FAQ-Einträge eine eigene Layout-Auseinandersetzung sind)
- `blog/*.html` (Long-Form — eigener Reading-Mode-Sprint)
- `regionen/*.html` (folgen sobald Index-Pattern auf Live-Site validiert)
- `agb.html`, `datenschutz.html`, `impressum.html` (Legal — kein UX-Highlight)

Wenn das Pattern auf den drei Page-Typen funktioniert, ist die zweite Sprint-Welle β-Erweiterung auf Blog (Article-Body cremig als Reading-Mode) — separates Spec.

## Komponenten-Adaptionen

### Reviews-Section (Index)

Aktuelle Reviews liegen als Card-Grid auf Dark mit `var(--c2)`-Cards. Auf Cream wird das Format geändert auf KKM-Style Quote-Block — passend zu Backlog B6:

- Großer zentraler Pull-Quote (clamp 24-36px italic)
- Stern-Strip oben
- Avatar + Name + Datum darunter
- 3-4 Quotes via Slider oder horizontales Scroll-Grid
- `var(--c1-light)` Card auf `var(--page-light)` BG

Backlog B6 wird damit gleichzeitig erledigt.

### Stats-Strip (Index)

Aktuelle Stats-Strip ist eine Pillen-Reihe direkt nach Hero. Auf Cream:

- Background `var(--page-light)`
- Großzahl-Display (clamp 48-72px) statt kleiner Pills, dunkle Schrift, sehr selbstbewusst
- Eyebrow darüber, Kurzlabel darunter
- Mint-Akzent als Underline oder Bullet zwischen den Stats

### Werte-Section (Über-uns)

Aktuelle Werte sind Glass-Hover-Cards mit Radial-Glow. Auf Cream:

- `var(--c1-light)` Card-BG ohne Glass-Hover (Glass funktioniert nicht auf Hell)
- Border `var(--bd-on-light)`
- Hover: leichter Lift `translateY(-4px)` + Border-Color-Wechsel zu `var(--grn-bd-on-light)`
- Number-Eyebrow `01 — Ehrlichkeit` bleibt
- Icon-Badge: Mint-Pastell-BG `var(--grn-soft-on-light)` mit dunklem Mint-Symbol `#3d8c5a`

### Detail-FAQ

Collapsible-Liste, aktuell Pulse-Toggle auf Dark. Auf Cream:

- Border-Bottom `var(--bd-on-light)` zwischen Items
- Toggle-Icon dunkel (`var(--tx-on-light)`)
- Open-State BG: subtle `var(--c1-light)` overlay
- Pulse-Animation entfernen (passt nicht zu KKM-Reduktion-Linie)

### Mint-CTA-Buttons auf Cream

Mint `#7ad99e` ist auf Cream zu hell — Solid-Mint-Pillen verlieren Kontrast.

- Primärer CTA in Cream-Section: Solid-Dark `#0f0f0e` mit Cream-Text — invertierter Stil
- Sekundärer CTA: Outline mit `var(--bd-on-light)` Border, dunkler Text

### Cookie-Banner / Sticky Nav

Beide haben festen BG (Cookie-Banner = dark Modal Overlay; Nav-Scrolled = dark blur-Background). Bleiben unverändert — sie liegen über dem Page-Flow und erben keine Section-Farben.

## Edge Cases

- **Hero-Übergang zu Cream-Stats** — Hero hat `padding-bottom` für Atmung, Stats-Section beginnt direkt darauf mit Cream. Keine Lücke. Visueller Test im Browser auf 320px / 768px / 1440px.
- **Reveal-Animationen** — bestehende Reveals (`opacity:0→1` + `translateY`) funktionieren auf Cream identisch, kein Anpassungsbedarf.
- **Logo-Carousel direkt nach Cream-Stats** — Carousel hat `mask-fade` an den Edges; Mask greift auf Carousel-BG zurück, also dark. Reihenfolge `Cream-Stats → Dark-Carousel` ist Hard-Cut, sieht klar getrennt aus.
- **Reviews → FAQ Übergang** — Cream-Reviews enden direkt vor Dark-FAQ. FAQ-Eyebrow + Padding sorgt für Atemraum. Hard Cut.
- **Mobile Performance** — keine zusätzlichen Effekte, Cream ist nur eine Background-Color-Änderung. Kein Layout-Shift, kein Repaint-Cost.
- **Lighthouse Contrast** — `--tx-on-light #0f0f0e` auf `#f5f1e8` ergibt Kontrast-Ratio ~17:1 (AAA). `--tx2-on-light` (62%) ergibt ~10:1 (AAA). Mint `#3d8c5a` auf `#f5f1e8` ergibt ~5.4:1 (AA Large + AA Normal Body).
- **Accessibility — Selection-Color** — `::selection` ist global definiert (`background:var(--grn)`); funktioniert auf beiden BGs.
- **iOS Safari Color-Profile** — `#f5f1e8` ist innerhalb des sRGB-Bereichs, kein P3-Effekt nötig.

## Akzeptanzkriterien

1. Index: Stats-Strip + Reviews mit `sec--light`, Hard Cut zu Nachbar-Sections, keine sichtbaren Layout-Shifts.
2. Über-uns: Werte-Section cremig, Hero+Team bleiben dark, Section-Trennung klar erkennbar.
3. Detail-Pages: Detail-FAQ cremig auf allen 3 Pages mit FAQ-Section (BMW, i10, Opel Corsa), Seat unangetastet.
4. Lighthouse: Performance, Accessibility, SEO, Best Practices ≥95 auf den 3 Page-Typen.
5. Visueller Reality-Check auf https://claude-project-bex.pages.dev/ nach Push: Index-Reviews fühlt sich wie KKM-Quote-Moment an, nicht wie ein "anderes Design".
6. Memory `project_rm_automobile.md` Token-Liste aktualisiert (aktuelle Werte sind `--page:#0f0f0e --c1:#161614 --tx:#f4eee0 --grn:#7ad99e` — Memory war veraltet).

## Files Affected (erwartet)

- `styles/v2.css` — neue Tokens `:root`, neue Modifier-Klasse `.sec-light` mit Component-Overrides
- `index.html` — 2 Section-Tags Klassen-Update + Reviews-Section HTML Restructure (Quote-Format)
- `uber-uns.html` — 1 Section-Tag Klassen-Update
- `fahrzeug-bmw320d.html`, `fahrzeug-i10.html`, `fahrzeug-opel-corsa.html` — je 1 `.ds`-Section Klassen-Update
- `docs/brain/02_CURRENT_STATE.md` — Status-Update nach Implementation
- `docs/brain/06_OPEN_TASKS.md` — B2 als done markieren, B6 (Reviews KKM-Style) ebenfalls done
- `docs/brain/07_DECISIONS_LOG.md` — neuer Eintrag D-19 mit Theme-Begründung

## Risiken / Bekanntes

- **Mint-CTA-Adaption** kann auf Cream nicht-perfekt aussehen — alternative Stil-Variante (Solid Dark) als Spec festgelegt, aber Cross-Browser-Test ausstehend.
- **Reviews-Restructure** ist mehr als Background-Wechsel: braucht HTML-Umbau zu Quote-Format. Abhängigkeit zu Backlog B6, wird in einem Schritt mit erledigt.
- **`.ds`-Klassensystem** auf Detail-Pages ist parallel zu `.sec`. Generischer Modifier `.sec-light` ist zu beiden additiv kombinierbar — keine Konsolidierung der Klassensysteme nötig in diesem Sprint.
