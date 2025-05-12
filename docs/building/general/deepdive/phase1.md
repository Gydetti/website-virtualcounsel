# Phase 1: Foundational Architecture for AI Customization & Modularity

**Objective**: To refactor and enhance the codebase with a strong foundation for AI-driven customization, content modularity, and theme flexibility. This phase focuses on establishing clear data contracts, component prop standards, dynamic page structures, and a more powerful theme engine.

**Guiding Principles for AI Execution**: 
- Each sub-task should be atomic where possible.
- After each significant group of changes (e.g., schema definition for a module, refactoring a set of components), the full build, lint, test, and (simulated) deployment workflow must be executed and pass with zero errors/warnings.
- All code changes must adhere to existing coding standards, documentation practices, and the project's overall architectural patterns unless explicitly stated otherwise in this plan.
- New files or significant refactors should include necessary JSDoc/TSDoc comments.


Quick note: when forming this doc, I think we didn't include "Resources" section but we need to include everything in teh codebase of course!
---

## Part 1: Granular Zod Schemas & Data Contract Establishment

**Goal**: Define comprehensive Zod schemas for all existing data structures (site config, section data, page-specific data, repeatable items like testimonials, service cards, etc.) to ensure type safety and provide clear contracts for AI data injection.

**Steps**:

1.  **Create Centralized Schema Directory**:
    *   Create `lib/schemas/`.
    *   Within `lib/schemas/`, create individual files for different categories of schemas (e.g., `siteConfig.schema.ts`, `common.schema.ts`, `sections.schema.ts`, `pages.schema.ts`, `theme.schema.ts`).

2.  **Define `common.schema.ts`**:
    *   Identify and define common, reusable Zod schemas for elements like:
        *   `linkSchema = z.object({ text: z.string(), href: z.string(), external: z.boolean().optional() })`
        *   `imageSchema = z.object({ src: z.string().nonempty(), alt: z.string().nonempty(), width: z.number().optional(), height: z.number().optional(), blurDataURL: z.string().optional() })` (Ensure src/alt are non-empty)
        *   `ctaSchema = linkSchema.extend({ variant: z.enum(["primary", "secondary", "outline", "ghost", "link"]).optional() })`
        *   `seoSchema = z.object({ title: z.string().optional(), description: z.string().optional(), keywords: z.array(z.string()).optional() })`

