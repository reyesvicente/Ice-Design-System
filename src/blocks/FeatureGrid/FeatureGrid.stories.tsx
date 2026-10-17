import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart3, FileText, Lock, Receipt, Users, Zap } from "lucide-react";
import { FeatureGrid } from "./FeatureGrid";

const meta = {
  title: "Blocks/FeatureGrid",
  component: FeatureGrid,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    columns: { control: "select", options: [2, 3, 4] },
    tone: { control: "select", options: ["offwhite", "yellow", "pink", "blue", "green", "purple", "dark"] },
  },
  args: {
    eyebrow: "Features",
    title: "Everything a one-person studio needs",
    description: "Stop stitching together five tools. Run the whole business from one place.",
    features: [
      { icon: <FileText />, iconTone: "yellow", title: "Proposals", description: "Templated proposals clients can sign in one click." },
      { icon: <Receipt />, iconTone: "pink", title: "Invoicing", description: "Recurring invoices with automatic reminders." },
      { icon: <BarChart3 />, iconTone: "blue", title: "Reports", description: "Revenue, utilization and runway at a glance." },
      { icon: <Users />, iconTone: "green", title: "Client portal", description: "One link for files, updates and approvals." },
      { icon: <Zap />, iconTone: "purple", title: "Automations", description: "Trigger follow-ups when projects change status." },
      { icon: <Lock />, iconTone: "yellow", title: "Secure by default", description: "SSO, audit logs and encrypted file storage." },
    ],
  },
} satisfies Meta<typeof FeatureGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {};

export const TwoColumnsOnPink: Story = {
  args: { columns: 2, tone: "pink" },
};
