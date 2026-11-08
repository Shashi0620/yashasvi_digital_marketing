import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  siteUrl: 'https://yashasvidigitalsolutions.netlify.app',
  contactForm: {
    mode: 'netlify',
    endpoint: '/forms/contact.html',
  },
};
