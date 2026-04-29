import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const avatarVariants = cva(
  [
    "relative inline-flex shrink-0 overflow-hidden",
    "border-2 border-neo-black",
  ],
  {
    variants: {
      size: {
        xs: "w-6 h-6 text-micro",
        sm: "w-8 h-8 text-body-sm",
        md: "w-10 h-10 text-body",
        lg: "w-14 h-14 text-h5",
        xl: "w-20 h-20 text-h3",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
      shadow: {
        true: "shadow-brutal",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
      shadow: false,
    },
  }
);

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

export const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, shape, shadow, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, shape, shadow }), className)}
    {...props}
  />
));
Avatar.displayName = "Avatar";

export const AvatarImage = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("w-full h-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

const fallbackColors = [
  "bg-neo-yellow",
  "bg-neo-pink",
  "bg-neo-blue",
  "bg-neo-green",
  "bg-neo-purple",
] as const;

export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  colorIndex?: number;
}

export const AvatarFallback = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, colorIndex = 0, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex w-full h-full items-center justify-center",
      "font-bold text-neo-black",
      fallbackColors[colorIndex % fallbackColors.length],
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  children: React.ReactNode;
}

export const AvatarGroup = ({
  className,
  children,
  max,
  ...props
}: AvatarGroupProps) => {
  const items = Array.isArray(children) ? children : [children];
  const visible = max ? items.slice(0, max) : items;
  const overflow = max ? items.length - max : 0;

  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {visible}
      {overflow > 0 && (
        <div className="relative inline-flex w-10 h-10 items-center justify-center rounded-full border-2 border-neo-black bg-neo-offwhite font-bold text-body-sm text-neo-black z-10">
          +{overflow}
        </div>
      )}
    </div>
  );
};
