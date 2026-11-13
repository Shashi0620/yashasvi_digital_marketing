/**
 * Central business configuration.
 *
 * Update phone numbers, emails, address, social links and other owner-supplied
 * details HERE. Components read from this file, so a change here is reflected
 * across the whole website (header, footer, contact section, WhatsApp button,
 * structured data, etc.).
 *
 * Items marked "OWNER:" must be confirmed before production launch.
 */

export interface SocialLink {
  /** Visible / accessible name, e.g. "Instagram". */
  label: string;
  /** Full verified profile URL. */
  url: string;
}

export interface SiteConfig {
  businessName: string;
  shortName: string;
  founder: { name: string; title: string };
  location: {
    /** OWNER: add only a verified street address. Leave empty to hide it. */
    streetAddress: string;
    locality: string;
    region: string;
    state: string;
    postalCode: string;
    country: string;
    countryCode: string;
  };
  phone: {
    /** Text shown to visitors. */
    display: string;
    /**
     * OWNER: international format digits only, no "+" or spaces
     * (e.g. "919876543210"). Leave empty until confirmed.
     */
    e164: string;
  };
  email: { primary: string; alternative: string };
  /** OWNER: add verified profile URLs only. Empty list hides social links. */
  social: SocialLink[];
  whatsapp: {
    greeting: string;
    auditMessage: string;
  };
  /** OWNER: e.g. "Mon–Sat, 9:30 AM – 7:00 PM". Empty string hides it. */
  businessHours: string;
  logoPath: string;
  /**
   * OWNER: 1200×630 PNG/JPG used when the site is shared on social media.
   * Leave empty until a real image is available.
   */
  ogImagePath: string;
  /** Set to true once the Terms page has been written and added. */
  hasTermsPage: boolean;
  /**
   * Enable Kannada once `content.kn.ts` has been filled in and reviewed by a
   * native speaker. The language switcher is hidden while this is false.
   */
  enableKannada: boolean;
  /**
   * OWNER: the `content` value of the "HTML tag" verification method in Google
   * Search Console (e.g. "AbC123..."). Leave empty until you have it.
   */
  googleSiteVerification: string;
}

export const SITE_CONFIG: SiteConfig = {
  businessName: 'Yashasvi Digital Solutions',
  shortName: 'Yashasvi Digital',
  founder: { name: 'Manish N L', title: 'Founder & CEO' },
  location: {
    streetAddress: '',
    locality: 'Hoskote',
    region: 'Bengaluru Rural',
    state: 'Karnataka',
    postalCode: '562114',
    country: 'India',
    countryCode: 'IN',
  },
  phone: {
    display: '+91 [ADD BUSINESS PHONE NUMBER]',
    e164: '',
  },
  email: {
    primary: 'info@yashasvidigital.in',
    alternative: 'yashasvidigitalsolutions@gmail.com',
  },
  social: [],
  whatsapp: {
    greeting: 'Hi Yashasvi Digital Solutions, I would like to know more about your services.',
    auditMessage:
      "Hi, I'm interested in a free digital audit for my business. Please share more details.",
  },
  businessHours: '',
  logoPath: '/images/logo.svg',
  ogImagePath: '',
  hasTermsPage: false,
  enableKannada: false,
  googleSiteVerification: 'Hka0fEz5R1Q5MA8Pp-AIyibw2gAY4POhBs_YNXG1REs',
};
