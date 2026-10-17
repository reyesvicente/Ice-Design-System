import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { PricingCard, PricingTable, type PricingCardProps } from "./Pricing";
import { Button } from "../../components/Button/Button";
import { ToggleGroup, ToggleGroupItem } from "../../components/ToggleGroup/ToggleGroup";

const meta = {
  title: "Blocks/Pricing",
  component: PricingTable,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof PricingTable>;

export default meta;
type Story = StoryObj<typeof meta>;

function buildPlans(annual: boolean): PricingCardProps[] {
  const price = (monthly: number) => `$${annual ? Math.round(monthly * 0.8) : monthly}`;
  return [
    {
      name: "Solo",
      price: price(12),
      period: "/month",
      description: "For freelancers getting started.",
      features: ["3 active clients", "Proposals & invoices", { label: "Client portal", included: false }, { label: "Automations", included: false }],
      cta: <Button variant="secondary" fullWidth>Start free</Button>,
    },
    {
      name: "Studio",
      price: price(29),
      period: "/month",
      description: "For busy one-person studios.",
      features: ["Unlimited clients", "Proposals & invoices", "Client portal", { label: "Automations", included: false }],
      cta: <Button fullWidth variant="inverse">Start free trial</Button>,
      featured: true,
    },
    {
      name: "Agency",
      price: price(79),
      period: "/month",
      description: "For small teams.",
      features: ["Unlimited clients", "Proposals & invoices", "Client portal", "Automations", "5 seats included"],
      cta: <Button variant="secondary" fullWidth>Contact sales</Button>,
    },
  ];
}

function PricingDemo() {
  const [period, setPeriod] = useState("monthly");
  return (
    <PricingTable
      eyebrow="Pricing"
      title="Simple plans. No per-invoice fees."
      description="Every plan includes a 14-day free trial."
      plans={buildPlans(period === "annual")}
      controls={
        <ToggleGroup type="single" value={period} onValueChange={(v) => v && setPeriod(v)} aria-label="Billing period">
          <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
          <ToggleGroupItem value="annual">Annual (−20%)</ToggleGroupItem>
        </ToggleGroup>
      }
      footnote="Prices in USD. Cancel anytime."
    />
  );
}

export const Table: Story = {
  args: { plans: [] },
  render: () => <PricingDemo />,
};

export const SingleCard: Story = {
  args: { plans: [] },
  render: () => (
    <div className="p-10 max-w-sm">
      <PricingCard {...buildPlans(false)[1]} />
    </div>
  ),
};
