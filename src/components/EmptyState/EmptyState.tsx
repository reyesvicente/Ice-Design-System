import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const emptyStateVariants = cva(
  [
    "flex flex-col items-center justify-center text-center",
    "border-2 border-neo-black border-dashed rounded-md",
    "bg-neo-offwhite",
  ],
  {
    variants: {
      size: {
        sm: "px-6 py-8 gap-2",
        md: "px-8 py-12 gap-3",
        lg: "px-12 py-16 gap-4",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, size, icon, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(emptyStateVariants({ size }), className)}
      {...props}
    >
      {icon && (
        <div className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-neo-black bg-neo-yellow shadow-brutal">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <p className="font-display font-bold text-h5 text-neo-black">{title}</p>
        {description && (
          <p className="text-body-sm text-neo-black-500 max-w-sm">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
);
EmptyState.displayName = "EmptyState";
