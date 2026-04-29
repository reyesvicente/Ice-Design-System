import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const kbdVariants = cva(
  [
    "inline-flex items-center gap-0.5",
    "font-mono font-bold",
    "border-2 border-neo-black",
    "rounded-sm",
    "select-none",
  ],
  {
    variants: {
      size: {
        sm: "px-1.5 py-0.5 text-micro shadow-[2px_2px_0_0_#0F0F0F]",
        md: "px-2 py-1 text-body-sm shadow-brutal-sm",
        lg: "px-3 py-1.5 text-body shadow-brutal",
      },
      variant: {
        default: "bg-neo-offwhite text-neo-black",
        dark: "bg-neo-black text-neo-offwhite border-neo-black",
        yellow: "bg-neo-yellow text-neo-black",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ className, size, variant, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(kbdVariants({ size, variant }), className)}
      {...props}
    />
  )
);
Kbd.displayName = "Kbd";

export interface ShortcutProps extends React.HTMLAttributes<HTMLSpanElement> {
  keys: string[];
  size?: VariantProps<typeof kbdVariants>["size"];
  variant?: VariantProps<typeof kbdVariants>["variant"];
}

export const Shortcut = ({ keys, size, variant, className, ...props }: ShortcutProps) => (
  <span className={cn("inline-flex items-center gap-1", className)} {...props}>
    {keys.map((key, i) => (
      <Kbd key={i} size={size} variant={variant}>
        {key}
      </Kbd>
    ))}
  </span>
);
