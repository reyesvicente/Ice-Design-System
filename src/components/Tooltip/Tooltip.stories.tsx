import type { Meta, StoryObj } from "@storybook/react-vite";
import { TooltipProvider, Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";
import { Kbd } from "../Kbd/Kbd";
import { Info } from "lucide-react";

const TooltipDemo = () => (
  <div className="flex flex-wrap gap-4">
    <Tooltip content="Primary action">
      <Button>Hover me</Button>
    </Tooltip>
    <Tooltip content="Delete this item permanently" variant="light">
      <Button variant="destructive">Delete</Button>
    </Tooltip>
    <Tooltip content="New feature!" variant="yellow">
      <Button variant="accent">Try it</Button>
    </Tooltip>
  </div>
);

const meta = {
  title: "Components/Tooltip",
  component: TooltipDemo,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [(Story: React.FC) => <TooltipProvider><Story /></TooltipProvider>],
} satisfies Meta<typeof TooltipDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Positions: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6 py-8">
      <Tooltip content="Top tooltip" side="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <div className="flex gap-12">
        <Tooltip content="Left tooltip" side="left">
          <Button variant="secondary">Left</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" side="right">
          <Button variant="secondary">Right</Button>
        </Tooltip>
      </div>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
    </div>
  ),
};

export const WithShortcut: Story = {
  render: () => (
    <Tooltip
      content={
        <span className="flex items-center gap-2">
          Open command palette <Kbd size="sm" variant="dark">⌘K</Kbd>
        </span>
      }
      variant="light"
    >
      <button className="p-2 border-2 border-neo-black rounded hover:bg-neo-yellow transition-colors">
        <Info className="w-4 h-4" />
      </button>
    </Tooltip>
  ),
};