3.  **Refactor `site.config.ts` (Schema Definition)**:
    *   Rename `lib/site.config.ts` to `lib/schemas/siteConfig.schema.ts`.
    *   Update imports in `lib/site.config.local.ts` (or wherever it's consumed for validation, though actual validation should happen at point of use or build, not in `site.config.local.ts` itself).
    *   Break down the existing `siteConfigSchema` into more granular, potentially importable sub-schemas (e.g., `siteMetaSchema`, `themeConfigSchema`, `trackingSchema`, `newsletterSchema`, `featureFlagsSchema`, `contactDetailsSchema`, `contactFormConfigSchema`).
    *   Utilize schemas from `common.schema.ts` (e.g., for `navLinks`, `footerLinks` using `linkSchema`).
    *   Ensure every field is appropriately validated (e.g., non-empty strings for critical info, correct types, enums for providers).

4.  **Define Schemas for All Section Data (`lib/schemas/sections.schema.ts`)**:
    *   For *each* component in `components/sections/` (Hero, Services, Testimonials, BlogPreview, CTA, About, Process, etc.):
        *   Define a corresponding Zod schema for its expected props/data (e.g., `heroSectionDataSchema`, `servicesSectionDataSchema`).
        *   These schemas should import and use `common.schema.ts` elements extensively (e.g., `imageSchema` for images, `ctaSchema` for buttons).
        *   Example: `testimonialItemSchema = z.object({ quote: z.string(), name: z.string(), role: z.string(), image: imageSchema.optional() })`
        *   `testimonialsSectionDataSchema = z.object({ title: z.string(), testimonials: z.array(testimonialItemSchema) })`
    *   Store these in `lib/schemas/sections.schema.ts` or individual files like `lib/schemas/sections/hero.schema.ts`.

5.  **Define Schemas for Dynamic Page Data & Content Types (`lib/schemas/pages.schema.ts`)**:
    *   For blog posts: `blogPostSchema = z.object({ slug: z.string(), title: z.string(), date: z.string().pipe(z.coerce.date()), coverImage: imageSchema, excerpt: z.string(), content: z.string(), author: z.object({ name: z.string(), picture: imageSchema.optional() }), seo: seoSchema.optional() })`.
    *   For individual service pages: `servicePageSchema = z.object({ slug: z.string(), title: z.string(), summary: z.string(), heroImage: imageSchema, sections: z.array(z.any()), /* refine 'sections' later with content block schemas */ seo: seoSchema.optional() })`.

6.  **Integrate Schemas with Data Files (`lib/data/*.ts`)**:
    *   Update existing data files (e.g., `lib/data/homepage.ts`, `lib/data/resources.ts`) to:
        *   Import their respective Zod schemas from `lib/schemas/`.
        *   Explicitly type the exported data constants with the Zod inferred type: `export const heroSectionData: z.infer<typeof heroSectionDataSchema> = { ... }`.
        *   At the end of each data file, or in a central validation script, parse the data to ensure it conforms: `heroSectionDataSchema.parse(heroSectionData);` (This can be a build step or a test).
    *   *Self-correction during execution*: If parsing fails, the AI should attempt to fix the data structure to match the schema or flag the discrepancy if ambiguous.

---

## Part 2: Component Prop Standardization & Refactoring

**Goal**: Refactor all section and UI components to accept props that strictly align with the newly defined Zod schemas. Ensure components are primarily data-driven.

**Steps**:

1.  **Update Component Prop Types**:
    *   For *each* component in `components/sections/` and key reusable components in `components/ui/`:
        *   Import the relevant Zod schema (or its inferred type) from `lib/schemas/`.
        *   Update the component's props interface/type to use `z.infer<typeof relevantSchema>`. Example: `interface HeroSectionProps extends z.infer<typeof heroSectionDataSchema> {}`.
        *   Adjust internal component logic to destructure and use props according to the new typed structure.
        *   Remove any internal default/fallback data that should now come from the data layer or `siteConfig` via props.

2.  **Parent Page Component Integration**:
    *   Update parent page components (e.g., `app/page.tsx`, `app/about/page.tsx`) that import section data and pass it to section components.
    *   Ensure the data being passed matches the new prop types. TypeScript will guide this, but the AI must resolve any discrepancies.

3.  **Strict Prop Adherence**: Eliminate direct access to `siteConfig` or other global data sources from within deep child components if that data should be passed down as a prop according to its schema. This makes components more predictable for AI customization.

---

## Part 3: Dynamic Page Composition (Foundation)

**Goal**: Implement a foundational system for defining page structures dynamically via `siteConfig`, allowing an AI to more easily reorder, add, or remove sections from pages.

**Steps**:

1.  **Define Page Structure Schema (`lib/schemas/siteConfig.schema.ts`)**:
    *   Add a new schema to `siteConfigSchema` for page structures:
        ```typescript
        const pageSectionConfigSchema = z.object({
          sectionType: z.string(), // Corresponds to a key/name of a section component
          // Potentially add fields for section-specific overrides if not handled by dedicated data files
          // e.g., backgroundColor: z.string().optional(), variant: z.string().optional()
        });
        
        const pageStructureSchema = z.object({
          path: z.string(), // e.g., "/", "/about"
          seo: seoSchema.optional(),
          sections: z.array(pageSectionConfigSchema)
        });
        
        // In siteConfigSchema:
        // pageStructures: z.array(pageStructureSchema).optional(),
        ```
    *   Alternatively, a simpler map: `pageCompositionSchema = z.record(z.string(), z.array(z.string()))` where the key is the route and the array is a list of section component identifiers.

2.  **Update `site.config.local.ts` with Page Structure Data**:
    *   Add a `pageStructures` (or `pageComposition`) property to the `siteConfig` object with initial data for a few key pages (e.g., homepage, about page).
        ```typescript
        // Example for site.config.local.ts
        pageStructures: [
          {
            path: "/",
            sections: [
              { sectionType: "HeroSection" },
              { sectionType: "ClientsSection" },
              { sectionType: "ServicesSectionPreview" }, // A variant or specific data for homepage
              { sectionType: "TestimonialsSection" },
              { sectionType: "BlogSectionPreview" },
              { sectionType: "CtaSection" }
            ]
          },
          // ... other pages
        ]
        ```

3.  **Create Dynamic Page Renderer Component (`components/layout/DynamicPageRenderer.tsx`)**:
    *   This component will take a `pageStructure: PageStructure` (inferred from `pageStructureSchema`) as a prop.
    *   It will map over `pageStructure.sections`.
    *   Inside the map, it will use a dynamic import or a mapping object to render the correct section component based on `section.sectionType`.
        ```typescript
        // Simplified example inside DynamicPageRenderer
        const sectionComponents: Record<string, React.ComponentType<any>> = {
          HeroSection: HeroSection, // Actual import
          ClientsSection: ClientsSection,
          // ... map all section component types here
        };

        return sections.map((sectionConfig, index) => {
          const Component = sectionComponents[sectionConfig.sectionType];
          if (!Component) return <div key={index}>Error: Unknown section type {sectionConfig.sectionType}</div>;
          // Fetch data for this specific section instance - this is the tricky part
          // Option 1: Data is fetched/imported within DynamicPageRenderer based on page path & sectionType
          // Option 2: sectionConfig itself contains/references its data or data key
          // Option 3: Section components themselves are responsible for fetching their data based on a global context or specific props.
          // For AI, Option 2 might be most explicit if data keys are stable.
          const sectionData = getSectionData(pagePath, sectionConfig.sectionType); // Placeholder for data fetching logic
          return <LazySection key={index}><Component {...sectionData} /></LazySection>; 
        });
        ```
    *   **Data Fetching for Dynamic Sections**: This is a critical design point. The AI needs a clear way to associate data with dynamically rendered sections. The `getSectionData` logic needs to be robust. Initially, it might rely on conventions (e.g., homepage data has keys matching section types). This will be refined with the Content Blocks system.

4.  **Refactor Key Page Components (`app/[...]/page.tsx`)**:
    *   Modify existing page components (e.g., `app/page.tsx`) to:
        *   Fetch or import their structure from `siteConfig.pageStructures`.
        *   Render the `DynamicPageRenderer` component, passing the appropriate structure.
        *   Handle SEO metadata based on `pageStructure.seo`.

---

## Part 4: Content Blocks/Slices Architecture (Design & Scaffolding)

**Goal**: Design and scaffold a system for flexible content blocks/slices, enabling richer content pages (long service descriptions, case studies) that an AI can easily manipulate.

**Steps**:

1.  **Define Content Block Schemas (`lib/schemas/contentBlocks.schema.ts`)**:
    *   Create `contentBlocks.schema.ts`.
    *   Define Zod schemas for various common content block types:
        *   `textBlockSchema = z.object({ type: z.literal("text"), content: z.string() /* consider allowing markdown/html */ })`
        *   `imageBlockSchema = z.object({ type: z.literal("image"), image: imageSchema, caption: z.string().optional() })`
        *   `videoBlockSchema = z.object({ type: z.literal("video"), src: z.string().url(), caption: z.string().optional() })`
        *   `quoteBlockSchema = z.object({ type: z.literal("quote"), text: z.string(), author: z.string().optional() })`
        *   `ctaBlockSchema = z.object({ type: z.literal("cta"), ...ctaSchema.shape })`
        *   `headingBlockSchema = z.object({ type: z.literal("heading"), level: z.enum(["h1", "h2", "h3", "h4", "h5", "h6"]), text: z.string() })`
        *   `listBlockSchema = z.object({ type: z.literal("list"), ordered: z.boolean().default(false), items: z.array(z.string())})`
    *   Create a discriminated union for all block types: `contentBlockSchema = z.discriminatedUnion("type", [textBlockSchema, imageBlockSchema, ...])`.

2.  **Scaffold Content Block Components (`components/content-blocks/`)**:
    *   Create a new directory `components/content-blocks/`.
    *   For each block schema, create a corresponding React component (e.g., `TextBlock.tsx`, `ImageBlock.tsx`).
    *   These components will take props matching their Zod schema (`props: z.infer<typeof textBlockSchema>`).

3.  **Create a ContentBlockRenderer Component (`components/content-blocks/ContentBlockRenderer.tsx`)**:
    *   This component will take `block: z.infer<typeof contentBlockSchema>` as a prop.
    *   It will use a switch statement or mapping object on `block.type` to render the appropriate block component.

4.  **Integrate with Dynamic Page/Section Schemas**:
    *   Modify schemas like `servicePageSchema` or generic `customSectionSchema` to include an array of content blocks: `content: z.array(contentBlockSchema)`. 
    *   Data files for such pages/sections will then define content using this block structure.
    *   Section components designed for rich content (e.g., `components/sections/RichTextSection.tsx`) will map over their `content` prop and use `ContentBlockRenderer`.

---

## Part 5: Dynamic Theme Engine (Foundation)

**Goal**: Expand `siteConfig` to include a more comprehensive theme object, allowing an AI to control a wider range of visual styles programmatically via CSS variables.

**Steps**:

1.  **Define Enhanced Theme Schema (`lib/schemas/theme.schema.ts`)**:
    *   Create `lib/schemas/theme.schema.ts` or enhance the theme part of `siteConfig.schema.ts`.
    *   Expand beyond basic colors to include:
        *   **Typography**: `fontPairingSchema = z.object({ headingFont: z.string(), bodyFont: z.string(), baseSize: z.string().default("16px") })` (font names should map to `next/font` imports or web safe fonts).
        *   **Spacing**: `spacingScaleSchema = z.object({ xs: z.string(), sm: z.string(), md: z.string(), lg: z.string(), xl: z.string() })` (values like `0.5rem`, `1rem`, etc.).
        *   **Borders**: `borderSchema = z.object({ radiusBase: z.string(), widthBase: z.string(), colorBase: z.string() })`.
        *   **Shadows**: `shadowSchema = z.object({ sm: z.string(), md: z.string(), lg: z.string() })` (full shadow CSS strings).
        *   **Layout**: `layoutSchema = z.object({ containerMaxWidth: z.string(), containerPadding: z.string() })`.
    *   The main `themeConfigSchema` will include these sub-schemas.

2.  **Update `site.config.local.ts` with Theme Foundation**:
    *   Populate the new theme structure in `site.config.local.ts` with current/sensible default values.

3.  **Implement CSS Variable Generation (`app/layout.tsx`)**:
    *   Create logic within `app/layout.tsx` that:
        *   Reads the theme object from the (now validated) `siteConfig`.
        *   Generates a comprehensive set of CSS custom properties and injects them into the `:root` element via a `<style>` tag.
        *   Example: `--theme-font-heading: 'Poppins'; --theme-color-primary: #FF0000; --theme-spacing-md: 1rem;`

4.  **Refactor `tailwind.config.ts` and `app/globals.css`**:
    *   Update `tailwind.config.ts` to primarily reference these new CSS variables for its theme values (colors, fonts, spacing if possible).
        *   Example: `colors: { primary: 'hsl(var(--theme-color-primary-hsl))' /* Assuming HSL vars are also generated */, brand: { primary: 'var(--theme-brand-primary)'} }`.
    *   Update `app/globals.css` to use these CSS variables for base styles and utility classes where appropriate, reducing direct Tailwind utility usage for things that should be themeable.
    *   Ensure `next/font` setup in `layout.tsx` can be dynamically influenced if `themeConfig.typography.headingFont` (etc.) changes, or document how an AI should update these font imports if they are hardcoded.

---

**Post-Phase 1 Expectations**:
- The codebase will have a highly structured and validated data layer.
- Components will be robustly typed and driven by this data layer.
- A foundational system for dynamic page layouts will be in place.
- A scaffold for a flexible content block system will be ready for further development.
- The theming system will be more powerful and ready for AI-driven style variations.
- The AI agent should be able to more reliably and predictably customize content and basic styles by manipulating `site.config.local.ts` and files in `lib/data/`.

This detailed plan should provide a clear path for execution. Remember to rigorously follow the build, lint, test, and commit workflow after each significant step.

## Next Steps

Below are the remaining tasks to complete Phase 1:

- Flesh out `lib/schemas/theme.schema.ts` with advanced theme sub-schemas (typography, spacing scale, borders, shadows, layout).
- Update `lib/schemas/siteConfig.schema.ts` to integrate the new theme schema.
- Populate the `theme` object in `lib/site.config.local.ts` with placeholder values for all new theme properties.
- Implement server-side CSS variable injection in `app/layout.tsx` to inject CSS custom properties based on the validated theme config.
- Refactor `tailwind.config.ts` to use CSS variables for colors, fonts, spacing (borderRadius, shadows, container settings).
- Update `app/globals.css` to define and use the CSS variables (fallbacks, base styles, and utility classes).
- Re-run the full build (`npm run build`), lint and auto-fix imports (`npm run lint -- --fix`), unit/integration tests (`npm test`), and E2E tests (`npx playwright test`) to ensure zero errors or warnings.



