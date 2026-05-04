# 05 — UI/UX Context (Ist-Zustand)

## Designsystem Tokens (in `styles/v2.css`)

### Dark-Theme (Standard, dominant)
```
--page:#0f0f0e        Page-Background (Dark)
--c1:#161614          Section Alt
--c2:#1c1c1a          Card-BG
--c3:#222220          Card-Hover-BG
--c4:#2a2a26
--c5:#33332e
--tx:#f4eee0          Text primary
--tx2:rgba(244,238,224,.74)   Text secondary
--tx3:rgba(244,238,224,.5)    Text tertiary
--tx4:rgba(244,238,224,.32)
--bo:rgba(244,238,224,.07)    Border subtle
--bo2:rgba(244,238,224,.14)
--bo3:rgba(244,238,224,.28)
--grn:#7ad99e         Akzent Mint
--grn-soft:rgba(122,217,158,.12)
--grn-bd:rgba(122,217,158,.32)
--grn-glow:rgba(122,217,158,.42)
--gold:#d9b86d        Akzent Gold
--red:#f87171
```

### Light/Cream-Theme (Akzent-Sections, Pattern β, D-19 Sprint 04.05.2026)
```
--page-light:#f5f1e8        Cream-Page (Warm Paper)
--c1-light:#ebe5d6           Cream Card-BG
--c2-light:#e0d9c5           Cream Card-Hover
--tx-on-light:#0f0f0e        Text primary auf Cream
--tx2-on-light:rgba(15,15,14,.62)
--tx3-on-light:rgba(15,15,14,.45)
--tx4-on-light:rgba(15,15,14,.28)
--bd-on-light:rgba(15,15,14,.10)    Border auf Cream
--bd2-on-light:rgba(15,15,14,.18)
--grn-on-light:#2f6f49       Mint dunkler für Lesbarkeit auf Hell
--grn-soft-on-light:rgba(47,111,73,.10)
--grn-bd-on-light:rgba(47,111,73,.40)
```

### Restliche Tokens
```
--fh:'Plus Jakarta Sans'   Headings
--fb:'DM Sans'             Body
--ease:cubic-bezier(.22,1,.36,1)
--bounce:cubic-bezier(.175,.885,.32,1.275)
--r-sm:8px / --r-md:14px / --r-lg:20px / --r-xl:32px
--nav-h:88px / --nav-h-mob:72px
--container:1280px              (war 1440px — Phase 2 Reduktion)
--pad-sec:128px / --pad-sec-mob:72px   (war 160/88 — Phase 2)
```

## Theme — Hybrid Dark + Cream-Akzent-Sections

- **Dominant Dark** — Hero, Card-Grids, Photo-Sections, Footer
- **Cream-Akzent-Sections** — Reviews, Stats-Strip, Werte, Detail-FAQ (Pattern β, D-19)
- **Übergänge:** Hard Cut (kein Gradient, keine Curve)
- **Modifier-Klasse:** `.sec-light` (additiv auf jeden Section-Tag, analog zu `.sec-alt`)
- Italic-em-Akzent in Mint durchgängig auf H1/H2 (auf Cream wird Mint zu `--grn-on-light` invertiert)
- Mint-Glow-Shadow auf primären Buttons (Dark) — invertiert auf Cream zu Solid-Dark-Button mit Cream-Text
- Pill-Buttons (border-radius:999px) durchgängig
- Border-Radius 14/20px für Cards
- KKM-Reduktion: Background ist clean Dark (kein Noise, kein Mesh, kein TV-Static — Phase 1)
- Glow-Animationen auf Sub-Pages entfernt (Phase 4 Decision D-18)

## Wiederkehrende Komponenten

