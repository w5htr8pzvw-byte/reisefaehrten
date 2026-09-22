# Privater Bereich — Anleitung

Dieser Ordner enthält ein Muster für Alben, die nur Personen mit Link **und** Zugriffscode sehen sollen (private Urlaubsbilder, später ggf. Shootings).

## Wichtig zu wissen, bevor du das nutzt

GitHub Pages ist ein rein statisches Hosting ohne Server-Logik. Das bedeutet ganz konkret:

- **Jede Datei in diesem Repository ist grundsätzlich öffentlich abrufbar**, sobald jemand ihre genaue Adresse kennt — es gibt keine echte Zugriffskontrolle wie bei einem Login mit Datenbank dahinter.
- Der Code-Schutz hier ist ein **Sichtschutz, keine Verschlüsselung**: Er hält Suchmaschinen fern (durch `noindex`) und verhindert, dass Bild-Adressen direkt im Quelltext sichtbar sind, bevor der richtige Code eingegeben wurde. Jemand, der gezielt die Entwicklertools des Browsers öffnet und die Datei `js/gate.js` bzw. den Quelltext der Album-Seite liest, kann die Bild-Adressen trotzdem finden.
- Realistisch schützt dieser Ansatz gegen: zufälliges Finden über Google, gedankenloses Weiterleiten des Links, beiläufiges Stöbern. Er schützt **nicht** gegen jemanden, der technisch versiert ist und bewusst versucht, die Bilder zu finden.

**Für private Urlaubsbilder unter Familie/Freunden** ist das in aller Regel ein völlig angemessener Kompromiss. **Für bezahlte Kundenshootings**, bei denen echte Vertraulichkeit wichtig ist, würde ich zusätzlich eine der folgenden Optionen in Betracht ziehen:

- **Cloudflare** (kostenlos) vor die eigene Domain schalten und mit **Cloudflare Access** einen echten Login/Einmalcode auf Server-Ebene einrichten — Anfragen werden dann blockiert, bevor sie GitHub Pages überhaupt erreichen
- Einen dedizierten Kundengalerie-Dienst nutzen (z. B. Pixieset, ShootProof, Pic-Time) — dafür gebaut, inklusive echtem Passwortschutz, Downloadverwaltung und teils Verkaufsfunktion für Abzüge

## Wie es funktioniert

- `vorlage-album.html` zeigt zunächst nur ein Eingabefeld für den Zugriffscode
- Bei Eingabe wird der Code im Browser gehasht (SHA-256) und mit dem hinterlegten `expectedHash` verglichen — der Klartext-Code steht nirgends im Quelltext
- Stimmt der Hash, baut `js/gate.js` die Bildergalerie per JavaScript zusammen und blendet sie ein

## Ein neues Album anlegen

1. `vorlage-album.html` kopieren und **unerratbar** umbenennen, z. B. `privat-italien-sommer-k3x9p2.html` (nicht `album1.html`, nicht der Name der Reise allein)
2. `code-hash-generator.html` öffnen, gewünschten Code eingeben, den angezeigten Hash kopieren
3. In der neuen Album-Datei bei `ALBUM_CONFIG` den Hash bei `expectedHash` einsetzen sowie Titel, Intro und Bilder anpassen
4. Eigene Fotos in `privat/images/` hochladen und in `ALBUM_CONFIG.images` referenzieren (die Platzhalter-SVGs ersetzen)
5. Die Datei **nirgends verlinken** — nicht in der Hauptnavigation, nicht auf der Startseite, nicht in einer Sitemap
6. Link und Code getrennt voneinander an die gewünschte Person weitergeben (z. B. Link per Mail, Code per Nachricht/SMS) — das erhöht die Hürde zusätzlich

## Empfehlenswerte Ergänzung: robots.txt

Bewusst **nicht** angelegt: ein Eintrag `Disallow: /privat/` in einer `robots.txt`, weil das den Ordnernamen für jeden sichtbar machen würde, der die Datei aufruft. Das einzelne `noindex`-Meta-Tag auf jeder privaten Seite erreicht denselben Suchmaschinen-Ausschluss, ohne den Ordner öffentlich anzukündigen.
