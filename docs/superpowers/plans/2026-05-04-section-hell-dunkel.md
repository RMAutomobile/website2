# Hell/Dunkel-Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Akzent-Sections im dominant-dunklen R&M-Theme einführen — Stats-Strip + Reviews (Index), Werte-Section (Über-uns), Detail-FAQ (3 Vehicle-Pages) bekommen Warm-Paper-Cream-Background als KKM-Style Atemzüge im Dark-Flow.

**Architecture:** Generische Modifier-Klasse `.sec-light` in `styles/v2.css` (analog zum existierenden `.sec-alt`), additiv kombinierbar mit beliebigem Section-Tag. Component-Overrides pro betroffener Komponente in derselben Stylesheet-Datei wie die Komponente lebt (v2-home.css für Index-Komponenten, inline `<style>` in uber-uns.html für `.val`, v2-detail.css für `.dfaq`). HTML-Änderungen sind reine `class`-Erweiterungen — bis auf die Reviews-Section, die ihren KKM-Quote-Format-Restructure aus Backlog B6 mit-erledigt.

**Tech Stack:** Pures HTML/CSS/JS (keine Frameworks, kein Build-Step), Cloudflare Pages Auto-Deploy auf Branch `claude-optimierung` zur Preview-URL https://claude-project-bex.pages.dev/. Verifikation = visueller Browser-Reality-Check nach jedem Push (per Memory `feedback_kkm_lessons.md` und Decision D-16 aus Brain).

**Branch:** `claude-optimierung` (siehe Branch-Policy in CLAUDE.md). Commits klein und pro Task — Memory `feedback_brain_workflow.md`: nach jedem Mini-Schritt Brain-Docs prüfen + User-Review-Möglichkeit auf Preview einbauen.

**Spec:** `docs/superpowers/specs/2026-05-04-section-hell-dunkel-design.md`

---

## File Structure

| File | Verantwortung |
|------|---------------|
| `styles/v2.css` | Cream-Tokens in `:root` + generische `.sec-light` Basis-Modifier-Regeln (BG, Text, Headings, Eyebrows, Buttons) |
| `styles/v2-home.css` | Component-Overrides für Index: `.sec-light .stats-strip-inner`, `.sec-light .stat-item`, `.sec-light .reviews-*` |
| `uber-uns.html` (inline `<style>`) | Component-Overrides für Werte-Section: `.sec-light .val`, `.sec-light .val-num`, `.sec-light .val-ico`, etc. (lebt schon dort lokal) |
| `styles/v2-detail.css` | Component-Overrides für Detail-FAQ: `.sec-light .ds-h`, `.sec-light .dfaq-item`, `.sec-light .dfaq-q h4`, `.sec-light .dfaq-tog`, `.sec-light .dfaq-a-inner p` |
| `index.html` | Klassen-Update an Stats- und Reviews-Section + Reviews-HTML-Restructure auf KKM-Quote-Format |
| `uber-uns.html` | Klassen-Update an Werte-Section |
| `fahrzeug-bmw320d.html`, `fahrzeug-i10.html`, `fahrzeug-opel-corsa.html` | Klassen-Update an FAQ-Section |
| `docs/brain/02_CURRENT_STATE.md`, `06_OPEN_TASKS.md`, `07_DECISIONS_LOG.md` | Status- und Decision-Updates |
| Memory `project_rm_automobile.md` | Token-Liste auf aktuelle Werte korrigieren (Side-Finding aus Spec-Erkundung) |

**Verifikations-Modell für diesen Plan:** Da es keine Test-Suite gibt, wird jede Task verifiziert durch (a) Browser-Visual-Check auf der lokal geöffneten Datei und (b) nach Commit und Push: Reality-Check auf Cloudflare Preview-URL. Lighthouse-Run am Ende des Plans.

---

## Task 1: Cream Tokens in `styles/v2.css` `:root`

**Files:**
- Modify: `styles/v2.css` (`:root` Block, aktuell ab Zeile ~5)

- [ ] **Step 1: Tokens in `:root` ergänzen**

In `styles/v2.css` direkt nach dem letzten `--grn-*`-Token (aktuell Zeile ~24 nach `--grn-glow:rgba(122,217,158,.42);`) folgenden Block einfügen:

```css
/* Light/Cream Theme — Akzent-Sections */
--page-light:#f5f1e8;
--c1-light:#ebe5d6;
--c2-light:#e0d9c5;
--tx-on-light:#0f0f0e;
--tx2-on-light:rgba(15,15,14,.62);
--tx3-on-light:rgba(15,15,14,.45);
--tx4-on-light:rgba(15,15,14,.28);
--bd-on-light:rgba(15,15,14,.10);
--bd2-on-light:rgba(15,15,14,.18);
--grn-on-light:#2f6f49;
--grn-soft-on-light:rgba(47,111,73,.10);
--grn-bd-on-light:rgba(47,111,73,.40);
```

