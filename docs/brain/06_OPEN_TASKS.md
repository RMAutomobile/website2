# 06 — Open Tasks

Sortiert nach Priorität. Jede Aufgabe klein und konkret.

---

## 🚨 P0 — User-Kritik 04.05.2026 (LAUFEND, Mini-Schritte mit Sign-off)

User-Reality-Check auf https://claude-project-bex.pages.dev/ — Design wirkt "wie Bastelprojekt", nicht KKM-Niveau. Ground-Truth-Vergleich: KKM hat clean Whitespace + zentrierte Container + Logo-Carousel + minimal Animation. Wir haben aktuell überladen + verrauscht + überlaufende Animationen.

### A · Background-Noise + Mesh raus *(✅ erledigt)*
**Umgesetzt:** `body::before` (Mint+Gold-Mesh-Gradient) + `body::after` (SVG-Fractal-Noise mit opacity:.32 mix-blend-mode:overlay) komplett aus `styles/v2.css` entfernt. Background ist jetzt pure `var(--page)` #161614 — clean Dark, kein Rauschen mehr. Auch `@keyframes ambientFlow` entfernt.
**Verifikation:** User-Review auf Preview-URL ausstehend.

### B · Container "Full-width gequetscht" *(✅ erledigt)*
**Umgesetzt:**
- `--container` von 1440px auf 1280px (KKM-Niveau, lesbarer)
- `--pad-sec` von 160px auf 128px (KKM moderate spacing)
- `.sec` jetzt `padding:128px 40px` + Inner `max-width:var(--container);margin:0 auto` per Default — Inhalte zentriert nicht mehr "an den Rand geklatscht"

### C · Kontakt-Button Squish *(✅ erledigt)*
**Umgesetzt:** Burger-Breakpoint von 1024px auf 1180px hochgezogen — auf allen Tablets + kleineren Desktops greift jetzt Mobile-Nav, Kontakt-Button wird nicht mehr zerquetscht.

### D · Brand-Logos sichtbar machen *(✅ erledigt)*
**Umgesetzt:**
- `filter:brightness(0) invert(1)` (zerstört Innenkonturen) ersetzt durch `grayscale(.85)` auf alle Brand-Logo-Klassen (`.brand-tile`, `.brand-pill`, `.bp-tile`)
- Form bleibt sichtbar (BMW-Ring, Mercedes-Stern), nur Sättigung reduziert
- On hover / .on / .sel: `grayscale(0)` → originale Farben zurück
- Opel/Seat haben weiterhin keine SVGs — bleibt als Text-Pill (akzeptabel)
**Noch offen-optional:** Logo-Carousel (Endlosschleife wie KKM) statt 7-Spalten-Grid auf Index. Schreit "professionell" lauter als statisches Grid. *(✅ erledigt — siehe Sprint 04.05.2026 Phase 2)*

### E · Insta-Section: Insta-Edit-Video + TikTok einbinden *(✅ erledigt)*
**Umgesetzt (User wählte Option 1 — komprimieren):**
- `img/insta.mp4` (4K HEVC, 19.5 MB) per ffmpeg auf 1080p H.264 komprimiert: `img/insta-web.mp4` = 6.5 MB, web-tauglich für alle Browser
- Insta-Section in `index.html` umgebaut: statt 1 Video-Wrap rechts jetzt 2 Social-Cards nebeneinander (`.social-card.insta` + `.social-card.tiktok`)
- Beide Cards spielen `insta-web.mp4` autoplay/muted/loop, mit Plattform-Tag oben-links + External-Arrow oben-rechts + Handle-Overlay unten
- Buttons-Block im Text: 2 CTAs (Instagram + TikTok) statt 1
- CSS in `styles/v2-home.css`: neue `.social-cards-wrap`, `.social-card`, `.social-tag`, `.social-handle-overlay`, `.ext-arrow` Klassen
- Mobile-Breakpoints angepasst (kleinere Tags + Handles unter 768px)
- **NICHT-PERFEKT:** Beide Cards zeigen aktuell das gleiche Video. Wenn User später ein eigenes TikTok-Video hat, kann das einfach als 2. video-File reingehängt werden.
**Verifikation:** User-Review auf Preview-URL ausstehend.

### F · SEO-Keywords *(✅ Phase 1 erledigt — Hauptseiten)*
**Umgesetzt H1+Lead+Eyebrow auf Hauptseiten:**
- `index.html`: H1 "Gebrauchtwagen kaufen & verkaufen in Hemau", Lead nennt Hemau/Regensburg/Ingolstadt/Neumarkt/Kelheim/Parsberg, "100% zufrieden"-Marketing-Behauptung raus
- `mein-fahrzeug-verkaufen.html`: H1 "Auto verkaufen in Hemau & Regensburg", Lead mit Region-Keywords + "Fahrzeug verkaufen"
- `fahrzeugbereich.html`: H1 "Gebrauchtwagen kaufen in Hemau", Lead Region-Keywords
- `uber-uns.html`: Eyebrow "Ihr Gebrauchtwagenhändler · Hemau", Lead mit Region-Hinweis
**Phase 2 offen:** Body-Texte (Sub-Sections, USPs, Reviews) auf Keywords prüfen. Detail-Pages, Region-Pages weiter ausbauen.

