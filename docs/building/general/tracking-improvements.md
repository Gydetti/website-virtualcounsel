# Tracking Script Improvements: Manual & Blueprint

## Rationale

Currently, tracking scripts (GTM, GA4, Facebook Pixel, LinkedIn, HubSpot, Google Ads) are injected based on cookie consent, but **not** on whether their tracking IDs are actually set. This can result in unnecessary or broken script loads, minor performance hits, and noisy network logs. Optimizing this logic will:

- Prevent empty/broken scripts from loading
- Improve performance and cleanliness
- Make onboarding and automation even safer and more robust

## Best Practice Summary

- **Only inject a tracking script if:**
  1. The user has given the appropriate consent (statistics/marketing)
  2. The corresponding tracking ID is non-empty and valid
- **Keep all script blocks in the codebase** for easy onboarding/automation
- **Optionally:** Log a warning in development if a script is enabled by consent but missing an ID

---

## Step-by-Step Implementation Plan

### 1. Audit Current Implementation

- [x] Review `components/tracking/tracking-scripts.tsx` for how scripts are injected
- [x] Confirm that all scripts are present regardless of ID value
- [x] Confirm consent gating is in place

### 2. Update Script Injection Logic

- [ ] For each script block, add a check for a non-empty tracking ID:
  ```tsx
  {canLoadAnalytics && siteConfig.tracking.gtmId && ( ... )}
  {canLoadAnalytics && siteConfig.tracking.ga4Id && ( ... )}
  {canLoadMarketing && siteConfig.tracking.fbPixelId && ( ... )}
  {canLoadMarketing && siteConfig.tracking.linkedinId && ( ... )}
  {canLoadMarketing && siteConfig.tracking.hubspotId && ( ... )}
  {canLoadMarketing && siteConfig.tracking.googleAdsId && ( ... )}
  ```
- [ ] Ensure no script is injected if its ID is empty or missing

### 3. (Optional) Add Dev Warnings

- [ ] In development, if consent is given but an ID is missing, log a warning to the console for easier onboarding QA

### 4. Test Thoroughly

- [ ] Test with all IDs empty: No tracking scripts should load
- [ ] Test with some IDs set: Only those scripts should load
- [ ] Test with all IDs set: All scripts should load as expected
- [ ] Test consent gating: Scripts only load after appropriate consent
- [ ] Check network logs for 404s or failed script loads (should be none)

### 5. Document the Pattern

- [ ] Update onboarding docs to mention the new pattern: "Tracking scripts are only injected if their ID is set. To enable a platform, just add the ID in `siteConfig.tracking`."
- [ ] Add code comments in `tracking-scripts.tsx` explaining the rationale

### 6. Rollout & Maintenance

- [ ] Roll out the change to all environments
- [ ] Monitor for regressions or missed scripts
- [ ] For new platforms, follow the same pattern: consent + ID check

---

## Example Code Pattern

```tsx
{canLoadAnalytics && siteConfig.tracking.gtmId && (
  // GTM script here
)}
{canLoadAnalytics && siteConfig.tracking.ga4Id && (
  // GA4 script here
)}
{canLoadMarketing && siteConfig.tracking.fbPixelId && (
  // Facebook Pixel script here
)}
// ...etc.
```

---

## Benefits

- No unnecessary HTTP requests or script parsing
- Cleaner network logs and browser console
- No risk of accidentally leaking empty or broken tracking calls
- Still fully automation/AI-onboarding friendly
- Easy to extend for new platforms

---

## Future Considerations

- Consider validating ID formats for each platform (e.g., GTM IDs start with 'GTM-')
- Consider a utility function for script injection to DRY up the code
- Continue to monitor for new tracking requirements or platforms

---

_This manual and blueprint should be referenced for all future tracking script improvements and onboarding automation._
