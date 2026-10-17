import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export const bannerVariants = cva(
  ["w-full border-b-2 border-neo-black"],
  {
    variants: {
      intent: {
        announce: "bg-neo-yellow text-neo-black",
        info: "bg-neo-blue text-neo-black",
        success: "bg-neo-green text-neo-black",
        warning: "bg-neo-amber text-neo-black",
        error: "bg-neo-red text-white",
        dark: "bg-neo-black text-neo-offwhite border-neo-offwhite",
      },
      sticky: {
        true: "sticky top-0 z-40",
        false: "",
      },
    },
    defaultVariants: { intent: "announce", sticky: false },
  }
);

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode;
  /** Link or button shown after the message. */
  action?: React.ReactNode;
  onDismiss?: () => void;
}

/**
 * Full-width bar for site-wide notices: launches, trial expiry, maintenance windows.
 * Use <Alert> for messages inside page content.
 */
export const Banner = forwardRef<HTMLDivElement, BannerProps>(
  ({ className, intent, sticky, icon, action, onDismiss, children, ...props }, ref) => (
    <div
      ref={ref}
      role={intent === "error" || intent === "warning" ? "alert" : "status"}
      className={cn(bannerVariants({ intent, sticky }), className)}
      {...props}
    >
      <div className="relative flex flex-wrap items-center justify-center gap-x-4 gap-y-2 max-w-7xl mx-auto px-12 py-2.5 text-center">
        <p className="flex items-center gap-2 text-body-sm font-semibold">
          {icon && <span className="flex shrink-0 [&>svg]:w-4 [&>svg]:h-4" aria-hidden="true">{icon}</span>}
          <span>{children}</span>
        </p>
        {action}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  )
);
Banner.displayName = "Banner";

/** Underlined inline link styled for use inside a Banner. */
export const BannerLink = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        "text-body-sm font-bold underline underline-offset-4 decoration-2 hover:decoration-4",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current rounded-sm",
        className
      )}
      {...props}
    />
  )
);
BannerLink.displayName = "BannerLink";