- [ ] **Step 2: Browser-Verifikation**

Datei `index.html` lokal im Browser öffnen. Sichtprüfung: Page rendert unverändert (Tokens werden noch nicht referenziert, dürfen also keine Auswirkungen haben). Console-Tab im DevTools öffnen, prüfen dass keine CSS-Parse-Errors auftreten.

Erwartet: Keine sichtbaren Änderungen, keine Console-Errors.

- [ ] **Step 3: Commit**

```bash
git add styles/v2.css
git commit -m "theme: add cream tokens for light accent sections"
```

---

## Task 2: `.sec-light` Basis-Modifier in `styles/v2.css`

**Files:**
- Modify: `styles/v2.css` (am Ende des Datei-Body — neuer Modifier-Block)

- [ ] **Step 1: Modifier-Klasse hinzufügen**

In `styles/v2.css` direkt nach der existierenden `.sec-alt`-Definition (Zeile 125: `.sec-alt{background:var(--c1)}`) folgenden Block einfügen:

```css
/* Generic light-section modifier — additive zu .sec, .ds, oder beliebigen Section-Klassen */
.sec-light{
  background:var(--page-light);
  color:var(--tx-on-light);
}
.sec-light .eyebrow{color:var(--tx2-on-light)}
.sec-light .eyebrow.green{color:var(--grn-on-light)}
.sec-light .eyebrow::before{
  background:linear-gradient(to right,var(--grn-bd-on-light) 0%,transparent 100%);
}
.sec-light .eyebrow.center::before{
  background:linear-gradient(to right,transparent 0%,var(--grn-bd-on-light) 50%,transparent 100%);
}
.sec-light h2.display,
.sec-light h3.section-h3,
.sec-light h3,
.sec-light h4{color:var(--tx-on-light)}
.sec-light h2.display em{color:var(--grn-on-light)}
.sec-light h2.display .muted{color:var(--tx3-on-light)}
.sec-light p,
.sec-light .lede,
.sec-light .lead{color:var(--tx2-on-light)}
.sec-light strong{color:var(--tx-on-light)}
.sec-light .btn-prime{
  background:var(--tx-on-light);
  color:var(--page-light);
  border-color:var(--tx-on-light);
}
.sec-light .btn-prime:hover{background:#222220;border-color:#222220}
.sec-light .btn-glass{
  background:rgba(15,15,14,.04);
  border-color:var(--bd-on-light);
  color:var(--tx-on-light);
}
.sec-light .btn-glass:hover{background:rgba(15,15,14,.08);border-color:var(--bd2-on-light)}
```

- [ ] **Step 2: Test-Verifikation per temp HTML**

Im Browser DevTools Console folgenden Test ausführen, um den Modifier auf eine beliebige Section temporär zu prüfen — z.B. auf der `index.html` lokal:

```js
document.querySelector('.faq-section')?.classList.add('sec-light')
```

Sichtprüfung: FAQ-Section wechselt zu Cream-BG, Headings + Body-Text dunkel, Eyebrow gedimmt-dunkel. CTA-Buttons: `.btn-prime` invertiert (dunkel mit cream Text), `.btn-glass` mit dezentem dunklen Border.

Anschließend Klasse wieder entfernen:

```js
document.querySelector('.faq-section')?.classList.remove('sec-light')
```

Erwartet: Kein Layout-Shift, nur Farbwechsel.

- [ ] **Step 3: Commit**

```bash
git add styles/v2.css
git commit -m "theme: add .sec-light modifier — generic cream-section base"
```

---

## Task 3: Stats-Strip auf Cream (Index)

**Files:**
- Modify: `styles/v2-home.css` (nach Zeile 31, dem letzten `.stat-lbl`-Eintrag)
- Modify: `styles/v2-home.css` (Mobile-Block ab Zeile 308 und 337 — passende `.sec-light`-Mobile-Overrides)
- Modify: `index.html:74` — Klassen-Update auf `<section class="stats-strip">`

- [ ] **Step 1: Component-Overrides in v2-home.css**

In `styles/v2-home.css` direkt nach Zeile 31 (`.stat-lbl{...color:var(--tx3)}`) folgenden Block einfügen:

