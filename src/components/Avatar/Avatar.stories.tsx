import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(["VR", "JD", "AB", "KL", "MN"] as const).map((initials, i) => (
        <Avatar key={initials} shadow>
          <AvatarFallback colorIndex={i}>{initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback>VR</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar shape="circle" size="lg">
        <AvatarFallback colorIndex={0}>VR</AvatarFallback>
      </Avatar>
      <Avatar shape="square" size="lg">
        <AvatarFallback colorIndex={1}>VR</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={4}>
      {["VR", "JD", "AB", "KL", "MN", "OP"].map((initials, i) => (
        <Avatar key={initials} shadow>
          <AvatarFallback colorIndex={i}>{initials}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  ),
};
