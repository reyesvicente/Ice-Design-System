import { forwardRef } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface StepperStep {
  title: string;
  description?: string;
}

export type StepStatus = "complete" | "current" | "upcoming";

export interface StepperProps extends Omit<React.HTMLAttributes<HTMLOListElement>, "onChange"> {
  steps: StepperStep[];
  /** Zero-based index of the current step. */
  current: number;
  orientation?: "horizontal" | "vertical";
  /** When set, completed steps become buttons that jump back. */
  onStepClick?: (index: number) => void;
}

const markerClass: Record<StepStatus, string> = {
  complete: "bg-neo-green",
  current: "bg-neo-yellow shadow-brutal-sm",
  upcoming: "bg-neo-offwhite text-neo-black-500",
};

export const Stepper = forwardRef<HTMLOListElement, StepperProps>(
  ({ className, steps, current, orientation = "horizontal", onStepClick, ...props }, ref) => {
    const vertical = orientation === "vertical";

    return (
      <ol
        ref={ref}
        aria-label="Progress"
        className={cn("flex", vertical ? "flex-col" : "flex-row items-start w-full", className)}
        {...props}
      >
        {steps.map((step, index) => {
          const status: StepStatus =
            index < current ? "complete" : index === current ? "current" : "upcoming";
          const isLast = index === steps.length - 1;
          const clickable = onStepClick && status === "complete";

          const marker = (
            <span
              className={cn(
                "flex w-9 h-9 shrink-0 items-center justify-center rounded-full",
                "border-2 border-neo-black font-mono font-bold text-body-sm",
                markerClass[status]
              )}
            >
              {status === "complete" ? <Check className="w-4 h-4" strokeWidth={3} /> : index + 1}
            </span>
          );

          const text = (
            <span className={cn("flex flex-col min-w-0", vertical ? "pt-1.5" : "items-center text-center mt-2")}>
              <span
                className={cn(
                  "text-body-sm font-bold",
                  status === "upcoming" && "text-neo-black-500"
                )}
              >
                {step.title}
              </span>
              {step.description && (
                <span className="text-micro text-neo-black-500">{step.description}</span>
              )}
            </span>
          );

          const content = (
            <span className={cn("flex", vertical ? "flex-row gap-3" : "flex-col items-center")}>
              {marker}
              {text}
            </span>
          );

          return (
            <li
              key={step.title}
              aria-current={status === "current" ? "step" : undefined}
              className={cn("relative flex", vertical ? "flex-col pb-8 last:pb-0" : "flex-1 justify-center")}
            >
              {!isLast && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute",
                    vertical
                      ? "left-[17px] top-9 bottom-0 w-0.5"
                      : "top-[17px] left-[calc(50%+1.5rem)] right-[calc(-50%+1.5rem)] h-0.5",
                    index < current ? "bg-neo-black" : "bg-neo-black-300"
                  )}
                />
              )}
              {clickable ? (
                <button
                  type="button"
                  onClick={() => onStepClick(index)}
                  className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink hover:[&_span.rounded-full]:bg-neo-yellow"
                >
                  {content}
                </button>
              ) : (
                content
              )}
              <span className="sr-only">
                {status === "complete" ? "(completed)" : status === "current" ? "(current)" : ""}
              </span>
            </li>
          );
        })}
      </ol>
    );
  }
);
Stepper.displayName = "Stepper";
