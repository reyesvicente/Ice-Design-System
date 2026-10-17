import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brand?: React.ReactNode;
  description?: React.ReactNode;
  columns?: FooterColumn[];
  socials?: FooterSocialLink[];
  /** Bottom-left text, e.g. "© 2026 Acme Inc." */
  legal?: React.ReactNode;
  /** Bottom-right links, e.g. Privacy and Terms. */
  legalLinks?: FooterLink[];
  tone?: "dark" | "offwhite" | "yellow";
}

const toneClass = {
  dark: "bg-neo-black text-neo-offwhite border-neo-offwhite",
  offwhite: "bg-neo-offwhite text-neo-black border-neo-black",
  yellow: "bg-neo-yellow text-neo-black border-neo-black",
} as const;

// Tailwind 3 can't apply opacity to currentColor, so the divider color is per tone
const dividerClass = {
  dark: "border-neo-offwhite/20",
  offwhite: "border-neo-black/20",
  yellow: "border-neo-black/20",
} as const;

const linkClass = cn(
  "text-body-sm font-semibold opacity-80 hover:opacity-100 hover:underline underline-offset-4",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink rounded-sm"
);

export const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    { className, brand, description, columns = [], socials, legal, legalLinks, tone = "dark", ...props },
    ref
  ) => (
    <footer
      ref={ref}
      className={cn("w-full border-t-2", toneClass[tone], className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid gap-10 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {(brand || description || socials) && (
            <div className="col-span-2 flex flex-col gap-4">
              {brand && <div className="font-display font-bold text-h5">{brand}</div>}
              {description && <p className="text-body-sm opacity-80 max-w-xs">{description}</p>}
              {socials && socials.length > 0 && (
                <div className="flex gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className={cn(
                        "flex w-9 h-9 items-center justify-center rounded-md border-2 border-current",
                        "transition-colors duration-150 hover:bg-neo-yellow hover:text-neo-black hover:border-neo-black",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink",
                        "[&>svg]:w-4 [&>svg]:h-4"
                      )}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="mb-4 text-micro font-mono font-bold uppercase tracking-wider opacity-60">
                {column.title}
              </p>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {(legal || legalLinks) && (
          <div
            className={cn(
              "mt-12 pt-6 border-t-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
              dividerClass[tone]
            )}
          >
            {legal && <p className="text-body-sm opacity-70">{legal}</p>}
            {legalLinks && (
              <ul className="flex flex-wrap gap-6">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </footer>
  )
);
Footer.displayName = "Footer";
