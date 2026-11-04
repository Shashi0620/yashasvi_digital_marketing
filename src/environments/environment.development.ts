import { Environment } from './environment.model';

// Netlify Forms only exists on deployed sites, so local development stays in demo mode.
export const environment: Environment = {
  production: false,
  siteUrl: 'https://www.yashasvidigital.in',
  contactForm: {
    mode: 'demo',
    endpoint: '/forms/contact.html',
  },
};