```css
/* Cream-Variante Stats-Strip — Pattern β, Akzent-Section nach Hero */
.stats-strip.sec-light{
  background:var(--page-light);
  border-top:1px solid var(--bd-on-light);
  border-bottom:1px solid var(--bd-on-light);
}
.stats-strip.sec-light .stat-item{border-right-color:var(--bd-on-light)}
.stats-strip.sec-light .stat-num{color:var(--tx-on-light)}
.stats-strip.sec-light .stat-num em{color:var(--grn-on-light)}
.stats-strip.sec-light .stat-num .unit{color:var(--tx3-on-light)}
.stats-strip.sec-light .stat-lbl{color:var(--tx3-on-light)}
```

Anschließend in den Mobile-Blocks die Borders mit-überschreiben:

In Zeile 310 (`.stat-item:nth-child(odd){border-right:1px solid var(--bo)}`) und 311 (`.stat-item:nth-child(-n+2){border-bottom:1px solid var(--bo)}`) fügst du nach diesem `@media`-Block ergänzend hinzu (am Ende des `@media(max-width:1100px)`-Blocks vor dem schließenden `}`):

```css
.stats-strip.sec-light .stat-item:nth-child(odd){border-right-color:var(--bd-on-light)}
.stats-strip.sec-light .stat-item:nth-child(-n+2){border-bottom-color:var(--bd-on-light)}
```

Im `@media(max-width:768px)`-Block (Zeile 337+) entsprechend:

```css
.stats-strip.sec-light .stat-item{border-bottom-color:var(--bd-on-light)}
.stats-strip.sec-light .stat-item:nth-child(odd){border-right-color:var(--bd-on-light)}
```

- [ ] **Step 2: HTML-Klasse in `index.html` setzen**

In `index.html:74` ändern:

```html
<section class="stats-strip" aria-label="Kennzahlen">
```

zu:

```html
<section class="stats-strip sec-light" aria-label="Kennzahlen">
```

- [ ] **Step 3: Browser-Verifikation lokal**

`index.html` im Browser öffnen, zur Stats-Strip-Section direkt unter Hero scrollen.

Sichtprüfung:
- Stats-Strip BG ist Warm-Paper-Cream
- Zahlen (z.B. 5,0★) dunkel, Mint-Akzent (5,0 em) ist dunkler-Mint `#2f6f49` statt heller Mint
- Vertikale Trennlinien zwischen Stats sind dezent dunkel statt cremig-dezent
- Direkter harter Wechsel zwischen Hero (dark) → Stats (cream) → Logo-Carousel (dark) — keine Lücken

Mobile (DevTools → Responsive 375px / 768px):
- Stats-Strip in 2x2 Grid
- Borders zwischen Items dunkel-dezent

Erwartet: Hard-Cut-Übergang oben und unten ohne Gap.

- [ ] **Step 4: Commit**

```bash
git add styles/v2-home.css index.html
git commit -m "theme: stats-strip auf cream (Pattern β erste Akzent-Section)"
```

- [ ] **Step 5: Push und Cloudflare-Preview-Check**

```bash
git push origin claude-optimierung
```

Nach erfolgreichem Auto-Deploy: https://claude-project-bex.pages.dev/ öffnen. Stats-Strip am Live-Preview prüfen — wenn ok, weiter; wenn was bricht, in Iteration 1 (Step 1-4 wiederholen mit Fix) zurückgehen.

User-Sign-off einholen vor Task 4.

---

## Task 4: Werte-Section auf Cream (Über-uns)

**Files:**
- Modify: `uber-uns.html` (inline `<style>`-Block ab Zeile 28 — nach Zeile 38 ergänzen)
- Modify: `uber-uns.html:218` — Klassen-Update

- [ ] **Step 1: Component-Overrides in inline `<style>` von uber-uns.html**

In `uber-uns.html` im inline `<style>`-Block direkt nach Zeile 38 (`.val p{font-size:15px;font-weight:400;color:var(--tx2);line-height:1.85}`) folgenden Block einfügen:

```css
/* Cream-Variante Werte-Section */
.sec-light .val{
  background:var(--c1-light);
  border-color:var(--bd-on-light);
}
.sec-light .val::before{
  background:radial-gradient(circle,rgba(47,111,73,.10) 0%,transparent 65%);
}
.sec-light .val:hover{
  background:var(--c2-light);
  border-color:var(--grn-bd-on-light);
}
.sec-light .val-num{color:var(--grn-on-light)}
.sec-light .val-ico{
  background:var(--grn-soft-on-light);
  border-color:var(--grn-bd-on-light);
  color:var(--grn-on-light);
}
.sec-light .val h3{color:var(--tx-on-light)}
.sec-light .val p{color:var(--tx2-on-light)}
```

- [ ] **Step 2: HTML-Klasse in `uber-uns.html:218` setzen**

