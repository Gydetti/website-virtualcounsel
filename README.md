# Entrepreneur Website Template

A modern, responsive website template for entrepreneurs and small businesses looking to establish a strong online presence. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Pages](#pages)
- [Components](#components)
- [Analytics & Tracking](#analytics--tracking)
- [Cookie Consent System](#cookie-consent-system)
- [SEO Optimization](#seo-optimization)
- [Performance Considerations](#performance-considerations)
- [Customization Guide](#customization-guide)
- [Getting Started](#getting-started)

## Overview

This template is designed for entrepreneurs and small businesses who want to establish a professional online presence. It includes all the essential pages and components needed for a business website, with a focus on lead generation, service presentation, and content marketing.

The template is built with modern web technologies:
- **Next.js 14+** with App Router for server-side rendering and optimized performance
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for responsive, utility-first styling
- **shadcn/ui** for high-quality, accessible UI components
- **Framer Motion** for smooth animations and transitions

## Project Structure

The project follows a standard Next.js App Router structure with some additional organization for components and utilities:

\`\`\`
entrepreneur-website-template/
├── app/                      # Next.js App Router pages
│   ├── about/                # About page
│   ├── blog/                 # Blog section with dynamic routes
│   ├── contact/              # Contact page
│   ├── faq/                  # FAQ page
│   ├── privacy-policy/       # Privacy policy page
│   ├── services/             # Services section with dynamic routes
│   ├── terms-of-service/     # Terms of service page
│   ├── cookie-policy/        # Cookie policy page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with metadata
│   ├── not-found.tsx         # 404 page
│   └── page.tsx              # Homepage
├── components/               # Reusable components
│   ├── cookie/               # Cookie consent components
│   ├── layout/               # Layout components (header, footer)
│   ├── sections/             # Page sections (hero, features, etc.)
│   ├── seo/                  # SEO components
│   ├── tracking/             # Tracking and analytics components
│   └── ui/                   # UI components (buttons, cards, etc.)
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions and data
├── public/                   # Static assets
└── types/                    # TypeScript type definitions
\`\`\`

## Key Features

1. **Modern Design**: Clean, professional design with attention to typography, spacing, and visual hierarchy
2. **Fully Responsive**: Optimized for all device sizes from mobile to desktop
3. **Performance Optimized**: Fast loading times with optimized images and code splitting
4. **SEO Ready**: Proper metadata, structured data, and semantic HTML
5. **Analytics Integration**: Ready-to-use integrations with popular analytics platforms
6. **Cookie Consent System**: GDPR-compliant cookie consent management
7. **Accessibility**: WCAG-compliant components and keyboard navigation
8. **Content Sections**: Pre-built sections for services, testimonials, blog, etc.
9. **Dynamic Routes**: Dynamic pages for services and blog posts
10. **Contact Form**: Ready-to-use contact form with validation

## Pages

### Homepage (`app/page.tsx`)
The homepage showcases the business's key offerings and value proposition. It includes:
- Hero section with animated typing effect
- Client logos section
- Services overview
- Features comparison
- About section
- Process explanation
- Testimonials carousel
- Blog preview
- Call-to-action section
- Contact form

### Services Page (`app/services/page.tsx`)
Lists all services with descriptions and links to individual service pages.

### Individual Service Page (`app/services/[slug]/page.tsx`)
Detailed page for each service with:
- Service description
- Key benefits
- Process explanation
- FAQs
- Testimonials
- Call-to-action

### Blog Page (`app/blog/page.tsx`)
Blog listing page with featured post and regular posts.

### Blog Post Page (`app/blog/[slug]/page.tsx`)
Individual blog post page with:
- Post content
- Author information
- Related posts
- Social sharing

### About Page (`app/about/page.tsx`)
Company information page with:
- Company story
- Team members
- Values and mission
- Statistics and achievements

### Contact Page (`app/contact/page.tsx`)
Contact form and information page.

### FAQ Page (`app/faq/page.tsx`)
Frequently asked questions with searchable accordion.

### Legal Pages
- Privacy Policy (`app/privacy-policy/page.tsx`)
- Terms of Service (`app/terms-of-service/page.tsx`)
- Cookie Policy (`app/cookie-policy/page.tsx`)

### 404 Page (`app/not-found.tsx`)
Custom 404 error page.

## Components

### Layout Components

#### Header (`components/layout/header.tsx`)
- Responsive navigation with mobile menu
- Sticky header with scroll effect
- Active link highlighting

#### Footer (`components/layout/footer.tsx`)
- Multi-column layout with links
- Newsletter subscription form
- Social media links
- Contact information
- Legal links and cookie settings

### Section Components

#### Hero Section (`components/sections/hero-section.tsx`)
- Animated typing effect
- Call-to-action buttons
- Statistics counter
- Hero image with decorative elements

#### Services Section (`components/sections/services-section.tsx`)
- Service cards with icons
- Popular service highlighting
- Feature lists

#### Features Section (`components/sections/features-section.tsx`)
- Comparison between with/without services
- Visual differentiation with icons

#### About Section (`components/sections/about-section.tsx`)
- Company introduction
- Statistics and achievements
- Image with decorative elements

#### Process Section (`components/sections/process-section.tsx`)
- Step-by-step process explanation
- Timeline visualization
- Detailed descriptions

#### Testimonials Section (`components/sections/testimonials-section.tsx`)
- Testimonial carousel
- Client photos and quotes
- Rating stars

#### Blog Section (`components/sections/blog-section.tsx`)
- Blog post cards
- Category badges
- Read more links

#### CTA Section (`components/sections/cta-section.tsx`)
- Call-to-action with buttons
- Visual background

#### Contact Section (`components/sections/contact-section.tsx`)
- Contact form with validation
- Contact information
- Business hours

#### Clients Section (`components/sections/clients-section.tsx`)
- Client logos carousel
- Grayscale to color hover effect

### UI Components

#### Service Card (`components/ui/service-card.tsx`)
Reusable card component for displaying services.

#### Blog Card (`components/ui/blog-card.tsx`)
Reusable card component for displaying blog posts.

#### Testimonial Card (`components/ui/testimonial-card.tsx`)
Reusable card component for displaying testimonials.

#### FAQ Accordion (`components/ui/faq-accordion.tsx`)
Accordion component for FAQs with search functionality.

#### Section Divider (`components/ui/section-divider.tsx`)
Visual divider between sections with various styles.

#### Scroll To Top (`components/ui/scroll-to-top.tsx`)
Button that appears when scrolling to navigate back to top.

### Cookie and Tracking Components

#### Cookie Consent Banner (`components/cookie/cookie-consent-banner.tsx`)
GDPR-compliant cookie consent banner with customizable preferences.

#### Cookie Settings Button (`components/cookie/cookie-settings-button.tsx`)
Button to reopen cookie preferences.

#### Tracking Scripts (`components/tracking/tracking-scripts.tsx`)
Component that loads tracking scripts based on cookie consent.

#### Data Layer Provider (`components/tracking/data-layer-provider.tsx`)
Initializes the data layer for tracking.

#### Page View Tracker (`components/tracking/page-view-tracker.tsx`)
Tracks page views across route changes.

### SEO Components

#### Structured Data (`components/seo/structured-data.tsx`)
- Implements JSON-LD structured data for better search engine understanding
- Supports Organization, WebSite, and BreadcrumbList schemas
- Customizable with props

#### Blog Post Schema (`components/seo/blog-post-schema.tsx`)
- Implements JSON-LD structured data for blog posts
- Includes article, author, and publisher information
- Customizable with props

#### Breadcrumb (`components/ui/breadcrumb.tsx`)
- Dynamic breadcrumb navigation based on current path
- Includes structured data for SEO
- Customizable separators and styling

### Performance Components

#### Optimized Image (`components/ui/optimized-image.tsx`)
- Enhanced version of Next.js Image component
- Built-in loading state with placeholder
- Optimized for Core Web Vitals

#### Lazy Section (`components/ui/lazy-section.tsx`)
- Intersection Observer-based lazy loading for sections
- Various animation options (fade, slide, zoom)
- Improves initial page load performance

## Analytics & Tracking

The template includes integrations with popular analytics and tracking platforms:

### Google Tag Manager
- Implementation in `components/tracking/tracking-scripts.tsx`
- Placeholder: `GTM-XXXXXXX`
- Loads only when analytics consent is given

### Google Analytics 4
- Implementation in `components/tracking/tracking-scripts.tsx`
- Placeholder: `G-XXXXXXXXXX`
- Loads only when analytics consent is given

### Facebook Pixel
- Implementation in `components/tracking/tracking-scripts.tsx`
- Placeholder: `XXXXXXXXXXXXXXXXX`
- Loads only when marketing consent is given

### LinkedIn Insight Tag
- Implementation in `components/tracking/tracking-scripts.tsx`
- Placeholder: `XXXXXXX`
- Loads only when marketing consent is given

### HubSpot Tracking
- Implementation in `components/tracking/tracking-scripts.tsx`
- Placeholder: `XXXXXXX`
- Loads only when marketing consent is given

### Google Ads Conversion Tracking
- Implementation in `components/tracking/tracking-scripts.tsx`
- Placeholder: `AW-XXXXXXXXXX`
- Loads only when marketing consent is given

### Tracking Utilities
The `lib/tracking-utils.ts` file provides utility functions for tracking events across different platforms:
- `trackGAEvent`: Track events in Google Analytics
- `trackFBEvent`: Track events in Facebook Pixel
- `trackLinkedInEvent`: Track events in LinkedIn
- `trackHubSpotEvent`: Track events in HubSpot
- `trackGoogleAdsConversion`: Track conversions in Google Ads
- `trackEvent`: Generic function that tracks across all platforms

## Cookie Consent System

The template includes a comprehensive cookie consent system that complies with GDPR and other privacy regulations:

### Cookie Consent Hook (`hooks/use-cookie-consent.tsx`)
- Manages user consent preferences
- Persists preferences in local storage
- Provides functions to update consent

### Cookie Consent Banner (`components/cookie/cookie-consent-banner.tsx`)
- Initial consent banner
- Detailed preferences modal
- Options for necessary, analytics, marketing, and preferences cookies

### Cookie Settings Button (`components/cookie/cookie-settings-button.tsx`)
- Button to reopen cookie preferences
- Located in the footer

### Cookiebot Integration
- Optional integration with Cookiebot
- Script in `app/layout.tsx`
- Placeholder: `XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`

## SEO Optimization

The template is optimized for search engines:

### Metadata
- Each page has appropriate metadata (title, description)
- Open Graph and Twitter card metadata
- Canonical URLs

### Semantic HTML
- Proper heading hierarchy
- Semantic elements (section, article, nav, etc.)
- ARIA attributes for accessibility

### Performance
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Minimal CSS with Tailwind's JIT compiler

### Mobile Optimization
- Fully responsive design
- Mobile-friendly navigation
- Appropriate touch targets

### SEO Files

#### Sitemap (`app/sitemap.ts`)
- Dynamically generated sitemap
- Includes all static and dynamic routes
- Customizable priorities and change frequencies

#### Robots (`app/robots.ts`)
- Robots.txt configuration
- Customizable rules for search engine crawlers

#### Manifest (`app/manifest.ts`)
- Web App Manifest for PWA support
- Customizable icons and theme colors

## Performance Considerations

The template is optimized for performance:

### Image Optimization
- Next.js Image component for automatic optimization
- Responsive images with appropriate sizes
- Lazy loading for off-screen images

### Code Splitting
- Automatic code splitting with Next.js
- Dynamic imports for large components

### Font Optimization
- Local font files with `next/font`
- Font display swap for better perceived performance

### Animation Performance
- Hardware-accelerated animations
- Minimal layout shifts
- Debounced event handlers

## Customization Guide

### Branding
1. Update colors in `tailwind.config.ts`
2. Replace logo in header and footer
3. Update favicon and other icons in `public/`

### Content
1. Replace placeholder text in all components
2. Update images with your own
3. Modify service and blog data in `lib/data-utils.ts`

### Tracking
1. Replace tracking IDs in `components/tracking/tracking-scripts.tsx`
2. Update Cookiebot ID in `app/layout.tsx`

### Styling
1. Modify global styles in `app/globals.css`
2. Adjust component styles as needed
3. Add custom fonts if desired

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Build
1. Build the project: `npm run build`
2. Start the production server: `npm start`

### Deployment
The template is ready to deploy on Vercel or any other Next.js-compatible hosting platform.
