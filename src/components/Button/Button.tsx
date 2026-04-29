import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-semibold rounded-md",
    "border-2 border-neo-black",
    "transition-all duration-150",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neo-pink focus-visible:ring-offset-2 focus-visible:ring-offset-neo-offwhite",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-neo-yellow text-neo-black shadow-brutal",
          "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-md",
          "active:translate-x-0 active:translate-y-0 active:shadow-none",
          "disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-brutal",
        ],
        secondary: [
          "bg-neo-offwhite text-neo-black shadow-brutal",
          "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-md",
          "active:translate-x-0 active:translate-y-0 active:shadow-none",
          "disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-brutal",
        ],
        ghost: [
          "bg-transparent border-transparent shadow-none text-neo-black",
          "hover:underline underline-offset-4",
        ],
        destructive: [
          "bg-neo-red text-white shadow-brutal",
          "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-md",
          "active:translate-x-0 active:translate-y-0 active:shadow-none",
        ],
        success: [
          "bg-neo-green text-neo-black shadow-brutal",
          "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-md",
          "active:translate-x-0 active:translate-y-0 active:shadow-none",
        ],
        accent: [
          "bg-neo-pink text-neo-black shadow-brutal",
          "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-md",
          "active:translate-x-0 active:translate-y-0 active:shadow-none",
        ],
        inverse: [
          "bg-neo-black text-neo-offwhite border-neo-black shadow-brutal-yellow",
          "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#FFDE59]",
          "active:translate-x-0 active:translate-y-0 active:shadow-none",
        ],
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-3 text-lg",
        lg: "px-7 py-3.5 text-lg",
        xl: "px-9 py-4 text-xl font-bold",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <Spinner />
            <span>Working…</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
      />
    </svg>
  );
}
