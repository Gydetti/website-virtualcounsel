# Dynamic Content Refactor & Audit Guide

## Purpose
All user-facing copy in the GMG Template Website 2025 must be sourced from config/data files, never hardcoded in components or pages. This enables rapid onboarding, easy client customization, and full AI-driven content updates.

## 🎉 NEW FEATURE: Transparent Header Toggle

### Overview
A new configurable transparent header mode has been implemented that allows the header to:
- Start transparent and overlay on hero sections
- Smoothly transition to a solid background when scrolling
- Eliminate flickering issues with improved scroll handling
- Easy toggle between transparent and standard header modes
- **NEW: Configurable text and CTA colors that can remain consistent or change on scroll**

### Configuration
In `lib/site.config.local.ts`, find the `theme.headerConfig` section:

```typescript
headerConfig: {
  // Enable transparent mode
  transparentMode: true, // Set to false for standard header behavior
  
  // Background when scrolled
  scrolledBackgroundColor: 'bg-white/95 backdrop-blur-sm',
  
  // Hero section padding (responsive)
  heroTopPadding: 'pt-24 md:pt-32 lg:pt-36',
  
  // Animation settings
  transitionDuration: '300ms',
  scrollThreshold: 50,
  
  // 🎨 NEW: Text color configuration
  textColors: {
    changeOnScroll: false, // Keep same colors always!
    transparentMode: 'text-foreground', // Color when transparent
    scrolledMode: 'text-foreground', // Color when scrolled
  },
  
  // 🎨 NEW: CTA button color configuration  
  ctaColors: {
    changeOnScroll: false, // Keep same CTA styling always!
    transparentMode: 'border-primary text-primary hover:bg-primary hover:text-white',
    scrolledMode: 'border-primary text-primary hover:bg-primary hover:text-white',
  },
}
```

### Color Configuration Options

#### Option 1: Keep Colors Consistent (Recommended)
```typescript
textColors: {
  changeOnScroll: false, // Colors stay the same
  transparentMode: 'text-foreground',
  scrolledMode: 'text-foreground',
},
ctaColors: {
  changeOnScroll: false, // CTA stays the same
  transparentMode: 'border-primary text-primary hover:bg-primary hover:text-white',
  scrolledMode: 'border-primary text-primary hover:bg-primary hover:text-white',
},
```

#### Option 2: Change Colors on Scroll
```typescript
textColors: {
  changeOnScroll: true, // Colors change based on scroll
  transparentMode: 'text-white', // White text when transparent
  scrolledMode: 'text-foreground', // Dark text when scrolled
},
ctaColors: {
  changeOnScroll: true, // CTA changes on scroll
  transparentMode: 'border-white text-white hover:bg-white hover:text-black',
  scrolledMode: 'border-primary text-primary hover:bg-primary hover:text-white',
},
```

### Features
- **No Flickering**: Uses requestAnimationFrame and debouncing for smooth transitions
- **Smart Detection**: Automatically applies to pages with hero sections
- **Customizable**: All aspects configurable via siteConfig
- **Performance Optimized**: Passive scroll listeners and efficient state management
- **Responsive**: Works seamlessly on all device sizes

### Implementation Details
- Header component updated with transparent mode logic
- Hero and About sections automatically add extra padding when enabled
- Smooth color transitions for text and backgrounds
- Fixed positioning when transparent, sticky when standard

### Troubleshooting Transparent Header Spacing

If the header overlaps content when transparent mode is enabled:

1. **Check Console Logs**: When in development mode, check browser console for debug logs:
   ```
   Hero Section - Transparent Header: {
     isTransparentHeader: true,
     heroTopPadding: "pt-20 md:pt-24 lg:pt-28",
     headerConfig: {...}
   }
   ```

2. **Adjust Padding Values**: Update the `heroTopPadding` in your config:
   ```typescript
   headerConfig: {
     transparentMode: true,
     // Try different values based on your header height:
     heroTopPadding: 'pt-24 md:pt-28 lg:pt-32', // More spacing
     // or
     heroTopPadding: 'pt-16 md:pt-20 lg:pt-24', // Less spacing
   }
   ```

3. **Header Height Reference**:
   - Mobile: ~80px (use `pt-20` = 80px)
   - Tablet: ~96px (use `pt-24` = 96px) 
   - Desktop: ~112px (use `pt-28` = 112px)

4. **Custom Spacing**: You can use any Tailwind spacing classes:
   ```typescript
   heroTopPadding: 'pt-[88px] md:pt-[96px] lg:pt-[104px]' // Exact pixel values
   ```

