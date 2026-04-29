import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, description, id, indeterminate, checked, ...props }, ref) => {
  const checkboxId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex items-start gap-3">
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        checked={indeterminate ? "indeterminate" : checked}
        className={cn(
          "w-5 h-5 shrink-0 mt-0.5",
          "border-2 border-neo-black rounded-sm",
          "bg-neo-offwhite",
          "transition-colors duration-150",
          "hover:border-neo-black hover:bg-neo-yellow-50",
          "data-[state=checked]:bg-neo-yellow data-[state=checked]:border-neo-black",
          "data-[state=indeterminate]:bg-neo-blue data-[state=indeterminate]:border-neo-black",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink focus-visible:ring-offset-2 focus-visible:ring-offset-neo-offwhite",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-neo-black">
          {indeterminate ? (
            <Minus className="w-3 h-3" strokeWidth={3} />
          ) : (
            <Check className="w-3 h-3" strokeWidth={3} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <div className="flex flex-col gap-0.5">
          <label
            htmlFor={checkboxId}
            className="text-body-sm font-bold text-neo-black cursor-pointer"
          >
            {label}
          </label>
          {description && (
            <p className="text-micro text-neo-black-500">{description}</p>
          )}
        </div>
      )}
    </div>
  );
});
Checkbox.displayName = "Checkbox";
