import type { Meta, StoryObj } from "@storybook/react-vite";
import { AtSign, Github, Rss } from "lucide-react";
import { Footer } from "./Footer";

const meta = {
  title: "Blocks/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["dark", "offwhite", "yellow"] },
  },
  args: {
    brand: "ice-ds",
    description: "Neubrutalist components for React. Loud by default.",
    socials: [
      { label: "GitHub", href: "#", icon: <Github /> },
      { label: "Email", href: "#", icon: <AtSign /> },
      { label: "RSS", href: "#", icon: <Rss /> },
    ],
    columns: [
      { title: "Product", links: [{ label: "Features", href: "#" }, { label: "Pricing", href: "#" }, { label: "Changelog", href: "#" }] },
      { title: "Resources", links: [{ label: "Docs", href: "#" }, { label: "Storybook", href: "#" }, { label: "Blog", href: "#" }] },
      { title: "Company", links: [{ label: "About", href: "#" }, { label: "Contact", href: "#" }] },
      { title: "Legal", links: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }] },
    ],
    legal: "© 2026 ICVN Tech Studio. All rights reserved.",
    legalLinks: [{ label: "Privacy", href: "#" }, { label: "Terms", href: "#" }],
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {};

export const Offwhite: Story = { args: { tone: "offwhite" } };

export const Yellow: Story = { args: { tone: "yellow" } };
