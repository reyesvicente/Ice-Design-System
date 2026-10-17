import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { createContext, forwardRef, useContext } from "react";
import { cn } from "@/lib/cn";

export const toggleGroupVariants = cva("inline-flex items-center", {
  variants: {
    variant: {
      // Attached segments sharing one border
      segmented: "border-2 border-neo-black rounded-md shadow-brutal-sm overflow-hidden bg-neo-offwhite",
      // Separate buttons with gaps
      outline: "gap-2",
    },
  },
  defaultVariants: { variant: "segmented" },
});

export const toggleGroupItemVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-bold text-neo-black whitespace-nowrap",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink focus-visible:ring-inset",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "[&>svg]:w-4 [&>svg]:h-4",
    "data-[state=on]:bg-neo-yellow",
  ],
  {
    variants: {
      variant: {
        segmented: "border-r-2 border-neo-black last:border-r-0 hover:bg-neo-yellow-50",
        outline: [
          "border-2 border-neo-black rounded-md bg-neo-offwhite shadow-brutal-sm",
          "hover:bg-neo-yellow-50",
          "data-[state=on]:shadow-none data-[state=on]:translate-x-[3px] data-[state=on]:translate-y-[3px]",
        ],
      },
      size: {
        sm: "h-8 px-3 text-body-sm",
        md: "h-10 px-4 text-body-sm",
        lg: "h-12 px-5 text-body",
      },
    },
    defaultVariants: { variant: "segmented", size: "md" },
  }
);

type ToggleGroupContextValue = VariantProps<typeof toggleGroupItemVariants>;
const ToggleGroupContext = createContext<ToggleGroupContextValue>({});

export type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleGroupItemVariants>;

export const ToggleGroup = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(toggleGroupVariants({ variant }), className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));
ToggleGroup.displayName = "ToggleGroup";

export type ToggleGroupItemProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>;

export const ToggleGroupItem = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, ...props }, ref) => {
  const { variant, size } = useContext(ToggleGroupContext);
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(toggleGroupItemVariants({ variant, size }), className)}
      {...props}
    />
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";
