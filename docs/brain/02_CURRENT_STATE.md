# 02 — Current State

**Stand:** 04.05.2026, Branch `claude-optimierung`, Commit `e23fcf5` ist live auf Preview https://claude-project-bex.pages.dev/.

**Aktuell:** Nach User-Reality-Check Reset-Phase — Mini-Schritt-Workflow A→H. Schritt A (Background-Noise raus) lokal erledigt, push ausstehend.

## Stage-Status
- Stages 1–4 (Bilder, v2.css-Foundation, Header/Footer-Rollout, Home MAX OPUS) — **fertig**
- Stage 5 (Inhaltsseiten v2-Stil) — **fertig** — Chrome-Migration aller 16 Pages + uber-uns Werte-Section auf v2-Bento + Team-Bilder einheitlich (T-02, T-03 erledigt)
- Stage 6 (Fahrzeugbereich Marken-Filter, Detail-Pages füllen) — **fertig** (T-04 + T-05 erledigt)
- Stage 7 (mein-fahrzeug-verkaufen Wizard-Polish) — **fertig** (T-06 erledigt)
- Stages 8–11 (FAQ-Page, Cross-Page-Verifikation, Blog-Migration, Asset-Cleanup) — **fertig**

## Was funktioniert
- 22 HTML-Pages auf v2-Designsystem (identischer Header/Footer/Cookie/Background überall)
- `styles/v2.css` + `v2-home.css` + `v2-faq.css` + `v2-shared.js` als zentrale Bases
- Bilder komprimiert: ~93 MB → ~3 MB (Hauptbilder), ~110 MB → ~2,5 MB (i10-Galerie); WebP + JPG-Fallback
- Insta-Video lazy-loaded via IntersectionObserver
- `mein-fahrzeug-verkaufen.html` Scroll-zu-weit-Bug behoben (`block:'start'` + `scroll-margin-top:110px`)
- Inputs überall `font-size:16px` (iOS-Zoom verhindert)
- Nav-Burger ab 1024px (zerquetschter Kontakt-Button gefixt)
- Site-wide animierter Background (Mint+Gold-Gradient + SVG-Noise)
- `faq.html` neu — 30+ Fragen, 6 Kategorien, Live-Search, Schema.org
- FAQ-Link in Mobile-Menu + Footer aller 17 Hauptpages
- Werkstatt-Aussagen korrigiert (Index, FAQ, Blogs) — R&M hat keine eigene Werkstatt
- Blog-Schema-Namen gefixt ("René Müller"→"Grüber", "Moritz Wittmann"→"Wahl")
- `.gitignore` erstellt; 20 unbenutzte Files via `git rm --cached` aus Tracking entfernt
- Team-Rollen final geklärt (siehe Decision D-14)

## Was ist unfertig
- T-07 Cross-Browser-Test (Mobile iOS/Android + Desktop) — User-Aufgabe
- T-08 Lighthouse-Run vor Push
- T-09 Commit + Merge nach main (nach User-Review)
- Memory-Detail: `project_rm_automobile.md` sagt "jahrelange Erfahrung als Verkaufsberater" — korrekt ist ">1 Jahr". Mit User abstimmen.

## Bekannte Probleme / Risiken
- `werkstatt.jpg` + `werkstatt-lg.{webp,jpg}` liegen lokal in `/img/` (gitignored), Naming irreführend
- `v2-home.css` CSS-Klassen `.werkstatt*` funktional, aber semantisch falsch benannt (T-10)
- Sitemap nochmal validieren vor Merge (T-11)
- `Insta Edit.mp4` ist Duplikat von `insta.mp4`, gitignored

## Zuletzt bearbeitete Dateien
- `uber-uns.html` — Werte-Section v2-Bento + Team-Cards Cinema (animated conic-Border, Mouse-Spotlight, Stats-Reveal, Quote-Shimmer, Skill-Pills, Inline-Mouse-Tracking-Script)
- `fahrzeugbereich.html` — Marken-Filter-Bar (16 Pills mit Logos, Counter, Active-Chips, URL-Param-Support, Empty-State mit dynamischem Wunsch-CTA)
- `fahrzeug-bmw320d.html`, `fahrzeug-i10.html`, `fahrzeug-opel-corsa.html`, `fahrzeug-seat-ibiza.html` — neue Sections (History, 24-Punkte-Check, Garantie-3-Card, Detail-FAQ pro Fahrzeug)
- `styles/v2-detail.css` — neu, zentrale Detail-Page-Sections-CSS
- `mein-fahrzeug-verkaufen.html` — Step-Pips mit Pulse-Ring, Slide-Transitions, Brand-Logo-Picker (Top-13 + Liste-Fallback), Marken-Liste auf 30+ erweitert, Success-Animation mit Ring-Pulse
- `blog/autoankauf-hemau-ablauf.html`, `blog/gebrauchtwagenkauf-checkliste.html`, `blog/index.html` — Team-Fakten korrigiert (keine Brüder, nur Moritz KFZ-Mechatroniker, "René Müller" → "René Grüber")
- `index.html` — Werkstatt-Korrektur, Marken-Grid + Atmosphere + Reviews + erweiterte FAQ
- `faq.html` — neu
- `styles/v2.css`, `styles/v2-home.css` — erweitert; `styles/v2-faq.css` — neu
- `v2-shared.js` — neu
- 16 Hauptseiten + 4 Blog-Pages — Chrome-Migration durch Agents
- `.gitignore` — neu; `sitemap.xml` — faq.html ergänzt
- `docs/brain/*.md` + `CLAUDE.md` — Brain-Dokumentation komplett
- `docs/brain/01_PROJECT_OVERVIEW.md` Section "Team / Rollen" + `07_DECISIONS_LOG.md` D-14 — Team-Klärung
