import { SiteContent } from './content.model';

/**
 * English website copy. Edit text here — components contain no hard-coded copy.
 *
 * Content rules from the brief: no invented testimonials, client names, results,
 * rankings, prices or "#1" claims. Demo work is always labelled as such.
 */
export const CONTENT_EN: SiteContent = {
  meta: {
    homeTitle: 'Yashasvi Digital Solutions | Digital Marketing & Website Development in Hoskote',
    homeDescription:
      'Yashasvi Digital Solutions is a digital marketing and website development agency in Hoskote, Bengaluru Rural. Meta & Google Ads, Google Business Profile, websites, social media and Kannada & English content.',
    privacyTitle: 'Privacy Policy | Yashasvi Digital Solutions',
    privacyDescription:
      'How Yashasvi Digital Solutions collects, uses and protects the information you share through our website enquiry form.',
    notFoundTitle: 'Page not found | Yashasvi Digital Solutions',
    notFoundDescription: 'The page you are looking for could not be found.',
  },
  common: {
    skipToContent: 'Skip to main content',
    demoBadge: 'Demo Project',
    conceptBadge: 'Concept Design',
    opensInNewTab: '(opens in a new tab)',
    phonePending: 'Phone number coming soon',
  },
  nav: {
    label: 'Main navigation',
    items: [
      { id: 'home', label: 'Home' },
      { id: 'about', label: 'About' },
      { id: 'services', label: 'Services' },
      { id: 'industries', label: 'Industries' },
      { id: 'portfolio', label: 'Portfolio' },
      { id: 'why-us', label: 'Why Us' },
      { id: 'contact', label: 'Contact' },
    ],
    cta: 'Free Digital Audit',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    homeLabel: 'Yashasvi Digital Solutions — home',
  },
  theme: {
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
    useSystem: 'Use system theme',
    followingSystem: 'Following system theme',
  },
  language: {
    label: 'Language',
    names: { en: 'English', kn: 'ಕನ್ನಡ' },
  },
  hero: {
    eyebrow: 'Yashasvi Digital Solutions · Hoskote, Bengaluru',
    title: "Grow Your Business Digitally with Hoskote's Digital Marketing & Web Development Agency",
    text: 'From high-converting Meta Ads and Google Business Profile optimisation to custom website development, we help businesses strengthen their online presence and attract more enquiries, customers, and sales.',
    primaryCta: 'Get a Free Digital Audit',
    secondaryCta: 'View Our Packages',
    highlights: [
      'Meta & Google Ads',
      'Google Business Profile',
      'Custom Websites',
      'Kannada & English Content',
    ],
    imageAlt:
      'Illustration of a business website on a laptop and phone, alongside growing enquiry and analytics charts',
  },
  about: {
    eyebrow: 'About Us',
    title: 'Empowering Businesses Across Hoskote & Bengaluru',
    paragraphs: [
      'Founded by Manish N L, Yashasvi Digital Solutions is a digital marketing and software development agency based in Hoskote, Bengaluru Rural. We combine local market understanding with modern digital strategies to help businesses build a stronger online presence and connect with their customers.',
      'Whether you are a real estate developer along the STRR corridor, a healthcare clinic, an educational institution, or a growing retail brand, our goal is to understand your business needs and deliver practical digital solutions.',
      'Our services bring together software development, digital advertising, creative content, and online brand building. We focus on clear communication, useful solutions, and long-term business growth.',
    ],
    founderLabel: 'Founder & CEO',
    locationLabel: 'Based in',
    points: [
      {
        icon: 'map-pinned',
        title: 'Local understanding',
        text: 'We know the Hoskote and Bengaluru business landscape.',
      },
      {
        icon: 'layers',
        title: 'Marketing + technology',
        text: 'Advertising, content and websites, planned together.',
      },
      {
        icon: 'messages',
        title: 'Clear communication',
        text: 'Simple explanations and regular updates, without jargon.',
      },
    ],
  },
  services: {
    eyebrow: 'Our Core Services',
    title: 'Everything You Need to Grow Online',
    intro:
      'Choose a single service or combine several. Every plan starts by understanding your business, your customers and your goals.',
    enquireLabel: 'Enquire on WhatsApp',
    items: [
      {
        id: 'local-seo',
        icon: 'map-pin',
        title: 'Google Business Profile & Local SEO',
        description:
          'Help customers discover your business when they search locally on Google Search and Google Maps.',
        highlights: [
          'Google Business Profile setup & optimisation',
          'Accurate business information & service listings',
          'Local search visibility improvements',
          'Review-management best practices',
        ],
        note: 'Rankings depend on competition, relevance, distance and Google’s own systems, so no position can be guaranteed.',
        whatsappMessage:
          "Hi, I'm interested in Google Business Profile & Local SEO for my business. Please share more details.",
      },
      {
        id: 'ads',
        icon: 'megaphone',
        title: 'Meta & Google Ads — Lead Generation',
        description:
          'Reach potential customers through targeted Facebook, Instagram and Google advertising campaigns.',
        highlights: [
          'Campaign planning & audience targeting',
          'Ad creatives and ad copy',
          'Ongoing performance improvement',
          'Suited to real estate, showrooms & institutions',
        ],
        whatsappMessage:
          "Hi, I'm interested in Meta / Google Ads for lead generation. Please share more details.",
      },
      {
        id: 'websites',
        icon: 'monitor-smartphone',
        title: 'Custom Website Design & Development',
        description:
          'A fast, mobile-friendly website designed around your business goals.',
        highlights: [
          'Business portfolio & service websites',
          'Real estate landing pages',
          'E-commerce & catalogue experiences',
          'Enquiry forms and WhatsApp integration',
        ],
        whatsappMessage:
          "Hi, I'm interested in a website for my business. Please share more details.",
      },
      {
        id: 'social-media',
        icon: 'clapperboard',
        title: 'Social Media Management & Reels',
        description:
          'Build a consistent brand presence on Instagram and Facebook.',
        highlights: [
          'Creative posters',
          'Short-form video & Reels editing',
          'Captions and content planning',
          'Kannada and English content',
        ],
        whatsappMessage:
          "Hi, I'm interested in social media management & Reels. Please share more details.",
      },
      {
        id: 'content',
        icon: 'pen-line',
        title: 'Content Writing & Brand Strategy',
        description:
          'Communicate your value clearly, in a voice that suits your audience and brand.',
        highlights: [
          'Website content & ad copy',
          'Video scripts and social captions',
          'Festival campaigns',
          'Kannada and English writing',
        ],
        whatsappMessage:
          "Hi, I'm interested in content writing & brand strategy. Please share more details.",
      },
      {
        id: 'branding',
        icon: 'palette',
        title: 'WhatsApp Marketing & Logo Branding',
        description:
          'Strengthen customer communication and give your brand a professional look.',
        highlights: [
          'Logo design',
          'Digital visiting cards & brochures',
          'WhatsApp Business catalogue setup',
          'Consent-based messaging practices',
        ],
        note: 'We follow responsible, consent-based messaging and do not send unsolicited bulk messages.',
        whatsappMessage:
          "Hi, I'm interested in WhatsApp marketing / logo branding. Please share more details.",
      },
    ],
    packages: {
      title: 'Looking for a package?',
      text: 'Every business is different, so we put together a customised package based on your goals and budget. Contact us for a customised package.',
      cta: 'Ask for a customised package',
    },
  },
  industries: {
    eyebrow: 'Industries We Serve',
    title: 'Digital Solutions for Businesses Across Industries',
    intro: 'Practical digital marketing and websites tailored to the way your industry finds customers.',
    items: [
      {
        icon: 'building',
        title: 'Real Estate, Layouts & Builders',
        text: 'Property promotion, project landing pages, and lead-generation campaigns.',
      },
      {
        icon: 'stethoscope',
        title: 'Hospitals, Dental & Diagnostic Clinics',
        text: 'Professional websites, appointment enquiries, and local visibility.',
      },
      {
        icon: 'graduation-cap',
        title: 'Schools, Colleges & Coaching Centres',
        text: 'Admission campaigns, course information, and enquiry generation.',
      },
      {
        icon: 'shopping-bag',
        title: 'Jewellery, Garments & Retail Showrooms',
        text: 'Product promotion, social media content, and catalogue websites.',
      },
      {
        icon: 'coffee',
        title: 'Hotels, Cafés & Fitness Centres',
        text: 'Local discovery, promotional campaigns, and customer engagement.',
      },
      {
        icon: 'factory',
        title: 'Industrial & Manufacturing Units',
        text: 'Business websites and digital presence for industrial businesses, including those around Pillagumpe and KIADB.',
      },
    ],
    note: 'These are the industries we are set up to help — not a list of existing clients.',
  },
  portfolio: {
    eyebrow: 'Demo Portfolio',
    title: 'Explore What We Can Build for Your Business',
    intro:
      'These sample concepts show the kind of websites and creatives we design. They are demo projects, not client work.',
    viewDemo: 'View Demo',
    demoUnavailable: 'Live demo coming soon',
    projects: [
      {
        id: 'real-estate',
        title: 'Real Estate Layout & Property Portal',
        description:
          'A sample property website with project details, location information, plot listings, enquiry options and WhatsApp contact.',
        features: ['Project & location details', 'Plot / property listings', 'Enquiry + WhatsApp contact'],
        image: '/images/portfolio/real-estate.svg',
        imageAlt:
          'Demo design of a real estate layout website showing a project banner, plot listings and an enquiry button',
        demoUrl: '',
      },
      {
        id: 'clinic',
        title: 'Multi-Specialty Clinic & Appointment Website',
        description:
          'A sample clinic website with departments, fictional demo doctor profiles, clinic information and an appointment enquiry flow.',
        features: ['Departments & services', 'Demo doctor profiles', 'Appointment enquiry flow'],
        image: '/images/portfolio/clinic.svg',
        imageAlt:
          'Demo design of a clinic website showing department cards, sample doctor profiles and an appointment form',
        demoUrl: '',
      },
      {
        id: 'retail',
        title: 'Local Retail & E-Commerce Catalogue',
        description:
          'A sample retail website with product categories, product cards, catalogue browsing and enquiry / order contact options.',
        features: ['Product categories', 'Catalogue browsing', 'Enquiry / order on WhatsApp'],
        image: '/images/portfolio/retail.svg',
        imageAlt:
          'Demo design of a retail catalogue website showing product categories and product cards with enquiry buttons',
        demoUrl: '',
      },
    ],
    postersTitle: 'Social Media Poster Concepts',
    postersIntro: 'Sample poster layouts for Instagram and Facebook. Real campaign designs will be added here.',
    posters: [
      {
        id: 'property-launch',
        title: 'Property launch',
        image: '/images/posters/property-launch.svg',
        imageAlt: 'Concept poster announcing a new residential layout launch with an enquire-now button',
      },
      {
        id: 'health-camp',
        title: 'Clinic health camp',
        image: '/images/posters/health-camp.svg',
        imageAlt: 'Concept poster for a free health check-up camp at a clinic',
      },
      {
        id: 'festival',
        title: 'Festival greeting',
        image: '/images/posters/festival.svg',
        imageAlt: 'Concept festival greeting poster with decorative lamp and greeting text',
      },
      {
        id: 'showroom-offer',
        title: 'Showroom offer',
        image: '/images/posters/showroom-offer.svg',
        imageAlt: 'Concept poster promoting a seasonal collection at a retail showroom',
      },
    ],
    note: 'All designs on this page are original demo concepts created to illustrate our services.',
  },
  whyUs: {
    eyebrow: 'Why Choose Us',
    title: 'A Local Partner Focused on Your Growth',
    intro: 'What you can expect when you work with Yashasvi Digital Solutions.',
    items: [
      {
        icon: 'map-pinned',
        title: 'Local understanding',
        text: 'We understand businesses in Hoskote, Bengaluru Rural and Bengaluru.',
      },
      {
        icon: 'layers',
        title: 'Marketing & websites under one roof',
        text: 'Digital marketing and website development handled by one team.',
      },
      {
        icon: 'smartphone',
        title: 'Mobile-friendly, modern websites',
        text: 'Fast websites that look good and work well on every screen.',
      },
      {
        icon: 'languages',
        title: 'Kannada & English content',
        text: 'Content that connects with local and wider audiences.',
      },
      {
        icon: 'messages',
        title: 'Clear communication',
        text: 'Solutions based on your business goals, explained simply.',
      },
      {
        icon: 'trending-up',
        title: 'Focus on useful enquiries',
        text: 'Campaigns tracked and improved using measurable performance.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact Us',
    title: "Ready to Grow Your Business Enquiries? Let's Talk Today!",
    text: "Tell us a little about your business and what you want to achieve. We'll get in touch to understand your requirements and discuss a suitable digital solution.",
    detailsTitle: 'Contact details',
    labels: {
      company: 'Company',
      founder: 'Founder & CEO',
      location: 'Location',
      phone: 'Phone / WhatsApp',
      email: 'Email',
      altEmail: 'Alternative email',
      hours: 'Business hours',
    },
    whatsappCta: 'Chat on WhatsApp',
    callCta: 'Call us',
    form: {
      title: 'Send an enquiry',
      name: 'Name',
      phone: 'Phone number',
      phoneHint: '10-digit Indian mobile number, e.g. 98765 43210',
      businessType: 'Business type',
      serviceNeeded: 'Service needed',
      message: 'Message / project details',
      optional: '(optional)',
      selectPlaceholder: 'Please choose…',
      businessTypes: [
        { value: 'real-estate', label: 'Real estate / builder' },
        { value: 'healthcare', label: 'Hospital / clinic' },
        { value: 'education', label: 'School / college / coaching' },
        { value: 'retail', label: 'Retail / showroom' },
        { value: 'hospitality', label: 'Hotel / café / fitness' },
        { value: 'industrial', label: 'Industrial / manufacturing' },
        { value: 'other', label: 'Other' },
      ],
      consent:
        'I agree that Yashasvi Digital Solutions may use these details to contact me about my enquiry.',
      privacyLink: 'Read our privacy policy',
      submit: 'Submit Inquiry',
      submitting: 'Submitting…',
      errorSummary: 'Please correct the highlighted fields.',
      errors: {
        nameRequired: 'Please enter your name.',
        nameLength: 'Name should be between 2 and 80 characters.',
        phoneRequired: 'Please enter your phone number.',
        phoneInvalid: 'Please enter a valid 10-digit Indian mobile number.',
        businessTypeRequired: 'Please choose your business type.',
        serviceRequired: 'Please choose the service you need.',
        messageLength: 'Message should be under 1000 characters.',
        consentRequired: 'Please agree so that we can contact you.',
      },
      demoNotice:
        'Demo mode: this form is not yet connected, so enquiries are not sent. Please use WhatsApp, phone or email to reach us.',
      demoResultTitle: 'Your enquiry was NOT sent',
      demoResultText:
        'The online form is in demo mode. You can send the same details to us on WhatsApp instead.',
      sendViaWhatsapp: 'Send these details on WhatsApp',
      successTitle: 'Thank you! Your enquiry has been received.',
      successText: 'We will get in touch with you soon to discuss your requirements.',
      sendAnother: 'Send another enquiry',
      failureTitle: 'Sorry, your enquiry could not be sent.',
      failureText: 'Please try again in a moment, or contact us on WhatsApp, phone or email.',
    },
  },
  footer: {
    description:
      'Digital marketing and website development agency in Hoskote, Bengaluru Rural — helping local businesses grow online.',
    quickLinksTitle: 'Quick links',
    servicesTitle: 'Services',
    contactTitle: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms',
    rights: 'All rights reserved.',
    followUs: 'Follow us',
  },
  whatsappFab: { label: 'Chat with Yashasvi Digital Solutions on WhatsApp' },
  notFound: {
    title: 'Page not found',
    text: 'Sorry, the page you are looking for does not exist or has moved.',
    cta: 'Back to home',
  },
  privacy: {
    title: 'Privacy Policy',
    draftNotice:
      'DRAFT — this policy is a starting template and must be reviewed and confirmed by the business owner before launch.',
    lastUpdated: 'Last updated: [ADD DATE]',
    sections: [
      {
        heading: 'Who we are',
        paragraphs: [
          'This website is operated by Yashasvi Digital Solutions, Hoskote, Bengaluru Rural, Karnataka 562114, India.',
        ],
      },
      {
        heading: 'Information we collect',
        paragraphs: [
          'When you submit our enquiry form we collect your name, phone number, business type, the service you are interested in and any message you choose to add.',
          'If you contact us by WhatsApp, phone or email, we receive the details you share through that channel.',
          'We do not ask for payment details or government ID numbers through this website.',
        ],
      },
      {
        heading: 'How we use your information',
        paragraphs: [
          'We use your details only to respond to your enquiry, understand your requirements and discuss our services with you.',
          'We do not sell your personal information. We do not add you to bulk marketing lists without your consent.',
        ],
      },
      {
        heading: 'Storage and retention',
        paragraphs: [
          '[OWNER: describe where enquiries are stored (for example, email inbox or form service) and how long they are kept.]',
        ],
      },
      {
        heading: 'Cookies and analytics',
        paragraphs: [
          'This website stores your light/dark theme choice in your browser. It does not currently use advertising or analytics cookies. If analytics are added later, this policy will be updated.',
        ],
      },
      {
        heading: 'Your choices',
        paragraphs: [
          'You can ask us to update or delete the details you shared by contacting info@yashasvidigital.in.',
        ],
      },
    ],
  },
};
