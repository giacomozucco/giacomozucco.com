// Loads data/appearances.json and normalizes it for the templates.
// The canonical format is documented in README.md. A few common field
// aliases are accepted so a list compiled elsewhere can be dropped in as is.
import { readFile } from "node:fs/promises";

const LANG_ALIASES = {
  english: "en", eng: "en", en: "en",
  italian: "it", italiano: "it", ita: "it", it: "it",
};

function lang(v) {
  if (!v) return "other";
  const k = String(v).trim().toLowerCase();
  return LANG_ALIASES[k] || k;
}

function media(v) {
  const k = String(v || "video").toLowerCase();
  return k.includes("audio") || k.includes("podcast") ? "audio" : "video";
}

// Friendly names for link hosts; unknown hosts fall back to the bare domain.
const HOSTS = {
  "youtube.com": "YouTube", "youtu.be": "YouTube", "m.youtube.com": "YouTube",
  "podcasts.apple.com": "Apple Podcasts", "open.spotify.com": "Spotify", "spotify.com": "Spotify",
  "api.riverside.com": "Riverside", "riverside.fm": "Riverside", "bitcointv.com": "BitcoinTV",
  "rumble.com": "Rumble", "x.com": "X", "twitter.com": "X", "fountain.fm": "Fountain",
  "vimeo.com": "Vimeo", "soundcloud.com": "SoundCloud", "anchor.fm": "Anchor",
};
function hostLabel(url) {
  const h = new URL(url).hostname.replace(/^www\./, "");
  return HOSTS[h] || h;
}

function linksOf(a) {
  let l = a.links ?? a.link ?? a.url ?? a.urls ?? [];
  if (!Array.isArray(l)) l = [l];
  return l
    .map((x) => (typeof x === "string" ? { label: null, url: x } : { label: x.label || x.name || null, url: x.url || x.href }))
    .filter((x) => x.url)
    .map((x) => ({ ...x, label: x.label || hostLabel(x.url) }));
}

// A start of 00:00:00 means the whole recording: no "my part" link needed.
const zero = (t) => (t && /^0{1,2}:00(:00)?$/.test(t) ? null : t);

export default async function () {
  let raw;
  try {
    raw = JSON.parse(await readFile(new URL("../data/appearances.json", import.meta.url), "utf8"));
  } catch (e) {
    console.warn("[appearances] could not read data/appearances.json:", e.message);
    return [];
  }
  const list = Array.isArray(raw) ? raw : raw.appearances || raw.items || [];
  return list
    .filter((a) => a && a.date && a.title)
    .map((a) => {
      const ts = a.timestamps || {};
      // Optional "parts": several recordings shown as one item (a series, a two-part episode).
      const parts = Array.isArray(a.parts)
        ? a.parts.map((p) => ({ title: p.title, date: p.date ? new Date(p.date) : null, links: linksOf(p), start: zero(p.start ?? null), end: p.end ?? null }))
        : null;
      return {
        date: new Date(a.date),
        title: a.title,
        event: a.event || a.channel || a.show || null,
        format: a.format || null,
        type: media(a.media ?? a.media_type ?? a.mediaType ?? a.type),
        language: lang(a.language ?? a.lang),
        links: parts ? parts[parts.length - 1].links : linksOf(a),
        parts,
        start: zero(ts.start ?? a.start ?? null),
        end: ts.end ?? a.end ?? null,
        description: a.context || a.description || null,
        topics: a.topics || a.tags || [],
        placeholder: Boolean(a.placeholder),
      };
    });
}
