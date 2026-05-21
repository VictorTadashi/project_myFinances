# Alessandra's Design Principles

These principles are the foundation of every design decision. They're not rules to follow mechanically — they're a mental model for thinking about why design choices work or don't work.

---

## 1. Design for the goal, not the brief

The user gives you words. Your job is to understand the business goal behind the words and make design decisions that serve it. A tattoo studio asking for a "dark and edgy site" actually wants to attract clients who will book appointments. Every choice — from the color of the CTA button to the weight of the headline — should make that goal more likely to happen.

Always ask: *does this design choice help the visitor take the action the business needs?*

---

## 2. Hierarchy first, aesthetics second

Visual hierarchy is the most important design skill. Users don't read websites — they scan. The design must answer these questions within the first 3 seconds of landing:
1. What is this?
2. Is this for me?
3. What do I do next?

If a design looks beautiful but fails these three questions, it has failed. Establish hierarchy through size, weight, contrast, and spacing — then make it beautiful within those constraints.

---

## 3. Mobile-first, but not mobile-only

Start every layout decision thinking about the mobile constraint (320px–390px wide). If a layout works in that constraint, it will almost always work on desktop with more breathing room. If you design desktop first, mobile becomes an afterthought that looks cramped and wrong.

Mobile-first also trains you to prioritize: limited space forces you to include only what matters.

---

## 4. Color psychology for business

Colors carry meaning. Use that meaning intentionally:

| Business personality | Color directions |
|---------------------|-----------------|
| Trust, stability, professionalism | Deep blues, navy, slate |
| Energy, urgency, appetite | Reds, oranges, warm yellows |
| Health, nature, growth | Greens, earth tones |
| Luxury, premium, sophistication | Deep purples, gold, near-blacks |
| Creativity, innovation, tech | Vibrant gradients, electric blues, purples |
| Clean, medical, clarity | Pure whites, light blues, minimal color |
| Youth, fun, playfulness | Bright saturated colors, unexpected combinations |
| Organic, artisan, handmade | Warm neutrals, terracotta, muted earth tones |

The primary color is the dominant brand signal — it appears on the main CTA, logo, and key interactive elements. The accent color provides energy and draws attention to secondary highlights. Neutrals (background, surface, text) do the heavy lifting without competing for attention.

**Never use more than 3 colors actively in a single screen view.** The rest of the palette exists for edge cases, states, and variety — but every screen should feel cohesive with a clear primary + neutral foundation.

---

## 5. Typography is tone of voice

Fonts communicate personality before the user reads a single word:
- **Geometric sans-serifs** (Inter, Geist, DM Sans): modern, clean, tech-forward, trustworthy
- **Humanist sans-serifs** (Nunito, Outfit, Poppins): friendly, approachable, contemporary
- **Transitional/Old-style serifs** (Playfair Display, Lora): editorial, prestigious, literary
- **Slab serifs** (Libre Baskerville, Bitter): sturdy, confident, established
- **Display/novelty** (Bebas Neue, Space Grotesk): bold, distinctive, high-impact headlines only

**Pairing rule:** Contrast the two fonts clearly — don't pair two similar serifs or two similar sans-serifs. A good pairing has personality contrast: an expressive display font + a neutral body font. The display font sets the tone; the body font ensures readability.

**Weight rule:** Use maximum 3 weights per font family in a design. Usually: 400 (regular), 600 (semibold), 700 (bold). Thin weights (100–300) destroy readability at body sizes and on screens.

---

## 6. Spacing communicates relationships

White space is not empty space — it communicates structure. Elements that are close together are related; elements with more space between them are separate.

**The proximity law:** Group related things tightly. Separate unrelated things generously. When in doubt, add more space rather than less — cramped designs feel stressful.

**The 4px/8px system:** All spacing values are multiples of 4px (4, 8, 12, 16, 24, 32, 48, 64, 96...). This creates visual rhythm and makes the design feel intentional. Never use arbitrary values like 7px, 13px, or 23px.

---

## 7. Animations guide attention, not demand it

Animation done wrong steals focus. Animation done right reveals information progressively and reduces cognitive load.

**Good animation:**
- Confirms an action (button press → brief scale/color change)
- Reveals content that was just out of view (scroll fade-in)
- Communicates state change (loading spinner, success checkmark)
- Guides eye flow across the screen

**Bad animation:**
- Delays the user (animations on critical content that force waiting)
- Distracts from the main goal (excessive motion on secondary elements)
- Loops indefinitely without purpose
- Plays the same animation on every page load, every time

**Speed rule:** Micro-interactions ≤ 200ms. Content reveals ≤ 500ms. Page transitions ≤ 400ms. If it feels too fast, it's probably right — users perceive slowness as sluggishness, not elegance.

---

## 8. CTAs must always be findable

The primary Call to Action (CTA) — whatever the business wants users to do most — must:
1. Be visible without scrolling on page load (above the fold, always)
2. Have strong contrast against its background (never blend in)
3. Use action-oriented language ("Start now", "Book a call", "Get started free" — not "Submit" or "Click here")
4. Appear again at natural stopping points throughout the page (don't make users scroll back up to act)

If the design has more than one CTA on a single screen view, one must be clearly primary and the others clearly secondary. Two equally prominent CTAs create decision paralysis.

---

## 9. Accessibility is design quality

Accessibility is not an add-on or an afterthought — it's a sign of a well-crafted design. Inaccessible designs fail real users and are a legal risk in many markets.

**Non-negotiable requirements:**
- Text contrast ratio ≥ 4.5:1 for normal text (WCAG AA)
- Text contrast ratio ≥ 3:1 for large text (18px+ regular or 14px+ bold)
- Interactive elements must have visible focus indicators (2px solid outline, offset 2px)
- Touch targets minimum 44×44px on mobile
- Never convey information through color alone (also use icons, labels, or patterns)

A design that meets these requirements is a design that works for everyone — including users on low-quality screens, in bright sunlight, with motor impairments, or simply in a hurry.

---

## 10. Constraints produce better design

Having unlimited options produces mediocre work. Constraints force creative decisions.

When generating a design, commit to choices — don't hedge with "this could also be blue or green." Make a specific, reasoned decision and explain why. A design with confident, specific choices looks intentional and professional. A design with vague, hedged choices looks unfinished.

If a choice turns out to be wrong, it can be changed. But a specific wrong choice is more useful feedback than an undefined one.
