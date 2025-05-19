# Prep: AI Blueprint for Client Customization (May 2025)

> **Audience:** AI coding agents in zero-context sessions. A self-contained blueprint for scanning, extracting, codemodding, and enforcing placeholder removal and data centralization to enable 5-minute client on-boarding.

---

## 1. Goals & Scope

1. **Extract all placeholder copy** (strings, comments) into a centralized data module (`lib/data/staticContent.ts`).
2. **Centralize fallback images** under a single constant (`lib/constants.ts` → `DEFAULT_PLACEHOLDER_IMAGE`).
3. **Automate replacements** via codemods, regex scripts, and ESLint rules to eliminate inline placeholders.
4. **Enforce via CI**: lint rules, Prettier, Biome, tests catch regressions.

This blueprint assumes the repository root with standard layout (`app/`, `components/`, `lib/`, `docs/`, etc.) and an existing `ci:verify` script.

---

## 2. Identification Patterns

### 2.1 Placeholder Strings & Comments

- Regex: `/placeholder/i` to find: `Paragraph placeholder:`, `Last updated date placeholder`, etc.
- Glob paths: `app/**/*.tsx`, `components/**/*.tsx`, `docs/**/*.md`.

```bash
rg --exclude-dir={.next,node_modules,public} -i 'placeholder' app components docs
```

### 2.2 Fallback Image URLs

- Patterns: `'/placeholder.svg'`, `'/images/placeholders/placeholder.svg'`, query-param variants.
- Regex: `['"](/[^'"]*placeholder[^'"]*)['"]` in JSX attributes.

```bash
rg "placeholder(\.svg|/placeholders/)" -n app components
```

---

## 3. Data Module: `lib/data/staticContent.ts`

1. **Create file** exporting typed objects:

   ```ts
   import { z } from 'zod';

   export const cookiePolicySchema = z.object({
     lastUpdated: z.string(),
     paragraphs: z.string().array(),
   });
   export type CookiePolicy = z.infer<typeof cookiePolicySchema>;

   export const privacyPolicySchema = z.object({
     /* similar */
   });
   export type PrivacyPolicy = z.infer<typeof privacyPolicySchema>;

   export const faqItemSchema = z.object({ question: z.string(), answer: z.string() });
   export type FaqItem = z.infer<typeof faqItemSchema>;

   export const staticContent = {
     cookiePolicy: cookiePolicySchema.parse({ lastUpdated: '', paragraphs: [] }),
     privacyPolicy: {
       /* ... */
     },
     termsOfService: {
       /* ... */
     },
     faqItems: faqItemSchema.array().parse([]),
   } as const;
   ```

2. **Populate** initial values by copying inline placeholders.

---

## 4. Constants: `lib/constants.ts`

```ts
export const DEFAULT_PLACEHOLDER_IMAGE = '/images/placeholders/placeholder.svg';
```

Use `DEFAULT_PLACEHOLDER_IMAGE` everywhere instead of literal fallback URLs.

---

## 5. Extraction & Replacement Steps

1. **Legal Pages** (`app/cookie-policy`, `app/privacy-policy`, `app/terms-of-service`):
   - Replace hard-coded `<p>` placeholders with `staticContent.cookiePolicy.paragraphs.map(...)`.
2. **FAQ Component** (`components/sections/faq-section.tsx` or `FaqClientPage.tsx`):
   - Replace inline `faqItems` arrays with `staticContent.faqItems`.
3. **Image Fallbacks**: in every `src={... || '/placeholder.svg'}`, swap `|| DEFAULT_PLACEHOLDER_IMAGE`.
4. **Form & Input Placeholders**: fields in `ContactPageClient`, `SubscribeForm`; consider moving labels into `staticContent.forms` if needed.

---

## 6. Codemod & Scripts

- **jscodeshift** script `scripts/extract-placeholders.js`:
  - Identify JSX text nodes matching `/placeholder/`.
  - Replace with dynamic references to `staticContent`.
- **One-off regex script** (Node): batch-replace fallback URLs.

Example usage:

```bash
npm run codemod -- --extensions ts,tsx scripts/extract-placeholders.js app components
```

---

## 7. ESLint & CI Enforcement

1. **ESLint rule** (custom): flag any string literal matching `/placeholder/i` in JSX.
2. **CI checks**:
   - `npm run lint` fails on new inline placeholders.
   - Add a regex test in `tests/unit/noPlaceholders.test.ts`:
     ```ts
     import fs from 'fs';
     test('no inline placeholder strings', () => {
       const code = fs.readFileSync('app/page.tsx', 'utf8');
       expect(/placeholder/i.test(code)).toBe(false);
     });
     ```

---

## 8. Documentation Updates

- **Onboarding docs** (`docs/building/onboarding`): reference `staticContent.ts` and `constants.ts` as the single edit points for client copy and images.
- **README** and header comments: add "All placeholder content → `lib/data/staticContent.ts`."

---

## 9. Verification & Clean-up

1. Run `npm run ci:verify` to confirm zero errors/warnings.
2. Grep for `placeholder` again; expect only references in `staticContent.ts` defaults or tests.
3. Commit: "chore: externalize placeholder content for client customization".

---

## 10. Zero-Context Chat Prompt

> **When you start a new AI session** to customize for a client, immediately:
>
> 1. Load `lib/data/staticContent.ts`, `lib/constants.ts`.
> 2. Prompt: "Inject client copy into `staticContent` and supply image URLs to `DEFAULT_PLACEHOLDER_IMAGE`."
> 3. Run codemods and verify with `ci:verify`.

This file is your single source of truth for all placeholder extraction and client-customization prep.
