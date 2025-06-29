# Handleiding: Robuuste Content Refactor & Decap CMS Integratie voor Next.js

**Doel:**
Een stabiele, schaalbare workflow creëren om de datalaag van de applicatie los te koppelen, types te genereren, componenten aan te passen en uiteindelijk Decap CMS te integreren in een Next.js-project zonder herhaling van eerder gemaakte fouten.

## Overzicht van de fasen
1. **Fase 1: Data-extractie & Typegeneratie**
2. **Fase 2: Bridge-modules**
3. **Fase 3: Componentaanpassingen & Type Guards**
4. **Fase 4: Finale afronding & Pre-implementatie-verificatie**
5. **Fase 5: Decap CMS Implementatie & Troubleshooting**

---

## Fase 1: Data-extractie & Typegeneratie

1. Branch aanmaken:
   ```bash
   git checkout -b cms-staged
   ```
2. JSON-mappenstructuur:
   - Maak `lib/content/` aan
   - Voor elke `lib/data/*.ts`: converteer de *pure* data-export naar één JSON-bestand in `lib/content/` (verwijder logica, imports)
3. Typegeneratie met QuickType:
   - Voeg in `package.json` scripts toe:
     ```json
     "scripts": {
       "gen:types:homepage": "quicktype -s json lib/content/homepage.json -o types/generated/homepage.d.ts --top-level Homepage --lang ts --just-types",
       "gen:types": "npm-run-all gen:types:*"
     }
     ```
   - Genereer alle types:
     ```bash
     npm run gen:types
     ```
4. Verifiëren:
   ```bash
   npm run verify:local
   ```
   - **Tip:** Vervang in gegenereerde types `any` door `unknown` of specifieker type om lint-warnings te vermijden.

---

## Fase 2: Bridge-modules

Doel: alle `lib/data/*.ts` laten verwijzen naar JSON in plaats van hardcoded data.

Per bestand (voorbeeld `lib/data/homepage.ts`):
```typescript
import 'server-only';
import homepageContent from '@/lib/content/homepage.json';
import type { Homepage } from '@/types/generated/homepage.d.ts';

export const homepageData: Homepage = homepageContent as Homepage;
```

**Belangrijke les:**
- Gebruik `server-only` voor data-only modules
- Gebruik `as Type` om QuickType-structuur strikt te forceren
- Na elk bestand: direct `npm run verify:local` uitvoeren en committen als groen

---

## Fase 3: Componentaanpassingen & Type Guards

Componenten die data consumeren, zullen type mismatches geven:

1. **Mismatch Zod vs QuickType**
   - Valideer data in de bridge-module met Zod:
     ```typescript
     import resourcesContent from '@/lib/content/resources.json';
     import { z } from 'zod';
     import { resourceSchema } from '@/lib/schemas/contentBlocks.schema';

     const parsed = z.array(resourceSchema).parse(resourcesContent);
     export const getResources = () => parsed;
     ```

2. **Property-bestaat-niet**
   - Gebruik guards:
     ```tsx
     {'processSteps' in serviceDetail && serviceDetail.processSteps && (
       <ServiceProcessSection steps={serviceDetail.processSteps} />
     )}
     ```

3. **Slug-casten**
   - `slug as keyof Services`

Na elke fix: `npm run verify:local` + commit

---

## Fase 4: Finale afronding & Pre-implementatie-verificatie

1. Volledige verificatie:
   ```bash
   npm run verify:local
   ```
   - Build moet slagen
   - `npm run format:check` mag **geen** verschillen tonen
   - `npm run lint -- --fix` mag **geen** errors/warnings achterlaten
   - E2E/API/tests moeten groen zijn

2. Merge en rebase verso main als alle checks groen zijn

---

## Fase 5: Decap CMS Implementatie & Troubleshooting

### 5.1 Installatie en Basisconfiguratie

```bash
npm install decap-cms-app
```

#### A. Static Admin UI verwijderen (oude approach)
- Verwijder `public/admin/index.html` en `public/admin/config.yml`

#### B. Next.js Route Setup (`app/admin`)

1. **Server Component:** `app/admin/page.tsx`
   ```tsx
   import dynamic from 'next/dynamic';

   const AdminClient = dynamic(
     () => import('./AdminClient'),
     { ssr: false }
   );

   export const metadata = { title: 'CMS Admin' };

   export default function AdminPage() {
     return <AdminClient />;
   }
   ```

2. **Client Component:** `app/admin/AdminClient.tsx`
   ```tsx
   'use client';
   import { CMS } from 'decap-cms-app';
   import config from '@/lib/cms/config';

   export default function AdminClient() {
     return (
       <CMS
         config={config}
         // Optioneel: customize editor
       />
     );
   }
   ```

