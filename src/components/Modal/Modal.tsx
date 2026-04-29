import * as Dialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

// Re-export Radix primitives with their original names
export const Modal = Dialog.Root;
export const ModalTrigger = Dialog.Trigger;
export const ModalClose = Dialog.Close;
export const ModalPortal = Dialog.Portal;

export const ModalOverlay = forwardRef<
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
ModalOverlay.displayName = "ModalOverlay";

export interface ModalContentProps extends Dialog.DialogContentProps {
  hideClose?: boolean;
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, hideClose, ...props }, ref) => (
    <ModalPortal>
      <ModalOverlay />
      <Dialog.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
          "w-[90vw] max-w-lg",
          "bg-neo-offwhite text-neo-black",
          "border-[3px] border-neo-black rounded-md shadow-brutal-xl",
          "p-6 md:p-8",
          "focus:outline-none",
          className
        )}
        {...props}
      >
        {children}
        {!hideClose && (
          <Dialog.Close
            aria-label="Close"
            className="absolute top-4 right-4 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </Dialog.Close>
        )}
      </Dialog.Content>
    </ModalPortal>
  )
);
ModalContent.displayName = "ModalContent";

export const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col gap-1 mb-6 pb-4 border-b-2 border-neo-black pr-8",
      className
    )}
    {...props}
  />
);

export const ModalTitle = forwardRef<
  HTMLHeadingElement,
  Dialog.DialogTitleProps
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn("font-display text-h3", className)}
    {...props}
  />
));
ModalTitle.displayName = "ModalTitle";

export const ModalDescription = forwardRef<
  HTMLParagraphElement,
  Dialog.DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-body-sm text-neo-black-700", className)}
    {...props}
  />
));
ModalDescription.displayName = "ModalDescription";

export const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex justify-end gap-3 mt-8 pt-4 border-t-2 border-neo-black",
      className
    )}
    {...props}
  />
);