Ändern:

```html
<section class="sec">
  <div class="eyebrow reveal">Was uns antreibt</div>
```

zu:

```html
<section class="sec sec-light">
  <div class="eyebrow reveal">Was uns antreibt</div>
```

- [ ] **Step 3: Browser-Verifikation lokal**

`uber-uns.html` im Browser öffnen, zur Werte-Section scrollen (zwischen "Geschichte" und Map).

Sichtprüfung:
- Werte-Section BG Warm-Paper-Cream
- 3 Cards (Ehrlichkeit / Fachkompetenz / Direktheit) auf hellerer Beige-BG `#ebe5d6`
- Eyebrow-Numbers (`01 — Ehrlichkeit`) in dunkelmint
- Icon-Badges in pastell-mint mit dunklem Symbol
- Hover-Test: Card hebt sich + wird etwas satter beige + Border-Color shift zu mint
- Headlines + Body-Text klar lesbar dunkel

Direkter Wechsel oben (Geschichte-Section dark) → Werte-Section (cream) → Map-Section (dark via map background): hart, keine Lücke.

- [ ] **Step 4: Commit**

```bash
git add uber-uns.html
git commit -m "theme: werte-section auf cream (Über-uns)"
```

- [ ] **Step 5: Push und Cloudflare-Preview-Check**

```bash
git push origin claude-optimierung
```

User-Review auf https://claude-project-bex.pages.dev/uber-uns.html vor Task 5.

---

## Task 5: Detail-FAQ auf Cream (3 Vehicle-Pages)

**Files:**
- Modify: `styles/v2-detail.css` (nach Zeile 61, dem letzten `.dfaq-a-inner p`-Eintrag)
- Modify: `fahrzeug-bmw320d.html:369`, `fahrzeug-i10.html` (FAQ-Section), `fahrzeug-opel-corsa.html` (FAQ-Section)

- [ ] **Step 1: Component-Overrides in v2-detail.css**

In `styles/v2-detail.css` direkt nach Zeile 61 (`.dfaq-a-inner p:last-child{margin-bottom:0}`) folgenden Block einfügen:

```css
/* Cream-Variante Detail-FAQ */
.ds.sec-light .ds-h{color:var(--tx-on-light)}
.ds.sec-light .ds-h svg{color:var(--grn-on-light)}
.ds.sec-light .dfaq-item{border-bottom-color:var(--bd-on-light)}
.ds.sec-light .dfaq-item:hover,
.ds.sec-light .dfaq-item.open{
  background:linear-gradient(90deg,rgba(47,111,73,.06) 0%,transparent 60%);
}
.ds.sec-light .dfaq-q h4{color:var(--tx-on-light)}
.ds.sec-light .dfaq-tog{
  color:var(--tx2-on-light);
  border-color:var(--bd-on-light);
  background:transparent;
}
.ds.sec-light .dfaq-item.open .dfaq-tog{
  color:var(--grn-on-light);
  border-color:var(--grn-bd-on-light);
  background:var(--grn-soft-on-light);
}
.ds.sec-light .dfaq-a-inner p{color:var(--tx2-on-light)}
```

- [ ] **Step 2: HTML-Klasse in `fahrzeug-bmw320d.html:369` setzen**

Ändern:

```html
<section class="ds">
  <div class="ds-h"><svg width="14" height="14" viewBox="0 0 24 24" ...>...</svg>Häufige Fragen zu diesem BMW</div>
```

zu:

```html
<section class="ds sec-light">
  <div class="ds-h"><svg width="14" height="14" viewBox="0 0 24 24" ...>...</svg>Häufige Fragen zu diesem BMW</div>
```

- [ ] **Step 3: HTML-Klasse in `fahrzeug-i10.html` setzen**

Suchen: `<section class="ds">` direkt vor dem Block, der die FAQ-Items enthält (das `<div class="ds-h">` mit Frage-Mark-Icon und Text "Häufige Fragen zu diesem"). Identifikation: das Block enthält `<div class="dfaq" id="dfaq">` als Kind.

Ändern auf:

```html
<section class="ds sec-light">
```

- [ ] **Step 4: HTML-Klasse in `fahrzeug-opel-corsa.html` setzen**

Gleiche Logik wie Step 3 — `<section class="ds">` direkt vor dem `<div class="dfaq">`-Container suchen, auf `<section class="ds sec-light">` ändern.

`fahrzeug-seat-ibiza.html` wird **NICHT** angefasst — diese Page hat laut Brain (T-04) keine FAQ-Section (Verkauft-State).

- [ ] **Step 5: Browser-Verifikation lokal auf allen 3 Pages**

