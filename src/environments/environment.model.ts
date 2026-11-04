export type ContactFormMode = 'demo' | 'live';

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
     * `live`: the form POSTs to `endpoint` (see `src/server.ts` /api/contact).
     */
    mode: ContactFormMode;
    endpoint: string;
  };
}
