import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundations/Typography",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Space Grotesk (display + headings) + Inter (body) + JetBrains Mono (code + data). All three are variable fonts, self-hosted via @fontsource-variable.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const scale = [
  { cls: "text-display", token: "display", size: "5.5rem / 88px", note: "Landing hero only" },
  { cls: "text-h1", token: "h1", size: "3.75rem / 60px", note: "Page titles" },
  { cls: "text-h2", token: "h2", size: "2.75rem / 44px", note: "Section headers" },
  { cls: "text-h3", token: "h3", size: "2rem / 32px", note: "Subsections" },
  { cls: "text-h4", token: "h4", size: "1.5rem / 24px", note: "Card titles" },
  { cls: "text-h5", token: "h5", size: "1.25rem / 20px", note: "Small headers" },
  { cls: "text-h6", token: "h6", size: "1rem / 16px", note: "Uppercase eyebrow" },
  { cls: "text-body-lg", token: "body-lg", size: "1.125rem / 18px", note: "Lead paragraphs" },
  { cls: "text-body", token: "body", size: "1rem / 16px", note: "Default" },
  { cls: "text-body-sm", token: "body-sm", size: "0.875rem / 14px", note: "Captions, meta" },
  { cls: "text-micro", token: "micro", size: "0.75rem / 12px", note: "Uppercase labels, badges" },
];

export const TypeScale: Story = {
  render: () => (
    <div className="p-8 space-y-6 max-w-5xl">
      <div>
        <h2 className="font-display text-h2 mb-2">Type scale</h2>
        <p className="text-body-lg max-w-prose">
          One H1 per page. Eyebrow (<code>h6</code> uppercase){" "}
          <code>tracking-wider</code> above major section headers. Body copy
          always left-aligned, 60–75 characters per line.
        </p>
      </div>
      <div className="space-y-6 border-2 border-neo-black rounded-md shadow-brutal-md p-8 bg-neo-offwhite">
        {scale.map(({ cls, token, size, note }) => (
          <div
            key={token}
            className="flex items-baseline justify-between gap-6 pb-6 border-b-2 border-neo-black last:border-b-0 last:pb-0"
          >
            <div className="flex-1 min-w-0">
              <p
                className={`${cls} ${
                  token.startsWith("h") || token === "display"
                    ? "font-display font-bold"
                    : "font-sans"
                }`}
                style={{
                  letterSpacing:
                    token === "display"
                      ? "-0.04em"
                      : token === "h1"
                      ? "-0.03em"
                      : undefined,
                }}
              >
                {token === "display" || token === "h1"
                  ? "Ship fast. Ship sharp."
                  : token === "micro"
                  ? "EYEBROW / LABEL"
                  : "The quick brown fox jumps over the lazy dog"}
              </p>
            </div>
            <div className="text-right shrink-0 font-mono text-xs space-y-1">
              <p className="font-bold uppercase">{token}</p>
              <p>{size}</p>
              <p className="text-neo-black-700">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FontFamilies: Story = {
  render: () => (
    <div className="p-8 space-y-6 max-w-4xl">
      <h2 className="font-display text-h2 mb-4">Font families</h2>
      <div className="space-y-6">
        <div className="border-2 border-neo-black rounded-md p-6 bg-neo-offwhite shadow-brutal">
          <p className="font-mono text-xs uppercase tracking-wider mb-2 text-neo-black-700">
            Display / Headings — Space Grotesk
          </p>
          <p className="font-display text-h1 font-bold">
            Production-grade websites
          </p>
          <p className="font-display text-h3 mt-2">
            Hard edges. Honest design.
          </p>
        </div>

        <div className="border-2 border-neo-black rounded-md p-6 bg-neo-offwhite shadow-brutal">
          <p className="font-mono text-xs uppercase tracking-wider mb-2 text-neo-black-700">
            Body — Inter
          </p>
          <p className="font-sans text-body-lg">
            Inter is a typeface carefully crafted and designed for computer
            screens. It has a tall x-height to aid in readability of mixed-case
            and lower-case text.
          </p>
          <p className="font-sans text-body mt-3">
            Body default at 16px. Comfortable reading measure around 65
            characters per line.
          </p>
        </div>

        <div className="border-2 border-neo-black rounded-md p-6 bg-neo-offwhite shadow-brutal">
          <p className="font-mono text-xs uppercase tracking-wider mb-2 text-neo-black-700">
            Mono — JetBrains Mono
          </p>
          <pre className="font-mono text-sm bg-neo-black text-neo-offwhite p-4 rounded overflow-x-auto">
            {`const btn = cva([
  "border-2 border-neo-black",
  "shadow-brutal",
  "transition-all duration-150",
]);`}
          </pre>
          <p className="font-mono text-sm mt-3 tabular-nums">
            Tabular figures: 1,234.56 / 9,876.54 — align in tables.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const UsageExample: Story = {
  render: () => (
    <div className="p-8 max-w-3xl">
      <h2 className="font-display text-h2 mb-6">In context</h2>
      <article className="border-2 border-neo-black rounded-md p-10 bg-neo-offwhite shadow-brutal-lg space-y-5">
        <p className="text-h6 font-mono uppercase tracking-wider text-neo-pink font-semibold">
          Case study
        </p>
        <h1 className="font-display text-h1 font-bold">
          Rebuilt rev6.fit in 3 months
        </h1>
        <p className="text-body-lg max-w-prose">
          A fitness SaaS that needed a custom member portal, booking system,
          and Stripe integration. Legacy WordPress was creaking under load.
        </p>
        <p className="text-body max-w-prose">
          Replaced the entire stack with Django + React, migrated 3,400 active
          members with zero downtime, and shipped to production in under 90
          days.
        </p>
        <p className="text-body-sm text-neo-black-700 font-mono">
          April 2026 · 12 min read
        </p>
      </article>
    </div>
  ),
};
