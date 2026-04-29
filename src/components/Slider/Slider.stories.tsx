import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./Slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: [50], min: 0, max: 100, label: "Volume", showValue: true },
};

export const Intents: Story = {
  render: () => (
    <div className="space-y-6 max-w-sm">
      <Slider defaultValue={[40]} intent="default" label="Default" showValue />
      <Slider defaultValue={[60]} intent="success" label="Success" showValue />
      <Slider defaultValue={[70]} intent="info" label="Info" showValue />
      <Slider defaultValue={[80]} intent="accent" label="Accent" showValue />
    </div>
  ),
};

export const Range: Story = {
  args: { defaultValue: [20, 80], min: 0, max: 100, label: "Price range" },
};

export const Disabled: Story = {
  args: { defaultValue: [50], disabled: true, label: "Disabled" },
};
