import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kbd, Shortcut } from "./Kbd";

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: "⌘K" } };
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Kbd size="sm">⌘</Kbd>
      <Kbd size="md">⌘K</Kbd>
      <Kbd size="lg">⌘ Shift K</Kbd>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Kbd variant="default">⌘K</Kbd>
      <Kbd variant="dark">⌘K</Kbd>
      <Kbd variant="yellow">⌘K</Kbd>
    </div>
  ),
};

export const Shortcuts: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between py-2 border-b-2 border-neo-black">
        <span className="text-body-sm font-medium">Open command palette</span>
        <Shortcut keys={["⌘", "K"]} />
      </div>
      <div className="flex items-center justify-between py-2 border-b-2 border-neo-black">
        <span className="text-body-sm font-medium">Save</span>
        <Shortcut keys={["⌘", "S"]} />
      </div>
      <div className="flex items-center justify-between py-2 border-b-2 border-neo-black">
        <span className="text-body-sm font-medium">Find and replace</span>
        <Shortcut keys={["⌘", "⇧", "H"]} />
      </div>
    </div>
  ),
};