`fahrzeug-bmw320d.html`, `fahrzeug-i10.html`, `fahrzeug-opel-corsa.html` jeweils im Browser öffnen, zur FAQ-Section runterscrollen.

Sichtprüfung pro Page:
- FAQ-Section BG Warm-Paper-Cream
- Section-Headline `Häufige Fragen zu diesem...` dunkel mit dunkelmint Icon
- Trennlinien zwischen FAQ-Items dezent dunkel
- Toggle-Plus-Icon dunkel-grau auf transparent
- Klick auf eine Frage: aufgeklappt, Plus dreht zu × in mint, Hintergrund-Hover-Highlight ist sehr leichter mint-Schimmer
- Antworttexte gut lesbar in dunklem Mute-Grau
- Hard-Cut-Übergang zu Garantie-Block (dark) oberhalb und Brand-Block (dark) unterhalb

- [ ] **Step 6: Commit**

```bash
git add styles/v2-detail.css fahrzeug-bmw320d.html fahrzeug-i10.html fahrzeug-opel-corsa.html
git commit -m "theme: detail-FAQ auf cream (BMW + i10 + Opel Corsa)"
```

- [ ] **Step 7: Push und Cloudflare-Preview-Check**

```bash
git push origin claude-optimierung
```

User-Review je Page-Type auf Preview-URL. Wenn ok, weiter. Falls eine spezifische Detail-Page bricht (z.B. weil dort FAQ-Section ein anderes Markup hat als BMW), dort Fix in Iteration ergänzen.

---

## Task 6: Reviews KKM-Quote-Format + Cream (Index)

Diese Task macht zwei Dinge gleichzeitig: visuelles Restructure auf das in Backlog B6 geforderte KKM-Quote-Format UND Cream-Background-Wechsel. Beides hängt zusammen, weil das neue Quote-Layout auf Cream gestaltet wird.

**Files:**
- Modify: `index.html:469-513` (komplette `.reviews-section` HTML)
- Modify: `styles/v2-home.css` (existierende `.reviews-*`-Styles ersetzen oder ergänzen)

- [ ] **Step 1: Reviews-Section CSS in v2-home.css aktualisieren**

In `styles/v2-home.css` die existierenden `.reviews-section`, `.reviews-head`, `.reviews-grid`, `.rev-card`, `.rev-stars`, `.rev-text`, `.rev-author`, `.rev-avatar`, `.rev-info`, `.rev-name`, `.rev-when`, `.google-rating`, `.gr-stars`, `.gr-meta`, `.gr-num`, `.gr-lbl` durch folgenden neuen Block ersetzen:

```css
/* Reviews — KKM-Style Quote-Format auf Cream */
.reviews-section.sec-light{
  background:var(--page-light);
  padding:var(--pad-sec) 40px;
}
.reviews-head{display:grid;grid-template-columns:1fr auto;gap:48px;align-items:end;max-width:var(--container);margin:0 auto 64px}
.reviews-head .left{max-width:560px}
.google-rating{display:flex;flex-direction:column;align-items:flex-end;gap:8px;flex-shrink:0}
.gr-stars{display:flex;gap:3px}
.gr-stars svg{width:22px;height:22px;fill:var(--grn-on-light)}
.gr-meta{display:flex;align-items:baseline;gap:10px}
.gr-num{font-family:var(--fh);font-size:34px;font-weight:800;color:var(--tx-on-light);letter-spacing:-.02em;line-height:1}
.gr-lbl{font-family:var(--fh);font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--tx2-on-light)}

.reviews-grid{display:grid;grid-template-columns:1fr;gap:80px;max-width:980px;margin:0 auto}
.rev-card{position:relative;padding:0;background:transparent;border:none;display:flex;flex-direction:column;gap:24px}
.rev-card::before{
  content:'\201C';
  position:absolute;top:-32px;left:-12px;
  font-family:var(--fh);font-size:140px;line-height:1;
  color:var(--grn-on-light);opacity:.32;font-weight:800;
  pointer-events:none;
}
.rev-stars{display:flex;gap:3px}
.rev-stars svg{width:18px;height:18px;fill:var(--grn-on-light)}
.rev-text{
  font-family:var(--fh);
  font-size:clamp(20px,2.2vw,30px);
  font-weight:500;
  font-style:italic;
  line-height:1.42;
  letter-spacing:-.012em;
  color:var(--tx-on-light);
  margin:0;
}
.rev-text strong{color:var(--grn-on-light);font-weight:700;font-style:normal;background:rgba(47,111,73,.10);padding:0 6px;border-radius:4px}
.rev-author{display:flex;align-items:center;gap:14px;padding-top:8px;border-top:1px solid var(--bd-on-light)}
.rev-avatar{
  width:46px;height:46px;border-radius:50%;
  background:var(--c1-light);border:1px solid var(--bd-on-light);
  display:flex;align-items:center;justify-content:center;
  font-family:var(--fh);font-size:14px;font-weight:700;color:var(--tx-on-light);
  letter-spacing:.02em;
}
.rev-info{display:flex;flex-direction:column;gap:2px}
.rev-name{font-family:var(--fh);font-size:14px;font-weight:700;color:var(--tx-on-light);letter-spacing:-.005em}
.rev-when{font-family:var(--fh);font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--tx3-on-light)}

@media(max-width:900px){
  .reviews-head{grid-template-columns:1fr;gap:24px;align-items:start}
  .google-rating{align-items:flex-start}
  .reviews-grid{gap:56px}
  .rev-card::before{font-size:96px;top:-22px;left:-6px}
}
@media(max-width:600px){
  .reviews-section.sec-light{padding:80px 20px}
  .rev-text{font-size:18px;line-height:1.5}
}
```

