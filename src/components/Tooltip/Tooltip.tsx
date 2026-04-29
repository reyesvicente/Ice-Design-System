import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const tooltipContentVariants = cva(
  [
    "z-50 overflow-hidden rounded-sm px-3 py-1.5",
    "text-micro font-bold",
    "border-2 border-neo-black",
    "animate-in fade-in-0 zoom-in-95",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
    "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
  ],
  {
    variants: {
      variant: {
        default: "bg-neo-black text-neo-offwhite shadow-brutal-sm",
        light: "bg-neo-offwhite text-neo-black shadow-brutal",
        yellow: "bg-neo-yellow text-neo-black shadow-brutal",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {}

export const TooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, variant, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(tooltipContentVariants({ variant }), className)}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = "TooltipContent";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  variant?: VariantProps<typeof tooltipContentVariants>["variant"];
  side?: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>["side"];
  delayDuration?: number;
}

export const Tooltip = ({
  content,
  children,
  variant,
  side,
  delayDuration = 400,
}: TooltipProps) => (
  <TooltipRoot delayDuration={delayDuration}>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent variant={variant} side={side}>
      {content}
    </TooltipContent>
  </TooltipRoot>
);
