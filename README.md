# Yashasvi Digital Solutions — Website

Business portfolio website for **Yashasvi Digital Solutions** (Founder & CEO: Manish N L), Hoskote, Bengaluru Rural, Karnataka 562114.

Built with **Angular 22** (standalone components, signals, zoneless change detection), **SSR + prerendering** for SEO, SCSS design tokens, Reactive Forms and Lucide icons.

> Before going live, work through **[OWNER-CHECKLIST.md](OWNER-CHECKLIST.md)** — it lists every placeholder that still needs real information.

---

## Quick start

Requirements: Node.js 20.19+ / 22.12+ / 24+ and npm.

```bash
npm install
npm start              # dev server at http://localhost:4200
npm test -- --watch=false
npm run build          # production build + prerendered HTML in dist/
npm run serve:ssr:yashasvi-digital-solutions   # run the production server on :4000
```

## Where to edit things

| What | File |
| --- | --- |
| Phone / WhatsApp number, emails, address, social links, business hours, logo, OG image, feature flags | `src/app/core/config/site.config.ts` |
| All English website text (sections, services, industries, portfolio, form labels, privacy policy) | `src/app/core/content/content.en.ts` |
| Kannada text (falls back to English for missing keys) | `src/app/core/content/content.kn.ts` |
| Canonical domain, contact form mode / endpoint | `src/environments/environment.ts` (and `environment.development.ts`) |
| Colours, radius, spacing (light & dark themes) | `src/styles/_tokens.scss` |
| Images | `public/images/` |
| Sitemap / robots | `public/sitemap.xml`, `public/robots.txt` |

### Phone and WhatsApp

Set `phone.e164` to digits only with country code, e.g. `919876543210`, and `phone.display` to the visible text, e.g. `+91 98765 43210`. Until `e164` is set:

- WhatsApp buttons open WhatsApp's contact picker (no specific chat).
- Click-to-call links are hidden and the placeholder text is shown.
- `telephone` is left out of the structured data.

### Adding Kannada

1. Translate keys in `content.kn.ts` (same shape as `content.en.ts`; arrays must be translated in full). Get the translation reviewed by a native speaker.
2. Set `enableKannada: true` in `site.config.ts`. The English/ಕನ್ನಡ switcher then appears in the header and switches the real page content, and the choice is remembered.
3. For Kannada search visibility later, add separate `/kn` routes so Kannada HTML is prerendered too. The current switcher changes text in the browser only.

## Project structure

```
src/
  app/
    core/
      config/site.config.ts      business details (single source of truth)
      content/                   typed copy: model, English, Kannada
      services/                  theme, content/language, contact form, UI state
      seo/                       SeoService (title/meta/canonical/OG) + JSON-LD
      utils/contact-links.ts     WhatsApp / tel / mailto helpers
    layout/                      header, footer, theme toggle, language switcher, WhatsApp FAB
    sections/                    hero, about, services, industries, portfolio, why-choose-us, contact
    pages/                       home, privacy-policy, not-found (lazy-loaded routes)
    shared/icon/                 tree-shaken Lucide icon component
  server.ts                      Express SSR server + secure /api/contact endpoint
  environments/                  environment config
public/                          static assets, sitemap, robots, manifest
```

## Light / dark mode

- The header toggle switches between light and dark, with sun/moon icons and the labels "Switch to dark mode" / "Switch to light mode".
- On a first visit the site follows the operating-system preference. The visitor's choice is saved in `localStorage` (`yds-theme`). "Use system theme" in the footer clears the saved choice.
- A small inline script in `src/index.html` applies the theme before the first paint, so the page never flashes the wrong theme.

## Contact form

The form has validation, inline accessible errors, a duplicate-submit guard, a consent checkbox and a honeypot anti-spam field.

**Demo mode (default).** `contactForm.mode: 'demo'` in `environment.ts`. The form validates but sends **nothing**. The page says so plainly and offers to send the same details on WhatsApp. It never shows a false "message sent".

**Going live:**