- [ ] **Step 2: Reviews-HTML in index.html restructure**

`index.html:469-513` (kompletter `<section class="reviews-section">` Block) durch folgenden ersetzen:

```html
<section class="reviews-section sec-light">
  <div class="reviews-head reveal">
    <div class="left">
      <div class="eyebrow" style="margin-bottom:22px">Kundenstimmen</div>
      <h2 class="display">Was unsere<br/>Kunden <em>sagen.</em></h2>
      <p class="lede" style="margin-top:22px">Echte Reviews — direkt aus Google. Kein Marketing-Sprech, kein Filter.</p>
    </div>
    <div class="google-rating">
      <div class="gr-stars" aria-label="5 von 5 Sternen">
        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      <div class="gr-meta"><div class="gr-num">5,0</div><div class="gr-lbl">Google · 5 Reviews</div></div>
    </div>
  </div>
  <div class="reviews-grid">
    <article class="rev-card reveal">
      <div class="rev-stars" aria-label="5 Sterne"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
      <p class="rev-text">Ehrliche Beratung, fairer Preis. Mein i10 wurde technisch <strong>vollständig geprüft</strong>, alles dokumentiert. Kein versteckter Mangel, kein Drücken am Preis. So sollte Autohandel sein.</p>
      <div class="rev-author">
        <div class="rev-avatar">SH</div>
        <div class="rev-info"><div class="rev-name">Sandra H.</div><div class="rev-when">Vor 2 Wochen · Käuferin</div></div>
      </div>
    </article>
    <article class="rev-card reveal d1">
      <div class="rev-stars" aria-label="5 Sterne"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
      <p class="rev-text">Auto verkauft — vom Erstkontakt bis zur <strong>Echtzeitüberweisung in 36 Stunden</strong>. Abholung bis vor die Tür in Regensburg. Bewertung war vorher schon transparent kommuniziert, keine Überraschungen.</p>
      <div class="rev-author">
        <div class="rev-avatar">TK</div>
        <div class="rev-info"><div class="rev-name">Thomas K.</div><div class="rev-when">Vor 1 Monat · Verkäufer</div></div>
      </div>
    </article>
    <article class="rev-card reveal d2">
      <div class="rev-stars" aria-label="5 Sterne"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
      <p class="rev-text">Probefahrt entspannt, René nimmt sich <strong>echt Zeit</strong>. Habe noch andere Händler probiert — bei R&amp;M war's das einzige Mal, wo ich nicht das Gefühl hatte, mir wird was angedreht. Werde wiederkommen.</p>
      <div class="rev-author">
        <div class="rev-avatar">MB</div>
        <div class="rev-info"><div class="rev-name">Markus B.</div><div class="rev-when">Vor 3 Wochen · Käufer</div></div>
      </div>
    </article>
  </div>
</section>
```

Anmerkung: Anführungszeichen am Anfang der Quotes wurden entfernt — das große `"` wird via CSS `::before` als typografisches Showcase-Element gerendert.

- [ ] **Step 3: Browser-Verifikation lokal**

`index.html` öffnen, zur Reviews-Section scrollen.

