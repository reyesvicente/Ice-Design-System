import { type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { fieldVariants } from "../Input/Input";

export interface InputGroupProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof fieldVariants> {
  /** Boxed segment before the input, e.g. "https://". */
  startAddon?: React.ReactNode;
  /** Boxed segment after the input, e.g. ".com" or a button. */
  endAddon?: React.ReactNode;
  /** Inline icon inside the field, before the text. */
  startIcon?: React.ReactNode;
  /** Inline element inside the field, after the text, e.g. a clear button. */
  endElement?: React.ReactNode;
  /** Class for the outer wrapper; `className` goes to the <input>. */
  wrapperClassName?: string;
}

const addonClass = cn(
  "flex items-center shrink-0 px-3",
  "bg-neo-offwhite-100 text-neo-black font-semibold",
  "[&>button]:h-full [&>button]:-my-px"
);

export const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  (
    { className, wrapperClassName, size, startAddon, endAddon, startIcon, endElement, disabled, ...props },
    ref
  ) => (
    <div
      data-disabled={disabled || undefined}
      className={cn(
        fieldVariants({ size }),
        // The wrapper owns border/shadow; padding moves to the input and addons
        "flex items-stretch p-0 overflow-hidden",
        "focus-within:shadow-brutal-pink focus-within:-translate-x-0.5 focus-within:-translate-y-0.5",
        "has-[input[aria-invalid=true]]:border-neo-red has-[input[aria-invalid=true]]:shadow-brutal-red",
        "data-[disabled]:bg-neo-offwhite-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70",
        wrapperClassName
      )}
    >
      {startAddon && <div className={cn(addonClass, "border-r-2 border-neo-black")}>{startAddon}</div>}
      <div className="flex flex-1 items-center gap-2 min-w-0 px-3">
        {startIcon && (
          <span className="flex shrink-0 text-neo-black-500 [&>svg]:w-4 [&>svg]:h-4" aria-hidden="true">
            {startIcon}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full min-w-0 bg-transparent placeholder:text-neo-black/50",
            "focus:outline-none disabled:cursor-not-allowed focus-visible:ring-0 focus-visible:ring-offset-0",
            size === "sm" ? "py-2" : size === "lg" ? "py-3.5" : "py-3",
            className
          )}
          {...props}
        />
        {endElement && <span className="flex shrink-0 items-center">{endElement}</span>}
      </div>
      {endAddon && <div className={cn(addonClass, "border-l-2 border-neo-black")}>{endAddon}</div>}
    </div>
  )
);
InputGroup.displayName = "InputGroup";
