import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Dropdown, DropdownTrigger, DropdownContent, DropdownItem,
  DropdownLabel, DropdownSeparator, DropdownCheckboxItem, DropdownRadioGroup, DropdownRadioItem,
} from "./Dropdown";
import { Button } from "../Button/Button";
import { User, Settings, LogOut } from "lucide-react";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="secondary">Options ▾</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownLabel>Account</DropdownLabel>
        <DropdownItem>
          <User className="w-4 h-4" /> Profile
        </DropdownItem>
        <DropdownItem>
          <Settings className="w-4 h-4" /> Settings
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem destructive>
          <LogOut className="w-4 h-4" /> Sign out
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};

export const WithCheckboxItems: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="secondary">View ▾</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownLabel>Toggle columns</DropdownLabel>
        <DropdownCheckboxItem checked>Name</DropdownCheckboxItem>
        <DropdownCheckboxItem checked>Email</DropdownCheckboxItem>
        <DropdownCheckboxItem>Role</DropdownCheckboxItem>
        <DropdownCheckboxItem>Created at</DropdownCheckboxItem>
      </DropdownContent>
    </Dropdown>
  ),
};

export const WithRadioItems: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="secondary">Sort ▾</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownLabel>Sort by</DropdownLabel>
        <DropdownRadioGroup value="name">
          <DropdownRadioItem value="name">Name</DropdownRadioItem>
          <DropdownRadioItem value="date">Date</DropdownRadioItem>
          <DropdownRadioItem value="status">Status</DropdownRadioItem>
        </DropdownRadioGroup>
      </DropdownContent>
    </Dropdown>
  ),
};
