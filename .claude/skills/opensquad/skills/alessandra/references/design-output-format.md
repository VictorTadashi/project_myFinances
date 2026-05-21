# Design Document Template

Use this exact structure for every design document Alessandra produces. Fill every section — if something truly doesn't apply, write a one-line explanation of why, don't leave it blank.

---

```markdown
# Design Document: [Project Name]
**Version:** 1.0  
**Prepared by:** Alessandra  
**Date:** [YYYY-MM-DD]

---

## 1. Project Overview

**Business:** [What the company/project is]  
**Target audience:** [Who visits this site, their context and expectations]  
**Primary goal:** [The one thing a visitor should do — be specific]  
**Design concept:** [Concept name — one-sentence description]  
**Pages in scope:** [List all pages being designed, e.g., Home, About, Contact]

---

## 2. Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | [name] | #XXXXXX | Main CTAs, key interactive elements, brand identity |
| Primary Dark | [name] | #XXXXXX | Primary hover states, pressed states |
| Secondary | [name] | #XXXXXX | Supporting accents, secondary actions |
| Accent | [name] | #XXXXXX | Highlights, badges, special callouts |
| Background | [name] | #XXXXXX | Page background |
| Surface | [name] | #XXXXXX | Cards, modals, elevated components |
| Text Primary | [name] | #XXXXXX | Headings, body text on light backgrounds |
| Text Secondary | [name] | #XXXXXX | Subtitles, captions, placeholder text |

**Contrast ratios (WCAG AA):**
- Text Primary on Background: [ratio] ✓
- Text Primary on Surface: [ratio] ✓
- Primary (button text) on Primary bg: [ratio] ✓

**Color psychology note:** [1-2 sentences explaining why these specific colors were chosen for this business]

---

## 3. Typography

**Display font:** [Family name] — [Google Fonts import URL]  
**Body font:** [Family name] — [Google Fonts import URL]

### Type Scale

| Token | Size (px) | Size (rem) | Weight | Line Height | Usage |
|-------|-----------|------------|--------|-------------|-------|
| display | 64px | 4rem | 700 | 1.1 | Hero headlines |
| h1 | 48px | 3rem | 700 | 1.15 | Page titles |
| h2 | 36px | 2.25rem | 600 | 1.2 | Section headings |
| h3 | 28px | 1.75rem | 600 | 1.3 | Card titles, sub-sections |
| h4 | 22px | 1.375rem | 600 | 1.35 | Minor headings |
| body-lg | 18px | 1.125rem | 400 | 1.6 | Lead paragraphs, intros |
| body | 16px | 1rem | 400 | 1.6 | Default body text |
| body-sm | 14px | 0.875rem | 400 | 1.5 | Secondary info |
| caption | 12px | 0.75rem | 500 | 1.4 | Labels, metadata, legal |
| button | 15px | 0.9375rem | 600 | 1 | Button labels (uppercase optional) |

---

## 4. Spacing & Grid

**Base unit:** 4px (all spacing is multiples of this)  
**Container max-width:** [px]  
**Column count:** [12 or 6 for simpler layouts]  
**Column gutter:** [px]  
**Section vertical padding:** [px] desktop / [px] mobile

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Tight inline gaps |
| space-2 | 8px | Icon-to-text gap, input padding |
| space-3 | 12px | Small internal padding |
| space-4 | 16px | Default component padding |
| space-6 | 24px | Card padding, list item gap |
| space-8 | 32px | Section sub-element separation |
| space-12 | 48px | Large spacing between elements |
| space-16 | 64px | Section internal padding |
| space-24 | 96px | Section vertical margin |

---

## 5. Page Sections

### [Section Name — e.g., Navbar]

**Purpose:** [Why this section exists and what it achieves]

**Desktop layout (1200px+):**  
[Describe the layout. Be specific: what elements, their arrangement, alignment, sizes. Use grid columns if relevant. Example: "Fixed top bar, full-width. Logo left-aligned in col 1-2. Navigation links centered in col 5-8. CTA button right-aligned in col 11-12. Height: 72px."]

**Mobile layout (<768px):**  
[How it changes. Example: "Logo left, hamburger menu right. Nav collapses into full-screen overlay on open."]

**Elements:**
- [Element 1]: [description]
- [Element 2]: [description]

---
*(repeat for every section: Hero, Features, How It Works, Social Proof / Testimonials, Pricing (if applicable), FAQ (if applicable), CTA Banner, Footer)*
---

---

## 6. Component Inventory

### Button

**Variants:**
- `primary` — filled with Primary color, white label
- `secondary` — outlined with Primary color border, Primary label
- `ghost` — no border, Primary label, transparent background
- `destructive` — filled red, for delete/cancel actions

**Sizes:**
- `lg`: padding 14px 28px, font 15px, border-radius [px]
- `md`: padding 10px 20px, font 14px, border-radius [px]
- `sm`: padding 6px 14px, font 13px, border-radius [px]

**States per variant:**
- Default: [describe]
- Hover: [describe — e.g., "10% darker background, subtle lift with box-shadow"]
- Active/Pressed: [describe]
- Disabled: 40% opacity, cursor: not-allowed, no interaction
- Focus: 2px offset outline using Accent color (accessibility)

---

### Card

**Variants:**
- `default` — white surface, subtle shadow
- `featured` — Primary color border or background tint
- `minimal` — no border or shadow, just padding

**Structure:** [padding, border-radius, shadow spec]  
**Hover:** [describe transition]

---

### Input / Form Field

**States:** Default, Focus, Filled, Error, Disabled  
**Specs:** [border, border-radius, padding, font size, label position]  
**Error state:** [color, message placement]

---

### Navigation Link

**States:** Default, Hover, Active (current page)  
**Transition:** [describe]

---

*(add any project-specific components: modals, tabs, accordions, badges, testimonial cards, pricing cards, etc.)*

---

## 7. Animation & Interaction Specs

### Micro-interactions (< 300ms)

| Element | Trigger | Property | Duration | Easing |
|---------|---------|----------|----------|--------|
| Button primary | hover | background-color | 180ms | ease |
| Button primary | hover | transform (lift) | 180ms | ease |
| Nav link | hover | color, underline | 150ms | ease |
| Card | hover | box-shadow, transform | 200ms | ease |
| Input | focus | border-color | 150ms | ease |

### Scroll Animations (< 600ms)

All scroll animations use Intersection Observer. Trigger when element enters viewport at 15% threshold. Apply `will-change: transform, opacity` only while animating, then remove.

| Pattern | Elements | Effect |
|---------|----------|--------|
| Fade-up | Section headings, intro paragraphs | opacity 0→1, translateY 24px→0 |
| Fade-in | Cards, images, icons | opacity 0→1 |
| Stagger | Feature lists, card grids | each item delays by 80ms from previous |
| Counter | Stats/numbers | count up from 0 to final value |

### Page Load

| Element | Effect | Delay |
|---------|--------|-------|
| Navbar | fade-in from top | 0ms |
| Hero headline | fade-up | 100ms |
| Hero subtext | fade-up | 250ms |
| Hero CTA | fade-up | 400ms |
| Hero image/visual | fade-in + slight scale 0.97→1 | 300ms |

### Page Transitions (if SPA/multi-page)

Fade out current content (200ms) → fade in new content (200ms). Total: 400ms.

**Performance rules:**
- Only animate `transform` and `opacity` — never `width`, `height`, `top`, `left`, `margin`
- All transitions via CSS unless complex sequencing requires JS
- Respect `prefers-reduced-motion`: wrap all animations in `@media (prefers-reduced-motion: no-preference)`

---

## 8. Image & Asset Specs

### Photography / Illustrations

| Section | Slot | Dimensions | Aspect Ratio | Style description | Alt text suggestion |
|---------|------|------------|--------------|-------------------|---------------------|
| Hero | Main visual | 800×600px | 4:3 | [describe: e.g., "bright lifestyle photo, person using product, clean background"] | [example alt text] |
| [Section] | [slot] | [dimensions] | [ratio] | [style] | [alt] |

**Photography style:** [Describe the consistent visual style: lighting, mood, composition, whether human-centric or abstract, color grading direction]

**If no images provided:** Use CSS gradient placeholders matching the color palette during development. Replace with real photography before launch. See Unsplash collections for suggested search terms: [list 3-5 relevant search terms].

### Icons

**Style:** [outline / filled / duotone]  
**Recommended library:** [e.g., Lucide Icons, Phosphor Icons, Heroicons]  
**Size:** 24×24px default, 20×20px in-line with text, 32×32px feature icons  
**Color:** inherits `currentColor` for easy theming

### Logo

[Notes on logo usage: min size, clear space, color variations required, placement rules]

---

## 9. Design Tokens (CSS Variables)

```css
:root {
  /* Colors */
  --color-primary: #XXXXXX;
  --color-primary-dark: #XXXXXX;
  --color-secondary: #XXXXXX;
  --color-accent: #XXXXXX;
  --color-background: #XXXXXX;
  --color-surface: #XXXXXX;
  --color-text-primary: #XXXXXX;
  --color-text-secondary: #XXXXXX;

  /* Typography */
  --font-display: '[Display Font]', sans-serif;
  --font-body: '[Body Font]', sans-serif;

  --text-display: 4rem;
  --text-h1: 3rem;
  --text-h2: 2.25rem;
  --text-h3: 1.75rem;
  --text-h4: 1.375rem;
  --text-body-lg: 1.125rem;
  --text-body: 1rem;
  --text-body-sm: 0.875rem;
  --text-caption: 0.75rem;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* Layout */
  --container-max: [px];
  --section-padding-y: [px];
  --section-padding-y-mobile: [px];

  /* Borders */
  --radius-sm: [px];
  --radius-md: [px];
  --radius-lg: [px];
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06);
  --shadow-lg: 0 10px 30px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 350ms ease;
}
```

---

## 10. Implementation Notes

**Recommended stack:** [e.g., HTML/CSS/Vanilla JS, React + Tailwind, Next.js + CSS Modules — suggest based on scope and user context]

**Google Fonts import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="[full Google Fonts URL with all weights needed]" rel="stylesheet">
```

**Accessibility checklist:**
- [ ] All images have descriptive alt text
- [ ] Color contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
- [ ] All interactive elements are keyboard-accessible with visible focus states
- [ ] Form fields have associated `<label>` elements
- [ ] Semantic HTML structure: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- [ ] `prefers-reduced-motion` respected for all animations

**Implementation priority (suggested order):**
1. Design tokens & base styles (reset, typography, color variables)
2. Layout system (grid, container, section padding)
3. Navbar (needed on all pages)
4. Hero section (highest business impact)
5. [Next highest-impact section]
6. [Continue in descending order of business priority]
7. Footer
8. Responsive adjustments
9. Animations (add last, after layout is correct)

**Dependencies:**
- [List any external libraries, CDNs, or packages required]

**Browser support:** Modern browsers (Chrome, Firefox, Safari, Edge — last 2 major versions). No IE11 support required unless specified.
```

---

*This template is Alessandra's output contract. A design document that follows this format is complete enough for a frontend agent to implement the site without additional input.*
