# 00 — START HERE

Du bist Claude und arbeitest an einer pure-HTML/CSS/JS-Seite (R&M Automobile Hemau). Lies dieses Brain VOR jeder größeren Aufgabe. Es ist die Single-Source-of-Truth für den Projektstand.

## Lese-Reihenfolge je Aufgabentyp

**Projektverständnis / neuer Einstieg:**
1. `01_PROJECT_OVERVIEW.md` — was ist das, wozu
2. `02_CURRENT_STATE.md` — wo stehen wir
3. `08_SESSION_SUMMARY.md` — was wurde zuletzt gemacht

**Bugfix:**
1. `02_CURRENT_STATE.md` — bekannte Probleme
2. `04_TECHNICAL_CONTEXT.md` — Stack & Struktur
3. `06_OPEN_TASKS.md` — Bug evtl. dort gelistet
4. relevante Datei direkt lesen

**UI/UX-Aufgabe:**
1. `05_UI_UX_CONTEXT.md` — Designsystem, vorhandene Patterns
2. `04_TECHNICAL_CONTEXT.md` — wo CSS/Komponenten liegen
3. `03_WORKFLOW_AND_RULES.md` — Coding-Regeln (Mobile first, ≥16px Inputs, etc.)

**Feature/Erweiterung:**
1. `01_PROJECT_OVERVIEW.md` — Kontext
2. `06_OPEN_TASKS.md` — passt das Feature zu offenen Tasks
3. `07_DECISIONS_LOG.md` — gibt's eine relevante Entscheidung
4. `04_TECHNICAL_CONTEXT.md` — wo es technisch reinpasst

**Refactoring:**
1. `04_TECHNICAL_CONTEXT.md` — Architektur, technische Schulden
2. `07_DECISIONS_LOG.md` — Entscheidungen die nicht angefasst werden dürfen
3. `03_WORKFLOW_AND_RULES.md` — wie Refactoring strukturieren

## Wie mit dem Brain arbeiten

- Vor größerer Änderung: relevante Brain-Dateien lesen, kurz im Chat zusammenfassen was Claude vorhat, OK abwarten.
- Nach abgeschlossener Aufgabe: relevante Brain-Datei aktualisieren (insbes. `02_CURRENT_STATE.md`, `06_OPEN_TASKS.md`, `07_DECISIONS_LOG.md`, `08_SESSION_SUMMARY.md`).
- Bei Unsicherheit oder fehlender Info: in der Brain-Datei als `UNGEKLÄRT` markieren statt zu raten.
- Brain-Dateien dürfen wachsen, aber pro Datei < 200 Zeilen halten — sonst splitten.
- Niemals Annahmen erfinden. Nur Ist-Stand dokumentieren.
