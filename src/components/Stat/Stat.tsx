import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

export const statVariants = cva(
  [
    "border-2 border-neo-black rounded-md",
    "bg-neo-offwhite",
    "p-4",
  ],
  {
    variants: {
      accent: {
        none: "",
        yellow: "border-l-[6px] border-l-neo-yellow",
        green: "border-l-[6px] border-l-neo-green",
        blue: "border-l-[6px] border-l-neo-blue",
        pink: "border-l-[6px] border-l-neo-pink",
        purple: "border-l-[6px] border-l-neo-purple",
        red: "border-l-[6px] border-l-neo-red",
      },
      shadow: {
        none: "",
        sm: "shadow-brutal-sm",
        md: "shadow-brutal-md",
        DEFAULT: "shadow-brutal",
      },
    },
    defaultVariants: { accent: "none", shadow: "DEFAULT" },
  }
);

export type StatTrend = "up" | "down" | "flat";

export interface StatProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statVariants> {
  label: string;
  value: string | number;
  trend?: StatTrend;
  trendValue?: string;
  icon?: React.ReactNode;
  description?: string;
}

const trendConfig = {
  up: { Icon: TrendingUp, color: "text-neo-green" },
  down: { Icon: TrendingDown, color: "text-neo-red" },
  flat: { Icon: Minus, color: "text-neo-black-500" },
} as const;

export const Stat = forwardRef<HTMLDivElement, StatProps>(
  ({ className, accent, shadow, label, value, trend, trendValue, icon, description, ...props }, ref) => {
    const trendInfo = trend ? trendConfig[trend] : null;

    return (
      <div
        ref={ref}
        className={cn(statVariants({ accent, shadow }), className)}
        {...props}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-micro font-bold uppercase tracking-wider text-neo-black-500">
            {label}
          </p>
          {icon && (
            <div className="shrink-0 w-9 h-9 flex items-center justify-center border-2 border-neo-black rounded bg-neo-offwhite shadow-brutal-sm">
              {icon}
            </div>
          )}
        </div>
        <p className="font-display font-bold text-h2 text-neo-black mt-1 leading-none">
          {value}
        </p>
        {(trendInfo || description) && (
          <div className="flex items-center gap-2 mt-2">
            {trendInfo && (
              <span className={cn("inline-flex items-center gap-1 text-body-sm font-bold", trendInfo.color)}>
                <trendInfo.Icon className="w-4 h-4" strokeWidth={2.5} />
                {trendValue}
              </span>
            )}
            {description && (
              <span className="text-micro text-neo-black-500">{description}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);
Stat.displayName = "Stat";

export const StatGrid = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4", className)}
      {...props}
    />
  )
);
StatGrid.displayName = "StatGrid";
