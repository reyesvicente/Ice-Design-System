import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton, SkeletonCard, SkeletonAvatar, SkeletonText } from "./Skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "h-12 w-48" },
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="max-w-sm">
      <SkeletonCard />
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div className="flex items-start gap-4 max-w-sm p-4 border-2 border-neo-black rounded-md shadow-brutal">
      <SkeletonAvatar size="lg" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="w-1/2" />
        <Skeleton variant="text" className="w-3/4" />
        <SkeletonText lines={2} />
      </div>
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="space-y-2 max-w-lg border-2 border-neo-black rounded-md p-4 shadow-brutal">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton variant="circle" className="w-8 h-8 shrink-0" />
          <SkeletonText lines={2} className="flex-1" />
        </div>
      ))}
    </div>
  ),
};
