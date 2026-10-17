import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { CreditCard, FilePlus, Home, LogOut, Moon, Settings, Users } from "lucide-react";
import { CommandPalette, type CommandItem } from "./CommandPalette";
import { Button } from "../Button/Button";
import { Shortcut } from "../Kbd/Kbd";

const meta = {
  title: "Components/CommandPalette",
  component: CommandPalette,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string>();

  const items: CommandItem[] = [
    { id: "new", label: "New project", group: "Actions", icon: <FilePlus />, shortcut: ["⌘", "N"], onSelect: () => setLast("New project") },
    { id: "invite", label: "Invite teammate", group: "Actions", icon: <Users />, keywords: ["member", "team"], onSelect: () => setLast("Invite teammate") },
    { id: "theme", label: "Toggle dark mode", group: "Actions", icon: <Moon />, disabled: true, onSelect: () => setLast("Toggle dark mode") },
    { id: "home", label: "Dashboard", group: "Navigate", icon: <Home />, onSelect: () => setLast("Dashboard") },
    { id: "billing", label: "Billing", group: "Navigate", icon: <CreditCard />, keywords: ["invoice", "plan"], onSelect: () => setLast("Billing") },
    { id: "settings", label: "Settings", group: "Navigate", icon: <Settings />, shortcut: ["⌘", ","], onSelect: () => setLast("Settings") },
    { id: "logout", label: "Log out", group: "Account", icon: <LogOut />, onSelect: () => setLast("Log out") },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open palette <Shortcut keys={["⌘", "K"]} size="sm" />
      </Button>
      <p className="text-body-sm text-neo-black-500">Last command: {last ?? "none"}</p>
      <CommandPalette items={items} open={open} onOpenChange={setOpen} />
    </div>
  );
}

export const Default: Story = {
  args: { items: [] },
  render: () => <Demo />,
};
