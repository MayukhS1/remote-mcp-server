---
name: storybrand-brandscript
description: Builds a StoryBrand SB7 BrandScript and one-liner for a business, product, or nonprofit by interviewing the user, then saves it to `.agents/brandscript.md`. Use when the user wants to clarify their brand message, positioning, value proposition, elevator pitch, tagline, or "what do we actually do" statement, or before writing marketing copy when no BrandScript exists.
---

# StoryBrand BrandScript

Customer is the hero. Brand is the guide. If you confuse, you'll lose.

## Quick start

1. Load context (below)
2. Scope the BrandScript
3. Interview SB7 modules one at a time
4. Lint against [references/rules.md](references/rules.md)
5. Write the one-liner (3 variants)
6. Save `.agents/brandscript.md` from [references/brandscript-template.md](references/brandscript-template.md)

## Load context first

Before asking questions, read any that exist:

- `.agents/brandscript.md` (if present: refine mode, only ask about gaps)
- `.agents/product-marketing.md` (or `.claude/product-marketing.md`, or legacy `product-marketing-context.md`)
- Any URL, README, reviews, or sales notes the user provides

Ask only for what is missing.

## Scope

Confirm whether this BrandScript is for the whole brand, a division, a product, or a customer segment. Do the overall brand first. Multiple revenue streams share one umbrella desire; treat the rest as subplots with their own BrandScripts later.

## Interview rules

- One module at a time, in SB7 order (see [references/modules.md](references/modules.md))
- For each module: brainstorm 3–5 candidates with the user, then make them **decide on one**
- One question per turn (grill-me style)
- Completion criterion: every module has exactly one chosen message (success and failure are bullet lists; identity is one From → To)

### Module order

1. Character (one desire, survival-linked)
2. Problem (one villain + external / internal / philosophical)
3. Guide (empathy + authority)
4. Plan (named process, 3–4 steps; optional agreement plan)
5. CTA (one direct + one transitional)
6. Failure (~3 bullets, salt not dump)
7. Success (many specific bullets)
8. Identity (write "To" first, then "From")

## One-liner

Format: Character + Problem + Plan + Success. Offer 3 variants plus a weak contrast ("I run a gym"). Test: say it to a stranger; if they ask for your card, it works.

## Save

Write `.agents/brandscript.md` using the exact headings in the template so other skills can parse it. Include a short "Decisions and open questions" section at the end. Pass final prose through **human-writer** (active voice, "you", no em dashes).

## Hand-offs

- **storybrand-review**: audit existing site or brand copy against this BrandScript
- **human-writer**: polish prose
- **frontend-design** / **web-design-guidelines**: visuals and layout only (clarify message before design)
- **seo-audit**: rankings and technical SEO, not messaging
