# CLAUDE.md — Einstieg für Claude-Code-Sessions

> **Lies zuerst `docs/brain/00_START_HERE.md`.** Dort steht, welche Brain-Datei du je nach Aufgabe (Bugfix / UI/UX / Feature / Refactoring / Projektverständnis) als Nächstes lesen sollst.

## Kernregeln

1. **Brain ist Single-Source-of-Truth.** Bei größeren Aufgaben Brain-Dateien lesen, BEVOR Code geändert wird. Nicht improvisieren.
2. **Branch-Policy:** Alle Änderungen NUR auf `claude-optimierung`. Niemals direkt auf `main`. Inhaber reviewt vor Merge.
3. **Pure HTML/CSS/JS** — kein Framework, kein Build-Step. Statisches Hosting auf Cloudflare Pages.
4. **Coding-Regeln:** Mobile first. Inputs `font-size:16px`. CSS-Variablen aus v2.css verwenden. Kein heavy JS. Bilder als WebP mit JPG-Fallback. Keine eigene Werkstatt erwähnen (R&M hat keine).

## Vorgehen

- **Vor größerer Änderung:** relevante Brain-Datei lesen → kurz im Chat sagen was geplant ist → User-OK abwarten.
- **Routine-Edit (1–3 Files):** direkt machen, danach kurz erklären was geändert wurde.
- **Bei Unsicherheit:** in der relevanten Brain-Datei als `UNGEKLÄRT` markieren statt zu raten. User fragen.
- **Große Aufgaben in kleine Schritte zerlegen** — siehe `docs/brain/06_OPEN_TASKS.md` für das Schnitt-Muster (Ziel + Files + Akzeptanzkriterium).
- **Nach abgeschlossener Aufgabe:** `02_CURRENT_STATE.md`, `06_OPEN_TASKS.md`, `07_DECISIONS_LOG.md`, `08_SESSION_SUMMARY.md` aktualisieren — je nach Relevanz.

## Kontext sparen

- Datei-Reads gezielt: nicht ganze 700-Zeilen-Files lesen wenn 50 reichen (`offset` + `limit`).
- Grep statt Read, wenn nur eine Position gesucht wird.
- Brain-Dateien sind kompakt — sie sind günstig zu lesen.
- Repetitive Edits (>5 Files mit gleichem Pattern): Python-Script schreiben, 1 Bash-Call statt N Edits.
- **Background-Agents** sind teuer (~170–340k Tokens je Stück) — User vorher fragen, nicht eigenmächtig dispatchen.

## Was Claude NIEMALS tut

- Push auf `main`, force-push, `git reset --hard`, destruktive Operationen ohne explizites OK
- Inline-Style-Definitionen für Globales (Tokens, Nav, Footer, Buttons) — gehört in `styles/v2.css`
- "Werkstatt" auf R&M-Material erwähnen (R&M hat keine eigene)
- Annahmen über fehlende Infos erfinden — stattdessen `UNGEKLÄRT` markieren
- Backwards-Compat-Hacks oder spekulative Features einbauen, die nicht angefragt wurden

## Schnellzugriff

- **Was läuft gerade / wo stehen wir?** → `docs/brain/02_CURRENT_STATE.md` + `08_SESSION_SUMMARY.md`
- **Was ist offen?** → `docs/brain/06_OPEN_TASKS.md`
- **Designsystem / Tokens / Patterns?** → `docs/brain/05_UI_UX_CONTEXT.md`
- **Tech-Stack / Datei-Layout?** → `docs/brain/04_TECHNICAL_CONTEXT.md`
- **Warum X so ist?** → `docs/brain/07_DECISIONS_LOG.md`
- **Wie zu arbeiten?** → `docs/brain/03_WORKFLOW_AND_RULES.md`
