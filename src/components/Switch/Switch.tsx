import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const switchRootVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer items-center",
    "rounded-full border-2 border-neo-black",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink focus-visible:ring-offset-2 focus-visible:ring-offset-neo-offwhite",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=unchecked]:bg-neo-black-100",
  ],
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
      intent: {
        default: "data-[state=checked]:bg-neo-yellow",
        success: "data-[state=checked]:bg-neo-green",
        info: "data-[state=checked]:bg-neo-blue",
        accent: "data-[state=checked]:bg-neo-pink",
      },
    },
    defaultVariants: { size: "md", intent: "default" },
  }
);

export const switchThumbVariants = cva(
  [
    "pointer-events-none block rounded-full",
    "bg-neo-offwhite border-2 border-neo-black shadow-brutal-sm",
    "transition-transform duration-200",
  ],
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5",
        md: "h-4 w-4 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5",
        lg: "h-5 w-5 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0.5",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchRootVariants> {
  label?: string;
  description?: string;
}

export const Switch = forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size, intent, label, description, id, ...props }, ref) => {
  const switchId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex items-center gap-3">
      <SwitchPrimitive.Root
        ref={ref}
        id={switchId}
        className={cn(switchRootVariants({ size, intent }), className)}
        {...props}
      >
        <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ size }))} />
      </SwitchPrimitive.Root>
      {label && (
        <div className="flex flex-col gap-0.5">
          <label
            htmlFor={switchId}
            className="text-body-sm font-bold text-neo-black cursor-pointer"
          >
            {label}
          </label>
          {description && (
            <p className="text-micro text-neo-black-500">{description}</p>
          )}
        </div>
      )}
    </div>
  );
});
Switch.displayName = "Switch";
