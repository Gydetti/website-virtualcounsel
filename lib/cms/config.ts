import type { CmsConfig } from 'decap-cms-core';

export const config: CmsConfig = {
  backend: {
    name: 'git-gateway',
    branch: 'main',
  },
  media_folder: 'public/uploads',
  public_folder: '/uploads',
  collections: [
    {
      name: 'pages',
      label: "Website Pagina's",
      files: [
        {
          label: 'Homepage',
          name: 'homepage',
          file: 'lib/content/homepage.json',
          fields: [
            {
              label: 'Hero Section',
              name: 'heroSection',
              widget: 'object',
              fields: [
                { label: 'Badge Text', name: 'badgeText', widget: 'string' },
                { label: 'Headline', name: 'headline', widget: 'string' },
                { label: 'Subheadline', name: 'subheadline', widget: 'text' },
                {
                  label: 'Primary CTA',
                  name: 'primaryCta',
                  widget: 'object',
                  fields: [
                    { label: 'Text', name: 'text', widget: 'string' },
                    { label: 'Link', name: 'href', widget: 'string' },
                  ],
                },
                {
                  label: 'Secondary CTA',
                  name: 'secondaryCta',
                  widget: 'object',
                  fields: [
                    { label: 'Text', name: 'text', widget: 'string' },
                    { label: 'Link', name: 'href', widget: 'string' },
                  ],
                },
                {
                  label: 'Show Secondary CTA',
                  name: 'showSecondaryCta',
                  widget: 'boolean',
                  default: true,
                },
                {
                  label: 'Typing Words',
                  name: 'typingWords',
                  widget: 'list',
                  field: { label: 'Word', name: 'word', widget: 'string' },
                },
                {
                  label: 'Stats',
                  name: 'stats',
                  widget: 'list',
                  fields: [
                    { label: 'Value', name: 'value', widget: 'number' },
                    { label: 'Suffix', name: 'suffix', widget: 'string' },
                    { label: 'Label', name: 'label', widget: 'string' },
                  ],
                },
                {
                  label: 'Image',
                  name: 'image',
                  widget: 'object',
                  fields: [
                    { label: 'Source', name: 'src', widget: 'image' },
                    { label: 'Alt Text', name: 'alt', widget: 'string' },
                  ],
                },
              ],
            },
            {
              label: 'Clients Section',
              name: 'clientsSection',
              widget: 'object',
              fields: [
                { label: 'Badge Text', name: 'badgeText', widget: 'string' },
                { label: 'Heading', name: 'heading', widget: 'string' },
                {
                  label: 'Clients',
                  name: 'clients',
                  widget: 'list',
                  fields: [
                    { label: 'Name', name: 'name', widget: 'string' },
                    {
                      label: 'Logo',
                      name: 'logo',
                      widget: 'object',
                      fields: [
                        { label: 'Source', name: 'src', widget: 'image' },
                        { label: 'Alt Text', name: 'alt', widget: 'string' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: 'Testimonials Section',
              name: 'testimonialsSection',
              widget: 'object',
              fields: [
                { label: 'Badge Text', name: 'badgeText', widget: 'string' },
                { label: 'Heading', name: 'heading', widget: 'string' },
                { label: 'Subtitle', name: 'subtitle', widget: 'string' },
                {
                  label: 'Testimonials',
                  name: 'testimonials',
                  widget: 'list',
                  fields: [
                    { label: 'ID', name: 'id', widget: 'string' },
                    { label: 'Quote', name: 'quote', widget: 'text' },
                    { label: 'Name', name: 'name', widget: 'string' },
                    { label: 'Title', name: 'title', widget: 'string' },
                    { label: 'Rating', name: 'rating', widget: 'number' },
                  ],
                },
              ],
            },
            {
              label: 'Problem/Pain Section',
              name: 'problemPainSection',
              widget: 'object',
              fields: [
                { label: 'Badge Text', name: 'badgeText', widget: 'string' },
                { label: 'Heading', name: 'heading', widget: 'string' },
                { label: 'Description', name: 'description', widget: 'text' },
                { label: 'Callout Text', name: 'calloutText', widget: 'string' },
                {
                  label: 'Cards',
                  name: 'cards',
                  widget: 'list',
                  fields: [
                    { label: 'ID', name: 'id', widget: 'string' },
                    { label: 'Title', name: 'title', widget: 'string' },
                    { label: 'Description', name: 'description', widget: 'text' },
                  ],
                },
              ],
            },
            {
              label: 'Solution/Vision Section',
              name: 'solutionVisionSection',
              widget: 'object',
              fields: [
                { label: 'Badge Text', name: 'badgeText', widget: 'string' },
                { label: 'Heading', name: 'heading', widget: 'string' },
                { label: 'Description', name: 'description', widget: 'text' },
                { label: 'Imagine Title', name: 'imagineTitle', widget: 'string' },
                {
                  label: 'Benefits',
                  name: 'benefits',
                  widget: 'list',
                  field: { label: 'Benefit', name: 'benefit', widget: 'string' },
                },
                { label: 'Callout Text', name: 'calloutText', widget: 'string' },
                {
                  label: 'Callout CTA',
                  name: 'calloutCta',
                  widget: 'object',
                  fields: [
                    { label: 'Text', name: 'text', widget: 'string' },
                    { label: 'Link', name: 'href', widget: 'string' },
                  ],
                },
              ],
            },
            {
              label: 'Main CTA Section',
              name: 'ctaSection',
              widget: 'object',
              fields: [
                { label: 'Badge Text', name: 'badgeText', widget: 'string' },
                { label: 'Heading', name: 'heading', widget: 'string' },
                { label: 'Description', name: 'description', widget: 'text' },
                {
                  label: 'Primary CTA',
                  name: 'primaryCta',
                  widget: 'object',
                  fields: [
                    { label: 'Text', name: 'text', widget: 'string' },
                    { label: 'Link', name: 'href', widget: 'string' },
                  ],
                },
                {
                  label: 'Secondary CTA',
                  name: 'secondaryCta',
                  widget: 'object',
                  fields: [
                    { label: 'Text', name: 'text', widget: 'string' },
                    { label: 'Link', name: 'href', widget: 'string' },
                  ],
                },
              ],
            },
            {
              label: 'Homepage FAQ Section',
              name: 'homepageFaqSection',
              widget: 'object',
              fields: [
                { label: 'Badge Text', name: 'badgeText', widget: 'string' },
                { label: 'Heading', name: 'heading', widget: 'string' },
                { label: 'Description', name: 'description', widget: 'text' },
                {
                  label: 'Categories',
                  name: 'categories',
                  widget: 'list',
                  fields: [
                    { label: 'Category', name: 'category', widget: 'string' },
                    {
                      label: 'Questions',
                      name: 'questions',
                      widget: 'list',
                      fields: [
                        { label: 'Question', name: 'question', widget: 'string' },
                        { label: 'Answer', name: 'answer', widget: 'text' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'About Page',
          name: 'about',
          file: 'lib/content/aboutPage.json',
          fields: [
            {
              label: 'Main Content',
              name: 'mainContent',
              widget: 'object',
              fields: [
                { label: 'Badge Text', name: 'badgeText', widget: 'string' },
                { label: 'Heading', name: 'heading', widget: 'string' },
                {
                  label: 'Paragraphs',
                  name: 'paragraphs',
                  widget: 'list',
                  field: { label: 'Paragraph', name: 'paragraph', widget: 'text' },
                },
                {
                  label: 'Image',
                  name: 'image',
                  widget: 'object',
                  fields: [
                    { label: 'Source', name: 'src', widget: 'image' },
                    { label: 'Alt Text', name: 'alt', widget: 'string' },
                    { label: 'Width', name: 'width', widget: 'number' },
                    { label: 'Height', name: 'height', widget: 'number' },
                  ],
                },
                {
                  label: 'CTA',
                  name: 'cta',
                  widget: 'object',
                  fields: [
                    { label: 'Text', name: 'text', widget: 'string' },
                    { label: 'Link', name: 'href', widget: 'string' },
                  ],
                },
              ],
            },
            {
              label: 'Feature Cards Section',
              name: 'featureCards',
              widget: 'object',
              fields: [
                { label: 'Badge Text', name: 'badgeText', widget: 'string' },
                { label: 'Heading', name: 'heading', widget: 'string' },
                { label: 'Subheading', name: 'subheading', widget: 'string' },
                {
                  label: 'Feature Cards',
                  name: 'featureCards',
                  widget: 'list',
                  fields: [
                    { label: 'ID', name: 'id', widget: 'string' },
                    { label: 'Title', name: 'title', widget: 'string' },
                    { label: 'Description', name: 'description', widget: 'text' },
                    { label: 'Icon', name: 'icon', widget: 'string' },
                    { label: 'Icon Background', name: 'iconBg', widget: 'string' },
                    { label: 'Icon Color', name: 'iconColor', widget: 'string' },
                  ],
                },
              ],
            },
            {
              label: 'Values Section',
              name: 'values',
              widget: 'object',
              fields: [
                { label: 'Badge Text', name: 'badgeText', widget: 'string' },
                { label: 'Heading', name: 'heading', widget: 'string' },
                {
                  label: 'Values',
                  name: 'values',
                  widget: 'list',
                  field: { label: 'Value', name: 'value', widget: 'string' },
                },
              ],
            },
            {
              label: 'Social Proof Section',
              name: 'socialProof',
              widget: 'object',
              fields: [
                { label: 'Badge Text', name: 'badgeText', widget: 'string' },
                { label: 'Heading', name: 'heading', widget: 'string' },
                {
                  label: 'Testimonials',
                  name: 'socialProof',
                  widget: 'list',
                  fields: [
                    { label: 'ID', name: 'id', widget: 'string' },
                    { label: 'Quote', name: 'quote', widget: 'text' },
                    { label: 'Name', name: 'name', widget: 'string' },
                    { label: 'Title', name: 'title', widget: 'string' },
                  ],
                },
              ],
            },
            {
              label: 'Personal Journey Section',
              name: 'personalJourney',
              widget: 'object',
              fields: [
                { label: 'Badge Text', name: 'badgeText', widget: 'string' },
                { label: 'Heading', name: 'heading', widget: 'string' },
                { label: 'Subtitle', name: 'subtitle', widget: 'string' },
                {
                  label: 'Journey Steps',
                  name: 'journeySteps',
                  widget: 'list',
                  fields: [
                    { label: 'ID', name: 'id', widget: 'string' },
                    { label: 'Timeframe', name: 'timeframe', widget: 'string' },
                    { label: 'Title', name: 'title', widget: 'string' },
                    { label: 'Description', name: 'description', widget: 'text' },
                  ],
                },
                {
                  label: 'Image',
                  name: 'image',
                  widget: 'object',
                  fields: [
                    { label: 'Source', name: 'src', widget: 'image' },
                    { label: 'Alt Text', name: 'alt', widget: 'string' },
                    { label: 'Width', name: 'width', widget: 'number' },
                    { label: 'Height', name: 'height', widget: 'number' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Services Page',
          name: 'services',
          file: 'lib/content/servicesPage.json',
          fields: [
            {
              label: 'Overview Section',
              name: 'overview',
              widget: 'object',
              fields: [
                { label: 'Badge Text', name: 'badgeText', widget: 'string' },
                { label: 'Heading', name: 'heading', widget: 'string' },
                { label: 'Description', name: 'description', widget: 'text' },
              ],
            },
            {
              label: 'Why Choose Section',
              name: 'whyChooseSection',
              widget: 'object',
              fields: [
                { label: 'Heading', name: 'heading', widget: 'string' },
                { label: 'Description', name: 'description', widget: 'text' },
                {
                  label: 'Benefits',
                  name: 'benefits',
                  widget: 'list',
                  fields: [
                    { label: 'ID', name: 'id', widget: 'string' },
                    { label: 'Text', name: 'text', widget: 'string' },
                    { label: 'Icon', name: 'icon', widget: 'string' },
                  ],
                },
                { label: 'Button Text', name: 'buttonText', widget: 'string' },
                { label: 'Button Link', name: 'buttonLink', widget: 'string' },
                {
                  label: 'Image',
                  name: 'image',
                  widget: 'object',
                  fields: [
                    { label: 'Source', name: 'src', widget: 'image' },
                    { label: 'Alt Text', name: 'alt', widget: 'string' },
                  ],
                },
              ],
            },
            {
              label: 'CTA Section',
              name: 'ctaSection',
              widget: 'object',
              fields: [
                { label: 'Heading', name: 'heading', widget: 'string' },
                { label: 'Description', name: 'description', widget: 'text' },
                { label: 'Button Text', name: 'buttonText', widget: 'string' },
                { label: 'Button Link', name: 'buttonLink', widget: 'string' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'resources',
      label: 'Kennisbank',
      folder: 'lib/content/resources',
      create: true,
      slug: '{{slug}}',
      fields: [
        { label: 'Slug', name: 'slug', widget: 'string' },
        {
          label: 'Resource Type',
          name: 'resourceType',
          widget: 'select',
          options: ['guide', 'whitepaper', 'checklist'],
        },
        { label: 'Title', name: 'title', widget: 'string' },
        { label: 'Subtitle', name: 'subtitle', widget: 'string' },
        {
          label: 'Hero Image',
          name: 'heroImage',
          widget: 'object',
          fields: [
            { label: 'Source', name: 'src', widget: 'image' },
            { label: 'Alt Text', name: 'alt', widget: 'string' },
            { label: 'Width', name: 'width', widget: 'number' },
            { label: 'Height', name: 'height', widget: 'number' },
          ],
        },
        {
          label: 'Sections',
          name: 'sections',
          widget: 'list',
          types: [
            {
              label: 'Text Block',
              name: 'text',
              widget: 'object',
              fields: [{ label: 'Content', name: 'content', widget: 'markdown' }],
            },
            {
              label: 'Image Block',
              name: 'image',
              widget: 'object',
              fields: [
                {
                  label: 'Image',
                  name: 'image',
                  widget: 'object',
                  fields: [
                    { label: 'Source', name: 'src', widget: 'image' },
                    { label: 'Alt Text', name: 'alt', widget: 'string' },
                    { label: 'Width', name: 'width', widget: 'number' },
                    { label: 'Height', name: 'height', widget: 'number' },
                  ],
                },
                { label: 'Caption', name: 'caption', widget: 'string' },
              ],
            },
            {
              label: 'Form Block',
              name: 'form',
              widget: 'object',
              fields: [
                { label: 'Title', name: 'title', widget: 'string' },
                { label: 'Description', name: 'description', widget: 'text' },
                {
                  label: 'Config',
                  name: 'config',
                  widget: 'object',
                  fields: [
                    { label: 'Provider', name: 'provider', widget: 'string' },
                    { label: 'Embed Code', name: 'embedCode', widget: 'text' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'staticContent',
      label: 'Algemene Content',
      files: [
        {
          label: 'Cookie Policy',
          name: 'cookiePolicy',
          file: 'lib/content/static/cookiePolicy.json',
          fields: [
            { label: 'Last Updated', name: 'lastUpdated', widget: 'string' },
            { label: 'Introduction', name: 'introduction', widget: 'text' },
            { label: 'What Are Cookies', name: 'whatAreCookies', widget: 'text' },
            { label: 'Cookie Types', name: 'cookieTypes', widget: 'text' },
            { label: 'Essential Cookies', name: 'essentialCookies', widget: 'text' },
            { label: 'Performance Cookies', name: 'performanceCookies', widget: 'text' },
            { label: 'Functionality Cookies', name: 'functionalityCookies', widget: 'text' },
            { label: 'Targeting Cookies', name: 'targetingCookies', widget: 'text' },
            { label: 'Third-Party Cookies', name: 'thirdPartyCookies', widget: 'text' },
            { label: 'Management', name: 'management', widget: 'text' },
            { label: 'Changes', name: 'changes', widget: 'text' },
            { label: 'Contact Info', name: 'contactInfo', widget: 'text' },
          ],
        },
        {
          label: 'Privacy Policy',
          name: 'privacyPolicy',
          file: 'lib/content/static/privacyPolicy.json',
          fields: [
            { label: 'Last Updated', name: 'lastUpdated', widget: 'string' },
            { label: 'Introduction', name: 'introduction', widget: 'text' },
            { label: 'Information Collected', name: 'informationCollected', widget: 'text' },
            { label: 'Personal Information', name: 'personalInformation', widget: 'markdown' },
            { label: 'How We Use Info', name: 'howWeUse', widget: 'text' },
            { label: 'Usage Item 1', name: 'usageListItem1', widget: 'string' },
            { label: 'Usage Item 2', name: 'usageListItem2', widget: 'string' },
            { label: 'Usage Item 3', name: 'usageListItem3', widget: 'string' },
            { label: 'Usage Item 4', name: 'usageListItem4', widget: 'string' },
            { label: 'Data Sharing', name: 'dataSharing', widget: 'text' },
            { label: 'Data Security', name: 'dataSecurity', widget: 'text' },
            { label: 'User Rights', name: 'userRights', widget: 'text' },
            { label: 'Cookies Policy', name: 'cookiesPolicy', widget: 'text' },
            { label: 'Policy Changes', name: 'policyChanges', widget: 'text' },
            { label: 'Contact Info', name: 'contactInfo', widget: 'text' },
          ],
        },
        {
          label: 'Terms of Service',
          name: 'termsOfService',
          file: 'lib/content/static/termsOfService.json',
          fields: [
            { label: 'Last Updated', name: 'lastUpdated', widget: 'string' },
            { label: 'Introduction', name: 'introduction', widget: 'text' },
            { label: 'Acceptance', name: 'acceptance', widget: 'text' },
            { label: 'Services', name: 'services', widget: 'text' },
            { label: 'User Accounts', name: 'userAccounts', widget: 'text' },
            { label: 'Intellectual Property', name: 'intellectualProperty', widget: 'text' },
            { label: 'User Content', name: 'userContent', widget: 'text' },
            { label: 'Prohibited Activities', name: 'prohibitedActivities', widget: 'text' },
            { label: 'Limitation of Liability', name: 'limitationOfLiability', widget: 'text' },
            { label: 'Indemnification', name: 'indemnification', widget: 'text' },
            { label: 'Termination', name: 'termination', widget: 'text' },
            { label: 'Governing Law', name: 'governingLaw', widget: 'text' },
            { label: 'Changes', name: 'changes', widget: 'text' },
            { label: 'Contact Info', name: 'contactInfo', widget: 'text' },
          ],
        },
      ],
    },
  ],
};
