import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const Tabs = TabsPrimitive.Root;

export const tabsListVariants = cva(
  "inline-flex items-center",
  {
    variants: {
      variant: {
        underline: "border-b-2 border-neo-black gap-0 w-full",
        pill: "gap-1 bg-neo-black/5 p-1 rounded-md border-2 border-neo-black",
        boxed: "border-2 border-neo-black rounded-t-md gap-0",
      },
    },
    defaultVariants: { variant: "underline" },
  }
);

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

export const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "text-body-sm font-bold whitespace-nowrap",
    "transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink focus-visible:ring-inset",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        underline: [
          "px-4 py-2 -mb-[2px]",
          "border-b-2 border-transparent text-neo-black-500",
          "hover:text-neo-black hover:border-neo-black",
          "data-[state=active]:border-neo-black data-[state=active]:text-neo-black",
        ],
        pill: [
          "px-3 py-1.5 rounded",
          "text-neo-black-500",
          "hover:text-neo-black",
          "data-[state=active]:bg-neo-yellow data-[state=active]:text-neo-black data-[state=active]:shadow-brutal-sm data-[state=active]:border-2 data-[state=active]:border-neo-black",
        ],
        boxed: [
          "px-4 py-2",
          "border-r-2 border-neo-black last:border-r-0",
          "bg-neo-black/5 text-neo-black-500",
          "hover:bg-neo-black/10 hover:text-neo-black",
          "data-[state=active]:bg-neo-yellow data-[state=active]:text-neo-black",
        ],
      },
    },
    defaultVariants: { variant: "underline" },
  }
);

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

export const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink rounded",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";
