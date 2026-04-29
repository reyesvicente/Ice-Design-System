import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    intent: { control: "select", options: ["default", "success", "info", "warning", "error", "accent"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
  args: { value: 65, intent: "default", size: "md" },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: "Upload progress", showValue: true, value: 42 },
};

export const Intents: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Progress value={80} intent="default" label="Default" showValue />
      <Progress value={70} intent="success" label="Success" showValue />
      <Progress value={60} intent="info" label="Info" showValue />
      <Progress value={50} intent="warning" label="Warning" showValue />
      <Progress value={40} intent="error" label="Error" showValue />
      <Progress value={90} intent="accent" label="Accent" showValue />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Progress value={60} size="sm" label="Small" />
      <Progress value={70} size="md" label="Medium" />
      <Progress value={80} size="lg" label="Large" />
    </div>
  ),
};
