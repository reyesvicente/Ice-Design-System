import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="font-bold text-body-sm mb-1">Dimensions</p>
        <p className="text-micro text-neo-black-500 mb-3">Set the dimensions for the layer.</p>
        <div className="space-y-2">
          <Input placeholder="Width" />
          <Input placeholder="Height" />
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithClose: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="accent">Info</Button>
      </PopoverTrigger>
      <PopoverContent showClose>
        <p className="font-bold text-body-sm">About this feature</p>
        <p className="text-micro text-neo-black-500 mt-1">
          This feature is currently in beta. Your feedback helps shape the final release.
        </p>
      </PopoverContent>
    </Popover>
  ),
};
