import QRCode from "qrcode";
import loadAppearances from "./_data/appearances.js";

// Language codes used across the site. Anything else is shown as "Other".
const LANGUAGES = { en: "English", it: "Italian" };

// "01:02:03" | "62:03" | 3723 -> seconds
function toSeconds(ts) {
  if (ts === undefined || ts === null || ts === "") return null;
  if (typeof ts === "number") return Math.floor(ts);
  const parts = String(ts).trim().split(":").map(Number);
  if (parts.some(Number.isNaN)) return null;
  return parts.reduce((acc, n) => acc * 60 + n, 0);
}

// Add a start time to a YouTube or Vimeo URL so the link opens at the right moment.
function withStart(url, start) {
  const s = toSeconds(start);
  if (!url || !s) return url;
  try {
    const u = new URL(url);
    if (/(^|\.)youtube\.com$|(^|\.)youtu\.be$/.test(u.hostname)) {
      u.searchParams.set("t", `${s}s`);
      return u.toString();
    }
    if (/(^|\.)vimeo\.com$/.test(u.hostname)) {
      u.hash = `t=${s}s`;
      return u.toString();
    }
  } catch (e) {
    /* not a URL, leave it alone */
  }
  return url;
}

export default function (eleventyConfig) {
  // Static files: favicons, covers, images go to the site root as before.
  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.addPassthroughCopy({ "assets": "/assets" });
  // Self-hosted font (no requests to third parties).
  // DejaVu Sans Mono: the default terminal font on most Linux distributions.
  const fontDir = "node_modules/@fontsource/dejavu-mono/files";
  eleventyConfig.addPassthroughCopy({
    [`${fontDir}/dejavu-mono-latin-400-normal.woff2`]: "/assets/fonts/dejavu-mono-400.woff2",
    [`${fontDir}/dejavu-mono-latin-700-normal.woff2`]: "/assets/fonts/dejavu-mono-700.woff2",
    [`${fontDir}/dejavu-mono-latin-400-italic.woff2`]: "/assets/fonts/dejavu-mono-400-italic.woff2",
  });

  eleventyConfig.addWatchTarget("data/");
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("LICENSE");
  eleventyConfig.ignores.add("node_modules/**");

  eleventyConfig.addCollection("articles", (api) =>
    api.getFilteredByGlob("articles/*.md").sort((a, b) => b.date - a.date)
  );

  // One sorted list with articles and appearances, used by the home page and /content/.
  eleventyConfig.addCollection("everything", async (api) => {
    const articles = api.getFilteredByGlob("articles/*.md").map((p) => ({
      kind: "article",
      date: p.date,
      title: p.data.title,
      description: p.data.description,
      url: p.url,
      language: p.data.language || "en",
      type: p.data.type || "text",
      topics: p.data.topics || [],
      placeholder: false,
    }));
    const appearances = (await loadAppearances()).map((a) => ({
      kind: "appearance",
      ...a,
    }));
    return [...articles, ...appearances].sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("year", (d) => new Date(d).getUTCFullYear());
  eleventyConfig.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("rfc822", (d) => new Date(d).toUTCString());
  eleventyConfig.addFilter("languageName", (code) => LANGUAGES[code] || "Other");
  eleventyConfig.addFilter("languageGroup", (code) => (LANGUAGES[code] ? code : "other"));
  eleventyConfig.addFilter("withStart", withStart);
  eleventyConfig.addFilter("uniqueYears", (items) =>
    [...new Set(items.map((i) => new Date(i.date).getUTCFullYear()))].sort((a, b) => b - a)
  );
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  // QR code rendered at build time as inline SVG, so the page needs no QR library.
  eleventyConfig.addAsyncShortcode("qr", async (text) =>
    QRCode.toString(text, {
      type: "svg",
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#0a0f0c", light: "#e8f5ec" },
    })
  );

  return {
    dir: { input: ".", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
