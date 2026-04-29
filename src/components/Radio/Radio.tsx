import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const RadioGroup = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
));
RadioGroup.displayName = "RadioGroup";

export interface RadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: string;
  description?: string;
}

export const RadioItem = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioItemProps
>(({ className, label, description, id, value, ...props }, ref) => {
  const itemId = id ?? (label ? `radio-${value}` : undefined);
  return (
    <div className="flex items-start gap-3">
      <RadioGroupPrimitive.Item
        ref={ref}
        id={itemId}
        value={value}
        className={cn(
          "w-5 h-5 shrink-0 mt-0.5 rounded-full",
          "border-2 border-neo-black bg-neo-offwhite",
          "transition-colors duration-150",
          "hover:bg-neo-yellow-50",
          "data-[state=checked]:bg-neo-yellow data-[state=checked]:border-neo-black",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink focus-visible:ring-offset-2 focus-visible:ring-offset-neo-offwhite",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <Circle className="w-2.5 h-2.5 fill-neo-black text-neo-black" strokeWidth={0} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {label && (
        <div className="flex flex-col gap-0.5">
          <label
            htmlFor={itemId}
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
RadioItem.displayName = "RadioItem";
