// Reisefährten — einfacher Kategorie-Filter für die Galerie.
// Funktioniert ohne Build-Schritt; verschlechtert sich ohne JS
// nur zu "alle Bilder werden gezeigt" (kein Fehlerzustand).
document.addEventListener("DOMContentLoaded", function () {
  var filterLinks = document.querySelectorAll(".gallery-filters a");
  var items = document.querySelectorAll(".gallery-item");

  filterLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var filter = link.getAttribute("data-filter");

      filterLinks.forEach(function (l) {
        l.removeAttribute("aria-current");
      });
      link.setAttribute("aria-current", "true");

      items.forEach(function (item) {
        var match = filter === "alle" || filter === "all" || item.getAttribute("data-category") === filter;
        item.style.display = match ? "" : "none";
      });
    });
  });
});
