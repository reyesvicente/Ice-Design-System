import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-12 h-12",
    },
    intent: {
      default: "text-neo-black",
      primary: "text-neo-yellow",
      success: "text-neo-green",
      info: "text-neo-blue",
      accent: "text-neo-pink",
      white: "text-neo-offwhite",
    },
  },
  defaultVariants: { size: "md", intent: "default" },
});

export interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

export const Spinner = ({ className, size, intent, label = "Loading…", ...props }: SpinnerProps) => (
  <svg
    className={cn(spinnerVariants({ size, intent }), className)}
    viewBox="0 0 24 24"
    fill="none"
    aria-label={label}
    role="status"
    {...props}
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

export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export const LoadingOverlay = ({ className, label = "Loading…", ...props }: LoadingOverlayProps) => (
  <div
    role="status"
    aria-label={label}
    className={cn(
      "absolute inset-0 flex flex-col items-center justify-center gap-3",
      "bg-neo-offwhite/80 backdrop-blur-sm z-10",
      "border-2 border-neo-black rounded-md",
      className
    )}
    {...props}
  >
    <Spinner size="lg" />
    <span className="text-body-sm font-bold">{label}</span>
  </div>
);
