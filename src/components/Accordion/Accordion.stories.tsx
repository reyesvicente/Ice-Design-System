import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

const items = [
  {
    value: "item-1",
    trigger: "What is a design system?",
    content:
      "A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.",
  },
  {
    value: "item-2",
    trigger: "Why neobrutalism?",
    content:
      "Neobrutalism is bold, intentional, and impossible to ignore. Hard shadows, thick borders, and saturated fills make every component feel tactile and real.",
  },
  {
    value: "item-3",
    trigger: "How do I install ice-ds?",
    content:
      "Install via npm: npm install ice-ds. Then import components directly from the package. All components are tree-shakeable.",
  },
];

const AccordionDemo = ({ type = "single" }: { type?: "single" | "multiple" }) => (
  <div className="max-w-xl mx-auto">
    <Accordion type={type as "single"} collapsible={type === "single"}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

const meta = {
  title: "Components/Accordion",
  component: AccordionDemo,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof AccordionDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleOpen: Story = { args: { type: "single" } };
export const MultipleOpen: Story = { args: { type: "multiple" } };
