# 07 — Decisions Log

## Getroffene Entscheidungen

### D-01 · Branch-Policy: claude-optimierung als Test, main als live
**Wann:** Vor dieser Session
**Warum:** Inhaber will alles vor Merge reviewen können. Cloudflare Pages deployt main-Branch automatisch.
**Konsequenz:** Claude pushed niemals direkt auf main. Alle Experimente laufen auf claude-optimierung.

### D-02 · Volle kreative Freiheit auf claude-optimierung
**Wann:** 02.05.2026
**Warum:** Inhaber sagt: "Erstentwurf hinterlässt definitiv Eindruck" — mutige Designs erlaubt, weil eh vor Merge reviewt.
**Konsequenz:** Claude darf Sections umstellen, neue erfinden, Animationen einbauen, Layouts neu denken — solange Performance-Regeln und Coding-Rules eingehalten werden.

### D-03 · Pure HTML/CSS/JS — kein Framework
**Wann:** vor dieser Session
**Warum:** Cloudflare Pages, kein Build-Step nötig, einfaches Hosting, keine Server.
**Konsequenz:** Keine TypeScript, keine React/Vue/Svelte, kein npm-Build. Alles vanilla, copy-paste-Header zwischen Pages.

### D-04 · Designsystem v2: zentrales `styles/v2.css` + `v2-shared.js` statt Inline-Style/-JS pro Page
**Wann:** 03.05.2026
**Warum:** User-Beschwerde "schaut wie 2 Designs aus" — alle Pages mussten konsistent werden. Inline-Style-Block pro Page erzeugte Drift.
**Konsequenz:** Alle 22 Pages migriert auf zentrale Files. Bei Header/Footer/Button-Änderungen nur noch ein File anfassen.

### D-05 · Mint+Gold Akzent-Farben, Dark Theme bleibt
**Wann:** vor dieser Session, in dieser Session bestätigt
**Warum:** etabliertes Look&Feel, User-validiert.
**Konsequenz:** Kein Light-Mode-Wunsch, Akzentfarben (`--grn`, `--gold`) werden überall durchgezogen.

### D-06 · Mobile-Burger ab 1024px statt 768px
**Wann:** 03.05.2026
**Warum:** User-Feedback "Kontaktbutton zerquetscht". Bei 768-1024px war Nav noch Desktop-Layout aber zu eng.
**Konsequenz:** Auf Tablet-Größen jetzt Mobile-Menü-Erfahrung. Cleaner Look. Schon Live auf claude-optimierung.

### D-07 · Bilder als WebP mit JPG-Fallback via `<picture>`
**Wann:** 03.05.2026
**Warum:** Performance — Roh-JPGs waren 5-14 MB, mussten komprimiert werden. WebP spart ~70% bei gleicher Qualität.
**Konsequenz:** ~93 MB Roh-JPGs → ~3 MB WebPs. i10-Galerie ~110 MB → ~2,5 MB. Alle Refs angepasst.

### D-08 · Insta-Video Lazy-Loading via IntersectionObserver
**Wann:** 03.05.2026
**Warum:** 19 MB Video würde Initial-Load killen. Erst beim Scroll laden.
**Konsequenz:** `<video class="lazy-video" data-src="...">` Pattern. Logik in v2-shared.js.

### D-09 · `.gitignore` für Roh-Fotos + Tooling-Scripts
**Wann:** 03.05.2026
**Warum:** Inhaber-Wunsch — unbenutzte Files sollen nicht in GitHub. Lokal aber behalten.
**Konsequenz:** `.gitignore` deckt DSC*, halle_innen.jpg, werkstatt.jpg etc. + Tooling-Scripts (compress_*.py, add_faq_link.py, v2-migration-template.md). 20 Files via `git rm --cached` aus Tracking entfernt.

### D-10 · Keine eigene Werkstatt — Wording entsprechend angepasst
**Wann:** 03.05.2026
**Warum:** Inhaber-Klärung: R&M hat KEINEN eigenen Werkstattbetrieb, nur Halle + Diagnoseausrüstung.
**Konsequenz:** Alle Werkstatt-Aussagen auf Hauptseiten korrigiert. Blog-Stellen ("Hebebühne", "Werkstatt-Reihenfolge") angepasst. CSS-Klassen `.werkstatt*` bleiben aus Pragmatik (interner Name, kein UI-Text). Memory-Eintrag gespeichert.