5. **Multiple Sections**: The spacing is automatically applied to:
   - Hero sections
   - About sections (when `isHomepage={true}`)
   - Any section using the `useTransparentHeader()` hook

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
- **ServicesOverviewPage** (/services) - All copy now dynamic (why choose section, CTA, button labels)
- **ServiceDetailPages** (/services/[slug]) - All copy now dynamic (benefits, FAQ, testimonials, CTAs, button labels)

### 🔄 In Progress (FOUND BUT NOT YET FIXED)

#### 🚨 **CRITICAL DISCOVERY: Service Pages Still Hardcoded**
**Date:** December 2024  
**Status:** Major hardcoded content discovered in service pages that was missed in initial audit

**Service Detail Page (`app/services/[slug]/page.tsx`):**
- ❌ Benefits section (line ~70-85): "Increased Efficiency", "Better Results", "Expert Support" with descriptions
- ❌ Process steps (line ~87-103): "Discovery", "Strategy", "Implementation", "Optimization" with descriptions  
- ❌ FAQ section (line ~105-125): 4 hardcoded questions and answers
- ❌ Testimonials (line ~127-145): 2 hardcoded testimonial quotes, authors, companies
- ❌ CTA section (line ~205-220): "Ready to Get Started?" heading and description
- ❌ Section headings: "Key Benefits of This Service", "Frequently Asked Questions", "What Our Clients Say"

**Services Overview Page (`app/services/page.tsx`):**
- ❌ "Why Choose Our Services" section (line ~108-160): heading, description, 4 benefit bullet points
- ❌ CTA section (line ~175-190): "Ready to Transform Your Business?" heading and description
- ❌ Button labels: "Learn more", "Schedule a consultation", "Get started today"

**Impact:** These pages contain significant amounts of user-facing copy that should be configurable for client onboarding.

## 🚀 **IMMEDIATE IMPLEMENTATION PLAN: Service Pages**

### Step 1: Schema Creation/Extension
- Create `serviceDetailPageDataSchema` in `lib/schemas/sections.schema.ts`
- Create `servicesPageDataSchema` for overview page
- Include schemas for:
  - Benefits section (title, description, items array)
  - Process steps (reuse existing or extend)
  - FAQ section (questions array with question/answer pairs)
  - Testimonials (quotes, authors, companies)
  - CTA sections (headings, descriptions, button labels)
  - Section headings and meta text

### Step 2: Data Files Creation
- Create `lib/data/serviceDetailPageData.ts` 
- Extend `lib/data/servicesPageData.ts` with missing content
- Populate with meta-instructional placeholder content following established patterns
- Ensure all content includes guidance for AI agents and client customization

### Step 3: Component Refactoring  
- Update `app/services/[slug]/page.tsx` to use dynamic data
- Update `app/services/page.tsx` to use extended dynamic data
- Replace all hardcoded strings with props/data references
- Maintain existing styling and functionality

### Step 4: Integration & Testing
- Import and integrate data in page components
- Run `npm run verify:local` to ensure all tests pass
- Validate that dynamic content renders correctly
- Test with different content lengths and variations

### Step 5: Documentation Update
- Mark service pages as completed in this document
- Update any related onboarding documentation
- Add service pages to the completed audit table

### 📋 **CRITICAL DISCOVERY & RESOLUTION: Service Pages**

**Issue Found (Jan 2025):** Service pages contained extensive hardcoded content that was missed in initial audit:
- **Services Overview Page** (`/services`): Hardcoded "Why Choose Our Services" section, CTA text, button labels
- **Service Detail Pages** (`/services/[slug]`): Hardcoded benefits, FAQ items, testimonials, CTA sections

**Root Cause:** Service pages were not included in the original dynamic content audit scope.

**✅ RESOLUTION COMPLETED:**
1. **Schema Creation**: Added comprehensive schemas (`serviceDetailPageDataSchema`, `servicesPageDataSchema`) to `lib/schemas/sections.schema.ts`
2. **Data Files**: Created/extended data files with meta-instructional content:
   - `lib/data/serviceDetailPageData.ts` - Complete service detail structure
   - `lib/data/servicesPageData.ts` - Extended with missing sections
3. **Component Updates**: Refactored both service pages to use dynamic content:
   - Benefits sections with dynamic icons and text
   - FAQ sections with question/answer arrays
   - Testimonial sections with configurable quotes
   - CTA sections with dynamic headings and links
   - Button labels throughout
4. **Icon Integration**: Fixed icon component mapping issues for dynamic benefit icons
5. **Testing**: All tests pass, build successful, no linter errors

