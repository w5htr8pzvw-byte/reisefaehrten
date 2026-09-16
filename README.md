# Reisefährten — Website-Grundgerüst

Statische Website (reines HTML/CSS + eine kleine JS-Datei für den Galerie-Filter), fertig zum Hochladen auf GitHub Pages. Kein Build-Schritt, keine Installation nötig — Dateien hochladen, Pages aktivieren, fertig.

## Struktur

```
index.html            Startseite
galerie.html           Galerie mit Kategorie-Filter
werk-beispiel.html      Vorlage für eine einzelne Werkseite (pro Motiv kopieren)
ueber-mich.html         Über mich
bestellung.html         Bestellablauf + FAQ
kontakt.html            Kontaktformular
impressum.html          Impressum-Vorlage (§5 TMG)
datenschutz.html        Datenschutzerklärung-Vorlage
css/style.css           Sämtliche Gestaltung (Farben, Typografie, Layout)
js/gallery.js           Kategorie-Filter der Galerie
images/                 Platzhalterbilder (SVG) — durch echte Fotos ersetzen
```

## Design in Kürze

- **Farben:** dunkles, warmes Grün-Anthrazit als Grundfläche, Ocker/Rost als Akzentfarbe — gewählt, damit die Fotos selbst wirken statt vom Layout überstrahlt zu werden. Alle Werte stehen als CSS-Variablen ganz oben in `css/style.css` (`:root { ... }`) und lassen sich dort zentral anpassen.
- **Schriften:** „Fraunces“ (Serife, für Überschriften) + „Work Sans“ (für Fließtext), eingebunden über Google Fonts.

## Vor dem Launch: Platzhalter ausfüllen

Im Code steht überall, was noch fehlt, meist in `[eckigen Klammern]`. Wichtigste Stellen:

- [ ] **Echte Fotos** in `images/` hochladen und in den HTML-Dateien die `src="images/…"`-Pfade auf die neuen Dateinamen anpassen (Alt-Texte gleich mit anpassen)
- [ ] **Impressum** (`impressum.html`) — Name, Anschrift, Kontakt vollständig eintragen
- [ ] **Datenschutzerklärung** (`datenschutz.html`) — Name/Anschrift eintragen, Abschnitt 4 (Google Fonts) siehe unten
- [ ] **Kontaktformular** (`kontakt.html`) — Formspree einrichten (siehe unten) oder eigene Lösung, mailto-Adresse anpassen
- [ ] **Titel, Orte, Preise, Formate** in `index.html`, `galerie.html`, `werk-beispiel.html`
- [ ] **Nachname** und Instagram-Link im Footer aller Seiten (aktuell überall gleich, per Suchen-und-Ersetzen schnell erledigt)
- [ ] **Bestellablauf/FAQ** (`bestellung.html`) — echte Bearbeitungszeiten, Zahlungsarten, Papierarten, Formate eintragen

## Kontaktformular: Formspree einrichten

GitHub Pages kann Formulardaten nicht selbst verarbeiten. Das Formular in `kontakt.html` ist für [Formspree](https://formspree.io) vorbereitet:

1. Kostenlosen Account bei formspree.io anlegen
2. Neues Formular erstellen, eigene E-Mail-Adresse hinterlegen
3. Die angezeigte Form-ID in `kontakt.html` eintragen, im `action`-Attribut anstelle von `DEINE-FORM-ID`

Alternative ganz ohne Anmeldung: den `mailto:`-Link unter dem Formular als einzigen Kontaktweg nutzen und das `<form>` entfernen.

## Hinweis zu Google Fonts (Datenschutz)

Die Schriften werden aktuell direkt von Google-Servern geladen. Für eine Seite mit deutschem Publikum ist es datenschutzfreundlicher, sie selbst zu hosten (Dateien bei [google-webfonts-helper](https://gwfh.mranftl.com/fonts) herunterladen, in `css/fonts/` ablegen, per `@font-face` in `style.css` einbinden statt der `<link>`-Tags in jeder HTML-Datei). Danach Abschnitt 4 in `datenschutz.html` entfernen.

## Auf GitHub Pages veröffentlichen

1. Neues Repository auf GitHub anlegen (z. B. `reisefaehrten`)
2. Alle Dateien aus diesem Ordner in das Repository hochladen (per Drag & Drop im Browser oder `git push`)
3. Im Repository zu **Settings → Pages**
4. Unter „Build and deployment“ als Source **„Deploy from a branch“** wählen, Branch **main** und Ordner **/ (root)** auswählen, speichern
5. Nach ein bis zwei Minuten ist die Seite unter `https://<benutzername>.github.io/reisefaehrten/` erreichbar
6. Optional: eine eigene Domain (z. B. reisefaehrten.de) unter „Custom domain“ im selben Menü hinterlegen — dazu beim Domain-Anbieter einen CNAME- bzw. A-Record auf GitHub Pages setzen (Details in der [GitHub-Dokumentation](https://docs.github.com/pages))

## Neue Werkseiten ergänzen

1. `werk-beispiel.html` kopieren und sinnvoll umbenennen (z. B. `werk-fjord-norwegen.html`)
2. Bild, Titel, Beschreibung, Formate und Preis in der Kopie anpassen
3. In `galerie.html` eine neue `.gallery-item`-Kachel ergänzen (bestehende Kachel als Vorlage kopieren) und auf die neue Werkseite verlinken

## Später: echter Warenkorb/Checkout

Für den Start reicht Anfrage per Formular. Falls später ein direkter Checkout gewünscht ist, lässt sich z. B. [Snipcart](https://snipcart.com) oder ein Shopify-Buy-Button per JavaScript-Snippet nachrüsten, ohne die restliche Seite umzubauen (siehe Konzept-Dokument, Abschnitt 6).