### D-11 · FAQ als eigenständige Page mit Such-Filter
**Wann:** 03.05.2026
**Warum:** Inhaber-Wunsch "auch FAQ Page geht besser" — eigenständige Page mit mehr Tiefe als Home-FAQ.
**Konsequenz:** Neue `faq.html` mit 30+ Fragen in 6 Kategorien, Live-Search, Schema.org-Markup. In sitemap.xml + Footer-Nav + Mobile-Menü ergänzt.

### D-12 · FAQ-Link nur in Mobile-Menü + Footer, nicht in Top-Desktop-Nav
**Wann:** 03.05.2026
**Warum:** Top-Desktop-Nav hat schon 6 Items + CTA. 7. Item würde wieder Squishing erzeugen (siehe D-06).
**Konsequenz:** FAQ ist diskoverbar via Mobile-Menü und Footer-Nav, aber nicht im Desktop-Header.

### D-13 · Header/Footer-HTML manuell synchronisiert pro Page (nicht via JS-Inject)
**Wann:** Implizit etabliert, in dieser Session beibehalten
**Warum:** Statisch-HTML-Ansatz, kein Build-Step, JS-Inject würde noScript-Pages kaputt machen + SEO-relevant für Footer-Navigation
**Konsequenz:** Bei Änderung am Header oder Footer alle 22 Pages nachziehen — möglicher zukünftiger Refactor (T-12).

### D-14 · Team-Rollen final geklärt (löst O-01 und O-02)
**Wann:** 03.05.2026 nach Brain-Dokumentation, durch User-Input
**Warum:** Blogs hatten falsche Aussagen (Brüder, beide KFZ-Mechatroniker). Klärung war P0-Blocker für Commit/Merge.
**Fakten:**
- Moritz Wahl + René Grüber sind **nicht verwandt**, sondern beste Freunde seit knapp 10 Jahren
- **Moritz Wahl** = gelernter KFZ-Mechatroniker; zuständig für Technik-Check, Fahrzeugzustandsbericht, Werkstatt-/TÜV-Kontakte, Marktanalysen
- **René Grüber** = gelernter Bürokaufmann + >1 Jahr Verkaufsberater-Erfahrung im Autohaus; zuständig für PC/Digitalthemen, KI, CRM, Abläufe, Verträge, Website, organisatorische und digitale Prozesse
**Konsequenz:**
- Volltext in `01_PROJECT_OVERVIEW.md` Section "Team / Rollen"
- T-01 in `06_OPEN_TASKS.md` jetzt mit konkreten Akzeptanzkriterien — Implementation steht noch aus
- Hinweis: Memory-Datei `project_rm_automobile.md` hat René noch als "jahrelange Erfahrung als Verkaufsberater" — leicht ungenau (richtig: >1 Jahr). User hat in dieser Session NUR Brain-Update gewünscht, Memory-Update nicht beauftragt — bei nächstem Touch ggf. mit User abstimmen

### D-15 · Background ohne Noise + Mesh — pure Dark
**Wann:** 04.05.2026 nach User-Reality-Check
**Warum:** User-Feedback: "Der ganze Hintergrund besteht aus Rauschen irgendwie ... Bastelprojekt von einem Schulkind". Live-Reality-Check auf https://claude-project-bex.pages.dev/ + Vergleich mit kkmmedia.de bestätigt: KKM hat clean Background ohne Noise/Texturen, dafür viel Whitespace und klare Sections. Der Mint+Gold-Mesh + SVG-Fractal-Noise wirkten wie TV-Off-Screen-Static und unterminierten den professionellen Eindruck.
**Konsequenz:** `body::before` (Mesh) + `body::after` (Noise) + `@keyframes ambientFlow` aus `styles/v2.css` entfernt. Background ist jetzt pure `var(--page)` #161614. Atmosphärische Akzente bleiben zulässig **per-Section** (z.B. Hero-Page-`::before` mit Radial-Glow, Region-Cards) — aber niemals site-wide gestapelt. Memory-Eintrag `feedback_design_ambition.md` (KKM-Niveau, MAX OPUS) wird umgedeutet: "Ambitioniert" heißt cleane Typo + durchdachte Sections + Whitespace, NICHT Noise + Animation-Stack.

