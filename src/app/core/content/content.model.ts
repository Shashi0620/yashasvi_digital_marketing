import type { IconName } from '../../shared/icon/icons';

export type SectionId =
  | 'home'
  | 'about'
  | 'services'
  | 'industries'
  | 'portfolio'
  | 'why-us'
  | 'contact';

export type LanguageCode = 'en' | 'kn';

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface IconCard {
  icon: IconName;
  title: string;
  text: string;
}

export interface ServiceItem {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  highlights: string[];
  /** Optional honest caveat shown under the card (e.g. no ranking guarantees). */
  note?: string;
  whatsappMessage: string;
}

export interface DemoProject {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  /** Leave empty until a live demo exists; the button is then shown as unavailable. */
  demoUrl: string;
}

export interface PosterSample {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface SiteContent {
  meta: {
    homeTitle: string;
    homeDescription: string;
    privacyTitle: string;
    privacyDescription: string;
    notFoundTitle: string;
    notFoundDescription: string;
  };
  common: {
    skipToContent: string;
    demoBadge: string;
    conceptBadge: string;
    opensInNewTab: string;
    phonePending: string;
  };
  nav: {
    label: string;
    items: NavItem[];
    cta: string;
    openMenu: string;
    closeMenu: string;
    homeLabel: string;
  };
  theme: {
    toDark: string;
    toLight: string;
    useSystem: string;
    followingSystem: string;
  };
  language: {
    label: string;
    names: Record<LanguageCode, string>;
  };
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
    highlights: string[];
    imageAlt: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    founderLabel: string;
    locationLabel: string;
    points: IconCard[];
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    items: ServiceItem[];
    enquireLabel: string;
    packages: { title: string; text: string; cta: string };
  };
  industries: {
    eyebrow: string;
    title: string;
    intro: string;
    items: IconCard[];
    note: string;
  };
  portfolio: {
    eyebrow: string;
    title: string;
    intro: string;
    projects: DemoProject[];
    viewDemo: string;
    demoUnavailable: string;
    postersTitle: string;
    postersIntro: string;
    posters: PosterSample[];
    note: string;
  };
  whyUs: {
    eyebrow: string;
    title: string;
    intro: string;
    items: IconCard[];
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    detailsTitle: string;
    labels: {
      company: string;
      founder: string;
      location: string;
      phone: string;
      email: string;
      altEmail: string;
      hours: string;
    };
    whatsappCta: string;
    callCta: string;
    form: {
      title: string;
      name: string;
      phone: string;
      phoneHint: string;
      businessType: string;
      serviceNeeded: string;
      message: string;
      optional: string;
      selectPlaceholder: string;
      businessTypes: SelectOption[];
      consent: string;
      privacyLink: string;
      submit: string;
      submitting: string;
      errorSummary: string;
      errors: {
        nameRequired: string;
        nameLength: string;
        phoneRequired: string;
        phoneInvalid: string;
        businessTypeRequired: string;
        serviceRequired: string;
        messageLength: string;
        consentRequired: string;
      };
      demoNotice: string;
      demoResultTitle: string;
      demoResultText: string;
      sendViaWhatsapp: string;
      successTitle: string;
      successText: string;
      sendAnother: string;
      failureTitle: string;
      failureText: string;
    };
  };
  footer: {
    description: string;
    quickLinksTitle: string;
    servicesTitle: string;
    contactTitle: string;
    privacy: string;
    terms: string;
    rights: string;
    followUs: string;
  };
  whatsappFab: { label: string };
  notFound: { title: string; text: string; cta: string };
  privacy: {
    title: string;
    draftNotice: string;
    lastUpdated: string;
    sections: LegalSection[];
  };
}
