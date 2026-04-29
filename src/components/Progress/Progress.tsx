import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const progressTrackVariants = cva(
  ["relative w-full overflow-hidden border-2 border-neo-black bg-neo-offwhite"],
  {
    variants: {
      size: {
        sm: "h-2 rounded-sm",
        md: "h-4 rounded",
        lg: "h-6 rounded-md",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export const progressFillVariants = cva(
  ["h-full w-full flex-1 transition-all duration-500 ease-in-out"],
  {
    variants: {
      intent: {
        default: "bg-neo-yellow",
        success: "bg-neo-green",
        info: "bg-neo-blue",
        warning: "bg-neo-amber",
        error: "bg-neo-red",
        accent: "bg-neo-pink",
      },
      striped: {
        true: [
          "bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(0,0,0,0.08)_8px,rgba(0,0,0,0.08)_16px)]",
          "bg-neo-yellow",
        ],
      },
    },
    defaultVariants: { intent: "default" },
  }
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressTrackVariants>,
    VariantProps<typeof progressFillVariants> {
  label?: string;
  showValue?: boolean;
}

export const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, size, intent, striped, label, showValue, ...props }, ref) => (
  <div className="w-full space-y-1.5">
    {(label || showValue) && (
      <div className="flex justify-between items-center">
        {label && <span className="text-body-sm font-bold text-neo-black">{label}</span>}
        {showValue && (
          <span className="text-micro font-bold text-neo-black-500 ml-auto">
            {value ?? 0}%
          </span>
        )}
      </div>
    )}
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressTrackVariants({ size }), className)}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(progressFillVariants({ intent, striped }))}
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  </div>
));
Progress.displayName = "Progress";
