import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button/Button";
import { FileX, Search, Inbox, Users } from "lucide-react";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    title: "Nothing here yet",
    description: "Add something to get started.",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoResults: Story = {
  args: {
    icon: <Search className="w-6 h-6" />,
    title: "No results found",
    description: "We couldn't find anything matching your search. Try adjusting your filters.",
    action: <Button variant="secondary" size="sm">Clear filters</Button>,
  },
};

export const EmptyList: Story = {
  args: {
    icon: <Inbox className="w-6 h-6" />,
    title: "Your inbox is empty",
    description: "When you receive messages, they will show up here.",
  },
};

export const NoData: Story = {
  args: {
    icon: <FileX className="w-6 h-6" />,
    title: "No projects yet",
    description: "Create your first project to get started.",
    action: <Button size="sm">New project</Button>,
    size: "lg",
  },
};

export const NoUsers: Story = {
  args: {
    icon: <Users className="w-6 h-6" />,
    title: "No team members",
    description: "Invite your team to collaborate on this workspace.",
    action: (
      <div className="flex gap-2">
        <Button size="sm">Invite members</Button>
        <Button variant="secondary" size="sm">Learn more</Button>
      </div>
    ),
  },
};
