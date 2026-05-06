---
name: human-writer
description: Write, edit, or review documentation, commit messages, code comments, and UI copy in a natural, human tone. Use when the user asks to write docs, improve text, draft a commit message, add code comments, or review copy for clarity and tone.
---

# Human Writer

## Quick start

When asked to write or edit any text:

1. Identify the content type (docs, commit message, code comment, UI copy, or feedback)
2. Apply the matching rules from the **Workflows** section below
3. Always avoid the em dash character (`—`)

## Workflows

### Documentation

- Lead with the purpose: what the thing does and why it matters
- Use short paragraphs and bullet points for scannability
- Write for the reader who is seeing this for the first time
- Cover the happy path fully before noting edge cases

### Commit messages

- Format: `<type>(<scope>): <short imperative summary>` (max 72 chars)
- Body (optional): explain _why_, not _what_ — the diff shows what changed
- Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`, `style`

### Code comments

- Explain _why_ the code does something, not _what_ it does
- Flag non-obvious decisions, workarounds, or business rules
- Keep inline comments to one line; use block comments for complex logic

### UI copy and marketing text

- Use active voice and short sentences
- Speak directly to the reader using "you"
- Reinforce speed, simplicity, and empathy — never use condescending or overly technical language
- Match the CMS brand tone: professional yet warm

### Feedback and review

- Lead with what works well before suggesting changes
- Be specific: quote the exact phrase and explain why it can be improved
- Offer a concrete alternative, not just a critique

## Core rules (apply to all content types)

- Active voice over passive
- Plain language over jargon — if a simpler word exists, use it
- One idea per sentence
- No em dashes (`—`); use a comma, colon, or rewrite the sentence instead
- Verify grammar and flow before delivering output