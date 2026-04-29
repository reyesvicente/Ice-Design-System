import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const cardVariants = cva(
  [
    "border-2 border-neo-black rounded-md",
    "p-6 md:p-8",
    "transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        default: "bg-neo-offwhite text-neo-black",
        featured: "bg-neo-pink text-neo-black",
        success: "bg-neo-green text-neo-black",
        info: "bg-neo-blue text-neo-black",
        premium: "bg-neo-purple text-neo-black",
        primary: "bg-neo-yellow text-neo-black",
        inverse: "bg-neo-black text-neo-offwhite border-neo-offwhite",
      },
      elevation: {
        sm: "shadow-brutal-sm",
        md: "shadow-brutal-md",
        lg: "shadow-brutal-lg",
        xl: "shadow-brutal-xl",
        none: "shadow-none",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg",
      },
    },
    compoundVariants: [
      {
        variant: "inverse",
        elevation: "md",
        class: "shadow-[6px_6px_0_0_#FFFDF5]",
      },
      {
        variant: "inverse",
        elevation: "lg",
        class: "shadow-[10px_10px_0_0_#FFFDF5]",
      },
    ],
    defaultVariants: {
      variant: "default",
      elevation: "md",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, elevation, interactive, as: Component = "div", ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(cardVariants({ variant, elevation, interactive }), className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

// --- Convenience subcomponents ---

export const CardEyebrow = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-xs font-mono font-semibold uppercase tracking-wider mb-3",
      className
    )}
    {...props}
  />
));
CardEyebrow.displayName = "CardEyebrow";

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-display text-h4 mb-2", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-body leading-relaxed", className)} {...props} />
));
CardDescription.displayName = "CardDescription";