1. Pick a destination that accepts a JSON POST, for example a Google Apps Script web app that writes to a Sheet and emails you, Formspree, Make/Zapier, or a CRM webhook.
2. Set environment variables on the server (never in Angular code):
   - `CONTACT_WEBHOOK_URL`: the destination URL
   - `CONTACT_WEBHOOK_TOKEN` (optional): sent as `Authorization: Bearer …`
3. Set `contactForm.mode: 'live'` in `src/environments/environment.ts` and rebuild.

The `/api/contact` endpoint in `src/server.ts` checks every field again on the server, strips control characters, limits the body to 10 kB and allows 5 requests per IP every 10 minutes. It returns `503` when the webhook isn't configured, so visitors see an honest error. For high traffic or multiple server instances, replace the in-memory rate limiter with a shared store (Redis) or your platform's rate limiting, and consider adding a CAPTCHA such as Cloudflare Turnstile.

> If you host as a **static site** (no Node server), `/api/contact` won't exist. Point `contactForm.endpoint` at a third-party form service that accepts JSON instead.

## Deployment

The build output (`dist/yashasvi-digital-solutions/`) contains:

- `browser/`: static assets plus **prerendered** `index.html` and `privacy-policy/index.html`
- `server/server.mjs`: Node/Express server (SSR, 404 handling, `/api/contact`)

**Recommended: Node hosting** (Render, Railway, a VPS with PM2, Google Cloud Run, etc.)

```bash
npm ci && npm run build
PORT=4000 CONTACT_WEBHOOK_URL=https://... node dist/yashasvi-digital-solutions/server/server.mjs
```

Put it behind HTTPS. Most hosts provide this, or use Nginx/Caddy with Let's Encrypt. The allowed host names are listed in `angular.json` → `security.allowedHosts`. Add the final domain there if it differs.

**Static hosting** (Netlify, Vercel static, Cloudflare Pages, Hostinger): upload `dist/yashasvi-digital-solutions/browser/`, rename `index.csr.html` → `404.html` (or set a 404 rewrite), and use an external form service (see above).

## SEO

Already implemented:

- Prerendered HTML, so crawlers see the full content and metadata without running JavaScript.
- A unique `<title>` and meta description for each page, one `<h1>` per page and a logical heading structure.
- A canonical URL, Open Graph and Twitter tags (the image is added once `ogImagePath` is set).
- JSON-LD `Organization` + `WebSite` containing only verified data. There are no ratings, reviews, hours or street address.
- `robots.txt`, `sitemap.xml` and a real HTTP 404 with `noindex` for unknown URLs.
- Descriptive image alt text, set image dimensions to prevent layout shift, lazy-loaded below-the-fold images, and vector (SVG) artwork.

**After choosing the final domain**, update it in:

- `src/environments/environment.ts` and `environment.development.ts` (`siteUrl`)
- `public/robots.txt` and `public/sitemap.xml`
- `angular.json` → `security.allowedHosts`

**Validate after launch:**

- [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/)
- Lighthouse (Chrome DevTools) for performance, accessibility, best practices and SEO
- View the page source of the live site and confirm the content and meta tags are in the HTML

No developer can guarantee rankings or how quickly Google indexes a site. See the Google Search Console and Google Business Profile steps in [OWNER-CHECKLIST.md](OWNER-CHECKLIST.md).

## Accessibility notes

- Skip link, semantic landmarks, visible focus rings, labelled controls and `aria-invalid`/`aria-describedby` on form errors.
- Errors use an icon and text as well as colour.
- Icons are decorative (`aria-hidden`), and every control has an accessible name.
- `prefers-reduced-motion` turns off smooth scrolling and animations.
- On small screens the WhatsApp button moves out of the way while the contact form is visible.

## Icons

Icons come from [Lucide](https://lucide.dev) (ISC licence) through the framework-agnostic `lucide` package and a small `IconComponent`. `lucide-angular` is not yet compatible with Angular 22. To add an icon, import it in `src/app/shared/icon/icons.ts` and add it to `ICONS`.
