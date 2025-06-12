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
      popular: false,
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
      title: 'Algemene voorwaarden voor Software as a Service (SaaS): de checklist',
      excerpt:
        'Net als softwareontwikkelaars dienen ook SaaS-leveranciers algemene voorwaarden toe te voegen aan contracten met opdrachtgevers. Wat zijn de gebruikslimieten van uw dienst? Wat is de beschikbaarheid ervan? Wie is de eigenaar en wie is aansprakelijk wanneer er zich problemen voordoen? Die vragen beantwoordt u in uw algemene voorwaarden.',
      date: '2024-12-15',
      category: 'SaaS & Contracten',
      coverImage: {
        src: '/images/blog/saas.webp',
        alt: 'Algemene voorwaarden SaaS',
      },
      content: `**Algemene voorwaarden voor SaaS**

Algemene voorwaarden toevoegen aan contracten is belangrijk voor SaaS-leveranciers. Deze voorwaarden worden van toepassing verklaard op de overeenkomst die wordt aangegaan met de klant die de SaaS-dienst afneemt. De SaaS-leverancier wordt aan de hand van deze voorwaarden beschermd voor juridische risico's.

**Gebruikslimiet van de SaaS-dienst**

De opslagruimte die de klant krijgt voor het gebruik van de SaaS-dienst kan onbeperkt zijn. Toch kan het wel wenselijk zijn om als SaaS-leverancier hier een limiet op te zetten. Deze limiet kan inhouden dat er gewerkt wordt met het zogenaamde 'fair use' principe. Volgens dit principe mag de klant geen overdadig gebruik maken van de SaaS-dienst. Er is sprake van excessief gebruik wanneer een klant meer dan drie keer de hoeveelheid opslagcapaciteit gebruikt in vergelijking met andere klanten.

**Beschikbaarheid van de SaaS-dienst**

Er is niks zo frustrerend als een SaaS-dienst die niet beschikbaar is voor de klant. Door (natuur)rampen of onvoorziene omstandigheden kan het dat een SaaS-dienst tijdelijk niet beschikbaar is. Klanten verlangen daarom vaak dat de SaaS-leverancier een bepaalde mate van beschikbaarheid garandeert. De SaaS-leverancier heeft hierbij de volgende opties:

1. Er wordt gekozen voor een inspanningsverplichting waarbij de SaaS-leverancier zich zal inspannen om de gewenste beschikbaarheid te halen.

2. U kiest voor een resultaatsverplichting waarbij de SaaS-leverancier de gewenste beschikbaarheid zal nakomen.

3. U biedt de optie om een garantie af te geven voor de gewenste beschikbaarheid. Dit betekent dat de SaaS-leverancier de beschikbaarheid moet nakomen ook in het geval er sprake is van overmacht.

Afhankelijk van de SaaS-dienst besluit de leverancier welke optie het best past. VirtualCounsel ondersteunt u bij het kiezen van de beste optie. Deze neemt u vervolgens duidelijk op in de algemene voorwaarden.

**Data en de intellectuele eigendomsrechten van de SaaS-dienst**

Via een SaaS-dienst wordt data van klanten opgeslagen. Dit is vaak gevoelige en waardevolle informatie die ten alle tijde geheim dient te blijven. Hoewel het juridische eigendom van 'data' niet bestaat, is het toch aan te raden om in de algemene voorwaarden van de SaaS-leverancier op te nemen dat deze opgeslagen data van de klant eigendom blijft van diezelfde klant. Alle andere toepasselijke relevante intellectuele eigendomsrechten van een SaaS-dienst blijven doorgaans van de SaaS-leverancier.

**Aansprakelijkheid van de SaaS-leverancier**

Een SaaS-leverancier kan niet het juridische risico nemen dat alle klanten de SaaS-leverancier onbeperkt aansprakelijk stellen in het geval van opgelopen schade zoals gelekte of verloren data. VirtualCounsel adviseert om de aansprakelijkheid van de SaaS-leverancier te beperken in de algemene voorwaarden. Zo kan u opnemen dat de SaaS-leverancier aansprakelijk is voor de (directe) schade tot het factuurbedrag wat er jaarlijks wordt betaald door de klant of tot het bedrag wat de verzekeraar van de SaaS-leverancier uitkeert. Op deze manier blijft de aansprakelijkheid van de SaaS-leverancier beperkt.

**Vink de checklist af!**

Door de voorgaande onderwerpen af te vinken bij het opstellen van de algemene voorwaarden worden de juridische risico's voor de SaaS-leverancier beperkt. Elk onderdeel dient duidelijk en gedetailleerd opgenomen te worden in de algemene voorwaarden die toegevoegd worden aan een overeenkomst. De SaaS-leverancier is hierdoor beschermd en iedereen kent de afspraken.

**Stel uw algemene voorwaarden op met behulp van een professional**

Er zijn nog heel wat andere onderwerpen die moeten worden opgenomen in de algemene voorwaarden van SaaS-leveranciers. Bovenstaande tips helpen u alvast goed op weg. Neem contact op met VirtualCounsel om ondersteuning te krijgen bij het opstellen van algemene voorwaarden voor SaaS-leveranciers.`,
      slug: 'voorwaarden-saas',
      featured: true,
      author: {
        name: 'Maarten van Beek',
        image: { src: '/placeholder.svg', alt: 'Maarten van Beek' },
      },
      seo: {
        title:
          'Algemene voorwaarden voor Software as a Service (SaaS): de checklist | VirtualCounsel',
      },
    },
    {
      id: 'post-2',
      title: 'Van software start-up naar scale-up: juridische vereisten',
      excerpt:
        'Bij de transitie van een start-up naar een scale-up van een softwarebedrijf dient u ook rekening te houden met verschillende juridische zaken. Denk aan op maat gemaakte juridische documenten, intellectuele eigendomsrechten en het waarborgen van continuïteit.',
      date: '2024-11-28',
      category: 'Startups & Scale-ups',
      coverImage: {
        src: '/images/blog/startup.webp',
        alt: 'Software startup scale-up',
      },
      content: `**Op maat gemaakte juridische documenten**

In de start-up fase worden vaak templates gebruikt om algemene voorwaarden en overeenkomsten op te stellen zonder dat hierbij juridisch advies wordt ingewonnen. Dit kan voor onduidelijkheden en problemen zorgen. Juridische documenten sluiten vaak niet helemaal aan op de dienst die wordt geleverd. Potentiële klanten kunnen tijdens juridische onderhandelingen met opmerkingen komen over voorwaarden zoals de ondersteuning bij het aanvragen van domeinnamen en SSL-certificaten, terwijl de SaaS-leverancier deze diensten misschien helemaal niet levert bij het beschikbaar stellen van de SaaS-dienst. Het is aan te raden dat een jurist de nodige juridische documenten opstelt. Hij of zij kan ervoor zorgen dat de dienst en de juridische documenten op elkaar aansluiten. Dit voorkomt een hoop gedoe en onduidelijkheden als een nieuwe klant moet worden aangesloten.

**Intellectueel eigendom op de software**

Zorg ervoor dat het altijd duidelijk is wie de eigenaar is van de software. Het kan zijn dat een deel van de software of code in handen is van de softwareontwikkelaar en een deel in handen van de opdrachtgever. Zet dit duidelijk op papier. Zo weet u wie verantwoordelijk is voor wat wanneer u een nieuwe investeerder aantrekt of uw bedrijf gaat groeien. U neemt in contracten op wie de eigenaar is van wat en welke bescherming van toepassing is met betrekking tot de intellectuele eigendomsrechten. Het gaat dan vooral om de auteursrechten die rusten op de broncode van de software. Zorg ervoor dat deze documenten volledig zijn en vraag hulp van een expert. Bepaalde afspraken of contracten mogen zeker niet ontbreken. Het komt vaak voor dat contracten met externe ontwikkelaars niet de juiste afspraken bevatten om het auteursrecht over te dragen.

**De continuïteit van de software**

Wat gebeurt er als uw onderneming failliet gaat of wordt overgenomen door een derde partij? Kan uw klant dan nog steeds gebruik maken van de software en de bijbehorende data of gaat alles op zwart? Als softwareleverancier wilt u goed zorgen voor al uw klanten. We raden aan om continuïteit te waarborgen. Hiermee kan een softwareleverancier zich onderscheiden. Bovendien wekt dit vertrouwen bij (nieuwe) klanten.

Wanneer de softwareleverancier 'on premise' levert, oftewel de software draait op de servers van de klant, dan kan ervoor worden gekozen een escrowregeling op te zetten waarbij de escrow-agent de broncode bewaart en uitgeeft bij een faillissement. Mocht de softwareleverancier zijn dienst leveren in de vorm van Software as a Service (SaaS) dan kan een continuïteitsregeling worden opgezet waarbij een stichting de dienst voor een bepaalde periode levert aan de klanten bij een faillissement van de softwareleverancier.

**Kies voor een vlekkeloze scale up**

Het is duidelijk dat er heel wat juridische zaken komen kijken bij het opzetten van een software start-up. Laat staan bij het uitgroeien tot een scale up. Zorg ervoor dat uw juridische zaken steeds op orde zijn en vraag hulp van experts. VirtualCounsel ondersteunt u bij de vlekkeloze groei van uw bedrijf.`,
      slug: 'software-startup',
    },
    {
      id: 'post-3',
      title: 'Wat u moet weten over gebruiksvoorwaarden van apps',
      excerpt:
        'Tegenwoordig kent bijna elke app gebruiksvoorwaarden, regels waaraan gebruikers van de app zich dienen te houden. Hoe begint u aan het opstellen van gebruiksvoorwaarden voor uw app? En wat mag u zeker niet vergeten?',
      date: '2024-11-10',
      category: 'Apps & Gebruiksrecht',
      coverImage: {
        src: '/images/blog/Gebruikersvoorwaardensoftwaredienst.webp',
        alt: 'Gebruiksvoorwaarden apps',
      },
      content: `**Hoe komt de overeenkomst tot stand via de app of website?**

Eerst en vooral neemt u in de gebruiksvoorwaarden op hoe de overeenkomst met de gebruiker tot stand komt. Het moment waarop de overeenkomst tot stand komt, kan voor elke app anders zijn. Is dat het moment waarop de gebruiker zich registreert op uw website of app? Of gaat de overeenkomst in op het moment dat de gebruiker daadwerkelijk gebruik maakt van de app. We adviseren dit zo duidelijk en gedetailleerd mogelijk op te nemen in uw gebruiksvoorwaarden.

Wanneer het nodig is om een gebruikersnaam en wachtwoord te kiezen voor het gebruik van de app, raden we u aan om ook dit duidelijk te communiceren in de voorwaarden. Verder, dient u aan te geven dat het de verantwoordelijkheid is van de gebruiker om zijn of haar gegevens geheim te houden.

**De inhoud van de gebruiksvoorwaarden**

Vervolgens zijn er regels die van toepassing zijn op het gebruik van uw website of app. Ook deze neemt u op in de gebruiksvoorwaarden. Dit omvat acties of handelingen die al dan niet toegestaan zijn op de app zoals het plaatsen van openbare berichten en het delen ervan met andere gebruikers. Andere gebruiksregels die u in de gebruiksvoorwaarden kunt opnemen zijn een verbod op een inbreuk van intellectuele eigendomsrechten, het verlenen van toegang tot de app of website aan derden en het uitgeven van een sub-licentie.

**Diensten van derden**

Vandaag is alles online en aan elkaar gelinkt. Het kan dan ook goed zijn dat uw app of website koppelingen of links bevat naar diensten van derden. We adviseren ook dit op te nemen in uw gebruiksvoorwaarden. Vaak heeft de gebruiker zelf de mogelijkheid om te kiezen of hij of zij wil gebruikmaken van diensten van derden. U dient duidelijk te maken in uw voorwaarden voor welke diensten of promoties u of uw bedrijf verantwoordelijk zijn en welke onder de verantwoordelijkheid van de derde partij vallen. Tenslotte maakt u duidelijk dat de aanvullende gebruiksvoorwaarden van derden van toepassing kunnen zijn.

**Notice-and-takedown op basis van de gebruikersvoorwaarden**

Wanneer gebruiksvoorwaarden geschonden worden door een gebruiker, wilt u als eigenaar van de website of app de bevoegdheid hebben om in te grijpen. Dit neemt u op in de notice-and-takedown procedure. Hierin omschrijft u wanneer en hoe u kunt ingrijpen.

Een gebruiker dient een gemotiveerde reactie te geven op het moment hij of zij een notificatie krijgt dat hij of zij de gebruiksregels geschonden heeft. Vervolgens dient u als eigenaar de bevoegdheid te hebben om iemand die de gebruiksvoorwaarden schendt te kunnen blokkeren of hem of haar de toegang tot de app of website te kunnen ontzeggen.

**Stel uw gebruiksvoorwaarden op**

Gebruikersvoorwaarden komen steeds meer voor aangezien er ook steeds meer gebruik wordt gemaakt van verschillende websites en apps. Het blijft voor dit type voorwaarden belangrijk dat de gebruiker op de hoogte is van wat er wel of niet toegestaan is en voor wat de eigenaar van de app al dan niet verantwoordelijk is. Het is dus belangrijk dat uw gebruiksvoorwaarden volledig en duidelijk zijn. Neem contact op met VirtualCounsel om ondersteuning te krijgen bij het opstellen van uw gebruiksvoorwaarden.`,
      slug: 'gebruikersvoorwaarden-van-apps',
    },
    {
      id: 'post-4',
      title: 'Drie tips bij het opstellen van licentieovereenkomsten voor software',
      excerpt:
        'Het goed en duidelijk opstellen van een licentie is belangrijk om problemen te vermijden. Zorg ervoor dat uw licentie volledig is en u achteraf geen spijt hebt dat u iets vergeten bent.',
      date: '2024-10-22',
      category: 'Licenties & Software',
      coverImage: {
        src: '/images/blog/Softwareontwikkelingovereenkomstagilescrum.webp',
        alt: 'Software licentieovereenkomsten',
      },
      content: `**Tip 1: Soorten licenties**

Bij elke soort situatie hoort een andere type licentie. Niet alle softwareprogramma's hebben dezelfde licentie nodig. Dat lijkt logisch. Het is belangrijk dat u weet welke soort licentie u nodig heeft voor uw situatie.

Een eerste onderverdeling in licenties wordt gemaakt aan de hand van het aantal gebruikers van de software. Het kan zijn dat er steeds slechts één account nodig is voor uw software voor een bepaald bedrijf. Daarnaast is het ook mogelijk dat er meerdere accounts dienen aangemaakt te worden per bedrijf of dat er meerdere personen binnen het bedrijf van de klant gebruikmaken van de software. Dit dient u op te nemen in uw licentie.

U kan ook beperkingen opleggen van het aantal personen, accounts of apparaten dat kan inloggen op uw software. Maak duidelijk in de licentieovereenkomst wat de exacte situatie is waaraan uw klant en u zich binden. Verder is het aan te raden om op te nemen dat de klant verantwoordelijk is voor handelen en nalaten van de gebruikers. Hiervoor dient de klant de softwareleverancier vrij te waren.

Afhankelijk van uw software en hoe bedrijven deze zullen gebruiken zal de licentie anders ingevuld worden. VirtualCounsel helpt jue bij het bepalen van wat de beste licentiesoort is voor u en uw klant.

**Tip 2: Licentieverplichtingen naar de klant toe**

Om te hoge kosten voor uw klant te voorkomen moet u rekening houden met bepaalde (lange termijn) situaties ten opzichte van uw klant. We geven een voorbeeld. Het aanbieden en leveren van software zoals een Software as a Service (SaaS)-dienst houdt meestal in dat de SaaS-dienst op dezelfde wijze wordt geleverd aan alle klanten. Dit betekent dat een garantie afgeven voor de beschikbaarheid van de SaaS-dienst met een bijbehorende compensatie behoorlijk wat kosten met zich kan meebrengen op het moment dat de gegarandeerde beschikbaarheid niet gehaald wordt.

Aan de hand van alternatieven kunnen dergelijke situaties opgelost worden. Er kunnen inspanningsverplichtingen in de software licentieovereenkomst zonder recht op compensatie worden opgenomen. Voor de klanten die wel degelijk een garantie willen kan dan een Service Level Agreement (SLA) gesloten worden. In de SLA neemt u de garanties met bijbehorende compensaties op. De klant betaalt een meerprijs voor de garantie en dus de SLA.

**Tip 3: Eigenaar van de data**

De data die is opgeslagen in de software of SaaS-dienst is vaak in eigendom van de klant. Dat moet dan ook duidelijk worden gemaakt in de licentieovereenkomst. Wel geven wij de tip dat het de softwareleverancier toegestaan wordt om anonieme of geaggregeerde data gebruiken om analyses uit te voeren die kunnen helpen bij het verbeteren van de software of de SaaS-dienst.

**Stel uw licentie op met behulp van een professional**

Er zijn nog heel wat andere onderwerpen die aanbod komen in een software licentieovereenkomst. Een licentie moet verschillende onderdelen bevatten. Bovenstaande tips helpen u alvast goed op weg. Neem contact op met VirtualCounsel om ondersteuning te krijgen bij het opstellen bij een licentieovereenkomst.`,
      slug: 'drie-tips-software',
    },
    {
      id: 'post-5',
      title:
        'Vier onderdelen die niet mogen ontbreken in de algemene voorwaarden van een softwareontwikkelaar',
      excerpt:
        'Eigen algemene voorwaarden hanteren als softwareontwikkelaar is een must. Zo wordt het duidelijk wat een klant van u mag verwachten maar u beschermt ook uzelf en uw bedrijf ermee.',
      date: '2024-10-05',
      category: 'Softwareontwikkeling',
      coverImage: {
        src: '/images/blog/avsoftware.webp',
        alt: 'Algemene voorwaarden softwareontwikkelaar',
      },
      content: `**De algemene voorwaarden (Terms and Conditions)**

De terms and conditions of algemene voorwaarden zijn van toepassing op de overeenkomst die gesloten wordt tussen een softwareontwikkelaar en de opdrachtgever. De algemene voorwaarden zorgen ervoor dat mogelijke relevante juridische risico's die spelen bij de dienstverlening van de softwareontwikkelaar zijn afgedekt. Dit beschermt de softwareontwikkelaar wanneer het ontwikkelproces vertraging oploopt of de software niet gebruikt waarvoor het bedoeld is.

**1. Betaling voor de softwareontwikkeling**

Niet onbelangrijk zijn de voorwaarden over hoe en wanneer de opdrachtgever de softwareontwikkelaar moet betalen. Dit wordt opgenomen in het contract en staat ook in de voorwaarden. Het kan goed zijn dat een opdrachtgever in verschillende termijnen moet betalen aangezien de ontwikkeling ook vaak in verschillende fases gebeurt. In andere gevallen wordt er in één keer of op voorhand (deels) betaald. Bij het aanleveren van hostingpakketten of de registratie van een domeinnaam is het aan te raden om de opdrachtgever vooraf te laten betalen. Dit neemt u zo op in de algemene voorwaarden.

**2. Hoeveelheid en omvang van de softwareontwikkeling**

In de algemene voorwaarden neemt u op wat de omvang is van de opdracht. Wat wordt er wel en wat wordt niet ontwikkeld? Het is vaak moeilijk in te schatten hoeveel uur u precies nodig zult hebben om de software te ontwikkelen. Er kunnen zich bijvoorbeeld onvoorziene omstandigheden voordoen. Hoe hiermee om te gaan moet u vastleggen in de algemene voorwaarden. Zo bent u beschermd indien het aantal afgesproken uren overschreden wordt. Dit noemen we "meerwerk". U kan ook beperkingen opleggen van het aantal personen, accounts of apparaten dat kan inloggen op uw software. Maak duidelijk in de licentieovereenkomst wat de exacte situatie is waaraan uw klant en u zich binden. Verder is het aan te raden om op te nemen dat de klant verantwoordelijk is voor handelen en nalaten van de gebruikers. Hiervoor dient de klant de softwareleverancier vrij te waren.

Neem op tegen welk tarief dit meerwerk zal worden uitgevoerd. Denk ook aan onder welke voorwaarden de klant hiervoor dient te betalen en in welke gevallen de softwareontwikkelaar een tegemoetkoming doet. Het kan ook zijn dat u ervoor kiest om in bepaalde omstandigheden te opteren voor een aparte overeenkomst.

**3. Intellectuele eigendomsrechten van de software**

Wie is de eigenaar van de software? Dat is vaak een veel betwiste vraag. Om onduidelijkheden te vermijden en moeilijkheden te voorkomen is het belangrijk dat zeer uitgebreid op te nemen in uw algemene voorwaarden. De software op maat wordt in de meeste gevallen overgedragen aan de opdrachtgever. De opdrachtgever is dan de eigenaar en de verantwoordelijke voor de nieuwe app of software. Neem duidelijk en gedetailleerd op in de algemene voorwaarden wie de eigenaar is van welke (brond)code.

Wanneer u software overdraagt naar een nieuwe eigenaar dient dit steeds te gebeuren aan de hand van een overeenkomst. Deze dient getekend te worden door beide partijen, de softwareontwikkelaar en de nieuwe eigenaar. Indien er gebruikt gemaakt wordt van een standaardcode blijft deze in de meeste gevallen eigendom van de softwareontwikkelaar. Schrijf dus uit welk deel van de uiteindelijke broncode standaardcode is. Zo voorkomt u twijfels en discussies achteraf over eigendomsrechten.

**4. Acceptatietest en oplevering van de software**

Nieuwe software dient vaak goed getest te worden in verschillende fases. De softwareontwikkelaar test deze zelf maar vaak wil ook de opdrachtgever de nieuwe software of app uittesten.

De opdrachtgever wil vaak de bevoegdheid om tijdens het ontwikkelproces de software goed te keuren of af te wijzen. Dat is niet meer dan normaal aangezien de opdrachtgever betaalt voor de software en waarschijnlijk ook de eigenaar wordt.

We adviseren om op te nemen in de algemene voorwaarden wanneer en tot wanneer de nieuwe software of app getest kan worden. Is de termijn verstreken? Dan wordt de software automatisch goedgekeurd. Vervolgens dient u ook aan te geven welke termijn er nodig is om mogelijke fouten te herstellen.

**Het opstellen van algemene voorwaarden**

Door bovenstaande onderwerpen op te nemen in de algemene voorwaarden bij softwareontwikkeling kunt u juridische risico's, twijfels en discussies vermijden. De risico's voor de softwareontwikkelaar zijn beperkt indien er duidelijke voorwaarden worden toegevoegd aan een overeenkomst met een opdrachtgever. Het is verder aan te raden dat er expliciet aan de opdrachtgever duidelijk wordt gemaakt dat de terms and conditions van de softwareontwikkelaar van toepassing zijn op de overeenkomst.

**Stel uw algemene voorwaarden op met behulp van een professional**

Er zijn nog heel wat andere onderwerpen die moeten worden opgenomen in de algemene voorwaarden van softwareontwikkelaars. Bovenstaande tips helpen u alvast goed op weg. Neem contact op met VirtualCounsel om ondersteuning te krijgen bij het opstellen van algemene voorwaarden voor softwareontwikkelaars.`,
      slug: 'av-softwareontwikkelaar',
    },
  ];

  const postsDataForValidation = postsDataRaw.map(post => ({
    ...post,
    author: post.author || {
      name: 'Maarten van Beek',
      image: { src: '/images/team/maarten-klein-profile.webp', alt: 'Maarten van Beek' },
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
