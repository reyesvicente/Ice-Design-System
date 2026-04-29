import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumb } from "./Breadcrumb";

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "Products", href: "/products" },
      { label: "Design Systems", href: "/products/design-systems" },
      { label: "ice-ds" },
    ],
  },
};

export const NoHome: Story = {
  args: {
    showHome: false,
    items: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Settings", href: "/settings" },
      { label: "Profile" },
    ],
  },
};

export const Short: Story = {
  args: {
    items: [{ label: "Blog", href: "/blog" }, { label: "Introducing ice-ds" }],
  },
};
