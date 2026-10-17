import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Stepper } from "./Stepper";
import { Button } from "../Button/Button";

const steps = [
  { title: "Account", description: "Email & password" },
  { title: "Workspace", description: "Name your team" },
  { title: "Billing", description: "Pick a plan" },
  { title: "Done", description: "Start building" },
];

const meta = {
  title: "Components/Stepper",
  component: Stepper,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    current: { control: { type: "number", min: 0, max: 3 } },
  },
  args: { steps, current: 1 },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="max-w-2xl">
      <Stepper {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical", current: 2 },
};

function InteractiveDemo() {
  const [current, setCurrent] = useState(0);
  return (
    <div className="max-w-2xl space-y-8">
      <Stepper steps={steps} current={current} onStepClick={setCurrent} />
      <div className="flex justify-between">
        <Button variant="secondary" size="sm" disabled={current === 0} onClick={() => setCurrent(current - 1)}>
          Back
        </Button>
        <Button size="sm" disabled={current === steps.length - 1} onClick={() => setCurrent(current + 1)}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
};
