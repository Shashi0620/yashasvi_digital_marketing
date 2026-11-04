import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  siteUrl: 'https://www.yashasvidigital.in',
  contactForm: {
    mode: 'demo',
    endpoint: '/api/contact',
  },
};
