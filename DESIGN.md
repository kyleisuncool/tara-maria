---
name: Tara-Maria
description: Healing rooted in presence.
colors:
  parchment: "oklch(96% 0.018 82)"
  sand: "oklch(84% 0.04 62)"
  earth: "oklch(20% 0.02 58)"
  earth-muted: "oklch(20% 0.02 58 / 60%)"
  cream: "oklch(94% 0.015 80)"
  forest: "oklch(38% 0.07 170)"
  teal: "oklch(52% 0.09 198)"
  salmon: "oklch(75% 0.11 42)"
  plum: "oklch(28% 0.14 348)"
typography:
  display:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(3rem, 7vw, 6.5rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Gloock, Georgia, serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Bitter, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Bitter, Georgia, serif"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.2em"
rounded:
  sm: "4px"
  md: "8px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
  "2xl": "96px"
components:
  button-primary:
    backgroundColor: "{colors.salmon}"
    textColor: "{colors.earth}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "oklch(68% 0.11 42)"
  button-ghost:
    textColor: "{colors.earth-muted}"
  button-ghost-hover:
    textColor: "{colors.earth}"
---

# Design System: Tara-Maria

## 1. Overview

**Creative North Star: "The Enchanted Grove"**

Earthy and botanical at the foundation — warm parchment, forest-teal headings, Bitter body text on a sun-warmed page — but inhabited by a quiet magic that reveals itself in small moments. This is not the loud new-age aesthetic: no purple gradients, no crystal imagery, no wellness-influencer pastels. It is the older kind of magic: the kind that lives in forests, in hand-thrown pottery, in the way late-afternoon light hits warm paper. Tara-Maria's personal flair (mermaids, unicorns, the fantastical tucked inside the earthy) surfaces not in literal imagery but in the character of the details. A color that surprises you. An animation that lingers a beat. A botanical illustration that feels slightly more alive than expected.

The site takes its sectional structure from the Valerie Howard school of landing page blocking: strong horizontal breathing, clear divisions, one thing at a time. It takes its personal register from a Rachael Hilliard-style about page philosophy: the person is the product, and the quirks are features, not liabilities. It takes its warmth and luminosity from Sarah Ashley Wheeler's palette direction: premium but approachable spiritual warmth, never clinical.

Both typefaces are serifs — unusual and intentional. Gloock is the voice: architectural, slightly editorial, rendered in Forest so headings feel botanical and alive. Bitter is the body: a slab serif in warm Earth brown, like a sentence set in good ink on good paper. The cool-warm contrast between Forest headings and Earth body text is the typographic signature of this system.

**Key Characteristics:**
- Warm, unhurried, quiet — presence before polish
- Botanical and earthy with water-cool headings and warm body text
- Strong sectional rhythm; one idea per section, generous breathing between them
- Both display and body in serif: an unusual, committed pairing
- Plum held in reserve as the magic color — its rarity is the point
- Whimsy as texture, not costume; it lives in small surprises, not decoration

## 2. Colors: The Grove Palette

Eight tokens. Two tonal registers that meet: warm neutrals from the earth (parchment, sand, earth, cream) and cool botanical depth from the grove (forest, teal, salmon, plum). The warmth dominates at the foundation; the botanical colors carry the voice and magic.

### Primary
- **Teal** (`oklch(52% 0.09 198)`, `#2B8088`): The botanical accent. Used for interactive elements, the tagline label, and the botanical sprig illustration. Water-green, alive, nature-forward. Neither corporate nor New Age.

### Secondary
- **Salmon** (`oklch(75% 0.11 42)`, `#F69D7B`): Warmth and hospitality. The CTA button. Bridges the cool botanical palette back to the earthy warmth. Approachable, not aggressive.

### Tertiary
- **Plum** (`oklch(28% 0.14 348)`, `#74224A`): The magic. Deep plum-burgundy, held in strict reserve. One element at a time, smaller than 2% of any surface. This is the mermaid-at-twilight color, the moment of unexpected depth. Its rarity is the entire point.

### Neutral
- **Sun-Warmed Parchment** (`oklch(96% 0.018 82)`): The primary background. Aged paper, not sterile white. Faintly amber, warm enough to feel inhabited.
- **Warm Sand** (`oklch(84% 0.04 62)`, `#E3CAB6`): The secondary background. Used for alternating section blocks. Sandy canvas, slightly deeper than parchment.
- **Ancient Earth** (`oklch(20% 0.02 58)`): Body text. Dark warm brown, not black. Full opacity for prose; 60–65% for secondary text; 50% for de-emphasized labels.
- **Forest Deep** (`oklch(38% 0.07 170)`, `#32645B`): Display and headline color. Dark forest teal — used exclusively for Gloock headings. The cool botanical gravitas that contrasts against warm Earth body text.
- **Bone Cream** (`oklch(94% 0.015 80)`): Reversed text on dark surfaces, if needed.

### Named Rules
**The Plum Rule.** Plum is never a layout color. Never a background, never body text, never a border. It appears only as a micro-moment: a hover fill, a small accent, an animation beat. One element at a time. The moment plum becomes expected, it stops being magical.

**The No-True-Black Rule.** `#000` and `oklch(0% 0 0)` are prohibited. The darkest value in the system is Ancient Earth at `oklch(20% 0.02 58)`. Tint every dark toward its nearest hue (warm ambers for neutrals, forest teal for depth). Nothing goes fully to black or white.

**The Two-Register Rule.** Every surface in this system uses either the warm register (parchment, sand, earth, cream) or the cool register (forest, teal). Warm register = backgrounds, body text, warmth accents. Cool register = headings, interactive elements, botanical illustration. Never swap registers accidentally: don't put Earth-toned headings against cool-teal backgrounds.

## 3. Typography: The Field Guide Pairing

**Display Font:** Gloock (Google Fonts, weight 400, Latin subset) — rendered in Forest Deep
**Body Font:** Bitter (Google Fonts, variable weight, Latin subset) — rendered in Ancient Earth

**Character:** Two serifs, not a serif-and-sans pairing — this is the commitment. Gloock in Forest brings cool, editorial gravity: a heading that feels grown from the landscape. Bitter in Earth brings slab warmth and sturdy readability: the intimate voice of the practitioner. The temperature contrast between the two — cool Forest headings, warm Earth body — is the typographic heartbeat of the design.

### Hierarchy
- **Display** (Gloock 400, Forest Deep, clamp(3rem, 7vw, 6.5rem), line-height 1.02, tracking -0.02em): The hero headline only. Large, slow, architectural. At most one element per viewport.
- **Headline** (Gloock 400, Forest Deep, clamp(1.75rem, 4vw, 2.5rem), line-height 1.1, tracking -0.015em): Section headings. Same weight and color as Display, smaller scale.
- **Body** (Bitter 400, Ancient Earth, 1rem, line-height 1.6): All prose. Max line length 65–75ch. The slab earns the generous leading.
- **Label** (Bitter 400, Teal, 0.75rem, letter-spacing 0.2em, uppercase): The tagline treatment ("Healing · Grounding · Presence"). Wide tracking transforms Bitter into a composed display tag. Used sparingly — three or four instances maximum per page.

### Named Rules
**The Serif Commitment Rule.** No sans-serif typeface in this system. Every typographic element — display, body, label, caption, UI copy, form placeholder — uses either Gloock or Bitter. The two-serif combination is the signature. Introducing a third font or a sans dissolves it.

**The Display Restraint Rule.** Display scale (clamp 3rem to 6.5rem) appears on at most one element per viewport. The large size works because it is surrounded by silence. A second competing element at that scale collapses the hierarchy.

**The Color-to-Font Rule.** Gloock = Forest. Bitter = Earth (or Teal for labels). These pairings are not decorative — they encode the cool/warm register split into the typographic system. Reversing them (warm Gloock, cool Bitter) breaks the design logic.

## 4. Elevation

This system is flat by doctrine. There are no box-shadows, no backdrop-filter blurs, no layered translucency. Depth is conveyed through tonal contrast (warm parchment vs. cool forest) and through spatial separation: generous vertical whitespace between sections. The palette already creates natural depth through its two registers; shadows would introduce redundant visual weight.

**The Flat-and-Warm Rule.** If a surface needs a shadow to feel distinct, the problem is color or spacing, not missing elevation. Fix those instead. One exception: if a popped state ever requires visual lift (a floating menu, a date picker), use a single ambient shadow (`0 4px 24px oklch(20% 0.02 58 / 12%)`) and nothing harder. When in doubt, omit.

## 5. Components

### Buttons
The CTA button is warm and inviting — salmon, not aggressive. Dark Earth text for clear contrast.

- **Shape:** Gently rounded corners (4px). Not pill-shaped, not square. A whisper of radius.
- **Primary:** Salmon fill (`oklch(75% 0.11 42)`) · Ancient Earth text · Bitter 0.875rem · tracking 0.025em · padding 12px 24px
- **Hover:** Slightly deeper salmon (`oklch(68% 0.11 42)`) · transition 0.2s ease-out · no scale, no shadow
- **Focus:** 2px outline, Teal, 3px offset. Visible and on-brand.
- **Ghost / Text Link:** Ancient Earth at 60% opacity · hover to full Ancient Earth · no underline at rest · Bitter 0.875rem · transition 0.2s ease-out

### Navigation
Minimal, horizontal, two-element. The brand name in cool Forest signals botanical depth from the first moment.

- **Structure:** Site name (Gloock 400, Forest Deep, 1.25rem, tracking-tight) left · "Healer" (Bitter, Ancient Earth 50%, 0.75rem, tracking 0.2em, uppercase) right
- **Background:** Parchment, no border, no shadow — the nav dissolves into the page
- **Mobile:** Reduce horizontal padding from 64px to 32px. Same two elements.

### Botanical Sprig (Signature Component)
The SVG sprig at 20% Teal — cool, botanical, quietly fantastical. Its hand-drawn quality is the whimsy anchor of the system.

- **Color:** Always `currentColor` — set the containing element's color to `text-teal/20` to control it
- **Opacity:** 20% default (background-decorative). May appear at 40–60% in emptier compositions.
- **Scale:** 160px default, 208px on large screens
- **Animation potential:** A slow, biological sway using CSS `transform` on the path (never layout properties). If added: ease-out-expo, long duration (3–5s), reduced-motion gated.

### Future Components
- **Service descriptions:** Text-forward. Each service gets a section or a full-width typographic row — not a card in a grid.
- **Events:** Dates in Gloock Forest at headline scale, details in Bitter Earth. No icons necessary.
- **Newsletter signup:** Bitter input field + Salmon submit button, inline. Never modal.
- **About section:** Tara-Maria centered, personality-forward. The plum color lives here as a micro-accent — a small decorative flourish that signals the magical side. Follow the Rachael Hilliard model: let the person be present, let the quirks be visible.

## 6. Do's and Don'ts

### Do:
- **Do** use OKLCH for all color values. The palette is OKLCH-native; sRGB approximations lose the calibrated warmth and cool.
- **Do** render Gloock headings in Forest Deep. The cool/warm typographic contrast is the system's signature — don't neutralize it.
- **Do** give every section strong breathing room. One clear idea per section, generous vertical whitespace above and below.
- **Do** use Salmon for primary CTAs. Warm, inviting, never aggressive.
- **Do** hold Plum in reserve. One element, smaller than 2% of any surface, never expected. The Plum Rule is absolute.
- **Do** let Tara-Maria's personality be the center. The about page is where the mermaids and unicorns live — as character, as specificity, as the reason a visitor chooses her.
- **Do** respect `prefers-reduced-motion`. All animations are gated; maintain that on every new animated element.
- **Do** keep body line length at 65–75ch. The slab serif reads best at this measure.

### Don't:
- **Don't** use sans-serif fonts. The two-serif commitment is the signature; any sans dissolves it.
- **Don't** use gradient text (`background-clip: text` with a gradient). Prohibited.
- **Don't** use side-stripe borders (`border-left` or `border-right` greater than 1px as a colored accent). Never.
- **Don't** put Earth-colored Gloock headings against a Teal or Forest background. The Two-Register Rule governs — cool register for headings, warm register for backgrounds and body.
- **Don't** make the site look like a generic spa: no stock candle photos, no cursive-on-beige, no teal accents used generically (Teal here is specific and botanical, not "wellness blue").
- **Don't** use loud new-age aesthetics: no purple gradients, no heavy crystal imagery, no overdone mystical iconography.
- **Don't** use trendy wellness-influencer pastels: no muted pink-beige, no sage-and-terracotta mood board palette.
- **Don't** build services as an identical card grid. Text-forward structure, always.
- **Don't** open a modal as the first instinct for booking, newsletter, or contact. Inline and progressive alternatives first.
- **Don't** add a third typeface. The system has two fonts and needs no others.
- **Don't** deploy Plum as a layout color, background, or text color. The Plum Rule is absolute.
