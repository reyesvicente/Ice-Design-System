import * as Dialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export const Drawer = Dialog.Root;
export const DrawerTrigger = Dialog.Trigger;
export const DrawerClose = Dialog.Close;
export const DrawerPortal = Dialog.Portal;

export const DrawerOverlay = forwardRef<
  HTMLDivElement,
  Dialog.DialogOverlayProps
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-40 bg-neo-black/70 backdrop-blur-[2px]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

const drawerContentVariants = cva(
  [
    "fixed z-50",
    "bg-neo-offwhite text-neo-black",
    "border-neo-black",
    "focus:outline-none",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
  ],
  {
    variants: {
      side: {
        left: [
          "inset-y-0 left-0 h-full w-[320px] max-w-[90vw]",
          "border-r-[3px]",
          "data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
        ],
        right: [
          "inset-y-0 right-0 h-full w-[320px] max-w-[90vw]",
          "border-l-[3px]",
          "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
        ],
        top: [
          "inset-x-0 top-0 w-full",
          "border-b-[3px]",
          "data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
        ],
        bottom: [
          "inset-x-0 bottom-0 w-full",
          "border-t-[3px]",
          "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
        ],
      },
    },
    defaultVariants: { side: "right" },
  }
);

export interface DrawerContentProps
  extends Dialog.DialogContentProps,
    VariantProps<typeof drawerContentVariants> {
  hideClose?: boolean;
}

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, side, hideClose, ...props }, ref) => (
    <DrawerPortal>
      <DrawerOverlay />
      <Dialog.Content
        ref={ref}
        className={cn(drawerContentVariants({ side }), className)}
        {...props}
      >
        {!hideClose && (
          <Dialog.Close
            aria-label="Close"
            className="absolute top-4 right-4 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </Dialog.Close>
        )}
        {children}
      </Dialog.Content>
    </DrawerPortal>
  )
);
DrawerContent.displayName = "DrawerContent";

export const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col gap-1 p-6 pb-4 border-b-2 border-neo-black pr-12", className)}
    {...props}
  />
);

export const DrawerTitle = forwardRef<
  HTMLHeadingElement,
  Dialog.DialogTitleProps
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn("font-display text-h4 font-bold", className)}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  Dialog.DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-body-sm text-neo-black-700", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";

export const DrawerBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex-1 overflow-y-auto p-6", className)} {...props} />
);

export const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex justify-end gap-3 p-6 pt-4 border-t-2 border-neo-black", className)}
    {...props}
  />
);
