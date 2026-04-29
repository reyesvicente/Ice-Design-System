import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Info, CheckCircle, AlertTriangle, AlertOctagon, Megaphone, X } from "lucide-react";
import { cn } from "@/lib/cn";

const alertVariants = cva(
  [
    "flex gap-4 items-start",
    "p-4 pr-6",
    "border-2 border-neo-black rounded-md shadow-brutal",
  ],
  {
    variants: {
      intent: {
        info: "bg-neo-blue text-neo-black",
        success: "bg-neo-green text-neo-black",
        warning: "bg-neo-amber text-neo-black",
        error: "bg-neo-red text-white",
        announce: "bg-neo-pink text-neo-black",
      },
    },
    defaultVariants: { intent: "info" },
  }
);

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertOctagon,
  announce: Megaphone,
} as const;

const defaultTitles = {
  info: "Heads up",
  success: "Nice",
  warning: "Check this",
  error: "Something broke",
  announce: "Announcement",
} as const;

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  title?: string;
  onDismiss?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, intent = "info", title, onDismiss, children, ...props }, ref) => {
    const safeIntent = intent ?? "info";
    const Icon = iconMap[safeIntent];
    const heading = title ?? defaultTitles[safeIntent];

    return (
      <div
        ref={ref}
        role={safeIntent === "error" ? "alert" : "status"}
        className={cn(alertVariants({ intent: safeIntent }), className)}
        {...props}
      >
        <Icon className="w-5 h-5 mt-0.5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="font-bold">{heading}</p>
          {children && <div className="text-body-sm mt-0.5">{children}</div>}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            aria-label="Dismiss"
            className="shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-black"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";
