import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { TagInput } from "./TagInput";
import { Field } from "../Input/Input";

const meta = {
  title: "Components/TagInput",
  component: TagInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    tagVariant: {
      control: "select",
      options: ["default", "primary", "info", "success", "new", "premium"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    placeholder: "Add a tag and press Enter",
    defaultValue: ["react", "django"],
  },
} satisfies Meta<typeof TagInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <TagInput {...args} />
    </div>
  ),
};

function EmailDemo() {
  const [emails, setEmails] = useState<string[]>([]);
  return (
    <div className="w-96">
      <Field
        label="Invite teammates"
        htmlFor="invite"
        hint={`Paste a comma-separated list. ${emails.length}/5 invited.`}
      >
        <TagInput
          id="invite"
          value={emails}
          onValueChange={setEmails}
          maxTags={5}
          validate={(tag) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tag)}
          tagVariant="info"
          placeholder="name@company.com"
        />
      </Field>
    </div>
  );
}

export const EmailsWithValidation: Story = {
  render: () => <EmailDemo />,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <div className="w-96">
      <TagInput {...args} />
    </div>
  ),
};
