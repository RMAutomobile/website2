# 02 — Current State

**Stand:** 04.05.2026, Branch `claude-optimierung`, Commit `9bee4b4` ist live auf Preview https://claude-project-bex.pages.dev/.

**Live-Branch `main`** unangetastet — Cloudflare Pages deployt nur main, daher ist rmauto-mobile.de noch alter Stand. Merge nach main erst nach User-Review-OK.

---

## Was im Sprint 04.05.2026 passiert ist (Kurzfassung)

User-Reality-Check auf Preview-URL → Design wirkte "wie Bastelprojekt", "kein Vergleich zu KKM Media". Tiefe Analyse via WebFetch von kkmmedia.de + 3 systematische Reduktions-Phasen statt weiterem "Cook-Sprint". Brain-Lessons festgehalten in Memory `feedback_kkm_lessons.md`.

**3 Reduktions-Phasen + Memory-Lessons:**
1. **Phase 1** (`a7ce5a9`) — Background-Noise + Mesh raus, falsche Stats raus (Decision D-15)
2. **Phase 2** (`4cbd71e`) — Logo-Carousel statt Brand-Grid, USP entfeatured, Hero-H1-Caps global, CTA-Wasserzeichen weg (Decision D-17)
3. **Phase 3** (`9bee4b4`) — Stats-Strip als eigene Section, Hero-Trust raus, Glow-Anims site-wide raus, Footer cleanup (Decision D-18)

Plus Schritt-vor-Phase-1 (`431b5d5`) — Insta+TikTok Cards mit komprimiertem Video, Team-Bilder Crop fix.

---

## Was funktioniert (KKM-konform)

