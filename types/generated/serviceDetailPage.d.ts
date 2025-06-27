export interface ServiceDetailPage {
  default: Default;
  services: Services;
}

export interface Default {
  benefitsSection: BenefitsSection;
  faqSection: FAQSection;
  testimonialsSection: TestimonialsSection;
  readyToStartCta: ReadyToStartCta;
  buttonLabels: ButtonLabels;
}

export interface BenefitsSection {
  heading: string;
  benefits: Benefit[];
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration?: string;
}

export interface ButtonLabels {
  consultation: string;
  scheduleConsultation: string;
  getStarted: string;
}

export interface FAQSection {
  heading: string;
  items: Item[];
}

export interface Item {
  question: string;
  answer: string;
}

export interface ReadyToStartCta {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface TestimonialsSection {
  heading: string;
  testimonials: Testimonial[];
}

export interface Testimonial {
  id: ID;
  quote: string;
  author: Author;
  company: Company;
}

export enum Author {
  IvarVanDuuren = 'Ivar van Duuren',
  JoeyDeckers = 'Joey Deckers',
  JoramVanDoorn = 'Joram van Doorn',
}

export enum Company {
  CoFounderISOPlanner = 'Co-founder ISOPlanner',
  FounderRetrii = 'Founder Retrii',
  FounderSiteOnline = 'Founder SiteOnline',
}

export enum ID {
  TestimonialIvar = 'testimonial-ivar',
  TestimonialJoey = 'testimonial-joey',
  TestimonialJoram = 'testimonial-joram',
}

export interface Services {
  'intellectuele-eigendom-software': BeperkingAansprakelijkheid;
  'contracten-algemene-voorwaarden': BeperkingAansprakelijkheid;
  'beperking-aansprakelijkheid': BeperkingAansprakelijkheid;
  'privacy-avg-compliance': BeperkingAansprakelijkheid;
  'distributeur-reseller-overeenkomsten': BeperkingAansprakelijkheid;
  'investeringsklaar-worden': BeperkingAansprakelijkheid;
  'service-level-agreements': BeperkingAansprakelijkheid;
  'ai-act-compliance': AIActCompliance;
}

export interface AIActCompliance {
  targetAudience: string[];
  problemSection: ProblemSection;
  features: Benefit[];
}

export interface ProblemSection {
  heading: string;
  mainProblemStatement: string;
  problems: Problem[];
}

export interface Problem {
  title: string;
  description: string;
  impact: string;
}

export interface BeperkingAansprakelijkheid {
  targetAudience: string[];
  problemSection: ProblemSection;
  features: Benefit[];
  processSteps: Benefit[];
  uniqueValue: UniqueValue;
  benefitsSection: BenefitsSection;
  faqSection: FAQSection;
  testimonialsSection: TestimonialsSection;
  readyToStartCta: ReadyToStartCta;
  buttonLabels: ButtonLabels;
}

export interface UniqueValue {
  heading: string;
  statement: string;
  differentiators: Differentiator[];
  highlight: string;
}

export interface Differentiator {
  title: string;
  description: string;
}
