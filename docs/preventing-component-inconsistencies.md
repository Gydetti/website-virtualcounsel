# Preventing Component Inconsistencies

## The Problem

The testimonials section "Ready to write your own success story?" button issue highlighted a common problem: **component inconsistency** where hardcoded styling bypasses the theme system, resulting in inconsistent behavior and appearance.

## Root Causes

1. **Direct HTML/Link elements** with hardcoded CSS classes instead of using design system components
2. **Copy-paste coding** where examples are copied without adapting to the theme system
3. **Time pressure** leading to quick fixes that bypass established patterns
4. **Lack of awareness** about existing components and their proper usage

## Proactive Solutions

### 1. Automated Detection (`npm run check:patterns`)

Our custom pattern detection script scans the codebase for:

- **Hardcoded Button Styling**: Link elements with button-like classes
- **Incorrect Hover Syntax**: Old `hover:bg-color90` instead of `hover:bg-color/90`
- **Hardcoded Border Radius**: `rounded-*` classes instead of theme system
- **Raw img Tags**: `<img>` instead of `<Image>` or `<OptimizedImage>`
- **Hardcoded Colors**: Hex codes or raw Tailwind colors vs theme tokens
- **Inline Styles**: `style={{}}` instead of Tailwind classes

```bash
npm run check:patterns  # Run manually
npm run ci:verify       # Includes pattern check in CI pipeline
```

### 2. ESLint Rules

Added custom ESLint rules in `.eslintrc.json`:

```json
{
  "rules": {
    "regexp/no-unused-capturing-group": "error",
    "regexp/prefer-character-class": "error",
    "boundaries/element-types": "error"
  }
}
```

### 3. Development Workflow Integration

The pattern check is now part of our CI/CD pipeline:

```bash
# Before pushing to main:
npm run verify:local
# This runs: build + lint + test + pattern check + e2e tests
```

### 4. Component Usage Guidelines

#### ✅ Correct Button Usage

```tsx
// Use Button component with theme system
<Button variant="default" size="lg" asChild>
  <Link href="/contact">Get Started</Link>
</Button>

// Or for simple cases
<Button variant="outline">Learn More</Button>
```

#### ❌ Incorrect Hardcoded Styling

```tsx
// Don't do this
<Link
  href="/contact"
  className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary90"
>
  Get Started
</Link>
```

#### ✅ Correct Color Usage

```tsx
// Use theme tokens
<div className="bg-primary hover:bg-primary/90 text-white">
<div className="bg-neutral-surface text-neutral-text">
```

#### ❌ Incorrect Color Usage

```tsx
// Don't use hardcoded colors
<div className="bg-blue-600 hover:bg-blue700 text-white">
<div className="bg-gray-100 text-gray-900">
```

### 5. Theme System Enforcement

#### Always Use Theme Components

| Element | Use This | Not This |
|---------|----------|----------|
| Buttons | `<Button>` | `<Link>` with button classes |
| Images | `<Image>` or `<OptimizedImage>` | `<img>` |
| Colors | `bg-primary`, `text-neutral-text` | `bg-blue-600`, `#123456` |
| Spacing | `gap-4`, `p-6` | Custom margins/padding |
| Border Radius | CSS variables or theme tokens | `rounded-lg`, `rounded-2xl` |

#### Component Variants

```tsx
// Button variants
<Button variant="default">Primary Action</Button>
<Button variant="outline">Secondary Action</Button>
<Button variant="ghost">Subtle Action</Button>

// Use size prop
<Button size="sm">Small</Button>
<Button size="default">Regular</Button>
<Button size="lg">Large</Button>
```

### 6. Code Review Checklist

When reviewing PRs, check for:

- [ ] No hardcoded button styling
- [ ] Proper use of theme color tokens
- [ ] Consistent hover/focus states
- [ ] No inline styles
- [ ] Proper component variants used
- [ ] Accessibility considerations

### 7. Developer Tools

#### Pattern Detection Script

```bash
# Run pattern detection
npm run check:patterns

# Example output:
❌ Found 3 component pattern violations:
🔍 Hardcoded Button Styling (1 violation)
   📁 app/testimonials/page.tsx:89:15
   💡 Use <Button asChild><Link href="...">...</Link></Button> instead
```

#### Lint on Save

Add to VSCode settings:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["typescript", "typescriptreact"]
}
```

### 8. Documentation Standards

#### Component Examples

Every new component should include:

1. **Basic Usage Example**
2. **All Variant Examples**
3. **Common Patterns**
4. **What NOT to do**

#### Master Components Reference

Key components to use consistently:

- `<Button>` - All button-like interactions
- `<OptimizedImage>` - All images
- `<Section>` - Page sections with consistent spacing
- `<Badge>` - Status indicators
- `<Card>` - Content containers

### 9. Onboarding Process

For new developers:

1. **Run pattern check** before first commit
2. **Review component library** in `/components/ui/`
3. **Study theme configuration** in `/lib/site.config.local.ts`
4. **Practice with examples** in `/docs/inspiration/`

### 10. Monitoring and Maintenance

#### Regular Pattern Audits

```bash
# Weekly: Run full pattern check
npm run check:patterns

# Monthly: Review and update patterns
# - Add new anti-patterns discovered
# - Update suggestions based on component evolution
# - Refine regex patterns for better detection
```

#### Performance Monitoring

```bash
# Check build performance
npm run build

# Monitor Lighthouse scores
npm run lhci:prod
```

## Quick Reference

### Commands
- `npm run check:patterns` - Detect inconsistencies
- `npm run verify:local` - Full verification pipeline
- `npm run lint -- --fix` - Fix auto-correctable linting issues

### Files to Know
- `.eslintrc.json` - Linting rules
- `scripts/detect-component-patterns.js` - Pattern detection
- `components/ui/` - Base UI components
- `lib/site.config.local.ts` - Theme configuration

### Emergency Fixes
If you find hardcoded styling:

1. **Stop** - Don't continue building on it
2. **Check** - Run `npm run check:patterns` to find similar issues
3. **Fix** - Replace with proper theme system components
4. **Verify** - Run full verification pipeline
5. **Document** - Add to this guide if it's a new pattern

Remember: **Consistency in the design system is more important than individual component perfection.** 