import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navbar, NavbarContainer, NavbarBrand, NavbarNav, NavbarLink, NavbarActions } from "./Navbar";
import { Button } from "../Button/Button";
import { Zap } from "lucide-react";

const meta = {
  title: "Components/Navbar",
  component: Navbar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Navbar>
      <NavbarContainer>
        <NavbarBrand href="#">
          <Zap className="w-5 h-5" />
          ice-ds
        </NavbarBrand>
        <NavbarNav>
          <NavbarLink href="#" active>Home</NavbarLink>
          <NavbarLink href="#">Products</NavbarLink>
          <NavbarLink href="#">Docs</NavbarLink>
          <NavbarLink href="#">Blog</NavbarLink>
        </NavbarNav>
        <NavbarActions>
          <Button variant="ghost" size="sm">Sign in</Button>
          <Button size="sm">Get started</Button>
        </NavbarActions>
      </NavbarContainer>
    </Navbar>
  ),
};

export const Dark: Story = {
  render: () => (
    <Navbar variant="dark">
      <NavbarContainer>
        <NavbarBrand href="#">
          <Zap className="w-5 h-5" />
          ice-ds
        </NavbarBrand>
        <NavbarNav>
          <NavbarLink href="#" className="hover:bg-neo-offwhite/10 hover:border-neo-offwhite">Home</NavbarLink>
          <NavbarLink href="#" className="hover:bg-neo-offwhite/10 hover:border-neo-offwhite">Products</NavbarLink>
          <NavbarLink href="#" className="hover:bg-neo-offwhite/10 hover:border-neo-offwhite">Docs</NavbarLink>
        </NavbarNav>
        <NavbarActions>
          <Button variant="inverse" size="sm">Sign in</Button>
          <Button size="sm">Get started</Button>
        </NavbarActions>
      </NavbarContainer>
    </Navbar>
  ),
};

export const Yellow: Story = {
  render: () => (
    <Navbar variant="yellow">
      <NavbarContainer>
        <NavbarBrand href="#">
          <Zap className="w-5 h-5" />
          ice-ds
        </NavbarBrand>
        <NavbarNav>
          <NavbarLink href="#" active>Home</NavbarLink>
          <NavbarLink href="#">Products</NavbarLink>
          <NavbarLink href="#">Docs</NavbarLink>
        </NavbarNav>
        <NavbarActions>
          <Button variant="inverse" size="sm">Get started</Button>
        </NavbarActions>
      </NavbarContainer>
    </Navbar>
  ),
};
