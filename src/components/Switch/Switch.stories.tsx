import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Enable notifications" },
};

export const WithDescription: Story = {
  args: {
    label: "Dark mode",
    description: "Use dark theme across the entire interface.",
    defaultChecked: true,
  },
};

export const Intents: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch intent="default" label="Default" defaultChecked />
      <Switch intent="success" label="Success" defaultChecked />
      <Switch intent="info" label="Info" defaultChecked />
      <Switch intent="accent" label="Accent" defaultChecked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch size="sm" label="Small" />
      <Switch size="md" label="Medium" defaultChecked />
      <Switch size="lg" label="Large" defaultChecked />
    </div>
  ),
};

export const Disabled: Story = {
  args: { label: "Disabled", disabled: true, defaultChecked: true },
};