### G · Hero-Schriftgrößen drastisch runter *(✅ erledigt)*
**Umgesetzt:**
- `h1.hero-h1` Index von `clamp(64px,10vw,176px)` auf `clamp(40px,5.5vw,84px)` — auf 1920px-Monitor jetzt 84px statt 176px
- `h2.display` global von `clamp(44px,6vw,96px)` auf `clamp(36px,4.4vw,64px)`
- `.hero-sub` Index von `clamp(18px,1.5vw,22px)` auf `clamp(16px,1.2vw,18px)`
- Mobile-Hero-H1 von `clamp(48px,13vw,84px)` auf `clamp(34px,9vw,56px)`
- `.hero{min-height:100svh}` auf `78svh` reduziert (KKM hat Hero nicht Vollbild)
- `.hero-bg-grid` (Punkt-Raster) entfernt, 3 Glow-Layer auf 1 reduziert
- 5 Word-Animationen (`.h1w--N`) raus — clean reveal stattdessen

### H · Animationen-Audit (Texte überdecken) + Bilder-Crop *(in progress — größter Strip-Down erledigt)*

**Über-uns Cinema-Cards komplett entschlackt:**
- conic-gradient rotating Border-Animation (`@property --ang` + keyframes rotateBorder) → entfernt
- Mouse-tracked spotlight (`.tp-spotlight` CSS + Inline-Script) → entfernt
- Quote-Shimmer Sweep-Animation (`tp-quote::after` translateX) → entfernt
- Pulsing-Dot auf tp-badge (badgePulse animation) → entfernt
- Gradient-Text auf tp-name (linear-gradient bg-clip) → entfernt
- Reveal-Scale-Animation auf .team-person → entfernt (verwendet jetzt Standard-Reveal)
- Bleibt: dezenter Hover-Lift translateY(-4px), Card-Border-Color-Wechsel, kleines img-scale(1.03)
- Karten haben jetzt: Bild + Badge (statisch, keine Pulse) + Name + Role + Eyebrow + H3 + Role-Line + Bio + Quote + Skills — alle KKM-style ohne Show-off


**Problem:** Stats auf Team-Cards überdeckten Text — als Beispiel. Plus: User-Feedback "Cards schneiden unsere Bilder so ab" — `aspect-ratio:4/5` + `object-position:center 22%` schnitt die quasi-quadratischen 800x800 Bilder oben/unten ab.
**✅ Fixes:**
- `tp-stats`-HTML aus uber-uns.html entfernt (waren faktisch erfunden, siehe Memory `feedback_no_invented_stats.md`)
- `.tp-img` aspect-ratio von 4/5 auf 1/1 — passt zu den Original-Bildern (800x800), kein Crop mehr
- `object-position` auf `center center` (vorher `center 22%`)
- Filter (saturate/brightness/contrast) deutlich neutraler (.95/.98/1.02 statt .85/.94/1.04)
- Mobile-Breakpoint auch auf 1/1 (vorher 5/4 Querformat)
**Offen:** Weitere Hover-Reveals durchgehen — Quote-Shimmer auf Detail-Pages, Brand-Tile-Zoom, conic-gradient Border-Animation. Bei Standard-Hover prüfen ob Text verdeckt wird.

---

## Stage-Status (Mapping zu Tasks)
- Stages 1–11 **inhaltlich fertig**, danach KKM-Reduktion in 3 Phasen (Schritte A-H + Phase 2 + Phase 3) durchgeführt
- Bevor Merge in main: T-07 Cross-Browser, T-08 Lighthouse, T-09 Commit/PR + Backlog-Items unten

---

## 🎯 Backlog für nächste Session (priorisiert)

### B1 · Detail-Pages auf KKM-Niveau reduzieren  *(höchste Prio)*
**Problem:** `fahrzeug-bmw320d.html`, `fahrzeug-i10.html`, `fahrzeug-opel-corsa.html`, `fahrzeug-seat-ibiza.html` haben noch alte Glow-Animationen + `min-height:64vh`-Heros + page-spezifisches CSS aus dem Cinema-Sprint. Phase 3 hat sie nicht angefasst.
**Fix-Ansatz:**
- Page-Hero `floatA`/`floatB` Animationen entfernen (analog zu uber-uns / fahrzeugbereich / mein-fahrzeug-verkaufen)
- Hero-Padding auf 128px standardisieren
- `min-height` raus
- Sticky-Sidebar checken (sticky-Top war 108px — passt wenn nav-h:88px)
- Gallery thumbs evtl. reduzieren

