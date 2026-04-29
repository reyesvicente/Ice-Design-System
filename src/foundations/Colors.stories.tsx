import type { Meta, StoryObj } from "@storybook/react-vite";
import { brandColors, semanticColors } from "@/tokens";

const meta = {
  title: "Foundations/Colors",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Every brand color holds `neo-black` as AA+/AAA readable text. This is what lets cards rotate through the palette without breaking legibility.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface SwatchProps {
  token: string;
  hex: string;
  role?: string;
  intent?: string;
  textOn?: "black" | "white";
}

function Swatch({ token, hex, role, intent, textOn = "black" }: SwatchProps) {
  const textColor = textOn === "white" ? "#FFFFFF" : "#0F0F0F";
  return (
    <div className="flex flex-col gap-3 border-2 border-neo-black rounded-md shadow-brutal overflow-hidden">
      <div
        className="h-24 flex items-end p-3"
        style={{ backgroundColor: hex, color: textColor }}
      >
        <span className="font-mono text-xs font-bold uppercase tracking-wider">
          Sample text
        </span>
      </div>
      <div className="px-3 pb-3 space-y-1">
        <p className="font-mono text-sm font-bold">{token}</p>
        <p className="font-mono text-xs text-neo-black-700">{hex}</p>
        {role && <p className="text-xs leading-snug mt-2">{role}</p>}
        {intent && (
          <p className="text-xs font-mono uppercase tracking-wider text-neo-black-700 mt-2">
            {intent}
          </p>
        )}
      </div>
    </div>
  );
}

export const BrandPalette: Story = {
  render: () => (
    <div className="p-8 space-y-8 max-w-6xl">
      <div>
        <h2 className="font-display text-h2 mb-2">Brand palette</h2>
        <p className="text-body-lg max-w-prose">
          Seven core tokens. All five brand colors hold black text at AA+
          contrast. Use <code>neo-yellow</code> for primary CTAs,{" "}
          <code>neo-green</code> for success, <code>neo-blue</code> for info —
          everything else is decorative.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {brandColors.map((c) => (
          <Swatch
            key={c.token}
            token={c.token}
            hex={c.hex}
            role={c.role}
            textOn={c.token === "neo-black" ? "white" : "black"}
          />
        ))}
      </div>
    </div>
  ),
};

export const SemanticPalette: Story = {
  render: () => (
    <div className="p-8 space-y-8 max-w-6xl">
      <div>
        <h2 className="font-display text-h2 mb-2">Semantic colors</h2>
        <p className="text-body-lg max-w-prose">
          Reserved for status signals. Don't reuse these for decoration. Users
          rely on consistent color-meaning mapping — rotate it and trust
          breaks.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {semanticColors.map((c) => (
          <Swatch
            key={c.token}
            token={c.token}
            hex={c.hex}
            intent={c.intent}
            textOn={c.token === "neo-red" ? "white" : "black"}
          />
        ))}
      </div>
    </div>
  ),
};

const scales = {
  "neo-yellow": ["#FFFBE0", "#FFF5B8", "#FFE788", "#FFDE59", "#E6C333", "#806D0D"],
  "neo-blue": ["#E0FBFC", "#B8F3F5", "#87EBEF", "#5CE1E6", "#2BB5BA", "#0E5155"],
  "neo-pink": ["#FFE5F3", "#FFC2E4", "#FF94D2", "#FF66C4", "#E03BA3", "#660E48"],
  "neo-green": ["#E8F9DF", "#CFF2B8", "#ABE382", "#7ED957", "#54A52F", "#254A14"],
  "neo-purple": ["#F3E5F8", "#E4C2EE", "#D597E2", "#C678DD", "#A04DBB", "#4F1E61"],
  "neo-black": ["#F5F5F5", "#E0E0E0", "#A6A6A6", "#666666", "#333333", "#1A1A1A", "#0F0F0F"],
};

const stopsByColor: Record<string, string[]> = {
  "neo-yellow": ["50", "100", "300", "500", "700", "900"],
  "neo-blue": ["50", "100", "300", "500", "700", "900"],
  "neo-pink": ["50", "100", "300", "500", "700", "900"],
  "neo-green": ["50", "100", "300", "500", "700", "900"],
  "neo-purple": ["50", "100", "300", "500", "700", "900"],
  "neo-black": ["50", "100", "300", "500", "700", "900", "950"],
};

export const FullScales: Story = {
  render: () => (
    <div className="p-8 space-y-8 max-w-6xl">
      <div>
        <h2 className="font-display text-h2 mb-2">Full scales (50–900)</h2>
        <p className="text-body-lg max-w-prose">
          For hovers, borders, tints. The base <code>500</code> (or{" "}
          <code>950</code> for black) is the brand value — lighter stops for
          backgrounds, darker for text on tinted surfaces.
        </p>
      </div>
      {Object.entries(scales).map(([name, hexes]) => {
        const stops = stopsByColor[name] ?? [];
        return (
          <div key={name} className="space-y-2">
            <p className="font-mono font-bold text-sm">{name}</p>
            <div className="grid grid-cols-6 md:grid-cols-7 gap-2 border-2 border-neo-black rounded-md overflow-hidden">
              {hexes.map((hex, i) => {
                const stop = stops[i] ?? "";
                const isDark =
                  name === "neo-black" && ["500", "700", "900", "950"].includes(stop);
                return (
                  <div
                    key={hex}
                    className="aspect-square flex flex-col items-center justify-center gap-1 p-2"
                    style={{
                      backgroundColor: hex,
                      color: isDark ? "#FFFDF5" : "#0F0F0F",
                    }}
                  >
                    <span className="font-mono text-xs font-bold">{stop}</span>
                    <span className="font-mono text-[10px] opacity-75">
                      {hex}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  ),
};

export const ContrastGrid: Story = {
  render: () => {
    const rows = [
      { token: "neo-offwhite", hex: "#FFFDF5", ratio: "19.2:1", wcag: "AAA" },
      { token: "neo-yellow", hex: "#FFDE59", ratio: "14.1:1", wcag: "AAA" },
      { token: "neo-blue", hex: "#5CE1E6", ratio: "12.8:1", wcag: "AAA" },
      { token: "neo-green", hex: "#7ED957", ratio: "12.0:1", wcag: "AAA" },
      { token: "neo-pink", hex: "#FF66C4", ratio: "7.9:1", wcag: "AAA" },
      { token: "neo-purple", hex: "#C678DD", ratio: "6.2:1", wcag: "AA" },
    ];
    return (
      <div className="p-8 space-y-6 max-w-4xl">
        <div>
          <h2 className="font-display text-h2 mb-2">
            Black text on colored surfaces
          </h2>
          <p className="text-body-lg max-w-prose">
            Contrast ratios for <code>neo-black</code> (<code>#0F0F0F</code>) on
            each surface. All pass WCAG AA or better. This is what makes the
            multi-color system viable.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rows.map(({ token, hex, ratio, wcag }) => (
            <div
              key={token}
              className="flex items-center justify-between p-4 border-2 border-neo-black rounded-md"
              style={{ backgroundColor: hex }}
            >
              <div>
                <p className="font-bold text-body">
                  Aa — the quick brown fox
                </p>
                <p className="font-mono text-xs uppercase tracking-wider mt-1">
                  {token}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono font-bold">{ratio}</p>
                <p className="font-mono text-xs">{wcag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
