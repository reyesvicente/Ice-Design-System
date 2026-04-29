import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner, LoadingOverlay } from "./Spinner";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Spinner size={size} />
          <span className="text-micro font-bold uppercase text-neo-black-500">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Intents: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {(["default", "primary", "success", "info", "accent"] as const).map((intent) => (
        <div key={intent} className="flex flex-col items-center gap-2">
          <Spinner intent={intent} size="lg" />
          <span className="text-micro font-bold uppercase text-neo-black-500">{intent}</span>
        </div>
      ))}
    </div>
  ),
};

export const Overlay: Story = {
  render: () => (
    <div className="relative h-48 border-2 border-neo-black rounded-md bg-neo-offwhite p-4">
      <p className="font-bold">Content behind the overlay</p>
      <LoadingOverlay label="Processing…" />
    </div>
  ),
};
