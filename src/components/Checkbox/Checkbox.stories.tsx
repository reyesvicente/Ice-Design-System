import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Accept terms and conditions" },
};

export const WithDescription: Story = {
  args: {
    label: "Marketing emails",
    description: "Receive product updates, tips, and promotional content.",
  },
};

export const Checked: Story = {
  args: { label: "Remember me", defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { label: "Select all", indeterminate: true },
};

export const Disabled: Story = {
  args: { label: "Disabled option", disabled: true },
};

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <p className="text-body-sm font-bold">Notifications</p>
      <Checkbox label="Email notifications" defaultChecked />
      <Checkbox label="Push notifications" />
      <Checkbox label="SMS notifications" description="Standard rates may apply." />
      <Checkbox label="Weekly digest" defaultChecked />
    </div>
  ),
};
