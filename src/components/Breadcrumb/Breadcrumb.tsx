import { ChevronRight, Home } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, items, showHome = true, ...props }, ref) => (
    <nav ref={ref} aria-label="Breadcrumb" className={cn("", className)} {...props}>
      <ol className="flex flex-wrap items-center gap-1 text-body-sm font-medium">
        {showHome && (
          <li>
            <a
              href="/"
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1",
                "border-2 border-transparent rounded",
                "text-neo-black hover:bg-neo-yellow hover:border-neo-black",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink"
              )}
              aria-label="Home"
            >
              <Home className="w-4 h-4" strokeWidth={2.5} />
            </a>
          </li>
        )}
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight className="w-4 h-4 text-neo-black-300 shrink-0" strokeWidth={2.5} />
            {item.href && i < items.length - 1 ? (
              <a
                href={item.href}
                className={cn(
                  "px-2 py-1 rounded border-2 border-transparent",
                  "hover:bg-neo-yellow hover:border-neo-black",
                  "transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink"
                )}
              >
                {item.label}
              </a>
            ) : (
              <span
                className="px-2 py-1 font-bold"
                aria-current={i === items.length - 1 ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
);
Breadcrumb.displayName = "Breadcrumb";