### D-17 · KKM-Reduktion Phase 2: Logo-Carousel + USP-Entfeatured + Hero-H1-Caps global
**Wann:** 04.05.2026 nach User-Feedback "kein Vergleich, KKM-Niveau noch nicht erreicht — Claude Code hat KKM auch gebaut, also kriegst du es krasser hin"
**Warum:** Erste Reduktions-Phase (D-15) hat Background-Noise + falsche Stats raus genommen, aber visuell noch nicht KKM-Niveau. Tief-Analyse via WebFetch ergab konkrete KKM-Patterns: Endlos-Logo-Carousel (kein Brand-Grid), Service-Cards alle gleichgewichtig (kein "featured"-Riese), Hero-Schriften 32-48px (nicht 128px+), Section-BG-Wechsel.
**Konsequenz:**
- Index Brand-Section komplett ersetzt: Brand-Grid (7-Spalten-Tiles mit "+162 weitere"-CTA) → `.logo-carousel` mit 17 Logos x2 für seamless infinite-scroll, mask-fade an Rändern, hover-pause. Dezent (`grayscale(.9)` opacity .65), wirkt durch Bewegung statt Effekt
- USP-Cards: `.featured`-Klasse komplett entfernt, alle 4 Cards gleichgroß in 4-Spalten-Grid, kein 540px-Riesen-Card mehr. Padding 36/28 statt 48/40, h3 18px statt clamp(...,30px)
- Hero-h1-Caps reduziert auf allen Pages: index 84px (war 176px), uber-uns 76px (war 128px), fahrzeugbereich 84px (war 128px), mein-fahrzeug-verkaufen 80px (war 118px) — alle KKM-Bandbreite 32-48px adjusted für Dark-Theme
- CTA-Band: Riesen-"R&M"-Wasserzeichen (clamp 360px) entfernt; Glow auf 900x420 reduziert; Headline auf 64px max statt 108px; Padding 112px statt 160px
- Brand-Marquee oben (Text-Endlos) entfernt — war Dopplung mit neuem Logo-Carousel
**Wann:** 04.05.2026 nach User-Frust über Riesen-Sprint ohne Verifikation
**Warum:** Letzter Sprint war massiv (5 Phasen, 166 Files committed), ohne dass irgendein Schritt im Browser verifiziert wurde — Resultat: "komplett verkakt". Plus erfundene Stats über René, Animationen die Text überdecken, Background nicht User-tauglich. Großvolumige autonome Arbeit ohne Reality-Check führt zu Drift weg vom User-Wunsch.
**Konsequenz:** Ab jetzt Mini-Schritte (A, B, C…) mit explicit User-Sign-off auf Live-Preview-URL, BEVOR der nächste Schritt gestartet wird. Brain-Updates pro Schritt. Auch große Themen (z.B. SEO-Keywords) in einzelne Pages aufteilen, nicht en bloc bearbeiten.

---

## Offene Entscheidungen

### O-03 · Soll Header/Footer als JS-Partial geladen werden? **UNGEKLÄRT**
**Wirkung:** Würde Maintenance vereinfachen, aber JS-Abhängigkeit + Initial-Render-Flicker einführen.
**Aktion:** Mit User abstimmen, ob Architektur-Change OK ist (T-12).

### O-04 · Welche zusätzlichen Sections auf Fahrzeug-Detail-Pages? **UNGEKLÄRT**
**Wirkung:** T-04 hängt davon ab — vorgeschlagen: History/Service-Check/Garantie/FAQ-pro-Fahrzeug, aber User soll bestätigen.
**Aktion:** User-Brief einholen vor Implementation.

---

## Punkte zur späteren Überprüfung
- Header-Sync-Risiko (D-13) — wenn das nächste Mal Nav geändert wird, mit `add_faq_link.py`-Pattern arbeiten oder T-12 erwägen
- `.werkstatt`-CSS-Klassen (D-10 / T-10) — beim nächsten Touchpoint umbenennen
- Wenn neue Pages dazukommen: `v2-migration-template.md` nutzen
- Memory-Eintrag `project_rm_automobile.md` mit René-Erfahrungs-Detail (>1 Jahr Verkaufsberater statt "jahrelange Erfahrung") bei Gelegenheit mit User abstimmen und ggf. updaten
