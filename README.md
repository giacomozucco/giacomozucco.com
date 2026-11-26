# giacomozucco.com

Source of [giacomozucco.com](https://www.giacomozucco.com). Static site built with
[Eleventy](https://www.11ty.dev/), plain CSS, a few lines of optional JavaScript.
Netlify builds `master` automatically and makes a preview for every pull request.

Pull requests are welcome: fix a typo, add an article, add a missing talk or podcast.

## Run it locally

Node 18 or newer.

```sh
npm install
npm run dev     # http://localhost:8080, rebuilds on save
npm run build   # writes the site to _site/
```

## Where things live

| Path | What |
| --- | --- |
| `index.njk` | Home page (bio, latest items) |
| `content.njk` | `/content/`: everything, filterable by type, language and year |
| `contact.njk` | `/contact/` |
| `articles/*.md` | Articles, one Markdown file each |
| `data/appearances.json` | Talks, interviews, podcasts (video and audio) |
| `_data/site.json` | Name, links, booking URL, Lightning address, organizations in the bio |
| `_includes/` | Layouts and partials (Nunjucks) |
| `assets/` | `style.css`, `site.js` |
| `public/` | Copied as is to the site root (favicons, images, covers) |

## Adding an article

Create `articles/my-article.md`:

```markdown
---
title: 'My article'
description: 'One line summary'
date: 2026-11-25
permalink: /my-article/
language: en          # en, it, or any other ISO code (shown as "other")
type: text            # text, video or audio
topics: ['bitcoin', 'privacy']
image: /covers/my-cover.jpg   # optional, used for link previews
---

Markdown here.
```

The `permalink` is the public URL. Never change it for an existing article.

## Adding appearances (talks, interviews, podcasts)

Append an object to `data/appearances.json`:

```json
{
  "date": "2025-10-24",
  "title": "Panel on bitcoin self-custody",
  "event": "Some Conference 2025",
  "format": "panel",
  "media": "video",
  "language": "en",
  "links": [
    { "label": "YouTube", "url": "https://www.youtube.com/watch?v=..." },
    { "label": "Slides", "url": "https://..." }
  ],
  "timestamps": { "start": "01:12:30", "end": "01:41:05" },
  "context": "One or two lines of context.",
  "topics": ["self-custody", "lightning"]
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `date` | yes | `YYYY-MM-DD` |
| `title` | yes | |
| `event` | no | Event, show or channel (`channel` is accepted too) |
| `format` | no | Free text: talk, panel, interview, podcast, debate, lecture... |
| `media` | no | `video` (default) or `audio`. Drives the "audio only" filter |
| `language` | no | `en`, `it`, or another ISO code (all others are grouped as "other"). `English` / `Italian` also work |
| `links` | no | List of `{label, url}` or plain URL strings. The first link is the main one |
| `timestamps` | no | `start` / `end` of Giacomo's part, `HH:MM:SS` or `MM:SS`. For YouTube and Vimeo links the "my part" link jumps to `start` |
| `context` | no | Short description (`description` is accepted too) |
| `topics` | no | List of strings (`tags` is accepted too) |
| `placeholder` | no | `true` marks example entries; they show a "placeholder" badge and are left out of the RSS feed |

The file can be a plain array or `{ "appearances": [...] }`. The loader is
`_data/appearances.js` if you need to accept more field names.

## License

No copyright: I don't believe in intellectual property. Copy, remix and share freely.
If you really need a license, everything here (code and content) is released under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/), see `LICENSE`.