3. **TypeScript Config:**
   - Maak `lib/cms/config.ts`:
     ```ts
     import type { CmsConfig } from 'decap-cms-app';
     export const config: CmsConfig = {
       backend: { name: 'git-gateway', branch: 'main' },
       media_folder: 'public/images/uploads',
       public_folder: '/images/uploads',
       collections: [
         {
           name: 'homepage',
           label: 'Homepage',
           file: 'lib/content/homepage.json',
           fields: [
             { name: 'title', label: 'Titel', widget: 'string' },
             { name: 'heroImage', label: 'Hero Afbeelding', widget: 'image' }
             // Minimaal 1 field per collectie vereist!
           ],
         },
         // Voeg hier alle andere collections toe, altijd minimaal één veld!
       ],
     };
     export default config;
     ```

**Let op:**
- **Validation Error** `fields must NOT have fewer than 1 items`: definieer nooit een lege `fields: []`
- **React versie conflicts**: importeer `decap-cms-app` via npm, niet via `<script>` tag
- **Metadata export**: definieer in Server Component, NIET in Client Component

### 5.2 Netlify Identity & Git Gateway

1. In Netlify-dashboard:
   - **Enable Identity** → **Enable Git Gateway**
   - Maak rollen (`editor`, `author`) met schrijfrechten
   - **Invite Users** of **Enable registration**

2. Test login op `/admin`

### 5.3 Vercel Auto-Deploy

- Push naar `main`. Vercel bouwt & deployed automatisch.
- CMS-commits uit Netlify Git Gateway triggeren nieuwe deploys.

### 5.4 Styling & Branding via CMS

- Voeg extra velden in `config.ts` voor kleuren, lettertypes:
  ```yaml
  - label: 'Primaire kleur'
    name: 'theme.primaryColor'
    widget: 'color'
  ```

### 5.5 Troubleshooting Veelvoorkomende Fouten

- **Prettier / format:check**:
  ```bash
  npm run format:check
  npm run lint -- --fix
  ```
- **Build errors**:
  - Controleer `fields` in config
  - Verwijder oude `public/admin` files
- **React internals errors**:
  - Verzeker dynamische import met `{ ssr: false }`
- **TypeScript- of Schemaproblemen**:
  - Pas types in `types/generated` aan (unknown ipv any)
  - Valideer JSON met Zod in bridge-modules

- **Image-optimalisatie fouten (cwebp niet gevonden)**:
  - Installeer het `cwebp` CLI-gereedschap (bv. `brew install webp`) of voeg
    `cwebp-bin` toe als devDependency (`npm install --save-dev cwebp-bin`).
  - In Linux/CI-omgevingen kun je `apt-get install -y webp` gebruiken.

- **Extraneous-dependencies errors**:
  - Controleer of modules als `decap-cms-app` en `prop-types` in `dependencies`
    staan (`npm install decap-cms-app prop-types`).

- **Import sortering**:
  - Voer `npm run lint -- --fix` uit om imports automatisch te sorteren
    volgens `simple-import-sort`.

### 5.6 Synchrone `staticContent` implementatie & alias exports

Om alle pagina's, inclusief blog, resources en foutpagina's, met één centrale bron van statische data te laten werken, hebben we de volgende stappen in `lib/data/staticContent.ts` doorgevoerd:

- **Synchrone `staticContent` objecten**
  • Maak een helper `readJSON(fileName: string): unknown` om JSON-bestanden uit `lib/content/static/` te lezen.
  • Parse met Zod-schema's:
    ```ts
    export const staticContent = {
      cookiePolicy: cookiePolicySchema.parse(readJSON('cookiePolicy.json')),
      privacyPolicy: privacyPolicySchema.parse(readJSON('privacyPolicy.json')),
      termsOfService: termsOfServiceSchema.parse(readJSON('termsOfService.json')),
      // ...faq, sections, etc.
      blogPage: { badgeText: '...', heading: '...', /* ... */ },
      resourcesPage: { noResourcesMessage: '...', readMoreText: '...' },
      notFoundPage: { statusCode: '404', title: '...', description: '...', buttonText: '...' },
    };
    ```
- **Alias exports voor backward compatibility**
  • Exporteer bestaande page-exports zodat oude pagina-calls blijven werken:
    ```ts
    export const blogPageData = staticContent.blogPage;
    export const resourcesPageData = staticContent.resourcesPage;
    export const notFoundPageData = staticContent.notFoundPage;
    ```
- **Type-safety**
  • Gebruik `unknown` (niet `any`) in `readJSON` om lint-errors te voorkomen.

Met deze implementatie zijn alle static-page imports centraal gecentraliseerd, consistent getypeerd en klaar voor toekomstige uitbreidingen.

---

**Gefeliciteerd!**
Je hebt nu een solide, onderhoudbare Decap CMS-integratie in Next.js, klaar voor niet-technische editors.
