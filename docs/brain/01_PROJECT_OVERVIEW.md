# 01 — Project Overview

## Projekt
**R&M Automobile UG** — Gebrauchtwagenhändler in Hemau (Bayern), eigentümergeführt von Moritz Wahl + René Grüber.

## Team / Rollen
- **Moritz Wahl + René Grüber** — Mitgründer & Geschäftsführer. **Nicht verwandt** — beste Freunde, kennen sich seit knapp 10 Jahren.
- **Moritz Wahl:**
  - Gelernter **KFZ-Mechatroniker**
  - Verantwortlich für: Technik-Check, Fahrzeugzustandsbericht, Kontakt mit Werkstatt (extern) und TÜV, Marktanalysen
- **René Grüber:**
  - Gelernter **Bürokaufmann**, zusätzlich **über 1 Jahr Erfahrung als Verkaufsberater** im Autohaus
  - Verantwortlich für: PC- und Digitalthemen, KI, CRM, Abläufe, Verträge, Website, alle organisatorischen und digitalen Prozesse am PC
- **Konsequenz für Content/Copy:** René nicht als KFZ-Mechatroniker darstellen, "Bruder/Brüder" nicht verwenden. Tech-Tiefe (Werkstatt-/Diagnose-Sicht) sprachlich Moritz zuordnen, Vertrieb/Verträge/Digitales René.

## Domain & Hosting
- Live: https://www.rmauto-mobile.de
- Hosting: **Cloudflare Pages**, Auto-Deploy via GitHub Push auf Branch `main`
- Branch-Konvention: alle Änderungen erst auf `claude-optimierung`, Inhaber reviewt, dann Merge nach `main`

## Tech-Stack
- Pure **HTML/CSS/JS** — kein Framework, kein CMS, kein WordPress, kein Build-Tool
- Statisches Hosting, keine Server-Logik
- Web3Forms für Formulare (zwei API-Keys, siehe `04_TECHNICAL_CONTEXT.md`)
- Google Analytics G-XDZRP2W3X9 (lazy-loaded am Body-Ende)

## Hauptbereiche / Funktionen
- **Home (`index.html`)** — Hero, Marken-Grid, Hinter-die-Kulissen-Fotos, Vehicle-Cards, USP-Bento, 3-Schritte-Verkauf, Leistungen, Insta-Video, Region-Cluster, Reviews, FAQ, Map
- **Fahrzeugbereich (`fahrzeugbereich.html`)** — Bestandsliste mit Filter
- **4 Fahrzeug-Detail-Pages** — i10, BMW 320d, Opel Corsa, Seat Ibiza (verkauft)
- **mein-fahrzeug-verkaufen.html** — Ankauf-Funnel mit Web3Forms, Bilder-Upload, mehrstufiges Formular
- **kontakt.html** — Kontakt + Web3Forms
- **uber-uns.html** — Team + Werte + Geschichte
- **faq.html** — 30+ Fragen in 6 Kategorien (NEU diese Session)
- **5 Region-Pages** (autoankauf-regensburg/-ingolstadt/-parsberg/-kelheim, gebrauchtwagen-neumarkt) — SEO-Lokal
- **3 Legal-Pages** — agb, datenschutz, impressum
- **Blog (`/blog/`)** — Index + 3 Artikel (Autoankauf-Ablauf, Gebrauchtwagen-Checkliste, TÜV-Tipps)

## Wichtige Ordner / Dateien
```
website2/
├── index.html              # Home
├── faq.html                # Neu, 30+ Fragen
├── fahrzeugbereich.html    # Bestandsliste
├── fahrzeug-*.html         # 4 Detail-Pages
├── mein-fahrzeug-verkaufen.html
├── kontakt.html / uber-uns.html
├── agb.html / datenschutz.html / impressum.html
├── autoankauf-*.html / gebrauchtwagen-neumarkt.html  # Region-SEO
├── blog/                   # 4 Pages
│   ├── index.html
│   └── *.html
├── styles/
│   ├── v2.css              # Tokens, Reset, Nav, Footer, Buttons, Sections, Background
│   ├── v2-home.css         # Home-spezifische Sections (Hero, Bento, Atmosphere, ...)
│   └── v2-faq.css          # FAQ-Page-Layout
├── img/                    # Bilder, mit komprimierten WebPs
├── v2-shared.js            # Zentrale JS-Logik (Cookie, Menu, Reveal, etc.)
├── back-to-top.js
├── sitemap.xml
├── robots.txt
└── .gitignore              # Neu, ignoriert Roh-Fotos + Tooling-Scripts
```

## Architektur grob
- Jede Page ist eigenständig, teilt aber:
  - **`/styles/v2.css`** als globales Designsystem (Tokens, Header, Footer, Buttons, Background)
  - **`/v2-shared.js`** als gemeinsame JS-Logik
  - Identisches Header- + Footer-HTML in jeder Page (manuell synchron gehalten)
- Page-spezifische Styles bleiben inline `<style>` (nur was wirklich page-spezifisch ist)
- Schema.org JSON-LD pro Page für SEO
- Mobile-first, Dark Theme (`--page:#0f0f0e`, Akzent Mint `#7ad99e`)
