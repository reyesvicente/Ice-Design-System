import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioItem } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <RadioItem value="option-1" label="Option 1" />
      <RadioItem value="option-2" label="Option 2" />
      <RadioItem value="option-3" label="Option 3" />
    </RadioGroup>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="monthly">
      <RadioItem value="monthly" label="Monthly" description="Billed every month. Cancel anytime." />
      <RadioItem value="yearly" label="Yearly" description="Save 20% with annual billing." />
      <RadioItem value="lifetime" label="Lifetime" description="One-time payment, access forever." />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <RadioItem value="option-1" label="Available" />
      <RadioItem value="option-2" label="Unavailable" disabled />
      <RadioItem value="option-3" label="Also available" />
    </RadioGroup>
  ),
};
