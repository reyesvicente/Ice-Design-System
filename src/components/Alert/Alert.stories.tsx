import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    intent: {
      control: "select",
      options: ["info", "success", "warning", "error", "announce"],
    },
    title: { control: "text" },
    onDismiss: { action: "dismissed" },
  },
  args: {
    title: "Heads up",
    children: "Description text that explains the context to the user.",
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = { args: { intent: "info" } };

export const Success: Story = {
  args: {
    intent: "success",
    title: "Deploy succeeded",
    children: "Your changes are live in production.",
  },
};

export const Warning: Story = {
  args: {
    intent: "warning",
    title: "Unsaved changes",
    children: "You have 3 unsaved fields. Save before leaving this page.",
  },
};

export const Error: Story = {
  args: {
    intent: "error",
    title: "Payment failed",
    children: "Your card was declined. Try a different payment method.",
  },
};

export const Announce: Story = {
  args: {
    intent: "announce",
    title: "New case study",
    children: "rev6.fit launched last week — read the writeup.",
  },
};

export const Dismissible: Story = {
  args: {
    intent: "info",
    title: "Pro tip",
    children: "You can press Cmd+K anywhere to open the command palette.",
    onDismiss: () => {},
  },
};

export const TitleOnly: Story = {
  args: {
    intent: "success",
    title: "Saved",
    children: undefined,
  },
};

export const AllIntents: Story = {
  parameters: { layout: "padded" },
  // Override the global 480px wrapper for this overview story
  decorators: [(Story) => <Story />],
  render: () => (
    <div className="flex flex-col gap-4 p-8 w-[520px]">
      <Alert intent="info" title="Heads up">
        Scheduled maintenance tonight at 2am UTC. Expect 10 minutes of downtime.
      </Alert>
      <Alert intent="success" title="Deploy succeeded">
        Your changes are live in production.
      </Alert>
      <Alert intent="warning" title="Unsaved changes">
        You have 3 unsaved fields. Save before leaving.
      </Alert>
      <Alert intent="error" title="Payment failed">
        Your card was declined. Try a different payment method.
      </Alert>
      <Alert intent="announce" title="New case study">
        rev6.fit launched last week — read the writeup.
      </Alert>
    </div>
  ),
};
