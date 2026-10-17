import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { AlertTriangle, Clock, Megaphone, Wrench } from "lucide-react";
import { Banner, BannerLink } from "./Banner";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Banner",
  component: Banner,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["announce", "info", "success", "warning", "error", "dark"],
    },
  },
  args: {
    children: "ice-ds 2.0 is out — 15 new components.",
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Announcement: Story = {
  args: {
    icon: <Megaphone />,
    action: <BannerLink href="#">Read the changelog →</BannerLink>,
  },
};

function TrialDemo() {
  const [visible, setVisible] = useState(true);
  if (!visible) {
    return (
      <div className="p-6">
        <Button size="sm" variant="secondary" onClick={() => setVisible(true)}>
          Show banner
        </Button>
      </div>
    );
  }
  return (
    <Banner
      intent="dark"
      icon={<Clock />}
      onDismiss={() => setVisible(false)}
      action={
        <Button size="sm" className="py-1">
          Upgrade
        </Button>
      }
    >
      Your trial ends in 3 days.
    </Banner>
  );
}

export const TrialDismissible: Story = {
  render: () => <TrialDemo />,
};

export const AllIntents: Story = {
  render: () => (
    <div>
      <Banner intent="announce" icon={<Megaphone />}>New: command palette. Press ⌘K anywhere.</Banner>
      <Banner intent="info">Scheduled maintenance on Saturday, 02:00–04:00 UTC.</Banner>
      <Banner intent="success">Your workspace has been migrated.</Banner>
      <Banner intent="warning" icon={<AlertTriangle />}>Your card expires this month.</Banner>
      <Banner intent="error" icon={<Wrench />}>Payments are currently degraded. We're on it.</Banner>
      <Banner intent="dark">You're viewing a read-only demo.</Banner>
    </div>
  ),
};