**Impact:** Service pages now fully support rapid client onboarding and AI-driven content updates.

**Verification Status:** ✅ Build passes, ✅ Tests pass, ✅ No linter errors

## Remaining Work

### ⏳ Pending Review
*All major hardcoded content has been identified and resolved. Next phase should be a comprehensive audit of remaining components.*

**Next Steps:**
1. **Full Component Audit**: Review all remaining components for any missed hardcoded strings
2. **Landing Page Content**: Verify landing page dynamic content is comprehensive
3. **Error Messages**: Ensure error states use dynamic content
4. **Meta Content**: Verify page titles, descriptions use dynamic sources

## Schema Pattern Documentation

All schemas follow the established patterns in `lib/schemas/sections.schema.ts`:
- Meta-instructional content in data files  
- Comprehensive zod validation
- Optional fields with sensible defaults
- Icon support through `iconComponents` mapping
- Button/link configurability
- Multi-section content blocks

## Implementation Guidelines

1. **Content Strategy**: All content should guide AI toward best practices
2. **Validation**: Use zod schemas for type safety and validation
3. **Flexibility**: Support optional sections and configurable icons/links
4. **Consistency**: Follow existing naming conventions and patterns
5. **Testing**: Ensure build passes and all tests complete successfully

---
*Last Updated: January 2025 - Service Pages Dynamic Content Implementation*

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

### Available Padding Classes

**Full Range of Padding Classes Now Supported:**
Tailwind CSS classes `pt-16` through `pt-48` are now available in the safelist:

- **pt-16** = 64px (4rem)
- **pt-20** = 80px (5rem)  
- **pt-24** = 96px (6rem)
- **pt-28** = 112px (7rem)
- **pt-32** = 128px (8rem) ✨
- **pt-36** = 144px (9rem) ✨
- **pt-40** = 160px (10rem) ✨
- **pt-44** = 176px (11rem) ✨
- **pt-48** = 192px (12rem) ✨

All classes support responsive variants: `md:pt-32`, `lg:pt-36`, etc.

**Why Higher Values Work Now:**
Previously, values above `pt-28` weren't working because Tailwind JIT (Just-In-Time) compilation only generates CSS for classes it can detect in your code. Since the `heroTopPadding` is dynamically configurable, Tailwind couldn't detect these classes automatically.

**Solution:** Added transparent header padding classes to the Tailwind safelist in `tailwind.config.ts`, ensuring all padding values are always available.

```typescript
// Now in tailwind.config.ts safelist:
'pt-16', 'pt-20', 'pt-24', 'pt-28', 'pt-32', 'pt-36', 'pt-40', 'pt-44', 'pt-48',
'md:pt-16', 'md:pt-20', // ... all responsive variants
```

---

*Continue to expand the audit table and document each refactor as it is completed. See codebase for current progress.*

## 🎨 **CRITICAL DISCOVERY: New Pattern Fade Options**

**Date:** January 2025  
**Status:** Enhanced pattern system with new fade variants

### **Background Pattern Fade Options**
The background pattern system now supports these fade variants:

1. **`edges`** - Fades left and right sides (horizontal fade)
2. **`vertical`** - **NEW!** Fades top and bottom (vertical fade) 
3. **`top`** - Fades from top only
4. **`bottom`** - Fades from bottom only
5. **`none`** - No fade effect

### **Configuration Examples**

**For horizontal edge fade (existing):**
```typescript
patternFade: 'edges' // Fades left and right sides
```

**For vertical edge fade (NEW):**
```typescript
patternFade: 'vertical' // Fades top and bottom
```

**Usage in Section Components:**
```tsx
<Section
  patternStyle="grid"
  patternOpacity={0.1}
  patternFade="vertical" // NEW: Top/bottom fade
  patternColor="rgb(59 130 246 / 0.1)"
>
  Content here
</Section>
```

**Global Configuration:**
```typescript
// In lib/site.config.local.ts
sectionOverrides: {
  heroSection: {
    patternStyle: 'dots',
    patternOpacity: 0.05,
    patternFade: 'vertical', // NEW: Use vertical fade globally
  }
}
```

### **Technical Implementation**
- **CSS Classes:** `.mask-gradient-vertical` applies top/bottom fade
- **Component Support:** All section components support the new option
- **Schema Validation:** TypeScript and Zod schemas updated
- **Backward Compatibility:** Existing `edges` fade unchanged

**Verification Status:** ✅ Build passes, ✅ Tests pass, ✅ No linter errors
