# StoryBrand review rubric

Pass/fail criteria and rewrite patterns. Adapted from *Building a StoryBrand* (grunt test, SB7, Ch. 12 five things). Pure audit: quote and rewrite lines; do not ship a full wireframe draft.

## Grunt test

Within 5 seconds above the fold, a stranger can grunt:

| Question | Pass | Fail (examples) |
|---|---|---|
| What do you offer? | Clear product/service in plain words | "Committed to excellence since 1979" |
| How will it make my life better? | Outcome or identity shift | Feature dump, company history |
| What do I do to buy? | Visible direct CTA | No button, buried "contact", soft whisper |

**Severity:** fail any → High; fail all three → Critical.

## Five things (sites)

### 1. Offer above the fold

Must do at least one of: aspirational identity · problem solved · exactly what you do.

| Bad | Better |
|---|---|
| Since 1979 we've been committed to excellence… | We sell clothes. We do hair. |
| Innovative solutions for today's challenges | We help you make beautiful websites |
| Welcome to our company | We will make you a pro in the kitchen! |

### 2. Obvious CTAs (Z pattern)

- Logo top left, direct CTA top right, offer + another direct CTA center
- Direct buttons: brighter than everything else, identical, repeated down the page
- Transitional CTA beside direct (less bright): PDF, trial, webinar
- Passive selling ("learn more" only) = soft as a whisper → Medium/High

### 3. Images of success

Happy customers / product in use. Building, stock handshake, or team-only photo without customer win → Medium.

### 4. Revenue streams

One umbrella message, then bite-sized sections per stream linking to their own pages. Competing hero messages on one page → High.

### 5. Very few words

~10 sentences or fewer near the fold. Paragraphs above the fold → flag. Prefer Morse-code bullets ("Weekly conference calls with your child's teacher"). Try cutting half.

## SB7 story checks

| Check | Pass | Fail smell |
|---|---|---|
| Hero ratio | More "you" than "we/our" | Brand-as-hero boast wall |
| One desire | Single clear want | 27 features as "desires" |
| One villain | Singular root source | Villain = "frustration" (feeling) |
| Internal problem | Named | Only external ("we fix pipes") |
| Empathy | Explicit line | Assumed care |
| Authority | ~3 light proofs | 15 testimonials / trophy case |
| Plan | Named, 3–4 steps | No path, or 12-step maze |
| Stakes | ~3 failure beats | Absent, or fearmongering |
| Success | Specific destination | "Excellence" / "solutions" |
| Jargon | Stranger-safe | "f-stop" vs "background is blurry" |
| On script | Maps to BrandScript | Orphan taglines, mission blather |

## Severity guide

- **Critical:** grunt test total failure; no offer and no CTA above the fold
- **High:** brand-as-hero; missing offer or CTA; confusion that blocks purchase
- **Medium:** weak stakes, vague success, jargon, missing plan, image of building
- **Low:** extra words, uneven CTA repeat, authority slightly heavy

## Finding template

```md
### [Short title]
- **Issue:** …
- **Severity:** Critical | High | Medium | Low
- **Evidence:** "quoted line" or screenshot: [region]
- **Module:** Character | Problem | Guide | Plan | CTA | Failure | Success | Identity | off-script
- **Fix:** "rewritten line or short block"
```

## Copy smell test (quick pass)

- Grunt test in 5 seconds?
- Customer the hero? (count you vs we)
- One desire, one villain?
- Internal problem named?
- Empathy and authority both present?
- 3-step plan?
- Direct CTA obvious and repeated, transitional beside it?
- Stakes light; success specific?
- Under ~10 sentences near the fold?
- Any inside jargon?
