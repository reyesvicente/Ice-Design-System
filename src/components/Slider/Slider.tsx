import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const sliderVariants = cva("", {
  variants: {
    intent: {
      default: "[--slider-fill:theme(colors.neo-yellow.DEFAULT)]",
      success: "[--slider-fill:theme(colors.neo-green.DEFAULT)]",
      info: "[--slider-fill:theme(colors.neo-blue.DEFAULT)]",
      accent: "[--slider-fill:theme(colors.neo-pink.DEFAULT)]",
    },
  },
  defaultVariants: { intent: "default" },
});

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderVariants> {
  label?: string;
  showValue?: boolean;
}

export const Slider = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, intent, label, showValue, value, defaultValue, ...props }, ref) => {
  const displayValue = value?.[0] ?? defaultValue?.[0] ?? 0;

  return (
    <div className="w-full space-y-2">
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && <label className="text-body-sm font-bold text-neo-black">{label}</label>}
          {showValue && (
            <span className="text-micro font-bold text-neo-black-500">{displayValue}</span>
          )}
        </div>
      )}
      <SliderPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          sliderVariants({ intent }),
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-sm border-2 border-neo-black bg-neo-offwhite">
          <SliderPrimitive.Range className="absolute h-full bg-[var(--slider-fill,theme(colors.neo-yellow.DEFAULT))]" />
        </SliderPrimitive.Track>
        {(value ?? defaultValue ?? [0]).map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className={cn(
              "block w-5 h-5 rounded-full",
              "border-2 border-neo-black",
              "bg-neo-offwhite shadow-brutal",
              "hover:bg-neo-yellow transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink focus-visible:ring-offset-2 focus-visible:ring-offset-neo-offwhite",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          />
        ))}
      </SliderPrimitive.Root>
    </div>
  );
});
Slider.displayName = "Slider";
