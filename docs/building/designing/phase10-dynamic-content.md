# Dynamic Content Refactor & Audit Guide

## Purpose
All user-facing copy in the GMG Template Website 2025 must be sourced from config/data files, never hardcoded in components or pages. This enables rapid onboarding, easy client customization, and full AI-driven content updates.

## Progress Tracker

### ✅ Completed (Fully Dynamic)
- **ContactSection** - All copy now dynamic (formTitle, infoTitle, successMessage, buttonLabels)
- **ResourceDetailSection** - All copy now dynamic (section titles, content arrays, stats, testimonials, form labels)
- **BlogSection** - All copy now dynamic (readMoreText added to schema and data)
- **SolutionVisionSection** - All copy now dynamic (imagineTitle added to schema and data)
- **Error Pages** - Both not-found.tsx and error.tsx now use dynamic content
- **Blog Page** - All hardcoded copy replaced with dynamic content from blogPageData
- **Resources Page** - No resources message now dynamic
- **ServicesSection** - learnMoreText and popularBadgeText now dynamic
- **AboutSection** - learnMoreText now dynamic, both philosophy card buttons fixed
- **ResourceListSection** - readMoreText now dynamic from resourcesPageData
- **PricingSection** - popularBadgeText now dynamic from pricingSectionData
- **Header** - viewAllText now dynamic from siteConfig.navigationText
- **Footer** - contactUsText now dynamic from siteConfig.navigationText
- **BlogCard (Blog Detail Page)** - readMoreText now dynamic from blogPageData
- **Cookie Banner** - All text now dynamic from siteConfig.cookieConsentText (titles, descriptions, button labels, tab labels, cookie type descriptions)
- **LandingHeader** - defaultCtaText now dynamic from siteConfig.landingHeaderText
- **FormBlock** - pendingMessage now dynamic from formBlockConfig

### 🔄 In Progress (FOUND BUT NOT YET FIXED)
- None remaining

### 📋 Pending (To Be Audited)
- None remaining - all major components have been audited and converted

### ✅ **Major Achievement: Core Dynamic Content System Complete**
The foundational system is now in place! All major user-facing content has been moved to config/data files. Future AI agents can now:
1. Update client copy by editing the data files in `lib/data/`
2. Add new dynamic fields by extending the schemas in `lib/schemas/sections.schema.ts`
3. Quickly onboard clients by replacing placeholder content with real client information

## Audit Table: Hardcoded Copy
| Section/Page | File | Line/Location | Hardcoded Copy | New Data Field(s) |
|--------------|------|---------------|----------------|-------------------|
| ✅ ContactSection | components/sections/contact-section.tsx | h3, Button, success message | "Form title prompting user to send a message", "Contact information", "Thank you for your message! ...", button labels | formTitle, infoTitle, successMessage, buttonLabels |
| ✅ ResourceDetailSection | components/sections/ResourceDetailSection.tsx | Multiple h3 tags | "Professional Outcomes", "What's Inside", "Bonus Materials", "Trusted by Professional Communities", etc. | outcomesTitle, whatsInsideTitle, bonusMaterialsTitle, professionalValidationTitle, chapters[], bonusMaterials[], stats, testimonial, etc. |
| BlogSection | components/sections/blog-section.tsx | h2, Badge | "Section heading for regular posts", badge text | sectionHeading, badgeText |
| SolutionVisionSection | components/sections/solution-vision-section.tsx | h3 | "Imagine having:" | imagineTitle |
| not-found | app/not-found.tsx | h2, p | "Page Not Found", error message | notFoundTitle, notFoundMessage |
| error | app/error.tsx | h1, p | "Something went wrong!", error message | errorTitle, errorMessage |
| resources page | app/resources/page.tsx | p | "No resources available at the moment." | noResourcesMessage |
| blog page | app/blog/page.tsx | Badge, h2 | "Short label introducing blog section", "Section heading for regular posts" | introBadgeText, regularPostsHeading |
| services page | app/services/page.tsx | Badge variant, h3 | "Popular" badge | popularBadgeText |
| header | components/layout/header.tsx | CTA button | "Get Started" | headerCtaText |
| footer | components/layout/footer.tsx | Business hours | hours display format | hoursFormat |

*Full audit continues below with implementation details.*

## Refactor Steps
1. **Schema Update:** Add new fields to the relevant Zod schema in `lib/schemas/sections.schema.ts`.
2. **Component Update:** Update section/page props and replace hardcoded strings with props.
3. **Data Update:** Add new fields to the relevant data file (`lib/data/homepage.ts`, etc.) with sensible defaults.
4. **Renderer Update:** Ensure `DynamicPageRenderer` and data loaders pass the new fields.
5. **Remove Hardcoded Copy:** All user-facing text must come from data/config.

## Testing & Verification
- After each refactor, run `npm run verify:local` to ensure build, lint, type, and all tests pass.
- Add/extend tests to check that all copy is rendered from data, not hardcoded.

## Onboarding Instructions for Future Agents
- To update any copy, edit the relevant data file (e.g., `homepage.ts`, `aboutPageData.ts`).
- To add new copy, extend the schema and data file, then update the component to use the new prop.
- To enable/disable sections, use `siteConfig.pageStructures` and feature flags.

## Special Cases
- **Error/404/System Messages:** Move to `lib/data/staticContent.ts` or a new `systemMessages.ts`.
- **Button Labels, Alt Text, Accessibility:** Always configurable via data.

## Research Notes & Findings
- Many sections already use dynamic data, but some headings, callouts, and system messages remain hardcoded.
- All copy should be discoverable and editable from a single source of truth for rapid onboarding and AI-driven customization.
- This doc will be updated as each section is refactored.

## Implementation Details

### ContactSection (✅ Completed)
- Added fields to `contactSectionDataSchema`: formTitle, infoTitle, successMessage, buttonLabels
- Updated `lib/data/homepage.ts` with default values
- Refactored component to use props with fallbacks
- All tests passing

### ResourceDetailSection (🚧 Next)
- Multiple hardcoded headings throughout the component
- Need to analyze component structure to determine best schema approach
- May need nested structure for different sections within the resource detail view

---

*Continue to expand the audit table and document each refactor as it is completed. See codebase for current progress.*
