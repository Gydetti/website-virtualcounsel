export interface Homepage {
  heroSection: HeroSection;
  featuresSection: FeaturesSection;
  clientsSection: ClientsSection;
  testimonialsSection: SSection;
  problemPainSection: ProblemPainSection;
  solutionVisionSection: SolutionVisionSection;
  ctaSection: CtaSection;
  valuePropSection: ValuePropSection;
  pricingSection: PricingSection;
  homepageFaqSection: HomepageFAQSection;
  servicesPreviewSection: ServicesPreviewSection;
  blogPreviewSection: BlogPreviewSection;
  aboutSection: AboutSection;
  processSection: SSection;
  contactSection: ContactSection;
  kpiSection: KpiSection;
}

export interface AboutSection {
  badgeText: string;
  heading: string;
  paragraphs: string[];
  image: Image;
  variant: string;
  stats: AboutSectionStat[];
  cta: Cta;
  philosophy: Philosophy;
  learnMoreText: string;
  featureCards: FeatureCard[];
}

export interface Cta {
  text: string;
  href: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

export interface Image {
  src: string;
  alt: string;
}

export interface Philosophy {
  title: string;
  text: string;
}

export interface AboutSectionStat {
  id: string;
  value: string;
  label: string;
}

export interface BlogPreviewSection {
  badgeText: string;
  heading: string;
  subtitle: string;
  readMoreText: string;
  viewAllCta: Cta;
}

export interface ClientsSection {
  badgeText: string;
  heading: string;
  clients: Client[];
}

export interface Client {
  name: string;
  logo: Image;
}

export interface ContactSection {
  badgeText: string;
  heading: string;
  subtitle: string;
  formTitle: string;
  infoTitle: string;
  buttonLabels: ButtonLabels;
}

export interface ButtonLabels {
  default: string;
  submitting: string;
  success: string;
}

export interface CtaSection {
  badgeText: string;
  heading: string;
  description: string;
  primaryCta: Cta;
  secondaryCta: Cta;
}

export interface FeaturesSection {
  badgeText: string;
  heading: string;
  description: string;
  comparison: Comparison;
  cta: Cta;
}

export interface Comparison {
  without: With;
  with: With;
}

export interface With {
  title: string;
  items: any[];
}

export interface HeroSection {
  badgeText: string;
  headline: string;
  subheadline: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  showSecondaryCta: boolean;
  typingWords: string[];
  stats: HeroSectionStat[];
  image: Image;
  showHelpedStats: boolean;
  showOverlayStat: boolean;
  overlayTitle: string;
  overlayValue: string;
}

export interface HeroSectionStat {
  value: number;
  suffix: string;
  label: string;
  id?: string;
}

export interface HomepageFAQSection {
  badgeText: string;
  heading: string;
  description: string;
  categories: Category[];
}

export interface Category {
  category: string;
  questions: Question[];
}

export interface Question {
  question: string;
  answer: string;
}

export interface KpiSection {
  stats: HeroSectionStat[];
}

export interface PricingSection {
  badgeText: string;
  heading: string;
  description: string;
  popularBadgeText: string;
  cards: PricingSectionCard[];
}

export interface PricingSectionCard {
  id: string;
  title: string;
  price: string;
  features: string[];
  cta: Cta;
  popular: boolean;
}

export interface ProblemPainSection {
  badgeText: string;
  heading: string;
  description: string;
  calloutText: string;
  cards: StepElement[];
}

export interface StepElement {
  id: string;
  title: string;
  description: string;
  number?: string;
  icon?: string;
}

export interface SSection {
  badgeText: string;
  heading: string;
  subtitle: string;
  steps?: StepElement[];
  testimonials?: Testimonial[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  rating: number;
}

export interface ServicesPreviewSection {
  heading: string;
  description: string;
  viewAllCta: Cta;
  displayType: string;
}

export interface SolutionVisionSection {
  badgeText: string;
  heading: string;
  description: string;
  imagineTitle: string;
  benefits: string[];
  calloutText: string;
  calloutCta: Cta;
}

export interface ValuePropSection {
  badgeText: string;
  heading: string;
  subheading: string;
  benefits: StepElement[];
}
