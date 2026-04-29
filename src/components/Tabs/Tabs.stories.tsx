import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";
import { BarChart2, Settings, Users } from "lucide-react";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const TabDemo = ({ variant }: { variant?: "underline" | "pill" | "boxed" }) => (
  <Tabs defaultValue="overview">
    <TabsList variant={variant}>
      <TabsTrigger value="overview" variant={variant}>Overview</TabsTrigger>
      <TabsTrigger value="analytics" variant={variant}>Analytics</TabsTrigger>
      <TabsTrigger value="settings" variant={variant}>Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="overview">
      <p className="text-body-sm text-neo-black-700">Overview content goes here.</p>
    </TabsContent>
    <TabsContent value="analytics">
      <p className="text-body-sm text-neo-black-700">Analytics and reports live here.</p>
    </TabsContent>
    <TabsContent value="settings">
      <p className="text-body-sm text-neo-black-700">Settings and preferences.</p>
    </TabsContent>
  </Tabs>
);

export const Underline: Story = { render: () => <TabDemo variant="underline" /> };
export const Pill: Story = { render: () => <TabDemo variant="pill" /> };
export const Boxed: Story = { render: () => <TabDemo variant="boxed" /> };

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList variant="pill">
        <TabsTrigger value="overview" variant="pill">
          <BarChart2 className="w-4 h-4" /> Overview
        </TabsTrigger>
        <TabsTrigger value="users" variant="pill">
          <Users className="w-4 h-4" /> Users
        </TabsTrigger>
        <TabsTrigger value="settings" variant="pill">
          <Settings className="w-4 h-4" /> Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview"><p className="text-body-sm">Overview</p></TabsContent>
      <TabsContent value="users"><p className="text-body-sm">Users</p></TabsContent>
      <TabsContent value="settings"><p className="text-body-sm">Settings</p></TabsContent>
    </Tabs>
  ),
};
