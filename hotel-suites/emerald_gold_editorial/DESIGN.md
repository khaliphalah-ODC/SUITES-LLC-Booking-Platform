---
name: Emerald & Gold Editorial
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#3f4848'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#707979'
  outline-variant: '#bfc8c8'
  surface-tint: '#296768'
  primary: '#003535'
  on-primary: '#ffffff'
  primary-container: '#014d4e'
  on-primary-container: '#81bdbd'
  inverse-primary: '#95d1d2'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#2e301f'
  on-tertiary: '#ffffff'
  tertiary-container: '#444634'
  on-tertiary-container: '#b3b49d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0eeee'
  primary-fixed-dim: '#95d1d2'
  on-primary-fixed: '#002020'
  on-primary-fixed-variant: '#054f50'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e4e4cc'
  tertiary-fixed-dim: '#c8c8b0'
  on-tertiary-fixed: '#1b1d0e'
  on-tertiary-fixed-variant: '#474836'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-xl:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-padding: 120px
---

## Brand & Style

The design system is rooted in the "Modern Luxury" aesthetic, specifically tailored for a premium hospitality context. It balances the timelessness of a boutique editorial with the sleekness of modern digital interfaces. The emotional goal is to evoke a sense of exclusivity, tranquility, and meticulous curation.

The style leverages **Minimalism** for its core structure—emphasizing generous whitespace and structured layouts—while integrating **Glassmorphism** for functional elements like search bars and navigation overlays. This creates a layered, "aerated" depth that feels high-end and contemporary. The visual narrative is driven by high-quality, large-scale photography that treats imagery as the primary content, supported by precise, elegant typography.

## Colors

This color palette is designed to feel "expensive" through high-contrast pairings and muted secondary tones.

- **Primary (Dark Emerald):** Used for primary backgrounds, hero sections, and high-emphasis UI elements. It provides the "anchor" of the design.
- **Secondary (Gold):** Used sparingly for accents, small decorative icons, and high-priority CTAs to signal luxury and prestige.
- **Tertiary (Soft Beige):** Employed for section backgrounds, card surfaces, and to soften the transition between pure white and dark emerald.
- **Neutral (Charcoal):** Reserved exclusively for body text and labels to ensure maximum legibility without the harshness of pure black.
- **Base (White):** The canvas of the design system, used to create "breathable" space and a clean, gallery-like feel.

## Typography

The typography system relies on the interplay between a classic, high-contrast Serif and a clean, geometric Sans-Serif.

- **Headlines:** Use Playfair Display for all titles and large display moments. This creates an immediate "editorial" feel. Use tighter letter spacing for large sizes to maintain a sleek, premium look.
- **Body & Labels:** Montserrat is used for functional text to ensure clarity and modern utility. Labels and small navigation items should utilize `uppercase` styling with `0.05em` letter spacing to mimic high-end fashion branding.
- **Hierachy:** Always ensure a significant size gap between Display text and Body text to emphasize the "Luxury Boutique" aesthetic.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop to maintain white space "gutters" on the periphery, reinforcing the sense of an open, airy gallery.

- **Desktop:** 12-column grid with a 1280px max-width container. Section vertical padding is intentionally aggressive (120px+) to force focus on one piece of content at a time.
- **Mobile:** 4-column fluid grid with 20px side margins. 
- **Rhythm:** All spacing (padding, margins) must be multiples of 8px. Use generous internal padding within cards (min 32px) to prevent elements from feeling cramped.

## Elevation & Depth

Depth is conveyed through "Atmospheric Layers" rather than heavy, realistic shadows.

1.  **Level 0 (Base):** White or Soft Beige surfaces.
2.  **Level 1 (Cards):** Utilizes a "Soft Layered Shadow" — a dual shadow setup: one very diffused shadow (`0 10px 30px rgba(0,0,0,0.04)`) and one tighter, subtle shadow (`0 2px 4px rgba(0,0,0,0.02)`).
3.  **Level 2 (Glassmorphism):** Floating elements like search bars or navigation headers use a `backdrop-filter: blur(20px)` and a thin, 1px white border at 20% opacity. This suggests a "frosted glass" pane sitting above the imagery.

## Shapes

The design system uses a consistent **Rounded** language to soften the interface and make it feel more inviting and "human."

- **Core Elements:** Cards, image containers, and primary containers use `rounded-xl` (24px) as the standard.
- **Small Elements:** Buttons and input fields use `rounded-lg` (16px) to maintain visual harmony with the larger components.
- **Interactive States:** Avoid sharp corners entirely; even focus states and tooltips should adhere to the rounded logic.

## Components

### Buttons
- **Primary:** Dark Emerald background, White text, 16px radius. Large horizontal padding (32px) for a confident look.
- **Secondary/Ghost:** 1px Emerald or Gold border, transparent background, text matches border color.
- **CTA:** Use Gold only for the most critical actions (e.g., "Book Now").

### Glassmorphism Search Bar
- Centered on hero images. 
- White semi-transparent background (70% opacity) with 20px backdrop-blur.
- Internal dividers should be 1px wide, using a faint Charcoal at 10% opacity.

### Rounded Cards
- 24px corner radius.
- Always include a subtle border (1px) in `Soft Beige` to define the edge against white backgrounds.
- High-quality photography should fill the top half of the card or the entire background (with a dark overlay for text legibility).

### Input Fields
- Soft Beige background with 16px radius.
- On focus, transition border to Gold.
- Label text should be small and uppercase (`label-sm`).

### Lists & Navigation
- Top navigation should be minimal, utilizing the `label-md` style with ample horizontal spacing.
- Use the Gold accent color for active states (dots or underlines).