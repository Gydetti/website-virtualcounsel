## **Plan: Add a "spark" Button Variant**

### **1. Component Structure**

- **Why:**  
  The spark effect requires extra DOM elements (`.spark__container`, `.spark`, `.backdrop`, `.text`) inside the button, which is different from your current button's simple structure.
- **How:**
  - When `variant="spark"`, render a custom internal structure **using a dedicated render branch**.
  - For all other variants, keep the current rendering.

> **Important:** The `"spark"` variant must use a custom render branch in your Button component. Do **not** try to implement the spark effect as a simple Tailwind/CVA variant or by just adding a class. The effect requires a specific DOM structure and custom CSS.

---

### **2. Styling Approach**

- **Why:**  
  The spark effect uses custom CSS (not Tailwind) for the animation, but you want to keep the button's color, font, border-radius, and sizing consistent with your theme.
- **How:**
  - **Replace all hardcoded colors, border-radius, and font in the spark CSS with theme CSS variables** (e.g., `var(--primary)`, `var(--radius)`, `var(--font-heading)`).
  - Import the spark effect CSS as a module or in global styles.
  - Use Tailwind for sizing, font, and spacing, but use raw CSS for the spark animation layers.
  - **Double-check that all colors, border-radius, and font settings in the spark CSS use your theme's CSS variables.**

---

### **3. Implementation Steps**

#### **A. Create/Import Spark CSS**

- Place the spark effect CSS in a file like `components/ui/spark-button.css`.
- Replace hardcoded colors with CSS variables (e.g., `--primary`, `--primary-rgb`) where possible.
- Ensure border-radius, font, and padding use your theme variables.

#### **B. Update the Button Component**

- In `components/ui/button.tsx`:
  - Add `"spark"` to the `buttonVariants` (for sizing, font, etc.).
  - In the render function, if `variant === "spark"`, render the special structure:
    ```tsx
    <button
      ref={ref}
      className={cn(
        buttonVariants({ variant: 'default', size, className }), // Use "default" for base styling
        'spark-button', // Add the spark effect class
        className
      )}
      {...props}
    >
      <span className="spark__container">
        <span className="spark"></span>
      </span>
      <span className="backdrop"></span>
      <span className="text">{children}</span>
    </button>
    ```
  - For all other variants, keep the current rendering.
  - **When rendering the spark button, ensure you apply the correct size and padding classes (from your `buttonVariants` or Tailwind) to the outer `<button>` so it matches your other button sizes.**

#### **C. Ensure Theme Consistency**

- In your spark CSS, use theme variables for:
  - Background color: `var(--primary)` or `var(--secondary)`
  - Border-radius: `var(--radius)`
  - Font: inherit from the button
- This ensures the spark button matches your theme and can adapt to dark/light mode.

#### **D. Accessibility & Props**

- The spark button should:
  - Accept all the same props as your normal button (e.g., `onClick`, `disabled`, etc.).
  - Be keyboard accessible.
  - Use `type="button"` by default.
  - **Remain a native `<button>`, support all ARIA and `disabled` props, and not interfere with focus outlines or screen reader text.**

#### **E. Usage Example**

```tsx
<Button variant="spark" size="lg" onClick={...}>
  Click Me
</Button>
```

---

### **4. Optional: AsChild Support**

- If you want to support `asChild` (wrapping a link), you'll need to ensure the spark structure is rendered inside the child, which is more complex. For now, focus on the button use case.
- **Supporting `asChild` (wrapping a link) is not recommended for the spark variant unless you have a strong use case and are prepared for extra complexity.**

---

### **5. Testing**

- Test the spark button in all sizes (`sm`, `default`, `lg`).
- Test in both light and dark mode.
- Test keyboard and screen reader accessibility.
- Test with different text lengths.

---

### **6. Documentation**

- Document the new `"spark"` variant in your component docs and in your design system guidelines.
- Note any limitations (e.g., not for `asChild`/links yet).

---

## **Summary Table**

| Step                 | Action                                                 |
| -------------------- | ------------------------------------------------------ |
| 1. Spark CSS         | Move effect CSS to a module, use theme variables       |
| 2. Button Update     | Add `"spark"` variant, render special structure for it |
| 3. Theme Consistency | Use theme variables for color, radius, font            |
| 4. Accessibility     | Ensure all props, keyboard, and ARIA support           |
| 5. Sizing            | Use correct size classes for `sm`, `default`, `lg`     |
| 6. Usage             | `<Button variant="spark">...</Button>`                 |
| 7. Test              | All sizes, modes, accessibility, edge cases            |
| 8. Document          | Add to docs and design guidelines                      |
| 9. AsChild Support   | Only if needed, and with caution                       |

---

### **Caveats & Gotchas**

- The `"spark"` variant **must** use a custom render branch in your Button component.  
  Do **not** try to implement the spark effect as a simple Tailwind/CVA variant or by just adding a class.  
  The effect requires a specific DOM structure and custom CSS.
- Ensure all sizing, padding, and font classes match your other button variants for consistency.
- All colors, border-radius, and font settings in the spark CSS **must** use your theme's CSS variables.
- The spark button must remain a native `<button>`, support all ARIA and `disabled` props, and not interfere with focus outlines or screen reader text.
- Supporting `asChild` (wrapping a link) is not recommended for the spark variant unless you have a strong use case and are prepared for extra complexity.

---

## **Production Implementation Checklist**

- [ ] Spark CSS uses only theme variables (no hardcoded colors, radius, font)
- [ ] Spark CSS is imported as a module or global stylesheet
- [ ] Button component has a `variant="spark"` and renders the special structure
- [ ] All props and accessibility features are supported
- [ ] Works in all sizes, light/dark mode, and with different text
- [ ] Documented in design system and codebase

---

**Note:** The static HTML demo is a proof of concept. For production, always use theme variables and React integration.
