import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle, AlertTriangle, AlertOctagon, Info, X } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-4 right-4 z-[100]",
      "flex flex-col gap-2 w-[360px] max-w-[100vw]",
      "pointer-events-none",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

export const toastVariants = cva(
  [
    "group pointer-events-auto relative flex w-full items-start gap-3",
    "rounded-md border-2 border-neo-black p-4",
    "shadow-brutal-md",
    "transition-all",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-80",
    "data-[state=open]:slide-in-from-bottom-4 data-[state=closed]:slide-out-to-right-full",
    "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
    "data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
    "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform",
  ],
  {
    variants: {
      intent: {
        default: "bg-neo-offwhite text-neo-black",
        success: "bg-neo-green text-neo-black",
        warning: "bg-neo-amber text-neo-black",
        error: "bg-neo-red text-white",
        info: "bg-neo-blue text-neo-black",
      },
    },
    defaultVariants: { intent: "default" },
  }
);

const iconMap = {
  default: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertOctagon,
  info: Info,
} as const;

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

export const Toast = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, intent = "default", ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(toastVariants({ intent }), className)}
    {...props}
  />
));
Toast.displayName = "Toast";

export const ToastTitle = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn("font-bold text-body-sm", className)}
    {...props}
  />
));
ToastTitle.displayName = "ToastTitle";

export const ToastDescription = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn("text-micro mt-0.5 opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = "ToastDescription";

export const ToastAction = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      "shrink-0 px-3 py-1.5 text-body-sm font-bold",
      "border-2 border-current rounded",
      "hover:bg-black/10 transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = "ToastAction";

export const ToastClose = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    aria-label="Close"
    className={cn(
      "ml-auto shrink-0 rounded p-1",
      "opacity-70 hover:opacity-100 transition-opacity",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink",
      className
    )}
    {...props}
  >
    <X className="w-4 h-4" strokeWidth={2.5} />
  </ToastPrimitive.Close>
));
ToastClose.displayName = "ToastClose";

export interface ToastWithIconProps extends ToastProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const ToastWithIcon = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastWithIconProps
>(({ intent = "default", title, description, action, ...props }, ref) => {
  const Icon = iconMap[intent ?? "default"];
  return (
    <Toast ref={ref} intent={intent} {...props}>
      <Icon className="w-5 h-5 mt-0.5 shrink-0" strokeWidth={2.5} aria-hidden />
      <div className="flex-1 min-w-0">
        <ToastTitle>{title}</ToastTitle>
        {description && <ToastDescription>{description}</ToastDescription>}
      </div>
      {action}
      <ToastClose />
    </Toast>
  );
});
ToastWithIcon.displayName = "ToastWithIcon";
