import type { Meta, StoryObj } from "@storybook/react-vite";
import { shadows } from "@/tokens";

const meta = {
  title: "Foundations/Shadows",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevations: Story = {
  render: () => (
    <div className="p-12 space-y-8 max-w-6xl">
      <div>
        <h2 className="font-display text-h2 mb-2">Shadows</h2>
        <p className="text-body-lg max-w-prose">
          Hard offset, zero blur. The signature of the system. Use tokens —
          never invent new offsets inline. Shadow grows on hover for
          interactive elements; collapses on active press.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {shadows.map(({ token, value, use }) => (
          <div key={token} className="space-y-4">
            <div
              className={`aspect-square bg-neo-offwhite border-2 border-neo-black rounded-md ${token}`}
            />
            <div className="space-y-1">
              <p className="font-mono font-bold text-sm">{token}</p>
              <p className="font-mono text-xs text-neo-black-700">{value}</p>
              <p className="text-xs leading-snug mt-2">{use}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ColoredShadows: Story = {
  render: () => (
    <div className="p-12 space-y-8 max-w-6xl">
      <div>
        <h2 className="font-display text-h2 mb-2">Colored shadows</h2>
        <p className="text-body-lg max-w-prose">
          Reserved for focus states, special emphasis moments, or playful hero
          treatments. Don't overuse — the black shadow is the system's default.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {[
          { cls: "shadow-brutal-pink", label: "pink", hex: "#FF66C4" },
          { cls: "shadow-brutal-yellow", label: "yellow", hex: "#FFDE59" },
          { cls: "shadow-brutal-blue", label: "blue", hex: "#5CE1E6" },
          { cls: "shadow-brutal-green", label: "green", hex: "#7ED957" },
          { cls: "shadow-brutal-purple", label: "purple", hex: "#C678DD" },
          { cls: "shadow-brutal-inverse", label: "inverse", hex: "#FFFDF5" },
        ].map(({ cls, label, hex }) => (
          <div key={cls} className="space-y-3">
            <div
              className={`aspect-square bg-neo-offwhite border-2 border-neo-black rounded-md ${cls}`}
            />
            <div>
              <p className="font-mono text-xs font-bold">shadow-brutal-{label}</p>
              <p className="font-mono text-[10px] text-neo-black-700">{hex}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const InteractionStates: Story = {
  render: () => (
    <div className="p-12 space-y-8 max-w-4xl">
      <div>
        <h2 className="font-display text-h2 mb-2">Interaction states</h2>
        <p className="text-body-lg max-w-prose">
          Hover lifts by 2px and grows the shadow. Active press collapses both.
          Hover over the example below.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-12">
        <div className="space-y-4">
          <div className="aspect-square bg-neo-yellow border-2 border-neo-black rounded-md shadow-brutal flex items-center justify-center">
            <span className="font-display font-bold">Default</span>
          </div>
          <p className="font-mono text-xs text-neo-black-700">
            shadow-brutal
            <br />
            4px 4px 0 0 #0F0F0F
          </p>
        </div>
        <div className="space-y-4">
          <div className="aspect-square bg-neo-yellow border-2 border-neo-black rounded-md shadow-brutal-md -translate-x-0.5 -translate-y-0.5 flex items-center justify-center">
            <span className="font-display font-bold">Hover</span>
          </div>
          <p className="font-mono text-xs text-neo-black-700">
            translate -2px -2px
            <br />
            shadow-brutal-md
          </p>
        </div>
        <div className="space-y-4">
          <div className="aspect-square bg-neo-yellow border-2 border-neo-black rounded-md shadow-none flex items-center justify-center">
            <span className="font-display font-bold">Active</span>
          </div>
          <p className="font-mono text-xs text-neo-black-700">
            translate 0 0<br />
            shadow-none
          </p>
        </div>
      </div>
    </div>
  ),
};
