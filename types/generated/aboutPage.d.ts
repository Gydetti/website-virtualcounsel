export interface AboutPage {
  mainContent: MainContent;
  featureCards: FeatureCards;
  values: Values;
  socialProof: AboutPageSocialProof;
  personalJourney: PersonalJourney;
  credentials: Credentials;
  philosophy: Philosophy;
}

export interface Credentials {
  badgeText: string;
  heading: string;
  subtitle: string;
  credentials: Credential[];
  cta: Cta;
}

export interface Credential {
  id: string;
  type: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  icon: string;
}

export interface Cta {
  text: string;
  href: string;
}

export interface FeatureCards {
  badgeText: string;
  heading: string;
  subheading: string;
  featureCards: FeatureCard[];
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface MainContent {
  badgeText: string;
  heading: string;
  paragraphs: string[];
  image: Image;
  variant: string;
  cta: Cta;
}

export interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PersonalJourney {
  badgeText: string;
  heading: string;
  subtitle: string;
  journeySteps: JourneyStep[];
  image: Image;
}

export interface JourneyStep {
  id: string;
  timeframe?: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Philosophy {
  badgeText: string;
  heading: string;
  subtitle: string;
  philosophyPoints: JourneyStep[];
  quote: Quote;
  image: Image;
}

export interface Quote {
  text: string;
  author: string;
}

export interface AboutPageSocialProof {
  badgeText: string;
  heading: string;
  socialProof: SocialProofElement[];
}

export interface SocialProofElement {
  id: string;
  quote: string;
  name: string;
  title: string;
}

export interface Values {
  badgeText: string;
  heading: string;
  values: string[];
}
