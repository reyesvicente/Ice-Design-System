import type { Meta, StoryObj } from "@storybook/react-vite";
import { BarChart3, CreditCard, FolderKanban, Home, LogOut, Settings, Users } from "lucide-react";
import {
  AppShell,
  AppShellHeader,
  AppShellMenuButton,
  Sidebar,
  SidebarCollapseButton,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarItem,
  useSidebar,
} from "./Sidebar";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

function Brand() {
  const { collapsed } = useSidebar();
  return (
    <span className="flex items-center gap-2 font-display font-bold text-h5">
      <span className="flex w-8 h-8 items-center justify-center bg-neo-yellow border-2 border-neo-black rounded-md shadow-brutal-sm">
        i
      </span>
      {!collapsed && "ice-ds"}
    </span>
  );
}

function DemoSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Brand />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarItem href="#" icon={<Home />} active>
            Dashboard
          </SidebarItem>
          <SidebarItem href="#" icon={<FolderKanban />} badge={<Badge variant="new">3</Badge>}>
            Projects
          </SidebarItem>
          <SidebarItem href="#" icon={<Users />}>
            Clients
          </SidebarItem>
          <SidebarItem href="#" icon={<BarChart3 />}>
            Reports
          </SidebarItem>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarItem href="#" icon={<CreditCard />}>
            Billing
          </SidebarItem>
          <SidebarItem href="#" icon={<Settings />}>
            Settings
          </SidebarItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex items-center gap-2 group-data-[collapsed]/sidebar:flex-col">
        <SidebarItem asButton icon={<LogOut />}>
          Log out
        </SidebarItem>
        <SidebarCollapseButton />
      </SidebarFooter>
    </Sidebar>
  );
}

export const Default: Story = {
  render: () => (
    <div className="h-[600px]">
      <AppShell
        className="h-full"
        sidebar={<DemoSidebar />}
        header={
          <AppShellHeader>
            <AppShellMenuButton />
            <h1 className="font-display text-h5">Dashboard</h1>
            <Button size="sm" className="ml-auto">
              New project
            </Button>
          </AppShellHeader>
        }
      >
        <div className="p-6 space-y-4">
          <p className="text-body">
            Resize below the <code>md</code> breakpoint to see the sidebar move into a drawer.
          </p>
        </div>
      </AppShell>
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <div className="h-[600px]">
      <AppShell className="h-full" defaultCollapsed sidebar={<DemoSidebar />}>
        <div className="p-6">Icon-only sidebar. Hover an item to see its label.</div>
      </AppShell>
    </div>
  ),
};