Sichtprüfung:
- BG Warm-Paper-Cream
- Headline `Was unsere Kunden sagen.` dunkel mit dunkelmint `sagen.`-Italic
- Google-Rating rechts: 5 dunkelmint Sterne, "5,0" als Großzahl, "Google · 5 Reviews" als Mute-Eyebrow
- 3 Reviews jetzt VERTIKAL gestapelt (statt 3-Spalten-Grid), maximale Lesbarkeit
- Pro Review: großes typografisches `"` als Akzent (links oben, semi-transparent dunkelmint)
- Quote-Text in 20-30px italic, klare Lese-Hierarchie
- Mit `<strong>` markierte Passagen mit dunkelmint-Highlight + leichter Hintergrund-Pill
- Star-Strip oben pro Review klein
- Author-Block unten: kreisrundes Avatar-Initial-Kreis, Name + Datum-Eyebrow, getrennt durch dezente Linie

Mobile (375px):
- Reviews-Header stapelt vertikal (Headline + Google-Rating)
- Quote-Text auf 18px reduziert
- Padding kleiner

Hard-Cut oben (FAQ-Section dark vs Reviews-Section cream — Reihenfolge im HTML beachten: Reviews kommt VOR FAQ).

- [ ] **Step 4: Commit**

```bash
git add styles/v2-home.css index.html
git commit -m "theme+B6: reviews auf KKM-Quote-Format + cream"
```

- [ ] **Step 5: Push und Cloudflare-Preview-Check**

```bash
git push origin claude-optimierung
```

Preview prüfen — speziell Quote-Format-Lesbarkeit + Mobile-Layout. User-Review.

---

## Task 7: Visual Reality-Check + Lighthouse

**Files:** keine — User-getriebener Browser-Test

- [ ] **Step 1: User Reality-Check auf allen 3 Page-Types**

User öffnet Preview-URL und prüft:

1. https://claude-project-bex.pages.dev/ — Stats-Strip + Reviews wirken Premium-KKM-mäßig, kein "wie 2 Designs"-Effekt zu den dunklen Nachbar-Sections, Hard-Cuts klar getrennt
2. https://claude-project-bex.pages.dev/uber-uns.html — Werte-Section visuell als Atemzug zwischen Geschichte und Map erkennbar
3. https://claude-project-bex.pages.dev/fahrzeug-bmw320d.html (analog i10, opel-corsa) — Detail-FAQ als ruhige Reading-Zone gegenüber dem dunklen Garantie-Block oben

Mobile-Test (Smartphone): Stats, Reviews, Werte, FAQ jeweils auf iOS Safari + Android Chrome — keine kaputten Layouts, font-size und touch-targets vernünftig.

- [ ] **Step 2: Lighthouse-Run auf den 3 Page-Types**

Chrome DevTools → Lighthouse → Mobile + Desktop. Erwartet ≥95 für Performance, Accessibility, SEO, Best Practices.

Spezifische Checks:
- Color-Contrast: Cream-Sections müssen AA-Konform sein (`#0f0f0e` auf `#f5f1e8` ist AAA, passt)
- Mint-on-Cream `#2f6f49` auf `#f5f1e8` ist ~7:1 (AA Normal Body, AAA Large Text)

Wenn etwas <95: Issue dokumentieren, ggf. Iteration einlegen.

- [ ] **Step 3: User-Sign-off**

Wenn alles ok: weiter zu Task 8.

---

## Task 8: Brain-Doc Updates

**Files:**
- Modify: `docs/brain/02_CURRENT_STATE.md`
- Modify: `docs/brain/06_OPEN_TASKS.md`
- Modify: `docs/brain/07_DECISIONS_LOG.md`

- [ ] **Step 1: 06_OPEN_TASKS.md — B2 + B6 als done markieren**

Im Backlog-Block:

`### B2 · Section-BG echte Hell/Dunkel-Wechsel` ändern zu `### ✅ B2 · Section-BG Hell/Dunkel-Wechsel — fertig` und Status-Block mit Implementation-Summary ergänzen (welche Sections cremig wurden, Cream-Token, Modifier-Klasse).

Analog `### B6 · Reviews/Testimonials KKM-Style` zu `### ✅ B6 · Reviews KKM-Style — fertig (im B2-Sprint mit-erledigt)`.

- [ ] **Step 2: 02_CURRENT_STATE.md — Sprint-Update**

Im Block "Was im Sprint passiert ist": neue Phase 4 ergänzen mit Hell-Dunkel-Pattern-Kurzfassung. Im Block "Was funktioniert (KKM-konform)" ergänzen:

```
- ✅ Akzent-Sections cremig — Stats-Strip + Reviews (Index), Werte-Section (Über-uns), Detail-FAQ (BMW/i10/Opel) auf Warm-Paper #f5f1e8
- ✅ Reviews KKM-Quote-Format — vertikales Stapel-Layout mit großem typografischen Quote-Marker statt Card-Grid
```

Im Block "Was noch nicht KKM-Niveau ist": B2 + B6 entfernen.

