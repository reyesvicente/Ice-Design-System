import type { Meta, StoryObj } from "@storybook/react-vite";
import { Hero } from "./Hero";
import { Button } from "../../components/Button/Button";
import { Badge } from "../../components/Badge/Badge";

const meta = {
  title: "Blocks/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["offwhite", "yellow", "pink", "blue", "green", "purple", "dark"] },
    align: { control: "select", options: ["center", "left"] },
  },
  args: {
    eyebrow: (
      <>
        <Badge variant="new">New</Badge> Command palette is here
      </>
    ),
    title: "Ship client work without the busywork.",
    description:
      "Invoices, proposals and project tracking in one loud, fast workspace built for solo studios.",
    actions: (
      <>
        <Button size="lg">Start free trial</Button>
        <Button size="lg" variant="secondary">
          Book a demo
        </Button>
      </>
    ),
    footnote: "14-day trial. No credit card required.",
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

const screenshot = (
  <div className="aspect-video w-full bg-neo-blue border-2 border-neo-black rounded-md shadow-brutal-lg flex items-center justify-center font-display text-h4">
    Product screenshot
  </div>
);

export const Centered: Story = {};

export const CenteredWithMedia: Story = {
  args: { media: screenshot },
};

export const SplitOnYellow: Story = {
  args: { align: "left", tone: "yellow", media: screenshot },
};

export const Dark: Story = {
  args: { tone: "dark" },
};
