# R&M Automobile — Empfehlungen für die nächsten Schritte

**Datum:** 2026-05-02
**Branch:** `claude-optimierung`
**Kontext:** Diese Empfehlungen ergänzen die in dieser Session implementierten Änderungen. Sie sind priorisiert nach Wirkung × Aufwand.

---

## Sofort umsetzbare Aktionen für den Inhaber (kein Code nötig)

### A1. Hero-Video komprimieren (P0)

`/img/Hero_Video.mp4` ist aktuell ~6.4 MB. Ziel: < 2 MB bei akzeptabler Qualität.

**Befehl mit ffmpeg (lokal oder online über ezgif.com / handbrake.fr):**

```bash
ffmpeg -i img/Hero_Video.mp4 \
  -c:v libx264 -crf 30 -preset slow \
  -vf "scale='min(1280,iw)':-2" \
  -c:a aac -b:a 96k -movflags +faststart \
  img/Hero_Video_compressed.mp4
```

Anschließend: alte Datei umbenennen oder ersetzen, Datei-Path in `index.html` Z. 497 (`s.src='/img/Hero_Video.mp4'`) ggf. anpassen.

**Alternative (online ohne Tool-Installation):** [HandBrake](https://handbrake.fr/) → Web-Optimized-Preset → CRF 28-32.

### A2. Bild-Konvertierung: `seat_ibiza_01.jpeg` → WebP (P1)

```bash
# mit cwebp (Google):
cwebp -q 80 img/seat_ibiza_01.jpeg -o img/seat_ibiza_01.webp

# alternativ ImageMagick:
magick img/seat_ibiza_01.jpeg -quality 80 img/seat_ibiza_01.webp
```

Dann in `fahrzeugbereich.html` und `fahrzeug-seat-ibiza.html` und `index.html` und `mein-fahrzeug-verkaufen.html`:
- `/img/seat_ibiza_01.jpeg` → `/img/seat_ibiza_01.webp`

(Wir behalten die JPEG-Variante als Fallback.)

### A3. Restliche `i10_02.jpeg` … `i10_18.jpeg` zu WebP konvertieren (P2)

Bulk-Konversion:

```bash
for f in img/i10_*.jpeg; do
  cwebp -q 80 "$f" -o "${f%.jpeg}.webp"
done
```

Dann in `fahrzeug-i10.html` Galerie-Thumbnails-Pfade aktualisieren.

### A4. Doppel-Bilder im Root löschen (P3)

Im Repo-Root liegen Duplikate von Bildern, die alle auch unter `/img/` existieren:
`bmw_grau.jpg, car_exchange.jpg, halle2.jpg, halle2.webp, hero.jpg, hero.webp, i10.jpg, i10_01–13.jpeg, moritz.jpg, moritz.webp, rene.jpg, rene.webp, uber-uns-hero.webp, vk-hero.webp`.

**Vor dem Löschen:** Prüfe ob sie in HTML referenziert werden:
```bash
grep -r "src=\"/hero.webp" *.html  # und so weiter pro Datei
```

Aktuell referenziert `index.html` `hero.webp` aus dem Root (nicht `/img/`). Vor dem Löschen entweder Pfad auf `/img/hero.webp` umstellen oder die Root-Datei behalten.

---

## Kurzfristige Code-Empfehlungen (für nächste Session)

### B1. Dependencies / Asset-Konsolidierung (P3)

- CSS aus den 11 HTML-Files in eine `/styles/global.css` extrahieren (Nav, Footer, Cookie-Banner, Btn-Klassen).
- Critical-CSS Above-the-Fold inline lassen, Rest als externes Stylesheet mit `media="print" onload="this.media='all'"` Trick.
- Erspart pro Page-View ~25 KB Cache-Miss.

### B2. Vollständige Marken- und Preis-Filter im Bestand (P1)

Die Sortierung ist bereits drin (`/fahrzeugbereich.html` → Sort-Dropdown). Der nächste Schritt:
- Marken-Multiselect-Dropdown (BMW, Audi, VW, Mercedes, Hyundai, Seat …)
- Preis-Range-Slider (z. B. 1.000 € – 30.000 €) — `<input type="range">` mit JS-Sync zwischen Min/Max
- Kilometerstand-Range-Slider

Rechtfertigt sich, sobald der Bestand ≥ 10 Fahrzeuge hat.

### B3. Mehr Ausstattung pro Fahrzeug-Schema (P1)

Aktuell hat das Vehicle-Schema nur Basic-Felder. Für Rich Results in Google-Vehicle-Listings:
- `vehicleSpecialUsage` ("RentalCar"-Vermeidung, hier irrelevant)
- `vehicleInteriorColor`, `vehicleInteriorType`
- `numberOfPreviousOwners`
- `vehicleConfiguration`
- `accelerationTime`
- `seatingCapacity`

Erweiterung in den 3 Fahrzeug-Schemas (i10, BMW, Seat).

### B4. Internationale FAQ-Schema-Erweiterung (P1)

Auf den 5 neuen regionalen Landingpages wurden FAQ-Schemas eingebaut (lokal-spezifisch). Empfehlung für die Zukunft:
- Auf jeder Fahrzeug-Detailseite: 3–4 Fahrzeug-spezifische FAQs (z. B. „Hat der i10 Klimaautomatik?", „Wie hoch sind die Wartungskosten beim BMW 320d?")

### B5. Mega-Menü für Service-Ausbau (P2)

Aktuell ist die Navigation flach (5 Links). Wenn weitere Service-Detail-Seiten dazukommen (Finanzierung, Garantie, Inzahlungnahme, Zulassungsservice, R&M Findet), bietet sich ein 3-Spalten-Dropdown unter „Leistungen" an. Pattern-Referenz: KKM Media's `nav__dropdown-link`.

### B6. Echte Person-Photos auf den Blog-Artikeln (P2)

Die Blog-Artikel referenzieren `rene.webp` und `moritz.webp` als Author-Boxen. Falls weitere Bilder existieren (z. B. Werkstatt-Snapshots, Fahrzeug-Aufbereitungs-Photos), diese in den Artikeln einbinden für mehr Authentizität.

### B7. Preis-Prüf-Tool für Verkäufer (P2)

Vor dem Auto-verkaufen-Funnel könnte ein simples 4-Felder-Tool (Marke / Modell / Baujahr / KM) die ungefähre Preis-Range zeigen. Implementierungsoptionen:
- Static Lookup-Table (manuell gepflegt)
- Schwacke- oder DAT-API (kostenpflichtig, rechtlich aufwändig)
- Eigenes Scoring auf Basis der bisherigen Bewertungen (mittelfristig)

### B8. Vehicle-Compare-Tool (P3)

Idee aus User-Spec: bis zu 3 Fahrzeuge nebeneinander vergleichen (Preis, KM, PS, Verbrauch).

Implementierung:
- LocalStorage merkt sich angeklickte „Merken"-Buttons
- Floater unten rechts zeigt Anzahl gemerkt
- Vergleichsseite `/vergleich.html` rendert die Comparison-Tabelle

Lohnt sich erst bei ≥ 5 Fahrzeugen Bestand.

---

## Mittelfristige strategische Empfehlungen

### C1. CMS-Light für Fahrzeuge (P2 – mittelfristig)

Aktuell ist jede Fahrzeug-Detailseite eine eigene HTML-Datei (i10, BMW, Seat). Bei wachsendem Bestand (10+ Fahrzeuge) ist das nicht mehr wartbar. Optionen:
- **Cloudflare Workers + KV** für ein simples eigenes Backend (API-driven Listings)
- **mobile.de-Anbindung** über deren API (hat aber B2B-Vertragspflicht)
- **Decap CMS / Tina CMS** als Git-basiertes Lightweight-CMS auf Cloudflare Pages

### C2. Lead-Tracking & DSGVO-Logs

Aktuell laufen alle Form-Submits über Web3Forms (E-Mail-basiert). Empfehlung:
- Eigenes Backend (Cloudflare Worker + D1) für Lead-Logs mit DSGVO-konformer Speicherung
- Conversion-Tracking via GA4 Events (`form_submit`-Event mit Form-Name + Foto-Anzahl)
- Conversion-Tracking via Server-Side Web3Forms-Webhook (https://docs.web3forms.com/integrations/webhooks)

### C3. Weitere SEO-Themen

- **Backlink-Aufbau:** Eintrag in lokalen Branchenverzeichnissen (Gelbe Seiten, MyHammer, Branchenbuch24, GoLocal, OpenStreetMap-POI mit Webseite)
- **Google Business Profile** ausbauen: Wöchentlicher Beitrag, Foto-Updates, Q&A
- **Lokale Backlinks** durch Kooperationen (Werkstätten, Reifen-Service, Versicherungs-Makler in der Region)
- **Branded-Content:** TikTok bereits aktiv (`@rmauto.mobile`) — ein paar Videos auch als YouTube-Shorts hochladen für YouTube-SEO

### C4. Live-Inventory-Refresh (P3)

Der Bestand wechselt im Gebrauchtwagenhandel oft. Ein einfacher Workflow:
- Wenn Fahrzeug verkauft wird: HTML-File löschen, in `sitemap.xml` entfernen, in `fahrzeugbereich.html` entfernen, in `index.html` Slider auch
- Bei neuem Fahrzeug: HTML-File via Template kopieren (z. B. von `fahrzeug-i10.html`), Inhalte ersetzen, Schema anpassen

Ein kleines Bash-Script kann dabei helfen.

---

## Pflichtfelder für den nächsten Push

### D1. Sitemap-Update — automatisch beim Push erforderlich

Nach dem Hinzufügen der 5 Regional-Landingpages und der Blog-Files MUSS `sitemap.xml` aktualisiert werden, damit Google die neuen URLs findet. Wird in dieser Session erledigt.

### D2. Google Search Console — Sitemap-Resubmit

Nach dem Push der 5 + 4 neuen Pages: in Google Search Console einloggen → Property `rmauto-mobile.de` → Sitemap → `sitemap.xml` resubmitten. Indexierung der neuen Regional- und Blog-Pages dauert ~1–7 Tage.

### D3. Test mit Lighthouse / PageSpeed Insights

Nach Live-Schaltung über `https://pagespeed.web.dev/` testen:
- index.html (Mobile)
- fahrzeugbereich.html (Mobile)
- mein-fahrzeug-verkaufen.html (Mobile)
- 1 Regional-Landingpage (Mobile)
- 1 Blog-Artikel (Mobile)

Ziel: alle Metriken ≥ 90.

### D4. Foto-Upload Live-Test

Vor dem Push auf `main`: auf der `claude-optimierung`-Branch über Cloudflare Pages Preview eine echte Test-Anfrage absenden, um zu validieren:
- Files kommen per E-Mail an
- Auch HEIC-Files (iPhone-Test)
- Web3Forms-Limit (5 MB pro File, 25 MB total) hält

Falls Web3Forms Free die File-Anhänge ablehnt, ist im Plan-Upgrade auf den Pro-Plan ($5/Monat) eingerechnet ODER imgbb-Fallback (siehe nächster Punkt).

### D5. Notfall-Plan: Falls Web3Forms-Free File-Upload nicht genug ist

Alternative-Implementierung mit **imgbb** als kostenlosem Image-Host:

```js
// vor Web3Forms-Submit: Bilder zu imgbb hochladen, URLs zurück bekommen
async function uploadToImgbb(file, apiKey){
  const fd = new FormData();
  fd.append('image', file);
  const r = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}&expiration=2592000`, {method:'POST', body:fd});
  const j = await r.json();
  return j.data.url;
}
// dann URLs als Text-Field an Web3Forms anhängen
```

Voraussetzung: kostenlosen API-Key bei imgbb.com erstellen. Achtung: API-Key wird client-side exposed → IP-Rate-Limiting greift.

---

## Was wir in dieser Session bewusst NICHT gemacht haben

| Aufgabe | Warum nicht | Wenn dann später |
|---------|-------------|------------------|
| Globales CSS-Refactoring (alle Inline-Styles in eine externe Datei) | Würde 11 Files gleichzeitig anfassen → Diff zu groß zum Reviewen | B1 |
| Mega-Menü-Navigation | Aktuell nur 5 Top-Level-Links, nicht zwingend nötig | B5 |
| Vehicle-Compare-Tool | Bestand mit 3 Fahrzeugen zu klein | B8 |
| mobile.de-API-Integration | Vertragspflicht, hoher Aufwand | C1 |
| CMS-Anbindung | Bestand klein, statisch reicht | C1 |
| Eigene Backend-Lead-DB | Web3Forms reicht aktuell | C2 |
| Brand-Search-Custom-Dropdown im Verkaufs-Funnel | Standard-Select mit ~20 Marken funktioniert; mehr Marken → später Custom | B2 |

---

## Empfehlung: Reihenfolge der Live-Schaltung

1. **Branch `claude-optimierung` reviewen** (alle Diffs durchschauen)
2. **Lokal testen:** `python -m http.server` im Root + Browser
3. **Cloudflare Pages Preview-URL** aufrufen (sollte automatisch beim Push auf `claude-optimierung` entstehen)
4. **Auf Mobile testen:** iPhone, Android
5. **Foto-Upload-Funnel komplett durchklicken** mit echten Test-Fotos
6. **Bei OK:** Merge in `main` → Live
7. **Sofort danach:** Google Search Console Sitemap-Resubmit
8. **Nach 24h:** Lighthouse-Run gegen Live-Site, sicherstellen dass keine Regression
9. **Nach 1 Woche:** Google-Index-Check für die 5 Region-Pages und Blog-Artikel

---

*— Ende EMPFEHLUNGEN.md —*
