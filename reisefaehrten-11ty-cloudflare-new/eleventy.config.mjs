export default function (eleventyConfig) {
  // Unverändert durchreichen — kein Templating auf diesen Ordnern
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/privat");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/_redirects");

  // Sammlung aller deutschen Werke (aus src/werke/*.md), sortiert nach "order"
  eleventyConfig.addCollection("werkeDe", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/werke/*.md")
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  // Sammlung aller englischen Werke (aus src/en/artwork/*.md)
  eleventyConfig.addCollection("werkeEn", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/en/artwork/*.md")
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
