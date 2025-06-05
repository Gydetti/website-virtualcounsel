// This is a utility file to simulate fetching data from an API or database
// In a real application, you would replace this with actual data fetching logic

import { z } from 'zod';

import { blogPostSchema } from './schemas/pages.schema';
import type { serviceItemSchema } from './schemas/sections.schema'; // Service items are often part of sections

// Type alias for inferred types for cleaner usage in function signatures
export type ServiceType = z.infer<typeof serviceItemSchema>;
export type BlogPostType = z.infer<typeof blogPostSchema>;

// Virtual Counsel services data
export const getServices = async (): Promise<ServiceType[]> => {
  const servicesData: ServiceType[] = [
    {
      id: 'service-1',
      title: 'Intellectuele eigendom bij software',
      description:
        'Bescherm uw softwarerechten juridisch waterdicht. Van IE-overdracht tot open source compliance, ik zorg dat u echt eigenaar bent van uw eigen creatie.',
      icon: 'Shield',
      features: [
        'Correcte overdracht van IE-rechten bij werknemers, freelancers en bureaus',
        'Veilige inzet van open source software',
        'Beoordeling en aanpassing van bestaande overeenkomsten',
        'Advies over optimale bedrijfsstructuur (holding/IE B.V.)',
        'Structuur waarmee je sterker staat bij investeringen of geschillen',
      ],
      popular: true,
      slug: 'intellectuele-eigendom-software',
    },
    {
      id: 'service-2',
      title: 'Contracten en algemene voorwaarden',
      description:
        'Juridische documenten die écht aansluiten bij uw werkwijze. Van agile development tot SaaS-modellen - geen generieke templates maar maatwerk.',
      icon: 'FileText',
      features: [
        'Contracten afgestemd op jouw businessmodel',
        'Heldere bepalingen over updates, support en aansprakelijkheid',
        'Juridisch sterk én praktisch toepasbaar',
        'Review en verbetering van bestaande documenten',
        'Specifiek voor agile, SaaS en IT-dienstverlening',
      ],
      popular: true,
      slug: 'contracten-algemene-voorwaarden',
    },
    {
      id: 'service-3',
      title: 'Beperking van aansprakelijkheid',
      description:
        "Beperk uw risico's op een juridisch verdedigbare manier. Ik zorg voor de juiste balans tussen commerciële belangen en juridische bescherming.",
      icon: 'ShieldCheck',
      features: [
        'Juridisch verdedigbare beperkingen van aansprakelijkheid',
        'Afspraken over directe en indirecte schade',
        'Heldere uitsluitingen (dataverlies, DDoS-aanvallen)',
        'Risicobeheersing bij bugs of onvoorziene omstandigheden',
        'Balans tussen professionaliteit en risicobeperking',
      ],
      popular: false,
      slug: 'beperking-aansprakelijkheid',
    },
    {
      id: 'service-4',
      title: 'Privacy en AVG compliance',
      description:
        'AVG-compliant werken zonder gedoe. Actuele verwerkersovereenkomsten, privacy policies en praktisch advies voor data-gedreven bedrijven.',
      icon: 'Lock',
      features: [
        "Actuele verwerkersovereenkomsten (DPA's)",
        'Duidelijke rolverdeling verwerker/verantwoordelijke',
        'Juridisch geldige grondslagen voor dataverzameling',
        'Compliant met toezichteisen en praktijk',
        'Privacy by design implementatie advies',
      ],
      popular: true,
      slug: 'privacy-avg-compliance',
    },
    {
      id: 'service-5',
      title: 'Distributeur en reseller overeenkomsten',
      description:
        'Schaal veilig op via partners. Heldere afspraken over merkgebruik, updates, support en aansprakelijkheid die uw positie beschermen.',
      icon: 'Users',
      features: [
        'Heldere afspraken over merkgebruik en IE-rechten',
        'Juridische bescherming van jouw positie en product',
        'Voorkomen van conflicten en reputatieschade',
        'White label en revenue sharing modellen',
        'Review van bestaande partnerafspraken',
      ],
      popular: false,
      slug: 'distributeur-reseller-overeenkomsten',
    },
    {
      id: 'service-6',
      title: 'Investeringsklaar worden',
      description:
        "Bereid u voor op due diligence. Ik breng juridische risico's in kaart en zorg dat uw documentatie investeerders overtuigt.",
      icon: 'TrendingUp',
      features: [
        "In kaart brengen van juridische risico's en gaten",
        'Overdracht IE-rechten van oprichters/freelancers',
        'Optimaliseren van contractstructuren',
        'Verhogen van investerings- en overnameklaarheid',
        'Data room voorbereiding en documentatie',
      ],
      popular: false,
      slug: 'investeringsklaar-worden',
    },
    {
      id: 'service-7',
      title: "Service Level Agreements (SLA's)",
      description:
        "Professionele SLA's die duidelijke verwachtingen scheppen. Juridisch sluitend, maar ook leesbaar en praktisch voor uw klanten.",
      icon: 'Clock',
      features: [
        'Heldere afspraken over responstijden en bereikbaarheid',
        'Vermindering van conflicten en claims',
        'Juridisch sluitend én klantgericht',
        'Professionalisering van dienstverlening',
        'Balans tussen ambitie en haalbaarheid',
      ],
      popular: false,
      slug: 'service-level-agreements',
    },
    {
      id: 'service-8',
      title: 'AI Act compliance',
      description:
        'Navigeer de nieuwe EU AI-regelgeving met vertrouwen. Van risicoclassificatie tot verplichte documentatie - ik help u compliant te innoveren.',
      icon: 'Cpu',
      features: [
        'Risicoclassificatie van AI-systemen',
        'Juridisch verplichte documentatie opstellen',
        'Check op bestaande contracten en datastromen',
        'Up-to-date met de laatste Europese regelgeving',
        'Praktische compliance zonder innovatie te remmen',
      ],
      popular: true,
      slug: 'ai-act-compliance',
    },
  ];
  return servicesData;
};

