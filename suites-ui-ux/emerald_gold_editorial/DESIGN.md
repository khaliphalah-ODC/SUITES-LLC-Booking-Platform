---
name: Emerald & Gold Editorial
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#404944'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
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
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e4e4cc'
  tertiary-fixed-dim: '#c8c8b0'
  on-tertiary-fixed: '#1b1d0e'
  on-tertiary-fixed-variant: '#474836'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style
The design system embodies the essence of "The SUITES LLC" through a lens of modern luxury and quiet confidence. It balances the lush, tropical heritage of Liberia with a sophisticated editorial aesthetic. The visual language is defined by a sense of calm, exclusivity, and impeccable service.

The design style is **Editorial Minimalism** with **Tactile Refinement**. It utilizes generous white space (the "luxury of space") to let high-quality photography and elegant typography breathe. The interface feels like a high-end travel monograph—structured, intentional, and timeless. Subtle use of gold accents and thin borders provides a framework that feels structured yet light.

## Colors
The palette is rooted in the deep, saturated tones of the Liberian landscape paired with the warmth of luxury hospitality.

- **Primary (Dark Emerald):** Used for primary navigation, headings, and high-impact background blocks. It represents growth and prestige.
- **Secondary (Muted Gold):** Reserved for interactive accents, calls to action, and decorative elements like icons or dividers. It should be used sparingly to maintain its value.
- **Backgrounds (Warm White & Soft Beige):** These provide a soft, low-glare canvas that feels more inviting than pure white, enhancing the "warmth" of the brand.
- **Text (Charcoal):** Used for body copy to ensure maximum legibility without the harshness of pure black.

## Typography
The typography strategy creates a high-contrast hierarchy that mimics a premium magazine layout.

- **Headings:** Utilize **Playfair Display**. This typeface brings a classical, authoritative elegance to the brand. Use "Display" sizes for hero sections and property names, ensuring the weight is sufficient to stand out against Emerald backgrounds in gold or white.
- **Body & UI:** Utilize **Inter**. Its neutral, systematic nature provides a functional counterpoint to the expressive serif. It ensures clarity in booking flows, descriptions, and fine print.
- **Letter Spacing:** Apply generous tracking to uppercase labels (0.1em) to evoke a sense of luxury and architectural precision.

## Layout & Spacing
This design system uses a **Fixed Grid** philosophy on desktop and a **Fluid Fluid** approach on mobile. 

- **Desktop:** A 12-column grid with a maximum container width of 1280px. Large 64px outer margins are used to center the content, creating an "island" effect that feels exclusive and controlled.
- **Rhythm:** We utilize a base 8px scale. For luxury layouts, we prioritize larger gaps—specifically the "Section Gap" (120px)—between distinct content blocks to avoid visual clutter.
- **Editorial Alignment:** Elements should often be offset. For example, an image may span 7 columns while its caption occupies 3 columns in the opposite gutter, creating an asymmetric, sophisticated balance.

## Elevation & Depth
Depth is communicated through **Tonal Layering** and **Ambient Shadows** rather than heavy physical metaphors.

- **Surface Tiers:** The base layer is Warm White. Overlays (like modals or booking widgets) use Soft Beige or pure White with a very soft, diffused shadow (0% offset, 20px blur, 5% opacity Charcoal).
- **Glassmorphism:** For mobile navigation and header backgrounds during scroll, use a subtle backdrop blur (12px) with a semi-transparent Warm White fill (90% opacity).
- **Outlines:** Use thin, 1px borders in Muted Gold or a very faint Charcoal (10% opacity) to define cards and sections without adding visual weight.

## Shapes
The shape language is **Soft and Architectural**. While the overall layout is structured and grid-based, elements have a slight radius to feel approachable and "human."

- **Standard Elements:** Buttons, input fields, and cards use a 4px (0.25rem) radius.
- **Large Elements:** Featured property images or large containers use an 8px (0.5rem) radius.
- **Icons:** Use thin-stroke (1.5px or 2px) icons with slightly rounded corners to match the UI's refinement.

## Components
- **Buttons:**
  - *Primary:* Solid Dark Emerald with Gold text or White text. High-contrast, 4px radius.
  - *Secondary:* Ghost style with a 1px Gold border and Gold text.
  - *CTA:* Gold background with Emerald text for "Book Now" or critical actions.
- **Inputs:** Underlined or 1px bordered boxes using Soft Beige backgrounds. Labels should be uppercase Inter (label-md).
- **Cards:** 1px faint border, no shadow unless hovered. When hovered, apply the Ambient Shadow. Images within cards should have a subtle zoom-in transition.
- **Chips/Badges:** Used for amenities (e.g., "WiFi", "Pool"). Soft Beige background with Charcoal text, 100px radius for a pill-shape.
- **Dividers:** Use thin Gold lines (1px) to separate editorial sections or menu items.
- **Specialty Component - The "Suite Header":** A combination of a Playfair Display title and a gold-accented "Experience" label positioned above it.