export interface ServicesPage {
  overview: Overview;
  whyChooseSection: WhyChooseSection;
  ctaSection: CtaSection;
  buttonLabels: ButtonLabels;
}

export interface ButtonLabels {
  learnMore: string;
  scheduleConsultation: string;
  getStartedToday: string;
}

export interface CtaSection {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface Overview {
  badgeText: string;
  heading: string;
  description: string;
}

export interface WhyChooseSection {
  heading: string;
  description: string;
  benefits: Benefit[];
  buttonText: string;
  buttonLink: string;
  image: Image;
}

export interface Benefit {
  id: string;
  text: string;
  icon: string;
}

export interface Image {
  src: string;
  alt: string;
}