// Sample blog posts data
export const getBlogPosts = async (limit?: number): Promise<BlogPostType[]> => {
  const postsDataRaw = [
    {
      id: 'post-1',
      title: 'De 5 grootste juridische valkuilen voor SaaS-bedrijven',
      excerpt:
        'Vermijd kostbare fouten met deze essentiële juridische checklist voor SaaS-providers. Van licentiemodellen tot aansprakelijkheid.',
      date: '2025-04-15',
      category: 'SaaS & Licenties',
      coverImage: {
        src: '/images/placeholders/placeholder.svg',
        alt: 'Juridische valkuilen SaaS',
      },
      content: 'Volledige artikel inhoud over juridische valkuilen voor SaaS-bedrijven...',
      slug: 'juridische-valkuilen-saas-bedrijven',
      featured: true,
      author: {
        name: 'Maarten van Beek',
        image: { src: '/placeholder.svg', alt: 'Maarten van Beek' },
      },
      seo: { title: 'De 5 grootste juridische valkuilen voor SaaS-bedrijven | VirtualCounsel' },
    },
    {
      id: 'post-2',
      title: 'Open source software in commerciële producten: wat mag wel en niet?',
      excerpt:
        'Een praktische gids over het gebruik van open source componenten in uw software. GPL, MIT, Apache - wat betekenen deze licenties voor u?',
      date: '2025-03-28',
      category: 'Intellectueel Eigendom',
      coverImage: {
        src: '/images/placeholders/placeholder.svg',
        alt: 'Open source licenties',
      },
      content: 'Volledige artikel over open source licenties en commercieel gebruik...',
      slug: 'open-source-software-commerciele-producten',
    },
    {
      id: 'post-3',
      title: 'Verwerkersovereenkomst voor IT-bedrijven: een praktische aanpak',
      excerpt:
        "Alles wat u moet weten over verwerkersovereenkomsten (DPA's) voor IT-dienstverleners. Inclusief concrete voorbeelden en valkuilen.",
      date: '2025-03-10',
      category: 'Privacy & AVG',
      coverImage: {
        src: '/images/placeholders/placeholder.svg',
        alt: 'Verwerkersovereenkomst IT',
      },
      content: 'Artikel over verwerkersovereenkomsten voor IT-bedrijven...',
      slug: 'verwerkersovereenkomst-it-bedrijven-praktisch',
    },
    {
      id: 'post-4',
      title: 'Aansprakelijkheid beperken in software contracten: zo doet u het goed',
      excerpt:
        'Effectieve aansprakelijkheidsbeperking die stand houdt in de rechtszaal. Specifiek voor software- en IT-dienstverleners.',
      date: '2025-02-22',
      category: 'Contracten',
      coverImage: {
        src: '/images/placeholders/placeholder.svg',
        alt: 'Aansprakelijkheid software',
      },
      content: 'Artikel over aansprakelijkheidsbeperking in software contracten...',
      slug: 'aansprakelijkheid-beperken-software-contracten',
    },
    {
      id: 'post-5',
      title: 'AI Act compliance checklist voor software ontwikkelaars',
      excerpt:
        'De EU AI Act komt eraan. Is uw software met AI-componenten klaar? Praktische checklist voor ontwikkelaars en product owners.',
      date: '2025-02-05',
      category: 'AI & Compliance',
      coverImage: {
        src: '/images/placeholders/placeholder.svg',
        alt: 'AI Act compliance',
      },
      content: 'Artikel over AI Act compliance voor software ontwikkelaars...',
      slug: 'ai-act-compliance-checklist-software',
    },
    {
      id: 'post-6',
      title: 'Due diligence voorbereiding: juridische documenten voor tech funding',
      excerpt:
        'Welke juridische documenten heeft u nodig voor een investeringsronde? Complete checklist voor tech-startups en scale-ups.',
      date: '2025-01-18',
      category: 'Investeringen',
      coverImage: {
        src: '/images/placeholders/placeholder.svg',
        alt: 'Due diligence tech',
      },
      content: 'Artikel over juridische voorbereiding voor funding rondes...',
      slug: 'due-diligence-juridische-documenten-tech-funding',
    },
  ];

  const postsDataForValidation = postsDataRaw.map(post => ({
    ...post,
    author: post.author || {
      name: 'Maarten van Beek',
      image: { src: '/placeholder.svg', alt: 'Maarten van Beek' },
    },
    seo: post.seo || { title: post.title },
  }));

  const validatedPosts = z.array(blogPostSchema).parse(postsDataForValidation);

  // Convert Date to ISO string and alias coverImage to image for BlogSection
  const postsWithImage = validatedPosts.map(post => ({
    ...post,
    date: post.date,
    image: post.coverImage,
  }));

  if (limit) {
    return postsWithImage.slice(0, limit);
  }

  return postsWithImage;
};

// Get a single service by slug
export const getServiceBySlug = async (slug: string): Promise<ServiceType | undefined> => {
  const services = await getServices();
  return services.find(service => service.slug === slug);
};

// Get a single blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPostType | undefined> => {
  const posts = await getBlogPosts();
  return posts.find(post => post.slug === slug);
};
