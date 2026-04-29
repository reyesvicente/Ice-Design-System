import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
} from "./Modal";
import { Button } from "../Button/Button";
import { Field, Input, Textarea } from "../Input/Input";

const meta = {
  title: "Components/Modal",
  component: ModalContent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Built on Radix Dialog primitives — ships with focus trap, escape-to-close, and ARIA wiring. Composed with ModalTrigger, ModalHeader, ModalTitle, ModalDescription, ModalFooter, and ModalClose.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ModalContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Confirm deployment</ModalTitle>
          <ModalDescription>
            This will push the current branch to production. Make sure tests
            have passed.
          </ModalDescription>
        </ModalHeader>
        <p className="text-body">
          You're about to deploy <strong>main</strong> to{" "}
          <code className="bg-neo-yellow px-1 rounded">rev6.fit</code>.
        </p>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">Cancel</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button variant="success">Deploy</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="destructive">Delete project</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Delete this project?</ModalTitle>
          <ModalDescription>
            This removes all associated files, deploys, and history. This action
            cannot be undone.
          </ModalDescription>
        </ModalHeader>
        <p className="text-body">
          Type the project name <strong>rev6-fit</strong> to confirm.
        </p>
        <Input placeholder="rev6-fit" className="mt-3" />
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">Cancel</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button variant="destructive">Delete forever</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="accent">Invite teammate</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Invite a teammate</ModalTitle>
          <ModalDescription>
            They'll get access to this workspace and all projects inside it.
          </ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <Field label="Email address" htmlFor="invite-email" required>
            <Input
              id="invite-email"
              type="email"
              placeholder="teammate@domain.com"
            />
          </Field>
          <Field label="Personal note" htmlFor="invite-note">
            <Textarea
              id="invite-note"
              placeholder="Hey, joining this project so we can ship faster."
            />
          </Field>
        </div>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">Cancel</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button variant="primary">Send invite</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const NoCloseButton: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Force a choice</Button>
      </ModalTrigger>
      <ModalContent hideClose>
        <ModalHeader>
          <ModalTitle>Accept the updated terms</ModalTitle>
          <ModalDescription>
            We've updated our terms of service. To continue, please accept.
          </ModalDescription>
        </ModalHeader>
        <p className="text-body-sm">
          No close button here — the user must make an explicit choice.
        </p>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">Decline & log out</Button>
          </ModalClose>
          <ModalClose asChild>
            <Button variant="primary">Accept & continue</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};
