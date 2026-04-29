import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const navbarVariants = cva(
  ["w-full border-b-2 border-neo-black"],
  {
    variants: {
      variant: {
        default: "bg-neo-offwhite text-neo-black",
        dark: "bg-neo-black text-neo-offwhite border-neo-offwhite",
        yellow: "bg-neo-yellow text-neo-black",
        pink: "bg-neo-pink text-neo-black",
        blue: "bg-neo-blue text-neo-black",
      },
      sticky: {
        true: "sticky top-0 z-30",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      sticky: false,
    },
  }
);

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ className, variant, sticky, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(navbarVariants({ variant, sticky }), className)}
      {...props}
    />
  )
);
Navbar.displayName = "Navbar";

export const NavbarContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-16 items-center gap-6 px-6 max-w-7xl mx-auto", className)}
    {...props}
  />
));
NavbarContainer.displayName = "NavbarContainer";

export const NavbarBrand = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "flex items-center gap-2 font-display font-bold text-h5 shrink-0",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink rounded",
      className
    )}
    {...props}
  />
));
NavbarBrand.displayName = "NavbarBrand";

export const NavbarNav = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-1 items-center gap-1", className)}
    {...props}
  />
));
NavbarNav.displayName = "NavbarNav";

export const NavbarLink = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean }
>(({ className, active, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "px-3 py-2 rounded text-body-sm font-bold",
      "border-2 border-transparent",
      "transition-colors duration-150",
      active
        ? "bg-neo-yellow border-neo-black"
        : "hover:bg-neo-yellow hover:border-neo-black",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink",
      className
    )}
    {...props}
  />
));
NavbarLink.displayName = "NavbarLink";

export const NavbarActions = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-3 ml-auto", className)}
    {...props}
  />
));
NavbarActions.displayName = "NavbarActions";
