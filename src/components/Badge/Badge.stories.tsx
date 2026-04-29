import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "new",
        "primary",
        "success",
        "info",
        "premium",
        "warning",
        "error",
      ],
    },
    children: { control: "text" },
  },
  args: {
    children: "Label",
    variant: "default",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const New: Story = { args: { variant: "new", children: "New" } };
export const Primary: Story = { args: { variant: "primary", children: "Featured" } };
export const Success: Story = { args: { variant: "success", children: "Deployed" } };
export const Info: Story = { args: { variant: "info", children: "Tip" } };
export const Premium: Story = { args: { variant: "premium", children: "Pro" } };
export const Warning: Story = { args: { variant: "warning", children: "Unsaved" } };
export const Error: Story = { args: { variant: "error", children: "Failed" } };

export const AllVariants: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-wrap gap-3 p-8">
      <Badge variant="default">Default</Badge>
      <Badge variant="new">New</Badge>
      <Badge variant="primary">Featured</Badge>
      <Badge variant="success">Deployed</Badge>
      <Badge variant="info">Tip</Badge>
      <Badge variant="premium">Pro</Badge>
      <Badge variant="warning">Unsaved</Badge>
      <Badge variant="error">Failed</Badge>
    </div>
  ),
};

export const InContext: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="space-y-4 p-8 max-w-md">
      <div className="flex items-center gap-3">
        <h3 className="text-xl font-bold">SaaS Boilerplate</h3>
        <Badge variant="new">New</Badge>
      </div>
      <div className="flex items-center gap-3">
        <h3 className="text-xl font-bold">AI Audio Platform</h3>
        <Badge variant="premium">Pro</Badge>
      </div>
      <div className="flex items-center gap-3">
        <p className="font-mono text-sm">deploy.prod.log</p>
        <Badge variant="success">Deployed 2m ago</Badge>
      </div>
      <div className="flex items-center gap-3">
        <p className="font-mono text-sm">payment.webhook.log</p>
        <Badge variant="error">Failed</Badge>
      </div>
    </div>
  ),
};
