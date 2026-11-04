# Owner checklist: before launch

Most items are changed in **one file**: `src/app/core/config/site.config.ts`. Other locations are noted.

## 1. Information the owner must supply

| # | Item | Where it goes | Status |
| --- | --- | --- | --- |
| 1 | Final registered domain (`yashasvidigital.in` or `yashasvidigitalsolutions.com`) | `environment.ts`, `environment.development.ts`, `public/robots.txt`, `public/sitemap.xml`, `angular.json` allowedHosts | ☐ |
| 2 | WhatsApp / phone number with country code | `site.config.ts` → `phone.e164` and `phone.display` | ☐ |
| 3 | Which email is the primary public contact | `site.config.ts` → `email` | ☐ |
| 4 | High-quality logo (SVG preferred; PNG 512×512 as well) | replace `public/images/logo.svg` and `public/favicon.svg`. The current logo is a placeholder | ☐ |
| 5 | Social sharing image, 1200×630 PNG/JPG | add it to `public/images/` and set `ogImagePath` | ☐ |
| 6 | Brand photos and approved portfolio screenshots / poster designs | replace the files in `public/images/portfolio` and `public/images/posters`, and update `content.en.ts` → `portfolio` | ☐ |
| 7 | Live demo URLs (if any) | `content.en.ts` → `portfolio.projects[].demoUrl` | ☐ |
| 8 | Verified social media profile URLs | `site.config.ts` → `social` | ☐ |
| 9 | Exact business address or confirmed service area | `site.config.ts` → `location.streetAddress` | ☐ |
| 10 | Business hours (optional) | `site.config.ts` → `businessHours` | ☐ |
| 11 | Contact-form destination (webhook / form service) | server env `CONTACT_WEBHOOK_URL`, then `contactForm.mode: 'live'` | ☐ |
| 12 | Privacy policy review, retention details and the date | `content.en.ts` → `privacy`, then remove the draft notice | ☐ |
| 13 | Confirm any claims such as "#1", "Top 3", client results or years of experience before adding them (none are published now) | `content.en.ts` | ☐ |
| 14 | Team description (software engineers, Meta Ads specialists, content writers), if accurate | `content.en.ts` → `about.paragraphs` | ☐ |
| 15 | Kannada translations, reviewed by a native speaker | `content.kn.ts`, then `enableKannada: true` | ☐ |
| 16 | Terms page (optional) | add the route and set `hasTermsPage: true` | ☐ |
| 17 | Analytics and cookie consent, if analytics are wanted (none are installed now) | update the privacy policy as well | ☐ |

## 2. Google Business Profile

A website alone does **not** create a Google Business Profile listing or guarantee a ranking. The owner has to take part in these steps:

1. Create or claim the profile at <https://business.google.com> using the genuine name **Yashasvi Digital Solutions**.
2. Complete verification using a method Google offers.
3. Choose the most accurate primary category (for example *Internet marketing service* or *Website designer*) and any additional categories.
4. Add the service areas (Hoskote, Bengaluru Rural, Bengaluru), phone, website URL, hours, services, logo and genuine photos.
5. Keep the name, address and phone **identical** on the website, the profile and other listings.
6. Ask real customers for honest reviews and reply professionally. Never buy or fabricate reviews.

## 3. Google Search Console

7. Add the final domain at <https://search.google.com/search-console> (a **Domain** property is recommended).
8. Verify ownership with the DNS TXT record at your registrar (GoDaddy, Hostinger, etc.).
9. Submit `https://<your-domain>/sitemap.xml`.
10. Inspect the homepage URL and click **Request indexing**.
11. Check indexing, search queries and Core Web Vitals regularly.

## 4. Launch acceptance checklist

- [ ] The company name and founder details are correct.
- [ ] Every section loads and the navigation works on mobile, tablet and desktop.
- [ ] Light and dark modes both look correct, and the choice persists after a reload.
- [ ] The WhatsApp button opens the **correct business chat** (test it on a phone).
- [ ] Phone (`tel:`) and email (`mailto:`) links work.
- [ ] Contact form: validation messages appear, a real submission arrives at the destination, and the success and error states show.
- [ ] There are no fake testimonials, client logos, reviews, results or unverified claims.
- [ ] Demo projects are clearly labelled.
- [ ] The domain is updated everywhere (see item 1), and HTTPS works.
- [ ] The page source of the live site contains the content, title, description, canonical and JSON-LD.
- [ ] The Rich Results Test / Schema validator passes.
- [ ] Lighthouse has been run (target 90+ in every category).
- [ ] The Search Console and Google Business Profile steps are done.
