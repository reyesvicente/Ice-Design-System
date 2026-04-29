import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

// Shared base styles for input-like fields
const fieldBase = cva(
  [
    "w-full px-4 py-3",
    "bg-neo-offwhite text-neo-black placeholder:text-neo-black/50",
    "border-2 border-neo-black rounded-md",
    "shadow-brutal-sm",
    "transition-all duration-150",
    "focus:outline-none focus:shadow-brutal-pink focus:-translate-x-0.5 focus:-translate-y-0.5",
    "disabled:bg-neo-offwhite-200 disabled:cursor-not-allowed disabled:opacity-70",
    "aria-invalid:border-neo-red aria-invalid:shadow-brutal-red",
  ],
  {
    variants: {
      size: {
        sm: "text-sm px-3 py-2",
        md: "text-base px-4 py-3",
        lg: "text-lg px-5 py-3.5",
      },
    },
    defaultVariants: { size: "md" },
  }
);

// --- Input ---

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof fieldBase> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(fieldBase({ size }), className)}
      {...props}
    />
  )
);
Input.displayName = "Input";

// --- Textarea ---

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof fieldBase> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(fieldBase({ size }), "min-h-[120px] resize-y", className)}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

// --- Select ---

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof fieldBase> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, size, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(fieldBase({ size }), "appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-neo-black"
        strokeWidth={2.5}
        aria-hidden="true"
      />
    </div>
  )
);
Select.displayName = "Select";

// --- Label + Field wrapper ---

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("block text-sm font-semibold mb-2 text-neo-black", className)}
      {...props}
    >
      {children}
      {required && <span className="text-neo-red ml-1">*</span>}
    </label>
  )
);
Label.displayName = "Label";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  htmlFor?: string;
}

/**
 * Composed field wrapper: Label + control slot + hint/error.
 * Usage: <Field label="Email" htmlFor="email" hint="We won't spam you"><Input id="email" /></Field>
 */
export const Field = forwardRef<HTMLDivElement, FieldProps>(
  ({ className, label, required, error, hint, htmlFor, children, ...props }, ref) => (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {children}
      {hint && !error && (
        <p className="mt-2 text-body-sm text-neo-black-700">{hint}</p>
      )}
      {error && (
        <p className="mt-2 text-body-sm font-semibold text-neo-red" role="alert">
          {error}
        </p>
      )}
    </div>
  )
);
Field.displayName = "Field";
