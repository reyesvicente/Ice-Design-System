import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const pageButtonBase = [
  "inline-flex items-center justify-center",
  "min-w-[2.25rem] h-9 px-2",
  "text-body-sm font-bold",
  "border-2 border-neo-black",
  "transition-colors duration-150",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink focus-visible:ring-offset-2 focus-visible:ring-offset-neo-offwhite",
  "disabled:opacity-40 disabled:cursor-not-allowed",
].join(" ");

export const Pagination = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    role="navigation"
    aria-label="Pagination"
    className={cn("flex items-center gap-1", className)}
    {...props}
  />
));
Pagination.displayName = "Pagination";

export const PaginationPrev = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    aria-label="Previous page"
    className={cn(pageButtonBase, "rounded-md bg-neo-offwhite hover:bg-neo-yellow shadow-brutal", className)}
    {...props}
  >
    <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
    <span className="sr-only">Previous</span>
  </button>
));
PaginationPrev.displayName = "PaginationPrev";

export const PaginationNext = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    aria-label="Next page"
    className={cn(pageButtonBase, "rounded-md bg-neo-offwhite hover:bg-neo-yellow shadow-brutal", className)}
    {...props}
  >
    <span className="sr-only">Next</span>
    <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
  </button>
));
PaginationNext.displayName = "PaginationNext";

export interface PaginationItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>(
  ({ className, active, ...props }, ref) => (
    <button
      ref={ref}
      aria-current={active ? "page" : undefined}
      className={cn(
        pageButtonBase,
        "rounded-md",
        active
          ? "bg-neo-yellow shadow-brutal"
          : "bg-neo-offwhite hover:bg-neo-yellow-50 shadow-brutal-sm",
        className
      )}
      {...props}
    />
  )
);
PaginationItem.displayName = "PaginationItem";

export const PaginationEllipsis = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={cn(
      "inline-flex items-center justify-center min-w-[2.25rem] h-9 px-2",
      "text-body-sm font-bold text-neo-black-500",
      className
    )}
  >
    <MoreHorizontal className="w-4 h-4" strokeWidth={2.5} />
  </span>
);

export interface PaginationRootProps extends React.HTMLAttributes<HTMLElement> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblings?: number;
}

export const PaginationRoot = ({
  page,
  totalPages,
  onPageChange,
  siblings = 1,
  className,
  ...props
}: PaginationRootProps) => {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const pages = (() => {
    if (totalPages <= 7) return range(1, totalPages);
    const left = Math.max(2, page - siblings);
    const right = Math.min(totalPages - 1, page + siblings);
    const showLeftDot = left > 2;
    const showRightDot = right < totalPages - 1;
    const items: (number | "...")[] = [1];
    if (showLeftDot) items.push("...");
    items.push(...range(left, right));
    if (showRightDot) items.push("...");
    items.push(totalPages);
    return items;
  })();

  return (
    <Pagination className={className} {...props}>
      <PaginationPrev onClick={() => onPageChange(page - 1)} disabled={page <= 1} />
      {pages.map((p, i) =>
        p === "..." ? (
          <PaginationEllipsis key={`ellipsis-${i}`} />
        ) : (
          <PaginationItem key={p} active={p === page} onClick={() => onPageChange(p as number)}>
            {p}
          </PaginationItem>
        )
      )}
      <PaginationNext onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} />
    </Pagination>
  );
};
