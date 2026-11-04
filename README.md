# Yashasvi Digital Solutions — Website

Business portfolio website for **Yashasvi Digital Solutions** (Founder & CEO: Manish N L), Hoskote, Bengaluru Rural, Karnataka 562114.

Built with **Angular 22** (standalone components, signals, zoneless change detection), **SSR + prerendering** for SEO, SCSS design tokens, Reactive Forms and Lucide icons.

> Before going live, work through **[OWNER-CHECKLIST.md](OWNER-CHECKLIST.md)** — it lists every placeholder that still needs real information.

---

## Quick start

Requirements: Node.js ^22.22.3 or ^24.15.0, and npm.

```bash
npm install
npm start              # dev server at http://localhost:4200
npm test -- --watch=false
npm run build          # production build + prerendered HTML in dist/
```

Hosting is on **Netlify** (see [Deploying to Netlify](#deploying-to-netlify)).

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
  server.ts                      Netlify Edge Function entry (SSR for non-prerendered URLs)
  environments/                  environment config
public/                          static assets, sitemap, robots, manifest, forms/contact.html
netlify.toml                     Netlify build, plugin and header settings
```

## Light / dark mode

- The header toggle switches between light and dark, with sun/moon icons and the labels "Switch to dark mode" / "Switch to light mode".
- On a first visit the site follows the operating-system preference. The visitor's choice is saved in `localStorage` (`yds-theme`). "Use system theme" in the footer clears the saved choice.
- A small inline script in `src/index.html` applies the theme before the first paint, so the page never flashes the wrong theme.

## Contact form

The form has validation, inline accessible errors, a duplicate-submit guard, a consent checkbox and a honeypot anti-spam field.

Submissions go to **Netlify Forms**, so no server code, API keys or webhook are needed:

- `public/forms/contact.html` holds a hidden copy of the form. Netlify reads it at deploy time to learn the field names. If you add or rename a field, update this file and `ContactService` together.
- The Angular form POSTs the enquiry to `/forms/contact.html` with `form-name=contact`.
- Enquiries appear in the Netlify dashboard under **Forms → contact**. Netlify filters spam automatically, and the `website` field is a honeypot.

Modes (set in `src/environments/`):

- **`netlify`** (production build): sends to Netlify Forms. If form detection isn't enabled on Netlify, the visitor sees an honest error, never a false "message sent".
- **`demo`** (local `npm start`): validates the form but sends nothing, and says so. Netlify Forms only exists on deployed sites.

## Deploying to Netlify

The site runs on Netlify with **SSR**, using `@netlify/angular-runtime` (already in `devDependencies`):

- The home and privacy pages are **prerendered** and served straight from Netlify's CDN.
- Any other URL is rendered by `src/server.ts` as a Netlify **Edge Function**, so unknown pages return a real 404.
- Build settings, Node version and security headers are in `netlify.toml`.

### First deployment

1. Push the code to GitHub.
2. In Netlify, go to **Add new site → Import an existing project → GitHub** and choose this repository.
3. Netlify reads `netlify.toml`, so leave the build settings as detected:
   - Build command: `npm run build`
   - Publish directory: `dist/yashasvi-digital-solutions/browser`
4. Click **Deploy**. The site will be live at `https://<site-name>.netlify.app`.
5. Turn on form handling: **Site configuration → Forms → Enable form detection**, then trigger a new deploy with **Deploys → Trigger deploy → Deploy site**. Netlify only detects forms during a deploy that runs after this setting is on.
6. Get enquiries by email: **Forms → Form notifications → Add notification → Email notification**, then choose the `contact` form and your business email.
7. Submit a test enquiry on the live site and confirm it shows up under **Forms**.

After that, every push to `main` deploys automatically, and pull requests get preview URLs.

### Custom domain

1. In Netlify, go to **Domain management → Add a domain** and enter `www.yashasvidigital.in` (or the domain you choose).
2. At your registrar (GoDaddy, Hostinger, etc.), either point the nameservers to Netlify DNS or add the DNS records Netlify shows you.
3. HTTPS is issued automatically (Let's Encrypt). Turn on **Force HTTPS**.
4. If the final domain differs from `www.yashasvidigital.in`, update `siteUrl` in `src/environments/`, plus `public/robots.txt` and `public/sitemap.xml`.

### Local build warnings

`npm run build` on your PC prints "Missing Netlify-specific environment variable …" warnings. These are expected: Netlify provides those variables during its own builds.

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
