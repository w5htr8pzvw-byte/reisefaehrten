# Reisefährten — Eleventy + Sveltia CMS

Diese Version der Website ist auf [Eleventy](https://www.11ty.dev/) umgestellt: Inhalte (Werke, Seitentexte) liegen jetzt in eigenen Dateien, das Design/Layout ist zentral in wenigen Vorlagen definiert. Über [Sveltia CMS](https://github.com/sveltia/sveltia-cms) lassen sich diese Inhalte bequem über ein Formular im Browser bearbeiten — ganz ohne Code.

**Kosten: weiterhin 0 €.** Eleventy, Sveltia CMS, GitHub und Netlify sind in dieser Größenordnung komplett kostenlos.

## Wichtiger Hinweis zum Testen

Ich konnte den eigentlichen Eleventy-Build in meiner Umgebung nicht live ausführen (kein Internetzugriff auf npm dort). Ich habe die Logik aller Vorlagen deshalb ersatzweise mit einer gleichwertigen Template-Engine (Jinja2) durchgerechnet — alle 34 Seiten (16 feste Seiten + 18 Werke) rendern dabei fehlerfrei, inklusive der automatischen Galerie-Liste. Der **erste echte Test** ist trotzdem der erste Netlify-Build nach dem Hochladen. Deshalb: **zuerst auf einer Vorschau-URL prüfen**, bevor die eigentliche Domain umgestellt wird (siehe unten) — falls doch etwas nicht passt, meld dich einfach mit der Fehlermeldung aus dem Netlify-Build-Log.

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
.eleventy.js              Eleventy-Konfiguration
netlify.toml              Build-Einstellungen für Netlify
package.json              Nennt Eleventy als Abhängigkeit
```

## Einrichtung bei Netlify

1. Dieses Projekt (kompletter Ordnerinhalt) ins GitHub-Repository hochladen — ersetzt den bisherigen Inhalt
2. Bei Netlify das Repository neu verbinden bzw. den bestehenden Site-Eintrag verwenden — **Build command** und **Publish directory** liest Netlify automatisch aus `netlify.toml` (`npx @11ty/eleventy` → `_site`), nichts manuell einzutragen nötig
3. **Empfehlung:** zuerst über einen sogenannten "Deploy Preview" oder eine Test-Site prüfen, ob der Build durchläuft und alle Seiten wie gewohnt aussehen, bevor die eigentliche Domain `meine-reisefaehrten.de` umgehängt wird
4. Sobald alles passt: gewohnt weiter unter der bestehenden Domain — an der Netlify-Domain-Einrichtung selbst ändert sich nichts

## Sveltia CMS einrichten (der Editor für dich)

1. In `src/admin/config.yml` ganz oben bei `repo:` deinen tatsächlichen GitHub-Namen und Repository-Namen eintragen (z. B. `niclas123/reisefaehrten`)
2. Nach dem Deployment ist der Editor erreichbar unter `https://meine-reisefaehrten.de/admin/`
3. Beim ersten Aufruf fragt Sveltia CMS nach einer Anmeldemethode. Als Einzelperson ist der einfachste Weg ein **persönliches GitHub-Token (Personal Access Token)**:
   - Bei GitHub: Profilbild → Settings → Developer settings → Personal access tokens → Fine-grained tokens → "Generate new token"
   - Zugriff nur auf das eine Repository beschränken, Berechtigung "Contents: Read and write" geben
   - Das erzeugte Token bei der Anmeldung im CMS einfügen
   - Das Token einmal sicher aufbewahren (z. B. Passwort-Manager) — GitHub zeigt es danach nicht noch einmal an
4. Danach siehst du die Bearbeitungsoberfläche mit den Bereichen "Werke (Deutsch)", "Works (English)", "Seiteninhalte (Deutsch)" und "Page content (English)"

Jede Änderung, die du im CMS speicherst, landet automatisch als Commit in deinem GitHub-Repository — Netlify baut die Seite danach von selbst neu (dauert meist ein bis zwei Minuten).

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
- Fehlermeldungen aus dem Netlify-Build-Log, falls doch mal etwas nicht durchläuft

## Rechtliches beachten

Wie schon vorher gilt: Impressum und Datenschutzerklärung sind ein unverbindliches Gerüst, keine Rechtsberatung. Nach dem Ausfüllen der Felder im CMS trotzdem einmal rechtlich prüfen lassen, bevor die Seite live für Kund:innen gedacht ist.
