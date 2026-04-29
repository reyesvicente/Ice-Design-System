import * as PopoverPrimitive from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;

export const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & { showClose?: boolean }
>(({ className, align = "center", sideOffset = 8, showClose = false, children, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md",
        "border-2 border-neo-black",
        "bg-neo-offwhite text-neo-black",
        "shadow-brutal-md p-4",
        "outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
        "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
        className
      )}
      {...props}
    >
      {children}
      {showClose && (
        <PopoverPrimitive.Close
          aria-label="Close"
          className="absolute top-3 right-3 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink"
        >
          <X className="w-4 h-4" strokeWidth={2.5} />
        </PopoverPrimitive.Close>
      )}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = "PopoverContent";
