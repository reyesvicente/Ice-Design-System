import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const badgeVariants = cva(
  [
    "inline-flex items-center gap-1",
    "px-2 py-0.5",
    "text-xs font-bold uppercase tracking-wider",
    "border-2 border-neo-black rounded-sm",
    "whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        default: "bg-neo-offwhite text-neo-black",
        new: "bg-neo-pink text-neo-black",
        primary: "bg-neo-yellow text-neo-black",
        success: "bg-neo-green text-neo-black",
        info: "bg-neo-blue text-neo-black",
        premium: "bg-neo-purple text-neo-black",
        warning: "bg-neo-amber text-neo-black",
        error: "bg-neo-red text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge";
