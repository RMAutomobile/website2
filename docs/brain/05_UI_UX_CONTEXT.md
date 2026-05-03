# 05 — UI/UX Context (Ist-Zustand)

## Designsystem Tokens (in `styles/v2.css`)
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
--fh:'Plus Jakarta Sans'   Headings
--fb:'DM Sans'             Body
--ease:cubic-bezier(.22,1,.36,1)
--bounce:cubic-bezier(.175,.885,.32,1.275)
--r-sm:8px / --r-md:14px / --r-lg:20px / --r-xl:32px
--nav-h:88px / --nav-h-mob:72px
--container:1440px
--pad-sec:160px / --pad-sec-mob:88px
```

## Theme
- **Dark Theme**, kein Light-Mode geplant
- Italic-em-Akzent in Mint-Gold-Gradient durchgängig auf H1/H2
- Mint-Glow-Shadows auf primären Buttons
- Pill-Buttons (border-radius:999px) durchgängig
- Border-Radius 14/20px für Cards
- Animated Mint+Gold-Glow-Blobs auf Hero und site-wide (subtil)
- SVG-Fractal-Noise-Overlay site-wide via `mix-blend-mode:overlay`

## Wiederkehrende Komponenten
- **`.btn` + Modifier `.btn-prime` / `.btn-glass` / `.btn-mini`** — alle Pill-Style mit unterschiedlichen Treatments
- **`.eyebrow`** — kleine 11px-Uppercase-Label vor H2, mit Mint-Linie
- **`h2.display`** — Hero-Headline-Style (clamp 44-96px), `em` für Mint-Gradient-Akzent
- **`.reveal` (+ .d1-.d5)** — Scroll-Reveal-Pattern, fade+slide-up
- **`.live-badge`** — Pulsing Mint-Dot mit Live-Indicator
- **`.vcard`** — Vehicle-Card mit aspect-16/10 Image, Hover Translate + Mint-Glow
- **`.usp-card`** — Bento-Grid-Cards (eine `.featured` doppelt so groß)
- **`.step-cell`** — 3-Schritte-Funnel-Cards mit Mint-Top-Bar-Hover
- **`.leist-item`** — Magazine-Style-Accordion mit Sticky-Sidebar-Layout
- **`.atmo-tile`** — Foto-Collage-Tile mit Caption + Hover-Image-Scale
- **`.brand-tile`** — Logo-Grid-Tile mit Hover-Glow
- **`.rev-card`** — Review-Testimonial-Card mit Stars + Avatar-Pill
- **`.faq-item`** — FAQ-Accordion mit Plus-Toggle der zu Mint-Cross rotiert
- **`.region-card`** — Lokal-SEO-Card mit Distance-Tag
- **`.cookie-banner`** — Floating-Card unten

## Layout-Breakpoints
- **>1180px:** Full-Desktop (alle Nav-Links sichtbar)
- **1024-1180px:** Padding reduziert, Burger erscheint, Nav-Links versteckt — fixt zerquetschten Kontakt-Button
- **<1100px:** Section-Padding reduziert, Footer-Spalten 2:2
- **<768px:** Mobile, alle Sections gestackt, Burger-Menu, Cookie-Banner full-width
- **<480px:** Footer 1-Column

## Bekannte Layout-/Darstellungsprobleme
- **uber-uns.html Werte-Section** — sieht laut User-Feedback "wie ein zweites Design" aus, nicht v2-konsistent (Stage 5 Rest)
- **uber-uns.html Team-Bilder** — Größen unterschiedlich, nicht einheitlich (Stage 5 Rest)
- **Fahrzeug-Detail-Pages** — laut User "deutlich besser, aber geht auch fülliger und nicht so kurz" (Stage 6)
- **mein-fahrzeug-verkaufen.html Form** — Scroll-zu-weit-Bug GEFIXT, aber Form selbst noch im "altbacken-Design" laut User-Feedback (Stage 7) — Multi-Step-Wizard geplant aber nicht umgesetzt
- **Marken-Filter auf Fahrzeugbereich** — fehlt komplett (Stage 6)

## Bilder / Assets
- 13 SVG-Brand-Logos in `/img/` (audi, bmw, fiat, ford, hyundai, jaguar, kia, mazda, mercedes, nissan, skoda, toyota, vw)
- Komprimierte WebPs für alle Hauptbilder, mit JPG-Fallback (xl/lg/md/sm)
- `/img/insta.mp4` (19 MB) — Lazy-loaded, kein Initial-Hit
- `/img/halle2.webp` als Insta-Video-Poster
- Roh-Fotos in `.gitignore` — bleiben lokal aber gehen nicht in GitHub

## Offene UI/UX-Aufgaben (siehe auch `06_OPEN_TASKS.md`)
- uber-uns Werte-Section v2-Stil (Bento oder Steps)
- Team-Bilder einheitliche Größen
- Fahrzeug-Detail-Pages Content-Tiefe (History-Block, Garantie-Section, Service-Historie, FAQ pro Fahrzeug)
- Fahrzeugbereich Marken-Filter
- mein-fahrzeug-verkaufen Multi-Step-Wizard mit 30+ Marken-Auswahl

## Was nicht angefasst werden darf
- Dark Theme (kein Light-Mode-Wunsch)
- Mint+Gold-Gradient-Akzent (User mag das)
- Pill-Buttons + Glass-Effects (User-validiert)
- Hero-Word-by-Word-Stagger-Animation auf Home (User-validiert)
- Insta-Video Lazy-Loading (Performance-kritisch)
