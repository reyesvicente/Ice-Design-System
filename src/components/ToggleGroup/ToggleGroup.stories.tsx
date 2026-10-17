import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { AlignCenter, AlignLeft, AlignRight, Bold, LayoutGrid, Strikethrough, List, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function BillingDemo() {
  const [period, setPeriod] = useState("monthly");
  return (
    <div className="flex flex-col items-center gap-3">
      <ToggleGroup
        type="single"
        value={period}
        // Radix emits "" when the active item is clicked again; keep one selected
        onValueChange={(value) => value && setPeriod(value)}
        aria-label="Billing period"
      >
        <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
        <ToggleGroupItem value="annual">Annual (−20%)</ToggleGroupItem>
      </ToggleGroup>
      <p className="text-body-sm text-neo-black-500">Billing: {period}</p>
    </div>
  );
}

export const SegmentedControl: Story = {
  args: { type: "single" },
  render: () => <BillingDemo />,
};

export const ViewSwitcher: Story = {
  args: { type: "single" },
  render: () => (
    <ToggleGroup type="single" defaultValue="grid" size="sm" aria-label="View">
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <LayoutGrid />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view">
        <List />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Alignment: Story = {
  args: { type: "single" },
  render: () => (
    <ToggleGroup type="single" defaultValue="left" aria-label="Text alignment">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const MultipleOutline: Story = {
  args: { type: "multiple" },
  render: () => (
    <ToggleGroup type="multiple" variant="outline" defaultValue={["bold"]} aria-label="Formatting">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="strike" aria-label="Strikethrough">
        <Strikethrough />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
