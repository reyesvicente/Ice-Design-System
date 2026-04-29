import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const Table = forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto border-2 border-neo-black rounded-md shadow-brutal-md">
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom font-mono text-sm tabular-nums",
        className
      )}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("bg-neo-black text-neo-offwhite", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("", className)} {...props} />
));
TableBody.displayName = "TableBody";

export const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-t-2 border-neo-black transition-colors hover:bg-neo-yellow/30",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

export const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "text-left px-4 py-3 font-semibold uppercase tracking-wider text-xs",
      "whitespace-nowrap",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

export const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("px-4 py-3 align-middle", className)} {...props} />
));
TableCell.displayName = "TableCell";

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-neo-black-700", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";
