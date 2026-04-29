import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const separatorVariants = cva("shrink-0 bg-neo-black", {
  variants: {
    orientation: {
      horizontal: "h-[2px] w-full",
      vertical: "h-full w-[2px]",
    },
    dashed: {
      true: "bg-transparent border-dashed",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

export interface SeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>, "orientation">,
    VariantProps<typeof separatorVariants> {
  label?: string;
}

export const Separator = forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = "horizontal", dashed, label, ...props }, ref) => {
  const orient: "horizontal" | "vertical" = orientation ?? "horizontal";

  if (label && orient === "horizontal") {
    return (
      <div className="flex items-center gap-3">
        <SeparatorPrimitive.Root
          ref={ref}
          orientation={orient}
          className={cn(separatorVariants({ orientation: orient, dashed }), "flex-1", className)}
          {...props}
        />
        <span className="shrink-0 text-micro font-bold uppercase tracking-wider text-neo-black-500">
          {label}
        </span>
        <SeparatorPrimitive.Root
          orientation={orient}
          className={cn(separatorVariants({ orientation: orient, dashed }), "flex-1")}
        />
      </div>
    );
  }

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orient}
      className={cn(separatorVariants({ orientation: orient, dashed }), className)}
      {...props}
    />
  );
});
Separator.displayName = "Separator";