### ✅ B2 · Section-BG Hell/Dunkel-Wechsel — fertig (Sprint 04.05.2026)
**Entscheidung:** Pattern β (Akzent-Sections im Dark-Flow), nicht Vollwechsel. Cream-Token Warm-Paper `#f5f1e8` (thermal harmonisch zum warmen `--tx`). Scope γ: Index Stats-Strip + Reviews, Über-uns Werte, Detail-FAQ (BMW + i10 + Opel Corsa). Hard-Cut-Übergänge.
**Implementation:** Neue `:root`-Tokens (`--page-light`, `--c1-light`, `--tx-on-light`, `--grn-on-light` etc.) und generische Modifier-Klasse `.sec-light` in `styles/v2.css`. Component-Overrides in `styles/v2-home.css` (Stats-Strip, Reviews), inline `<style>` von `uber-uns.html` (Werte) und `styles/v2-detail.css` (Detail-FAQ).
**Spec:** `docs/superpowers/specs/2026-05-04-section-hell-dunkel-design.md`
**Decision-Log:** D-19
**Region/Blog/FAQ-Page/Forms** bleiben dark — eventuelle 2. Welle als eigener Spec.

### B3 · Process-Steps prominenter
**Problem:** KKM hat "Wie wir arbeiten" mit 4 Schritten + Number-Markern als zentrale Section; wir haben das als `steps-row` aber nicht so präsent.
**Fix-Ansatz:** Steps-Section auf eigene Section vor USPs heben, mit großen Number-Markern, klare Linie zwischen Schritten, KKM-Style.

### B4 · SEO-Keywords Phase 2 — Body-Texte
**Problem:** Phase 1 hat nur H1+Lead+Eyebrow auf Hauptseiten gemacht. USP-Card-Body, Reviews-Texte, Werkstatt-Section, FAQ-Antworten nicht durchgekämmt.
**Fix-Ansatz:** Pro Section "Auto verkaufen Hemau", "Gebrauchtwagen Regensburg", "KFZ-Mechatroniker Hemau" natürlich integrieren (kein Keyword-Stuffing).

### B5 · Atmosphere-Collage entschlacken
**Problem:** Aktuell 4 Tiles mit verschiedenen grid-spans (atmo-1 takes 6 cols/2 rows etc) — wirkt unruhig. KKM-Style wäre 4 gleichgroße Cards oder 3+1.
**Fix-Ansatz:** `.atmo-collage` grid-template auf `repeat(4,1fr)` mit gleichen Höhen, schlichter.

### ✅ B6 · Reviews KKM-Style — fertig (mit-erledigt im B2-Sprint)
**Umgesetzt:** Reviews-Section auf KKM-Quote-Format umgebaut, gleichzeitig Cream-Background. Vertikale Stack-Layout statt 3-Spalten-Grid, BIG italic Quote-Typo (clamp 24-40px), riesiger typografischer Quote-Marker (240px) als Akzent links oben semi-transparent dunkelmint, Stars dunkelmint, Strong-Highlights mit Pill-Background, Avatare ruhiger.

### B7 · Region-Pages Background prüfen
**Problem:** User-Lob "Inhaltlich gut" — aber `body::before/::after` Glow-Anims sind möglicherweise auch da drin (autoankauf-regensburg, -ingolstadt, -kelheim, -parsberg, gebrauchtwagen-neumarkt).
**Fix-Ansatz:** Schnell-Check via Grep, falls floatA/floatB drin → entfernen.

### B8 · CSS-Klassen-Cleanup `.werkstatt*` → `.diagnose*`
**Problem:** Memory `project_no_werkstatt.md` — R&M hat keine Werkstatt. CSS-Klassen heißen aber noch `.werkstatt`, `.werkstatt-grid` etc. — kosmetischer Tech-Schuld.
**Fix-Ansatz:** Rename auf `.diagnose-section` o.ä. — nur kosmetisch, kein User-sichtbarer Effekt.

---

## 🚀 Vor Merge nach main (T-07/T-08/T-09)

- **T-07 Cross-Browser-Test** — User-Aufgabe, Mobile iOS Safari + Android Chrome + Desktop Chrome/Firefox/Safari
- **T-08 Lighthouse-Run** — Performance, Accessibility, SEO, Best Practices ≥95
- **T-09 Commit + PR + Merge nach main** — Cloudflare Pages auto-deployt, Live-Site rmauto-mobile.de aktualisiert sich

## ⚠️ Netlify-Webhook in Repo-Settings entfernen
User-Beobachtung: "Deploy Preview for effortless-bunny-69b136 failed" bei jedem Push. Ist alter Netlify-Hook am GitHub-Repo, User nutzt Cloudflare. Lösung: GitHub Repo → Settings → Webhooks → Netlify-Hook löschen. Manuelle User-Aktion, kein Code-Fix nötig.

---

## Nächste konkrete Teilaufgabe (aus Sicht 04.05.2026 Sessionsende)

**Step 1:** User reviewt Live-Preview https://claude-project-bex.pages.dev/ nach Commit `9bee4b4`. Feedback einholen welche Punkte noch nicht KKM-Niveau sind.
**Step 2:** Mit Backlog-B1 (Detail-Pages reduzieren) starten — kürzester Hebel, klarer Pattern aus Phase 3 wiederverwenden.
**Step 3:** Backlog B2 (Hell/Dunkel-Wechsel) als gemeinsame Entscheidung mit User klären — größere Theme-Frage.

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
