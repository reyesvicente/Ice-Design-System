import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stat, StatGrid } from "./Stat";
import { Users, DollarSign, Activity, ShoppingCart } from "lucide-react";

const meta = {
  title: "Components/Stat",
  component: Stat,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    label: "Total revenue",
    value: "$48,295",
  },
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trend: "up",
    trendValue: "+12.5%",
    description: "vs last month",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Active users",
    value: "2,847",
    trend: "up",
    trendValue: "+5.2%",
    description: "vs last week",
    icon: <Users className="w-4 h-4" />,
    accent: "blue",
  },
};

export const Dashboard: Story = {
  render: () => (
    <StatGrid>
      <Stat
        label="Total revenue"
        value="$48,295"
        trend="up"
        trendValue="+12.5%"
        description="vs last month"
        icon={<DollarSign className="w-4 h-4" />}
        accent="yellow"
      />
      <Stat
        label="Active users"
        value="2,847"
        trend="up"
        trendValue="+5.2%"
        description="vs last week"
        icon={<Users className="w-4 h-4" />}
        accent="blue"
      />
      <Stat
        label="Orders"
        value="1,429"
        trend="down"
        trendValue="-2.1%"
        description="vs last month"
        icon={<ShoppingCart className="w-4 h-4" />}
        accent="pink"
      />
      <Stat
        label="Uptime"
        value="99.98%"
        trend="flat"
        trendValue="Stable"
        description="last 30 days"
        icon={<Activity className="w-4 h-4" />}
        accent="green"
      />
    </StatGrid>
  ),
  args: { label: "Dashboard", value: "" },
};

export const Accents: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {(["yellow", "green", "blue", "pink", "purple", "red"] as const).map((accent) => (
        <Stat key={accent} label={accent} value="1,234" accent={accent} />
      ))}
    </div>
  ),
  args: { label: "Accents", value: "" },
};
