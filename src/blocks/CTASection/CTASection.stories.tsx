import type { Meta, StoryObj } from "@storybook/react-vite";
import { CTASection } from "./CTASection";
import { Button } from "../../components/Button/Button";

const meta = {
  title: "Blocks/CTASection",
  component: CTASection,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    layout: { control: "select", options: ["boxed", "banded"] },
    tone: { control: "select", options: ["offwhite", "yellow", "pink", "blue", "green", "purple", "dark"] },
  },
  args: {
    title: "Ready to stop chasing invoices?",
    description: "Start your 14-day trial. Import clients from a CSV in under a minute.",
    actions: (
      <>
        <Button size="lg" variant="inverse">Start free trial</Button>
        <Button size="lg" variant="secondary">Talk to us</Button>
      </>
    ),
  },
} satisfies Meta<typeof CTASection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Boxed: Story = {};

export const BoxedDark: Story = {
  args: {
    tone: "dark",
    actions: <Button size="lg">Start free trial</Button>,
  },
};

export const Banded: Story = {
  args: { layout: "banded", tone: "pink" },
};
