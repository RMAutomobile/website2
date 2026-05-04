# 04 — Technical Context

## Tech-Stack
- **HTML5 + CSS3 + Vanilla JS** — kein Framework, kein TypeScript, kein Build-Step
- **Cloudflare Pages** Hosting, Branch `main` triggert Auto-Deploy
- **Web3Forms** für zwei Formulare (Public Keys, Client-Side, kein Backend nötig)
  - Kontakt (info@): `389274e6-7685-4a9e-ad01-5cd0443e0941`
  - Ankauf (ankauf@): `c1658cf3-cbae-4074-beef-e94c75d2f19a`
- **Google Analytics:** `G-XDZRP2W3X9` — lazy via `window.load` in `v2-shared.js`
- **Google Maps Embed** für Standort, Cookie-konform via `data-map-src` Pattern

## Projektstruktur
```
website2/
├── *.html                  # 17 Hauptseiten (siehe 01_PROJECT_OVERVIEW.md)
├── blog/*.html             # 4 Blog-Pages
├── styles/
│   ├── v2.css              # Designsystem-Base (Tokens, Reset, Nav, Footer, Buttons, Sections, Background, Cookie-Banner)
│   ├── v2-home.css         # Home-only Sections (Hero, Marquee, Team, Vehicle-Cards, USP-Bento, Steps, Leistungen, Werkstatt-Section[*], Insta, Regions, FAQ, CTA-Band, Map, Brand-Grid, Atmosphere-Collage, Reviews-Cards)
│   └── v2-faq.css          # FAQ-Page-Layout (Page-Hero, Search-Bar, Category-Filter, FAQ-Cat-Group, Empty-State)
├── v2-shared.js            # Zentrale Site-Behavior (Mobile-Menu, Cookie, Maps-Lazy, Reveal-Observer, Lazy-Video, Nav-Scroll, FAQ-Toggle, Email-Cloak, GA)
├── back-to-top.js          # Back-to-Top-Button-Logik
├── img/                    # Bilder + Brand-Logos (SVG)
├── sitemap.xml
├── robots.txt
├── site.webmanifest
└── favicon.ico + Varianten

[*] CSS-Klassen `.werkstatt*` heißen historisch so, sind funktional. Nicht UI-Text.
```

## Wichtige Komponenten / Patterns
- **Header:** `<nav class="topbar" id="main-nav">` mit Logo, 6 Nav-Links, Burger-Button. Mobile <1024px: Burger; Desktop: full nav. CSS in v2.css
- **Mobile Menu:** `<div class="mob-menu" id="mob-menu">` Fullscreen-Overlay, toggle via `toggleMenu()`
- **Footer:** `<footer>` mit `.ft-pre` (CTA-Block) + `.ft-inner` (4 Spalten: Brand, Navigation, Region, Kontakt) + `.ft-bot` (Copyright + Legal)
- **Cookie-Banner:** `<div class="cookie-banner">` mit Accept/Decline, persistiert in localStorage `rm_cookies`
- **Reveal-Animation:** Element bekommt Klasse `.reveal` (+ optional `.d1`/`.d2`/.../d5 für Delays). v2-shared.js hängt `.on` per IntersectionObserver an
- **Lazy-Video:** `<video class="lazy-video" data-src="...">` — Src wird erst gesetzt, wenn Element sichtbar wird
- **Buttons:** `.btn .btn-prime` (Mint Pill), `.btn .btn-glass` (transparenter Glass), `.btn .btn-mini` (Outline klein)
- **Eyebrow-Label:** `.eyebrow` (uppercase, 11px, mit Mint-Linie davor) — kommt vor jeder H2
- **H2 Display:** `h2.display` (clamp 44px-96px, weight 800, italic-em-Akzent)

## Datenmodelle / State / API
- **Kein State-Management** — alles statisch
- **Kein Backend** — Formulare via Web3Forms, Maps via Google iFrame
- **Local Storage:** nur Cookie-Consent (`rm_cookies` = "accepted" | "declined")

## Build / Start / Test
- **Kein Build** — Files direkt von Disk, Browser rendert
- **Lokal testen:** `python -m http.server 8000` im Project-Root, dann `http://localhost:8000/`
- **Lighthouse:** Chrome DevTools → Lighthouse Tab (UNGEKLÄRT — diese Session nicht durchgeführt)
- **Cross-Browser-Test:** UNGEKLÄRT — manuell im Browser nötig

## Technische Risiken / Schulden
- Header- und Footer-HTML ist auf jeder Page **inline kopiert** statt aus Partial geladen. Bei Änderung: alle 22 Pages nachziehen. Aktuell synchron, aber jede zukünftige Änderung muss sauber gerollt werden.
- v2-Migration-Template `v2-migration-template.md` und Hilfs-Scripts (`compress_assets.py`, `compress_i10_gallery.py`, `add_faq_link.py`) sind im Repo aber `.gitignore`d — falls neue Pages hinzukommen wiederverwendbar
- `.werkstatt` CSS-Klassen sind historische Naming-Schuld (Class-Name passt nicht mehr zur Realität). Funktional egal, beim nächsten Touchpoint vlt. umbenennen
- 4 alte i10-Foto-Refs im fahrzeug-i10.html nutzen jetzt WebP, aber Schema.org JSON-LD an Top der Page hat 2 Refs noch im Schema — verifiziert, alle WebP. (NB: doppelt geprüft.)
- Keine Tests vorhanden (statische Seite)
