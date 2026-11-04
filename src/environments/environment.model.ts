export type ContactFormMode = 'demo' | 'netlify';

export interface Environment {
  production: boolean;
  /**
   * Canonical origin without a trailing slash.
   * OWNER: confirm the registered domain before launch.
   */
  siteUrl: string;
  contactForm: {
    /**
     * `demo`: the form validates but does NOT send anything and says so clearly.
     * `netlify`: the form submits to Netlify Forms at `endpoint`.
     */
    mode: ContactFormMode;
    /** Static page holding the Netlify form definition (`public/forms/contact.html`). */
    endpoint: string;
  };
}
