import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { ArrowRight, Download, Trash2, Rocket, Check } from "lucide-react";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Hard-shadow neubrutalist button. Hovering translates the button -2px/-2px and grows the shadow. Active press collapses both to zero, giving a tactile 'pressed in' feel.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "ghost",
        "destructive",
        "success",
        "accent",
        "inverse",
      ],
      description: "Visual style / role of the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Book a call",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Individual variants ---

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost", children: "Learn more →" } };
export const Destructive: Story = { args: { variant: "destructive", children: "Delete project" } };
export const Success: Story = { args: { variant: "success", children: "Deploy" } };
export const Accent: Story = { args: { variant: "accent", children: "Try it free" } };
export const Inverse: Story = { args: { variant: "inverse", children: "Open dashboard" } };

// --- State stories ---

export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const FullWidth: Story = {
  args: { fullWidth: true, children: "Submit application" },
  render: (args) => (
    <div className="w-96">
      <Button {...args} />
    </div>
  ),
};

// --- Overview stories (QA surface) ---

export const AllVariants: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-wrap gap-4 p-8">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="success">Success</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="inverse">Inverse</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-wrap items-end gap-4 p-8">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const AllStates: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-4 gap-4 p-8">
      {(["primary", "secondary", "destructive", "success"] as const).map((v) => (
        <div key={v} className="space-y-3">
          <p className="text-xs font-mono uppercase tracking-wider text-neo-black-700">
            {v}
          </p>
          <Button variant={v}>Default</Button>
          <Button variant={v} disabled>
            Disabled
          </Button>
          <Button variant={v} loading>
            Loading
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="flex flex-wrap gap-4 p-8">
      <Button>
        <Rocket className="w-4 h-4" /> Ship it
      </Button>
      <Button variant="secondary">
        <Download className="w-4 h-4" /> Download
      </Button>
      <Button variant="accent">
        Start free trial <ArrowRight className="w-4 h-4" />
      </Button>
      <Button variant="destructive">
        <Trash2 className="w-4 h-4" /> Delete
      </Button>
      <Button variant="success">
        <Check className="w-4 h-4" /> Approved
      </Button>
    </div>
  ),
};

export const OnColoredBackgrounds: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="grid grid-cols-2 gap-0">
      {(
        [
          { bg: "bg-neo-yellow", label: "On yellow — use inverse" },
          { bg: "bg-neo-pink", label: "On pink — use inverse" },
          { bg: "bg-neo-blue", label: "On blue — use inverse" },
          { bg: "bg-neo-green", label: "On green — use inverse" },
          { bg: "bg-neo-purple", label: "On purple — use inverse" },
          { bg: "bg-neo-black", label: "On black — use primary" },
        ] as const
      ).map(({ bg, label }) => (
        <div key={bg} className={`${bg} p-12 space-y-4`}>
          <p
            className={`text-sm font-bold uppercase tracking-wider ${
              bg === "bg-neo-black" ? "text-neo-offwhite" : "text-neo-black"
            }`}
          >
            {label}
          </p>
          <div className="flex gap-3">
            <Button variant={bg === "bg-neo-black" ? "primary" : "inverse"}>
              Book a call
            </Button>
            <Button variant="secondary">See work</Button>
          </div>
        </div>
      ))}
    </div>
  ),
};
