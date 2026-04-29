import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const skeletonVariants = cva(
  ["animate-pulse border-2 border-neo-black/10 bg-neo-black/10"],
  {
    variants: {
      variant: {
        default: "rounded-md",
        circle: "rounded-full",
        text: "rounded-sm h-4",
        button: "rounded-md h-10",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export const Skeleton = ({ className, variant, ...props }: SkeletonProps) => (
  <div className={cn(skeletonVariants({ variant }), className)} {...props} />
);

export const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={cn("border-2 border-neo-black rounded-md p-4 space-y-3 shadow-brutal", className)}>
    <Skeleton className="h-40 w-full" />
    <Skeleton variant="text" className="w-3/4" />
    <Skeleton variant="text" className="w-1/2" />
    <div className="flex gap-2 pt-1">
      <Skeleton variant="button" className="flex-1" />
      <Skeleton variant="button" className="w-24" />
    </div>
  </div>
);

export const SkeletonAvatar = ({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const sizes = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-14 h-14" };
  return <Skeleton variant="circle" className={cn(sizes[size], className)} />;
};

export const SkeletonText = ({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) => (
  <div className={cn("space-y-2", className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        className={i === lines - 1 ? "w-3/4" : "w-full"}
      />
    ))}
  </div>
);
