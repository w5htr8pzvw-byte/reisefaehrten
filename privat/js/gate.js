// Reisefährten — Freischalt-Logik für private Alben.
//
// WICHTIG (siehe privat/README.md für Details):
// Das hier ist ein Sichtschutz, keine echte Verschlüsselung. GitHub Pages
// liefert jede Datei öffentlich aus, sobald jemand ihre genaue Adresse kennt.
// Dieses Skript sorgt nur dafür, dass die Bild-Adressen nicht schon beim
// Öffnen der Seite im Quelltext sichtbar sind, sondern erst nach richtigem
// Code per JavaScript eingefügt werden. Wer die Entwicklertools öffnet und
// dieses Skript liest, kann die Bilder trotzdem finden. Für wirklich
// sensible Aufnahmen (z. B. bezahlte Shootings) reicht das allein nicht.
(function () {
  async function sha256Hex(text) {
    var enc = new TextEncoder().encode(text);
    var buf = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf))
      .map(function (b) { return b.toString(16).padStart(2, "0"); })
      .join("");
  }

  function renderAlbum(config, container) {
    var heading = document.createElement("h1");
    heading.style.fontSize = "clamp(1.9rem, 3.5vw, 2.6rem)";
    heading.textContent = config.title || "Privates Album";
    container.appendChild(heading);

    if (config.intro) {
      var intro = document.createElement("p");
      intro.className = "wide";
      intro.textContent = config.intro;
      container.appendChild(intro);
    }

    var grid = document.createElement("div");
    grid.className = "gallery-grid";
    grid.style.marginTop = "var(--space-4)";

    (config.images || []).forEach(function (item) {
      var wrap = document.createElement("div");
      wrap.className = "gallery-item" + (item.wide ? " is-wide" : "") + (item.tall ? " is-tall" : "");

      var figure = document.createElement("figure");
      var frame = document.createElement("div");
      frame.className = "frame";

      var img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt || "";
      img.loading = "lazy";

      frame.appendChild(img);
      figure.appendChild(frame);

      if (item.caption) {
        var caption = document.createElement("figcaption");
        caption.textContent = item.caption;
        figure.appendChild(caption);
      }

      wrap.appendChild(figure);
      grid.appendChild(wrap);
    });

    container.appendChild(grid);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var config = window.ALBUM_CONFIG;
    if (!config) {
      return;
    }

    var form = document.getElementById("gate-form");
    var input = document.getElementById("code");
    var error = document.getElementById("gate-error");
    var gate = document.getElementById("gate");
    var content = document.getElementById("album-content");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      sha256Hex(input.value.trim()).then(function (hash) {
        if (hash === config.expectedHash) {
          renderAlbum(config, content);
          gate.hidden = true;
          content.hidden = false;
          content.scrollIntoView({ behavior: "smooth" });
        } else {
          error.style.display = "block";
          input.value = "";
          input.focus();
        }
      });
    });
  });
})();
