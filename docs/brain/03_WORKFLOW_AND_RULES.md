# 03 — Workflow & Rules

## Branch-Policy
- **Alle Änderungen NUR auf Branch `claude-optimierung`** — niemals direkt auf `main`
- Inhaber reviewt Änderungen vor Merge nach `main`
- `main` ist live (Cloudflare Pages Auto-Deploy)
- Auf `claude-optimierung` hat Claude volle kreative Freiheit (siehe `07_DECISIONS_LOG.md`)

## Coding-Regeln (immer)
- **Mobile first** — alle Layouts ab Mobile aufwärts entwickeln
- **Inputs `font-size:16px` minimum** — sonst zoomt iOS bei Fokus
- **CSS-Variablen aus Designsystem** verwenden, nicht hardcoded Hexcodes (siehe `05_UI_UX_CONTEXT.md`)
- **Kein heavy JS** — Performance darf nicht leiden
- **Nur geänderte Dateien committen** — keine Bulk-Commits ohne Grund
- **Bilder als WebP** mit JPG-Fallback via `<picture><source>` bevorzugen
- **Keine eigene Werkstatt erwähnen** — R&M hat KEINE Werkstatt, nur Halle + Diagnose. "Partner-Werkstatt-Netzwerk" ist OK
- **Google Analytics am Body-Ende per `window.load`** — niemals verschieben
- **Favicon.ico im Root** — nicht anfassen
- **SEO-relevant:** Schema.org JSON-LD pro Page, sitemap.xml, robots.txt — bestehende Inhalte nicht beschädigen

## Wie Aufgaben schneiden
- **Eine Aufgabe = eine logische Einheit** — z.B. "Marken-Filter auf Fahrzeugbereich" ist eine Aufgabe; "alle Detail-Pages füllen" sind 4 Aufgaben
- **Bei >3 Files Änderung:** vorher Plan ankündigen
- **Pro Aufgabe:** Ziel benennen, betroffene Files nennen, Akzeptanzkriterium klar
- **Akzeptanzkriterium = sichtbares Ergebnis** (z.B. "Filter zeigt 3 Cards wenn 'Hyundai' geklickt", nicht "Filter ist implementiert")
- Lange Migrationen: in vorbereitete Templates packen (siehe `v2-migration-template.md` aus letzter Session)

## Vor Änderungen kommunizieren
- Bei großer Aufgabe: kurz im Chat sagen was Claude vorhat, welche Files, welche Stages — User OK abwarten
- Bei Routine-Edits (1-3 Files, klar umrissen): direkt machen + kurz im Chat sagen was geändert wurde
- Bei Unsicherheit: im Brain als `UNGEKLÄRT` markieren + im Chat fragen

## Nach Änderungen kommunizieren
- Was wurde geändert (Files + Zusammenfassung Inhalt)
- Was sollte User sich anschauen / testen
- Was ist offen geblieben (in `06_OPEN_TASKS.md` ergänzen)

## Token / Nutzungslimit sparen
- **Background-Agents nur, wenn User vorher zustimmt** — sie sind teuer (~170-340k Tokens je Agent)
- Vor Agent-Dispatch: User fragen ob das OK ist
- Datei-Reads gezielt: nicht ganze 700-Zeilen-Files lesen wenn 50 Zeilen reichen (`offset` + `limit` nutzen)
- Grep statt Read wenn nur Position einer Sache gesucht wird
- Brain-Dateien lesen ist günstig — sie sind kompakt
- Ganze HTML-Pages mit 600+ Zeilen niemals "zur Sicherheit" durchlesen — gezielt zur betroffenen Stelle springen
- Nicht zu viele Tools parallel feuern, wenn die Ergebnisse aufeinander aufbauen — sonst Doppelarbeit
- Bei Routine-Migrationen: Python-Script statt Edit-Schleife (siehe `add_faq_link.py` aus letzter Session — nur 1 Bash-Call statt 32 Edits)

## Was Claude NIEMALS tut
- Direkter Push auf `main`
- Force-Push, `git reset --hard`, destruktive Operationen ohne explizites OK
- Inline-Style-Definitionen für globale Sachen (Tokens, Nav, Footer, Buttons) — die gehören in v2.css
- Werkstatt erwähnen
- Annahmen über fehlende Infos erfinden
