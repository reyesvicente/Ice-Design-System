import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./Separator";

const meta = {
  title: "Components/Separator",
  component: Separator,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <p className="text-body-sm">Content above</p>
      <Separator />
      <p className="text-body-sm">Content below</p>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="max-w-sm">
      <Separator label="OR" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 h-8">
      <span className="text-body-sm font-bold">Home</span>
      <Separator orientation="vertical" />
      <span className="text-body-sm font-bold">About</span>
      <Separator orientation="vertical" />
      <span className="text-body-sm font-bold">Blog</span>
    </div>
  ),
};
