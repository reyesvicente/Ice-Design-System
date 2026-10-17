import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FileInput, type FileRejection } from "./FileInput";
import { Field } from "../Input/Input";

const meta = {
  title: "Components/FileInput",
  component: FileInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    accept: { control: "text" },
  },
  args: {
    title: "Drop files here or click to browse",
    description: "PNG, JPG or PDF up to 5 MB",
  },
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <FileInput {...args} />
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="w-96">
      <FileInput multiple description="Add as many files as you need" />
    </div>
  ),
};

export const ImagesOnly: Story = {
  render: () => (
    <div className="w-96">
      <FileInput
        accept="image/*"
        title="Upload a cover image"
        description="Any image format"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-96">
      <FileInput disabled description="Uploads are paused" />
    </div>
  ),
};

function ValidationDemo() {
  const [error, setError] = useState<string>();

  const handleReject = (rejections: FileRejection[]) => {
    const [{ file, reason }] = rejections;
    setError(
      reason === "size"
        ? `${file.name} is larger than 1 MB`
        : `${file.name} is not a PDF`
    );
  };

  return (
    <div className="w-96">
      <Field
        label="Signed contract"
        htmlFor="contract"
        required
        error={error}
        hint="PDF only, max 1 MB"
      >
        <FileInput
          id="contract"
          accept=".pdf,application/pdf"
          maxSize={1024 * 1024}
          aria-invalid={Boolean(error)}
          onReject={handleReject}
          onFilesChange={() => setError(undefined)}
          description="PDF up to 1 MB"
        />
      </Field>
    </div>
  );
}

export const WithValidation: Story = {
  render: () => <ValidationDemo />,
};

export const AllSizes: Story = {
  parameters: { layout: "padded" },
  render: () => (
    <div className="space-y-4 p-8 w-96">
      <FileInput size="sm" title="Small" />
      <FileInput size="md" title="Medium (default)" />
      <FileInput size="lg" title="Large" />
    </div>
  ),
};
