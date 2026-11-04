import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  siteUrl: 'https://www.yashasvidigital.in',
  contactForm: {
    mode: 'netlify',
    endpoint: '/forms/contact.html',
  },
};
