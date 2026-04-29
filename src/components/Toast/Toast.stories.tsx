import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  ToastProvider, ToastViewport,
  Toast,
  ToastWithIcon,
} from "./Toast";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Toast",
  component: Toast,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIntents: Story = {
  render: () => {
    const [open, setOpen] = useState<string | null>(null);
    const intents = ["default", "success", "warning", "error", "info"] as const;
    const messages = {
      default: { title: "Note", description: "Something happened in the background." },
      success: { title: "Deployed!", description: "Your site is live at ice-ds.design." },
      warning: { title: "Almost full", description: "Storage is at 90% capacity." },
      error: { title: "Build failed", description: "Check the logs for more information." },
      info: { title: "Update available", description: "Version 2.0 is ready to install." },
    };

    return (
      <div className="flex flex-wrap gap-3">
        {intents.map((intent) => (
          <Button
            key={intent}
            variant="secondary"
            size="sm"
            onClick={() => setOpen(intent)}
          >
            Show {intent}
          </Button>
        ))}
        {intents.map((intent) => (
          <ToastWithIcon
            key={intent}
            intent={intent}
            title={messages[intent].title}
            description={messages[intent].description}
            open={open === intent}
            onOpenChange={(o) => !o && setOpen(null)}
          />
        ))}
      </div>
    );
  },
};