- **`.btn` + Modifier `.btn-prime` / `.btn-glass` / `.btn-mini`** — Pill-Style. Auf `.sec-light` invertiert.
- **`.eyebrow`** — 11px Uppercase-Label vor H2, mit Mint-Linie. Auf `.sec-light` mit dunklerer Mint-Linie.
- **`h2.display`** — Headline-Style (clamp 36-64px), `em` für Mint-Italic-Akzent
- **`.reveal` (+ .d1-.d5)** — Scroll-Reveal-Pattern, fade+slide-up
- **`.live-badge`** — Pulsing Mint-Dot
- **`.vcard`** — Vehicle-Card im Fahrzeugbereich
- **`.usp-card`** — 4-Spalten-Grid auf Index, alle gleichgewichtig (kein `.featured` mehr seit Phase 3 D-17)
- **`.step-cell`** — 3-Schritte-Funnel-Cards
- **`.leist-item`** — Magazine-Style-Accordion mit Sticky-Sidebar
- **`.atmo-tile`** — Foto-Collage-Tile
- **`.brand-tile` / `.logo-carousel`** — Logo-Grid-Tile (statisch) / Logo-Carousel mit infinite-scroll
- **`.rev-card`** — Review-Testimonial. Auf Index inzwischen KKM-Quote-Format (vertikales Stack, BIG italic Quote-Typo, 240px Quote-Marker als CSS `::before`).
- **`.stats-strip`** — Stat-Numbers in Section direkt unter Hero. Cream-Variant clamp 40-72px Numbers + mint Top-Border-Akzent unter Labels.
- **`.val`** — Werte-Cards auf Über-uns. Cream-Variant: Premium-Paper mit dunkelmint Top-Border-Animation auf Hover (48px → 120px), keine Glass-Hover, Layered-Shadows.
- **`.faq-item`** — Index-FAQ-Accordion (dark)
- **`.dfaq-item`** — Detail-Page-FAQ. Cream-Variant: dunkelmint Toggle-Plus, größere Question-Typo (15-18px), mint-pastell-Hover-Pill.
- **`.region-card`** — Lokal-SEO-Card mit Distance-Tag
- **`.cookie-banner`** — Floating-Card

## Layout-Breakpoints

- **>1180px:** Full-Desktop (alle Nav-Links sichtbar)
- **1024-1180px:** Padding reduziert, Burger erscheint (D-17 Schritt C — fixt zerquetschten Kontakt-Button)
- **<1100px:** Section-Padding reduziert, Footer-Spalten 2:2
- **<768px:** Mobile, alle Sections gestackt, Burger-Menu, Cookie-Banner full-width
- **<480px:** Footer 1-Column

## Bekannte Layout-/Darstellungsprobleme

- **Detail-Pages Hero** — fahrzeug-bmw320d, -i10, -opel-corsa, -seat-ibiza haben noch alte Glow-Animationen + page-spezifisches CSS aus dem Cinema-Sprint. Phase-3-Reduktion ist auf Detail-Pages noch nicht durchgezogen (Backlog B1).
- **Process-Steps prominenter** — KKM hat 4-Schritt-Liste mit Number-Markers, R&M hat `steps-row` aber kann präsenter (Backlog B3).
- **Atmosphere-Collage** — 4 Tiles mit unterschiedlichen grid-spans wirkt unruhig, KKM-Style wäre 4 gleichgroße oder 3+1 (Backlog B5).

## Bilder / Assets

- 13 SVG-Brand-Logos in `/img/` (audi, bmw, fiat, ford, hyundai, jaguar, kia, mazda, mercedes, nissan, skoda, toyota, vw)
- Komprimierte WebPs für alle Hauptbilder, mit JPG-Fallback (xl/lg/md/sm)
- `/img/insta-web.mp4` (1080p H.264, 6.5 MB) — Lazy-loaded, in zwei Social-Cards (Insta + TikTok)
- `/img/halle2.webp` als Insta-Video-Poster
- Roh-Fotos in `.gitignore` — bleiben lokal aber gehen nicht in GitHub

## Offene UI/UX-Aufgaben (siehe auch `06_OPEN_TASKS.md`)

- Detail-Pages Hero-Reduktion + Glow-Anims raus (Backlog B1)
- Process-Steps prominenter mit Number-Markers (Backlog B3)
- Atmosphere-Collage entschlacken (Backlog B5)
- Hell/Dunkel-Erweiterung 2. Welle: Region-Pages, Blog-Article-Body, FAQ-Page als Long-Form-Reading-Mode (eigener Spec)
- B7 Region-Pages auf alte Glow-Anims prüfen
- B8 CSS-Klassen-Cleanup `.werkstatt*` → `.diagnose*`

## Was nicht angefasst werden darf

- Hybrid-Theme (Dark dominant + Cream-Akzent) — Pattern β fest, kein Vollwechsel
- Mint-Akzent `--grn`/`--grn-on-light` — User mag das
- Pill-Buttons + Glass-Effects auf Dark — User-validiert
- Insta-Video Lazy-Loading (Performance-kritisch)
- Web3Forms-Keys (public, hardcoded)
- GA am Body-Ende per `window.load` (NICHT verschieben)
