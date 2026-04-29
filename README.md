# ICE DS

Living design system + component library for Ice's personal brand. Neubrutalism with modern polish.

## Quick start

```bash
npm install
npm run storybook         # http://localhost:6006
npm run build-storybook   # static build → storybook-static/
```

Requires Node 18+ and pnpm (or npm/yarn — just swap the command).

## What's in the box

- **Storybook 8** as the living documentation and QA surface
- **Component library** — Button, Badge, Card, Input/Textarea/Select, Alert, Modal, Table
- **Design tokens** — colors, typography, shadows, spacing — wired into Tailwind
- **CVA-based variants** — type-safe, declarative, greppable
- **Radix primitives** for accessibility (Modal uses Radix Dialog)
- **a11y addon** enabled in Storybook — check the panel before shipping any new component

## Project structure

```
src/
├── components/       # One folder per component: {Name}.tsx + {Name}.stories.tsx
├── foundations/      # Colors, Typography, Shadows — living docs
├── lib/              # cn() utility
├── styles/           # Global CSS + Tailwind entry
└── tokens/           # TS exports of design tokens (for stories + consumers)
```

## Adding a new component

1. Create `src/components/{Name}/{Name}.tsx` — use `cva()` for variants, `forwardRef()` for refs.
2. Create `src/components/{Name}/{Name}.stories.tsx` — include per-variant stories **and** an `AllVariants` overview.
3. Export it from `src/index.ts`.
4. Run Storybook, open the a11y panel, verify it passes AA.

## Consuming in an app

This package isn't published to npm — use it as a workspace package or copy the files into your project. The tokens in `tailwind.config.js` can be pasted into your app's config as-is.

## Rules

See `ICE_DESIGN_SYSTEM.md` (in the parent repo) for the full spec. The short version:

- `neo-black` text on every colored surface. No exceptions.
- `neo-yellow` is the primary CTA color. Only.
- `neo-pink` and `neo-purple` are decorative. Never semantic.
- Hard offset shadows only. Use `shadow-brutal-*` tokens.
- Hover = translate -2/-2 + shadow grows. Active = both collapse to 0.
- No italics. Bold for emphasis.
