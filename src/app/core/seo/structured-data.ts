import { environment } from '../../../environments/environment';
import { SITE_CONFIG } from '../config/site.config';
import { isPhoneConfigured } from '../utils/contact-links';

/**
 * JSON-LD for the home page. Only verified, visible details are included:
 * no ratings, reviews, opening hours or street address unless configured.
 *
 * `LocalBusiness` is intentionally not used until the owner confirms the exact
 * address / service-area details and Google Business Profile category.
 */
export function buildHomeStructuredData(): object {
  const { location } = SITE_CONFIG;
  const siteUrl = `${environment.siteUrl}/`;

  const address: Record<string, string> = {
    '@type': 'PostalAddress',
    addressLocality: location.locality,
    addressRegion: location.state,
    postalCode: location.postalCode,
    addressCountry: location.countryCode,
  };
  if (location.streetAddress) address['streetAddress'] = location.streetAddress;

  const organization: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': `${siteUrl}#organization`,
    name: SITE_CONFIG.businessName,
    url: siteUrl,
    logo: `${environment.siteUrl}${SITE_CONFIG.logoPath}`,
    email: SITE_CONFIG.email.primary,
    address,
    areaServed: ['Hoskote', 'Bengaluru Rural', 'Bengaluru'],
    founder: { '@type': 'Person', name: SITE_CONFIG.founder.name, jobTitle: SITE_CONFIG.founder.title },
  };
  if (isPhoneConfigured()) organization['telephone'] = `+${SITE_CONFIG.phone.e164}`;
  if (SITE_CONFIG.social.length) organization['sameAs'] = SITE_CONFIG.social.map((s) => s.url);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`,
        name: SITE_CONFIG.businessName,
        url: siteUrl,
        inLanguage: 'en-IN',
        publisher: { '@id': `${siteUrl}#organization` },
      },
    ],
  };
}
