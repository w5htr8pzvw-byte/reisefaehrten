# Reisefährten — Website-Grundgerüst

Statische Website (reines HTML/CSS + eine kleine JS-Datei für den Galerie-Filter), fertig zum Hosten auf Netlify (verbunden mit GitHub) oder alternativ auf GitHub Pages. Kein Build-Schritt, keine Installation nötig — Dateien hochladen, Hosting verbinden, fertig.

## Struktur

```
index.html            Startseite
galerie.html           Galerie mit Kategorie-Filter
werk-beispiel.html      Vorlage für eine einzelne Werkseite (pro Motiv kopieren)
ueber-mich.html         Über mich
bestellung.html         Bestellablauf + FAQ
kontakt.html            Kontaktformular
danke.html              Bestätigungsseite nach Formularabsendung (Netlify Forms)
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
- [ ] **Kontaktformular** (`kontakt.html`) — läuft bereits über Netlify Forms, sobald über Netlify gehostet (siehe unten); nur noch mailto-Adresse anpassen
- [ ] **Titel, Orte, Preise, Formate** in `index.html`, `galerie.html`, `werk-beispiel.html`
- [ ] **Nachname** und Instagram-Link im Footer aller Seiten (aktuell überall gleich, per Suchen-und-Ersetzen schnell erledigt)
- [ ] **Bestellablauf/FAQ** (`bestellung.html`) — echte Bearbeitungszeiten, Zahlungsarten, Papierarten, Formate eintragen

## Kontaktformular: Netlify Forms

Das Formular in `kontakt.html` ist bereits fertig für [Netlify Forms](https://docs.netlify.com/manage/forms/setup/) vorbereitet (Attribut `data-netlify="true"`) — dafür ist **keine** separate Anmeldung bei einem Drittanbieter nötig. Sobald die Seite über Netlify gehostet wird, erkennt Netlify das Formular beim ersten Deployment automatisch.

1. In den Netlify-Site-Einstellungen zu **Forms**
2. Unter **Form notifications** eine E-Mail-Benachrichtigung einrichten, damit neue Nachrichten nicht nur im Netlify-Dashboard, sondern auch per Mail ankommen
3. Eingehende Nachrichten sind zusätzlich jederzeit im Dashboard unter „Forms" einsehbar

Ein verstecktes Feld (`bot-field`) dient als Spam-Falle (Honeypot) und braucht keine Einrichtung. Nach dem Absenden landen Besucher:innen auf `danke.html`.

Alternative ganz ohne Formular: den `mailto:`-Link unter dem Formular als einzigen Kontaktweg nutzen und das `<form>` entfernen.

## Hinweis zu Google Fonts (Datenschutz)

Die Schriften werden aktuell direkt von Google-Servern geladen. Für eine Seite mit deutschem Publikum ist es datenschutzfreundlicher, sie selbst zu hosten (Dateien bei [google-webfonts-helper](https://gwfh.mranftl.com/fonts) herunterladen, in `css/fonts/` ablegen, per `@font-face` in `style.css` einbinden statt der `<link>`-Tags in jeder HTML-Datei). Danach Abschnitt 4 in `datenschutz.html` entfernen.

## Auf Netlify veröffentlichen (mit Domain von INWX)

1. Alle Dateien aus diesem Ordner in ein GitHub-Repository hochladen (z. B. `reisefaehrten`)
2. Bei [netlify.com](https://www.netlify.com) mit dem GitHub-Account anmelden, **"Add new site" → "Import an existing project"**, das Repository auswählen
3. Da kein Build-Schritt nötig ist: Build command **leer lassen**, Publish directory auf **`/`** (Root) setzen, deployen
4. Nach dem ersten Deployment läuft die Seite bereits unter einer `*.netlify.app`-Adresse — die eigene Domain kommt erst im nächsten Schritt dazu
5. In den Netlify-Site-Einstellungen zu **Domain management → Add a domain** und `meine-reisefaehrten.de` eintragen
6. Netlify zeigt daraufhin die nötigen DNS-Einträge an. Zwei Wege, das bei INWX einzurichten:
   - **Einfacher:** die von Netlify angezeigten Nameserver bei INWX unter "DNS" auf Netlify umstellen (Netlify verwaltet dann DNS und SSL komplett)
   - **Alternativ:** DNS bei INWX belassen und dort nur die von Netlify angezeigten Einträge ergänzen (i. d. R. ein A-Record für die nackte Domain plus ein CNAME für `www` auf die `*.netlify.app`-Adresse)
7. Nach DNS-Ausbreitung (meist innerhalb weniger Stunden) stellt Netlify automatisch ein kostenloses SSL-Zertifikat aus — danach ist die Seite unter `https://meine-reisefaehrten.de` erreichbar

Jede weitere Änderung an den Dateien im GitHub-Repository löst automatisch ein neues Deployment aus — ein manueller Upload ist danach nicht mehr nötig.

### Alternative: GitHub Pages statt Netlify

Falls stattdessen doch GitHub Pages genutzt werden soll: im Repository zu **Settings → Pages**, unter „Build and deployment" **„Deploy from a branch"** wählen, Branch **main** und Ordner **/ (root)**, speichern. Die Seite ist danach unter `https://<benutzername>.github.io/reisefaehrten/` erreichbar, eine eigene Domain lässt sich dort unter „Custom domain" hinterlegen (dazu bei INWX einen CNAME- bzw. A-Record auf GitHub Pages setzen, Details in der [GitHub-Dokumentation](https://docs.github.com/pages)). In diesem Fall den Datenschutz-Abschnitt 2 wieder auf GitHub Pages ändern und das Kontaktformular auf einen externen Dienst wie Formspree umstellen, da GitHub Pages selbst keine Formulare verarbeiten kann.

## Neue Werkseiten ergänzen

1. `werk-beispiel.html` kopieren und sinnvoll umbenennen (z. B. `werk-fjord-norwegen.html`)
2. Bild, Titel, Beschreibung, Formate und Preis in der Kopie anpassen
3. In `galerie.html` eine neue `.gallery-item`-Kachel ergänzen (bestehende Kachel als Vorlage kopieren) und auf die neue Werkseite verlinken

## Privater Bereich (Alben nur mit Link + Zugriffscode)

Im Ordner `privat/` liegt eine Vorlage für nicht öffentlich gelistete Alben, z. B. für private Urlaubsbilder oder später Shootings — Zugriff nur mit Link und Zugriffscode. Vollständige Anleitung und wichtige Hinweise zu den Grenzen dieses Schutzes: `privat/README.md`.

## Später: echter Warenkorb/Checkout

Für den Start reicht Anfrage per Formular. Falls später ein direkter Checkout gewünscht ist, lässt sich z. B. [Snipcart](https://snipcart.com) oder ein Shopify-Buy-Button per JavaScript-Snippet nachrüsten, ohne die restliche Seite umzubauen. Mit Netlify steht dafür zusätzlich [Netlify Functions](https://docs.netlify.com/build/functions/overview/) zur Verfügung — kleine serverseitige Funktionen (z. B. für eine Zahlungsanbindung), die direkt im selben Projekt laufen, ohne einen separaten Server zu benötigen.
