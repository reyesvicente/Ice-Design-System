import type { Meta, StoryObj } from "@storybook/react-vite";
import { Testimonial } from "./Testimonial";
import { Section, SectionHeading } from "../Section/Section";

const meta = {
  title: "Blocks/Testimonial",
  component: Testimonial,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["offwhite", "yellow", "pink", "blue", "green", "purple"] },
    rating: { control: { type: "number", min: 0, max: 5 } },
  },
  args: {
    quote: "We replaced three tools in a weekend. Invoicing alone saves me four hours a month.",
    name: "Maria Santos",
    role: "Founder, Santos Studio",
    rating: 5,
  },
} satisfies Meta<typeof Testimonial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-md">
      <Testimonial {...args} />
    </div>
  ),
};

export const Grid: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <Section tone="blue" bordered>
      <SectionHeading eyebrow="Testimonials" title="Loved by tiny teams" />
      <div className="grid gap-6 md:grid-cols-3">
        <Testimonial tone="offwhite" rating={5} name="Maria Santos" role="Founder, Santos Studio" quote="We replaced three tools in a weekend." />
        <Testimonial tone="yellow" rating={5} name="Dev Patel" role="Freelance engineer" quote="Clients actually pay on time now. The reminders do the awkward part." />
        <Testimonial tone="pink" rating={4} name="Lena Kraus" role="Brand designer" quote="The client portal makes me look like a much bigger studio than I am." />
      </div>
    </Section>
  ),
};