- ✅ **Cleaner Background** — kein Noise, kein Mesh-Overlay, kein TV-Static-Effekt mehr
- ✅ **Hero ohne Show-off** — keine Word-Animationen, keine 3 Glow-Layer, keine 100svh-Vollbild
- ✅ **Stats-Strip** als eigene Section unter Hero (KKM-Pattern Section #1)
- ✅ **Logo-Carousel** mit 17 Marken in seamless infinite-scroll, mask-fade Edges, hover-pause
- ✅ **USP-Cards gleichgewichtig** in 4-Spalten-Grid, kein "featured"-Riesen-Card
- ✅ **Hero-H1 Größen vernünftig** auf allen Pages (max 76-84px, war 128-176px)
- ✅ **Container zentriert** (max-width 1280px, war 1440px), padding 40px
- ✅ **Glow-Animationen entfernt** auf uber-uns + fahrzeugbereich + mein-fahrzeug-verkaufen
- ✅ **Footer entglowt** — solid `var(--c1)` für Tonal-Wechsel zum Site-Body
- ✅ **Brand-Logos sichtbar** — `grayscale(.85)` statt `brightness(0) invert(1)` (zerstörte BMW-Ring etc.)
- ✅ **Burger-Breakpoint 1180px** (war 1024px) — Kontakt-Button nicht mehr zerquetscht
- ✅ **Card-Bild-Crop** auf Über-Uns: aspect-ratio 1/1 statt 4/5 (passt zu 800x800 Originalen)
- ✅ **Falsche Stats raus** auf Team-Cards ("10+ Jahre", "100%" — waren erfunden)
- ✅ **SEO-Keywords** in H1+Lead+Eyebrow auf allen Hauptseiten (Hemau, Regensburg, Ingolstadt, Neumarkt, Kelheim, Parsberg)
- ✅ **Insta + TikTok** beide mit Video-Card eingebunden (insta-web.mp4 6.5 MB statt 19.5 MB)

---

## Was noch nicht KKM-Niveau ist (Backlog)

### Backlog Priorität 1 — visuelle Distanz zu KKM
- **Section-BG echte Hell/Dunkel-Wechsel** — KKM wechselt weiß↔dunkel, wir wechseln nur zwischen 2 Dark-Tönen. Memory `project_rm_automobile.md` sagte "Dark Theme bleibt" — User hat aber jetzt Freifahrt erteilt → Theme-Refactor mit cremigem Akzent-Bereich denkbar
- **Detail-Pages noch nicht reduziert** — fahrzeug-bmw320d, -i10, -opel-corsa, -seat-ibiza haben noch alte Glow-Animationen, alte Hero-Größen, page-spezifisches CSS aus dem Cinema-Sprint. Phase 4 nötig.
- **Process-Steps prominenter** — KKM hat 4-Schritt-Liste mit Number-Markers; wir haben `steps-row` aber kann präsenter
- **Reviews/Testimonials** — aktuell als Cards; KKM macht das als breite zitierbare Blocks

### Backlog Priorität 2 — Content + SEO
- **SEO-Keywords Phase 2** — nur H1+Lead+Eyebrow gemacht, Body-Texte + Sub-Sections noch nicht durchgekämmt
- **Region-Pages** — User-Lob (Inhaltlich gut), aber haben evtl. noch alten Hintergrund/Glow
- **Atmosphere-Collage entschlacken** — aktuell 4 Tiles mit verschiedenen grid-spans; KKM-Style wäre einfacher 4-Card-Grid oder 3+1

### Backlog Priorität 3 — Fertig vor Merge
- **T-07 Cross-Browser-Test** Mobile iOS/Android + Desktop Chrome/Firefox/Safari — User-Aufgabe
- **T-08 Lighthouse-Run** vor Push, alle Scores ≥95
- **T-09 Commit + PR + Merge nach main** nach User-OK

### Bekannte Probleme / Risiken
- `werkstatt.jpg` + `werkstatt-lg.{webp,jpg}` liegen lokal (gitignored), Naming irreführend
- `v2-home.css` CSS-Klassen `.werkstatt*` semantisch falsch benannt (T-10)
- `Insta Edit.mp4` ist Duplikat von `insta.mp4`, gitignored — `insta-web.mp4` (6.5 MB) ist die committed Version
- Memory `project_rm_automobile.md` sagt "jahrelange Erfahrung als Verkaufsberater" — korrekt ist ">1 Jahr". Mit User abstimmen.
- Netlify-Webhook am Repo failt bei jedem Push ("Deploy Preview for effortless-bunny-69b136 failed") — User nutzt Cloudflare, Netlify-Hook muss in GitHub Repo Settings → Webhooks gelöscht werden

---

## Pflicht-Workflow für die nächste Session

1. **Vor jedem Effekt:** Reflexion `feedback_kkm_lessons.md` — "Macht KKM das?" (Memory)
2. **Mini-Schritte mit Sign-off** (Decision D-16) — keine Riesen-Sprints, kleine Commits, User-Review auf Preview-URL nach jedem Move
3. **Brain-Docs pflegen während des Arbeitens** (Memory `feedback_brain_workflow.md`) — nicht erst am Sessionsende
4. **Niemals erfundene Stats** (Memory `feedback_no_invented_stats.md`) — keine "10+ Jahre", "100%", "500+" auf der Site ohne User-Bestätigung
5. **Branch-Policy:** Nur `claude-optimierung`, niemals direkt auf main
6. **Live-Reality-Check:** https://claude-project-bex.pages.dev/ vor Status-Reports

---

## Letzte Commits (chronologisch)

```
9bee4b4 KKM-Reduktion Phase 3: Stats-Strip Section, Glow-Animations site-wide raus, Footer clean
4cbd71e KKM-Reduktion Phase 2: Logo-Carousel, USP entfeatured, Hero-H1 global cap, CTA-Band entschlackt
ff74295 Reset B+C+D+F+G+H: KKM-Reduktion - Effekte raus, Hierarchie ein, Container zentriert, SEO-Keywords sichtbar
a7ce5a9 Reset Schritt A+H: Background-Noise raus, falsche Team-Stats raus
431b5d5 Schritt E + H-fix: Insta+TikTok Cards, Team-Bilder Crop fix
e23fcf5 Sprint Stage 5-7: Cinema-Cards, Marken-Filter, Detail-Pages, Wizard-Polish
```
