import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { InputGroup } from "./InputGroup";
import { Field } from "../Input/Input";

const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Addons: Story = {
  render: (args) => (
    <div className="w-96">
      <Field label="Website" htmlFor="site">
        <InputGroup {...args} id="site" startAddon="https://" endAddon=".com" placeholder="yourbrand" />
      </Field>
    </div>
  ),
};

export const Currency: Story = {
  render: () => (
    <div className="w-96">
      <Field label="Budget" htmlFor="budget">
        <InputGroup id="budget" type="number" startAddon="$" endAddon="USD" placeholder="5000" />
      </Field>
    </div>
  ),
};

function SearchDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="w-96">
      <InputGroup
        aria-label="Search"
        startIcon={<Search />}
        placeholder="Search projects…"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        endElement={
          value && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setValue("")}
              className="p-0.5 rounded-sm hover:bg-neo-pink"
            >
              <X className="w-4 h-4" strokeWidth={2.5} />
            </button>
          )
        }
      />
    </div>
  );
}

export const SearchWithClear: Story = {
  render: () => <SearchDemo />,
};

export const Error: Story = {
  render: () => (
    <div className="w-96">
      <Field label="Subdomain" htmlFor="sub" error="That subdomain is taken">
        <InputGroup id="sub" aria-invalid endAddon=".ice.app" defaultValue="acme" />
      </Field>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-96">
      <InputGroup disabled startAddon="https://" defaultValue="locked.example" />
    </div>
  ),
};
