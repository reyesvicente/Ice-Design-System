import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader,
  DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, DrawerClose,
} from "./Drawer";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const DrawerDemo = ({ side }: { side?: "left" | "right" | "top" | "bottom" }) => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button variant="secondary">Open {side ?? "right"} drawer</Button>
    </DrawerTrigger>
    <DrawerContent side={side}>
      <DrawerHeader>
        <DrawerTitle>Panel title</DrawerTitle>
        <DrawerDescription>Supporting text goes here.</DrawerDescription>
      </DrawerHeader>
      <DrawerBody>
        <p className="text-body-sm text-neo-black-700">
          Drawer content lives here. Use it for settings panels, navigation, filters, or any contextual UI.
        </p>
      </DrawerBody>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="secondary" size="sm">Cancel</Button>
        </DrawerClose>
        <Button size="sm">Save</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export const Right: Story = { render: () => <DrawerDemo side="right" /> };
export const Left: Story = { render: () => <DrawerDemo side="left" /> };
export const Bottom: Story = { render: () => <DrawerDemo side="bottom" /> };
export const Top: Story = { render: () => <DrawerDemo side="top" /> };