- [ ] **Step 3: 07_DECISIONS_LOG.md — D-19 ergänzen**

Neuen Eintrag am Ende:

```markdown
## D-19 · Hell/Dunkel-Theme als Akzent-Sections, nicht Vollwechsel

**Datum:** 2026-05-04
**Bezug:** Backlog B2

**Entscheidung:** Pattern β (gezielte cremige Akzent-Sections im Dark-Flow) statt Pattern C (KKM-Vollwechsel). Cream-Ton Warm-Paper #f5f1e8 (thermal harmonisch zum warmen --tx). Scope γ: Index + Über-uns Werte + Detail-Pages Detail-FAQ. Hard-Cut-Übergänge.

**Begründung:** R&M ist Auto-Showroom — Dark gehört zur Foto/Showroom-Identität. Vollwechsel würde diese Identität verlieren. Akzent-Sections nutzen den KKM-Hebel "Section-Trennung durch Background-Wechsel" gezielt dort, wo Vertrauen aufgebaut wird (Reviews, Werte, FAQ) oder Zahlen visuell pop sollen (Stats-Strip).

**Konsequenz:** Generische `.sec-light`-Modifier-Klasse, additiv kombinierbar mit beliebigen Section-Tags. Region-Pages, Blog, FAQ-Page, Forms bleiben in diesem Sprint dark — eventuelle zweite Welle später.
```

- [ ] **Step 4: Commit**

```bash
git add docs/brain/02_CURRENT_STATE.md docs/brain/06_OPEN_TASKS.md docs/brain/07_DECISIONS_LOG.md
git commit -m "brain: B2 Hell/Dunkel-Theme done — D-19, B6 mit-erledigt"
```

- [ ] **Step 5: Push**

```bash
git push origin claude-optimierung
```

---

## Task 9: Memory-Update — Token-Korrektur

**Files:**
- Modify: `C:\Users\MoritzW\.claude\projects\C--Users-MoritzW\memory\project_rm_automobile.md`

- [ ] **Step 1: Token-Liste aktualisieren**

Im Memory-File `project_rm_automobile.md` den Block:

```
**Design System:**
- Farben: `--page:#161614` | `--c2:#222220` | `--c3:#2c2c29` | `--tx:#e8e3d8` | `--grn:#6fcf97`
```

ersetzen durch (echte Werte aus styles/v2.css):

```
**Design System:**
- Dark: `--page:#0f0f0e` | `--c1:#161614` | `--c2:#1c1c1a` | `--c3:#222220` | `--tx:#f4eee0` | `--grn:#7ad99e`
- Light/Cream (Akzent-Sections): `--page-light:#f5f1e8` | `--c1-light:#ebe5d6` | `--tx-on-light:#0f0f0e` | `--grn-on-light:#2f6f49`
- Modifier: `.sec-light` (additiv auf jeden Section-Tag) — siehe `docs/brain/07_DECISIONS_LOG.md` D-19
```

- [ ] **Step 2: Verifikation**

Memory-File-Read durchgehen — keine veralteten Token-Referenzen mehr im Body.

Memory ist nicht im Repo — keine Commit-Aktion nötig.

---

## Self-Review Checklist (nach Plan-Schreiben)

- [x] **Spec coverage:** Tokens, Modifier-Klasse, Section-Mapping pro Page, Komponenten-Adaptionen, Edge-Cases, Akzeptanzkriterien — alle aus Spec landen in Tasks
- [x] **Placeholder scan:** keine "TBD"/"TODO"/"implement later" im Plan
- [x] **Type consistency:** Modifier-Klasse einheitlich `.sec-light` (singular dash, kein BEM-Doppel-Dash) — abgestimmt mit existierender `.sec-alt`-Konvention
- [x] **Reviews-Restructure mit-erledigt** Backlog B6 — explizit in Task 6 vermerkt
- [x] **Brain-Update + Memory-Update** abgedeckt durch Task 8 + 9
- [x] **Lighthouse + User-Reality-Check** abgedeckt durch Task 7

Bekannte Ungewissheiten:
- Detail-Pages `fahrzeug-i10.html` und `fahrzeug-opel-corsa.html` hatten in der Erkundung keine genaue Section-Position-Identifikation — Step 3+4 in Task 5 verlässt sich auf das Markup-Pattern (`<section class="ds">` vor `<div class="dfaq">`). Falls eine Page kein FAQ-Pattern dieser Form hat, muss das per Iteration im Browser bestätigt werden.
- `git config user.email` und `user.name` sind im Repo nicht gesetzt — User muss vor Task 1 einmalig setzen, sonst schlagen die Commit-Steps fehl.
