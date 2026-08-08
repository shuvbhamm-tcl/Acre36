# Acre36 — V1 Website Package

Static site. No build step, no framework — open `index.html` in a browser or
deploy the folder as-is to any static host (Vercel, Netlify, GitHub Pages, S3).

## File structure

```
acre36-website/
├── index.html              Home
├── services.html            Services
├── reports.html              Reports & Insights (listing)
├── about.html                 About Us
├── reports/
│   └── raipur-2026.html        Sample report — use as the template for every new report
├── css/
│   └── style.css                All design tokens + components (single file, commented)
├── js/
│   └── main.js                   Mobile nav, scroll reveal, filters, form, WhatsApp handoff
├── assets/
│   ├── patterns/topo.svg          Brand contour-line texture (reused everywhere)
│   └── images/                     Empty — drop real photography in here (see below)
└── README.md
```

## Design tokens (in `css/style.css` :root)

- `--forest` #013727 — primary dark green
- `--lime` #A4EA41 — accent, primary CTA
- `--cream` #F6F3EA — page background
- Type: Fraunces (display/headings), Inter (body/UI), IBM Plex Mono (data, tags, eyebrows)
- Semantic tag colors: Established (forest), Growth (lime), Emerging (amber),
  Watch (grey), Caution (muted red) — never implies guaranteed returns.

## Replacing placeholder photography

Every image slot currently uses `.art-placeholder` — a dark-green gradient +
topo texture + a caption describing what should go there (e.g. "Site visit —
Abhanpur"). This keeps the site presentable in V1 without using fake stock
photography, which the brief explicitly wants to avoid.

To replace one:
1. Drop the real photo into `assets/images/`.
2. Swap the `<div class="art-placeholder">...</div>` block for an `<img>` tag
   pointing at the new file, keeping the same wrapping element for sizing.

## Adding a new report

Copy `reports/raipur-2026.html`, update the content following the template's
existing section order (snapshot → status → areas to watch → why it matters →
infrastructure → risks → Acre36 view), and add a matching card to
`reports.html` with the correct `data-status` value so it works with the
filter bar.

## Form handling

`#advisor-form` currently intercepts submit and shows a static success
message (see `js/main.js`). For production, point the form at a serverless
endpoint or form service (Formspree, Netlify Forms, a small Cloudflare
Worker) that notifies the advisor team — by email, WhatsApp Business API, or
into a lightweight CRM. No backend is included in this package by design
(V1 is static).

## WhatsApp

Replace the placeholder number in `js/main.js` (`910000000000`) with
Acre36's real WhatsApp Business number.
