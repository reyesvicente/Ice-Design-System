import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardEyebrow, CardTitle, CardDescription } from "./Card";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "featured",
        "success",
        "info",
        "premium",
        "primary",
        "inverse",
      ],
    },
    elevation: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "none"],
    },
    interactive: { control: "boolean" },
  },
  args: {
    variant: "default",
    elevation: "md",
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = () => (
  <>
    <CardEyebrow>Case study</CardEyebrow>
    <CardTitle>2.1x conversion lift</CardTitle>
    <CardDescription>
      Shipped a Django + React rebuild in 6 weeks. Replaced a bloated WordPress setup,
      cut TTFB by 80%, and doubled the funnel.
    </CardDescription>
  </>
);

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="w-96">
      <Card {...args}>
        <DemoContent />
      </Card>
    </div>
  ),
};

export const Featured: Story = {
  args: { variant: "featured", elevation: "lg" },
  render: (args) => (
    <div className="w-96">
      <Card {...args}>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="default">Shipped</Badge>
          <Badge variant="new">New case study</Badge>
        </div>
        <CardTitle>rev6.fit — fitness SaaS</CardTitle>
        <CardDescription>
          Custom member portal, booking system, and Stripe integration. Launched in
          under 3 months.
        </CardDescription>
      </Card>
    </div>
  ),
};

export const Interactive: Story = {
  args: { interactive: true, variant: "info" },
  render: (args) => (
    <div className="w-96">
      <Card {...args}>
        <DemoContent />
        <Button variant="inverse" size="sm" className="mt-4">
          View case study
        </Button>
      </Card>
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {(
        ["default", "primary", "featured", "success", "info", "premium", "inverse"] as const
      ).map((v) => (
        <Card key={v} variant={v}>
          <CardEyebrow>variant="{v}"</CardEyebrow>
          <CardTitle>Card title here</CardTitle>
          <CardDescription>
            Consistent structure, swapped background. Text stays black across all
            brand colors. Inverse flips to offwhite text.
          </CardDescription>
        </Card>
      ))}
    </div>
  ),
};

export const ElevationLadder: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12">
      {(["sm", "md", "lg", "xl"] as const).map((e) => (
        <Card key={e} elevation={e}>
          <CardEyebrow>shadow-brutal-{e}</CardEyebrow>
          <CardTitle>Elevation {e}</CardTitle>
          <CardDescription>
            Hard offset shadow, zero blur. Use larger values for hero moments, smaller
            for dense UI.
          </CardDescription>
        </Card>
      ))}
    </div>
  ),
};

export const BentoLayout: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="p-12 bg-neo-offwhite">
      <h2 className="font-display text-h2 mb-8">Selected work</h2>
      <div className="grid grid-cols-6 gap-6">
        <Card
          variant="featured"
          interactive
          className="col-span-6 md:col-span-2 md:row-span-2 aspect-[3/4] flex flex-col justify-end"
        >
          <CardEyebrow>Django · React · Stripe</CardEyebrow>
          <CardTitle>rev6.fit</CardTitle>
          <CardDescription>
            Fitness SaaS — custom booking, member portal, payments. Shipped in 3 months.
          </CardDescription>
        </Card>
        <Card
          variant="primary"
          interactive
          className="col-span-6 md:col-span-4 aspect-[16/9] flex flex-col justify-end"
        >
          <CardEyebrow>WordPress · Moodle · DigitalOcean</CardEyebrow>
          <CardTitle>GERTC LMS</CardTitle>
          <CardDescription>
            Managed hosting + LMS migration for a civil engineering review center.
          </CardDescription>
        </Card>
        <Card
          variant="info"
          interactive
          className="col-span-3 md:col-span-2 aspect-square flex flex-col justify-end"
        >
          <CardEyebrow>Shopify · Liquid</CardEyebrow>
          <CardTitle>Client store</CardTitle>
        </Card>
        <Card
          variant="success"
          interactive
          className="col-span-3 md:col-span-2 aspect-square flex flex-col justify-end"
        >
          <CardEyebrow>FastAPI · Postgres</CardEyebrow>
          <CardTitle>Internal dashboard</CardTitle>
        </Card>
      </div>
    </div>
  ),
};
