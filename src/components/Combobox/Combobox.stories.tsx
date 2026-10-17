import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Combobox, type ComboboxOption } from "./Combobox";
import { Field } from "../Input/Input";

const frameworks: ComboboxOption[] = [
  { value: "django", label: "Django", description: "Python, batteries included" },
  { value: "rails", label: "Ruby on Rails" },
  { value: "laravel", label: "Laravel" },
  { value: "express", label: "Express" },
  { value: "fastapi", label: "FastAPI", description: "Async Python APIs" },
  { value: "phoenix", label: "Phoenix" },
  { value: "spring", label: "Spring Boot", disabled: true },
  { value: "nest", label: "NestJS" },
  { value: "flask", label: "Flask" },
  { value: "gin", label: "Gin" },
];

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { options: frameworks, placeholder: "Pick a framework" },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <Combobox {...args} />
    </div>
  ),
};

function MultipleDemo() {
  const [value, setValue] = useState<string[]>(["django", "fastapi"]);
  return (
    <div className="w-80">
      <Field label="Stack" htmlFor="stack" hint={`Selected: ${value.join(", ") || "none"}`}>
        <Combobox
          id="stack"
          multiple
          options={frameworks}
          value={value}
          onValueChange={setValue}
          placeholder="Pick frameworks"
        />
      </Field>
    </div>
  );
}

export const Multiple: Story = {
  render: () => <MultipleDemo />,
};

export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <Field label="Framework" htmlFor="fw-err" error="Pick a framework to continue">
        <Combobox id="fw-err" options={frameworks} aria-invalid />
      </Field>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Combobox options={frameworks} defaultValue="django" disabled />
    </div>
  ),
};
