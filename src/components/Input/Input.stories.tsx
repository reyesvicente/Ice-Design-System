import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input, Textarea, Select, Field, Label } from "./Input";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: {
    placeholder: "you@domain.com",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Atomic stories ---

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <Input {...args} />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-96">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@domain.com" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="w-96">
      <Label htmlFor="email-req" required>
        Email address
      </Label>
      <Input id="email-req" type="email" placeholder="you@domain.com" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-96">
      <Label htmlFor="disabled">Cannot edit</Label>
      <Input id="disabled" disabled defaultValue="locked@domain.com" />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="w-96">
      <Field
        label="Email address"
        htmlFor="email-err"
        error="That email is already in use"
      >
        <Input id="email-err" aria-invalid defaultValue="taken@domain.com" />
      </Field>
    </div>
  ),
};

export const WithHint: Story = {
  render: () => (
    <div className="w-96">
      <Field
        label="Project budget"
        htmlFor="budget"
        hint="Ballpark in USD. I'll work with you on scoping."
      >
        <Input id="budget" type="number" placeholder="5000" />
      </Field>
    </div>
  ),
};

// --- Other controls ---

export const TextareaStory: Story = {
  name: "Textarea",
  render: () => (
    <div className="w-96">
      <Field label="Project brief" htmlFor="brief">
        <Textarea
          id="brief"
          placeholder="What are you trying to build? What's broken today?"
        />
      </Field>
    </div>
  ),
};

export const SelectStory: Story = {
  name: "Select",
  render: () => (
    <div className="w-96">
      <Field label="Project type" htmlFor="type">
        <Select id="type" defaultValue="">
          <option value="" disabled>
            Choose one…
          </option>
          <option value="saas">SaaS platform</option>
          <option value="landing">Landing page</option>
          <option value="shopify">Shopify store</option>
          <option value="automation">Automation / internal tool</option>
        </Select>
      </Field>
    </div>
  ),
};

// --- Overview ---

export const AllSizes: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="space-y-4 p-8 w-96">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input (default)" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

export const AllStates: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-8 w-[720px]">
      <Field label="Default" htmlFor="s-default">
        <Input id="s-default" placeholder="Placeholder text" />
      </Field>
      <Field label="Filled" htmlFor="s-filled">
        <Input id="s-filled" defaultValue="ice@example.com" />
      </Field>
      <Field label="Disabled" htmlFor="s-disabled">
        <Input id="s-disabled" disabled defaultValue="locked@example.com" />
      </Field>
      <Field label="Error" htmlFor="s-error" error="Invalid email format">
        <Input id="s-error" aria-invalid defaultValue="not-an-email" />
      </Field>
    </div>
  ),
};

export const FullForm: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <form className="w-[480px] p-8 space-y-5 bg-neo-offwhite border-2 border-neo-black rounded-md shadow-brutal-lg">
      <div>
        <h3 className="font-display text-h3 mb-1">Start a project</h3>
        <p className="text-body-sm text-neo-black-700">
          30-minute intro call. I'll tell you if I can help.
        </p>
      </div>

      <Field label="Your name" htmlFor="name" required>
        <Input id="name" placeholder="Full name" />
      </Field>

      <Field label="Email" htmlFor="email-form" required>
        <Input id="email-form" type="email" placeholder="you@domain.com" />
      </Field>

      <Field label="Project type" htmlFor="type-form" required>
        <Select id="type-form" defaultValue="">
          <option value="" disabled>
            Choose one…
          </option>
          <option value="saas">SaaS platform</option>
          <option value="landing">Landing page</option>
          <option value="shopify">Shopify store</option>
          <option value="automation">Automation / internal tool</option>
        </Select>
      </Field>

      <Field
        label="Brief"
        htmlFor="brief-form"
        hint="The shorter, the better. I'll ask questions on the call."
      >
        <Textarea
          id="brief-form"
          placeholder="What's the project? What's broken today?"
        />
      </Field>

      <div className="flex gap-3 pt-2">
        <Button variant="primary" type="submit">
          Send brief
        </Button>
        <Button variant="ghost" type="button">
          Cancel
        </Button>
      </div>
    </form>
  ),
};
