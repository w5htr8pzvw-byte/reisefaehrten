# Reisefährten — Eleventy + Sveltia CMS (Cloudflare)

Diese Version der Website ist auf [Eleventy](https://www.11ty.dev/) umgestellt: Inhalte (Werke, Seitentexte) liegen jetzt in eigenen Dateien, das Design/Layout ist zentral in wenigen Vorlagen definiert. Über [Sveltia CMS](https://github.com/sveltia/sveltia-cms) lassen sich diese Inhalte bequem über ein Formular im Browser bearbeiten — ganz ohne Code.

Gehostet wird über **Cloudflare** statt Netlify (Grund: Netlify-Freikontingent war aufgebraucht; Cloudflare erlaubt 500 Builds/Monat kostenlos, deutlich mehr Spielraum für häufige kleine Änderungen).

**Konfigurationsdatei:** Die Eleventy-Konfiguration liegt jetzt in `eleventy.config.mjs` (ESM) im Hauptordner, nicht mehr in `.eleventy.js`. Bitte bei zukünftigen Anpassungen nur diese eine Datei verwenden — zwei gleichzeitig vorhandene Konfigurationsdateien führen dazu, dass Eleventy nur eine davon zufällig auswählt und die andere stillschweigend ignoriert.

**Kosten: weiterhin 0 €.** Eleventy, Sveltia CMS, GitHub, Cloudflare und Web3Forms sind in dieser Größenordnung komplett kostenlos.

## Wichtiger Hinweis zum Testen

Ich konnte den eigentlichen Eleventy-Build in meiner Umgebung nicht live ausführen (kein Internetzugriff auf npm dort). Ich habe die Logik aller Vorlagen deshalb ersatzweise mit einer gleichwertigen Template-Engine (Jinja2) durchgerechnet — alle 34 Seiten (16 feste Seiten + 18 Werke) rendern dabei fehlerfrei, inklusive der automatischen Galerie-Liste. Der **erste echte Test** ist trotzdem der erste Cloudflare-Build nach dem Hochladen. Bei aktivierten "Builds für Nicht-Produktions-Branches" legt Cloudflare bei jedem Deployment automatisch eine Vorschau-URL an, bevor etwas auf die eigentliche Domain geht — dort lässt sich alles in Ruhe prüfen. Falls doch etwas nicht passt: die Fehlermeldung aus dem Build-Log hier reinkopieren.

## Was sich strukturell ändert

- **Neue, sprechende URLs:** aus `/galerie.html` wird `/galerie/`, aus `/werk-beispiel.html` wird `/werke/beispiel/`, usw. Eine `_redirects`-Datei leitet alle alten Adressen automatisch auf die neuen weiter, falls schon irgendwo verlinkt.
- **Werke sind jetzt einzelne Dateien** unter `src/werke/*.md` (Deutsch) bzw. `src/en/artwork/*.md` (Englisch) — die Galerie-Seite und die "Ausgewählte Werke"-Kacheln auf der Startseite ziehen sich ihre Einträge automatisch aus diesen Dateien. Ein neues Werk hinzuzufügen heißt: eine neue Datei anlegen (über das CMS, s. u.) — nichts an `galerie.njk` oder `index.njk` muss angefasst werden.
- **css/js/images/privat/ sind unverändert** — gleiche Dateien, gleiche Adressen wie vorher.

## Projektstruktur

```
src/
  _includes/layouts/     Gemeinsame Bausteine (Header, Footer, Werk-Layout)
  werke/                 Deutsche Werke (je eine .md-Datei pro Druck)
  en/artwork/             Englische Werke
  en/                     Restliche englische Seiten
  admin/                  Sveltia-CMS-Oberfläche (index.html, config.yml)
  css/ js/ images/ privat/   Unverändert wie bisher
  index.njk, galerie.njk, …   Deutsche Seiten
eleventy.config.mjs        Eleventy-Konfiguration
wrangler.toml              Cloudflare-Konfiguration (sagt Cloudflare, wo die gebaute Seite liegt)
package.json              Nennt Eleventy und Wrangler als Abhängigkeiten
```

## Deployment bei Cloudflare

Wichtiger Hinweis: Cloudflares "Create an app"-Assistent führt inzwischen standardmäßig über **Workers** statt über das früher separate Produkt "Pages" (Cloudflare führt beides schrittweise zusammen). Das ist kein Fehler deinerseits — nur eine andere technische Schiene für dasselbe Ergebnis (eine gehostete statische Seite). Dafür ist jetzt eine `wrangler.toml`-Datei im Projekt dabei, die Cloudflare sagt, wo die fertig gebaute Seite liegt.

1. Dieses Projekt (kompletter Ordnerinhalt) ins bestehende GitHub-Repository hochladen — ersetzt den bisherigen Inhalt (inklusive Löschen der alten `.eleventy.js`, die durch `eleventy.config.mjs` ersetzt wurde)
2. Im "Anwendung einrichten"-Formular (wie im Screenshot) folgende Werte eintragen:
   - **Build-Befehl:** `npx @11ty/eleventy` (so wie schon eingetragen)
   - **Bereitstellungsbefehl:** `npx wrangler deploy` (Cloudflares Vorschlag so übernehmen)
3. Bereitstellen klicken — Wrangler liest dabei automatisch `wrangler.toml` aus und lädt den Inhalt von `_site` hoch
4. Nach dem ersten Deployment läuft die Seite unter einer `*.workers.dev`-Adresse — dort erstmal alles durchklicken und prüfen
5. Eigene Domain verbinden: im Projekt unter **Settings → Domains & Routes → Custom Domains** `meine-reisefaehrten.de` hinzufügen (da die Domain schon bei Cloudflare liegt, ist das nur noch ein Klick, keine erneute DNS-Umstellung nötig)
6. Cloudflare stellt danach automatisch ein kostenloses SSL-Zertifikat aus

## Formulare: Web3Forms statt Netlify Forms

Cloudflare hat keine eingebaute Formularverarbeitung (anders als Netlify). Die Formulare in `kontakt.njk` und `en/contact.njk` laufen daher über [Web3Forms](https://web3forms.com) — im Unterschied zu Formspree ist der Redirect zur eigenen Dankeseite dort auch im Gratis-Tarif (250 Einsendungen/Monat) enthalten:

1. Auf web3forms.com die eigene E-Mail-Adresse eingeben und den Access Key erstellen lassen
2. Den per E-Mail zugesandten Access Key bestätigen
3. Den Access Key in `kontakt.njk` (`DEIN-ACCESS-KEY`) und `en/contact.njk` (`YOUR-ACCESS-KEY`) eintragen — derselbe Key kann für beide Formulare verwendet werden, beide Sprachen landen dann im selben Postfach
4. Der Access Key darf öffentlich im Code stehen (er ist wie eine Adresse, kein Passwort) — laut Web3Forms selbst kein Sicherheitsrisiko

## Cloudflare Web Analytics einrichten

Da ohnehin auf Cloudflare umgezogen wird, bietet sich die kostenlose, cookie-freie Cloudflare Web Analytics an:

1. Im Cloudflare-Dashboard zu **Analytics & Logs → Web Analytics → Add a site**
2. Den dort angezeigten `<script>`-Schnipsel kopieren
3. In `src/_includes/layouts/base.njk` den Platzhalter-Token (`DEIN-CLOUDFLARE-TOKEN`) durch den echten Code ersetzen — steht sitieweit ein einziges Mal drin, gilt automatisch für alle Seiten
4. In `datenschutz.njk` / `en/privacy.njk` ist der entsprechende Datenschutz-Absatz bereits vorbereitet

## Auf GitHub Pages oder Netlify veröffentlichen (Alternative)

Falls doch einmal zurückgewechselt werden soll: Build command `npx @11ty/eleventy`, Publish/Output-Verzeichnis `_site` — das war's, beide Plattformen brauchen nicht mehr als diese zwei Angaben. In diesem Fall Formulare ggf. wieder auf Netlify Forms umstellen und die Datenschutz-Abschnitte entsprechend anpassen.

## Sveltia CMS einrichten (der Editor für dich)

1. In `src/admin/config.yml` ganz oben bei `repo:` deinen tatsächlichen GitHub-Namen und Repository-Namen eintragen (z. B. `niclas123/reisefaehrten`)
2. Nach dem Deployment ist der Editor erreichbar unter `https://meine-reisefaehrten.de/admin/`
3. Beim ersten Aufruf fragt Sveltia CMS nach einer Anmeldemethode. Als Einzelperson ist der einfachste Weg ein **persönliches GitHub-Token (Personal Access Token)**:
   - Bei GitHub: Profilbild → Settings → Developer settings → Personal access tokens → Fine-grained tokens → "Generate new token"
   - Zugriff nur auf das eine Repository beschränken, Berechtigung "Contents: Read and write" geben
   - Das erzeugte Token bei der Anmeldung im CMS einfügen
   - Das Token einmal sicher aufbewahren (z. B. Passwort-Manager) — GitHub zeigt es danach nicht noch einmal an
4. Danach siehst du die Bearbeitungsoberfläche mit den Bereichen "Werke (Deutsch)", "Works (English)", "Seiteninhalte (Deutsch)" und "Page content (English)"

Jede Änderung, die du im CMS speicherst, landet automatisch als Commit in deinem GitHub-Repository — Cloudflare baut die Seite danach von selbst neu (dauert meist ein bis zwei Minuten).

## Was du jetzt ohne meine Hilfe machen kannst

- **Neues Werk hinzufügen:** im CMS bei "Werke (Deutsch)" bzw. "Works (English)" auf "Neu" klicken, Formular ausfüllen (Titel, Ort, Jahr, Papier, Formate, Preis, Bild hochladen, Kategorie wählen), speichern — taucht automatisch in Galerie und (bei den drei neuesten) auf der Startseite auf
- **Werk bearbeiten oder löschen:** vorhandenen Eintrag in der Liste öffnen
- **Texte auf Start-, Über-mich-, Bestellung-, Kontaktseite ändern:** unter "Seiteninhalte" die jeweilige Seite öffnen
- **Bestellschritte oder FAQ-Einträge ändern, hinzufügen, entfernen:** bei "Bestellung & FAQ" über die Listenfelder
- **Impressum/Datenschutz-Angaben (Name, Adresse, E-Mail) eintragen:** ebenfalls über "Seiteninhalte"

## Was weiterhin über den Chat läuft

- Neue Seitentypen, Design-Änderungen, neue Funktionen (z. B. die vorgeschlagene Weltkarte, Newsletter, etc.)
- Änderungen an Impressum/Datenschutz-**Rechtstexten** selbst (nicht nur den Adressfeldern)
- Alles rund um den privaten Bereich (`privat/`) — der ist bewusst unverändert und nicht ans CMS angebunden
- Fehlermeldungen aus dem Cloudflare-Build-Log, falls doch mal etwas nicht durchläuft

## Rechtliches beachten

Wie schon vorher gilt: Impressum und Datenschutzerklärung sind ein unverbindliches Gerüst, keine Rechtsberatung. Nach dem Ausfüllen der Felder im CMS trotzdem einmal rechtlich prüfen lassen, bevor die Seite live für Kund:innen gedacht ist.
