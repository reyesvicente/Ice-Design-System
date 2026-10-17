import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export const sectionVariants = cva("w-full", {
  variants: {
    tone: {
      offwhite: "bg-neo-offwhite text-neo-black",
      yellow: "bg-neo-yellow text-neo-black",
      pink: "bg-neo-pink text-neo-black",
      blue: "bg-neo-blue text-neo-black",
      green: "bg-neo-green text-neo-black",
      purple: "bg-neo-purple text-neo-black",
      dark: "bg-neo-black text-neo-offwhite",
    },
    spacing: {
      sm: "py-12 md:py-16",
      md: "py-16 md:py-24",
      lg: "py-20 md:py-30",
    },
    bordered: {
      true: "border-y-2 border-neo-black",
    },
  },
  defaultVariants: { tone: "offwhite", spacing: "md" },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /** Class for the inner max-width container. */
  containerClassName?: string;
}

/** Full-width landing page band with a centered max-width container. */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, containerClassName, tone, spacing, bordered, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(sectionVariants({ tone, spacing, bordered }), className)}
      {...props}
    >
      <div className={cn("max-w-7xl mx-auto px-4 sm:px-6", containerClassName)}>{children}</div>
    </section>
  )
);
Section.displayName = "Section";

export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Heading level for the title. */
  as?: "h1" | "h2" | "h3";
}

export const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  ({ className, eyebrow, title, description, align = "center", as: Heading = "h2", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "max-w-2xl mb-10 md:mb-14",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <p className="inline-block mb-4 px-2 py-0.5 text-micro font-mono font-bold uppercase tracking-wider border-2 border-current rounded-sm">
          {eyebrow}
        </p>
      )}
      <Heading className="font-display text-h3 md:text-h2">{title}</Heading>
      {description && <p className="mt-4 text-body-lg opacity-80">{description}</p>}
    </div>
  )
);
SectionHeading.displayName = "SectionHeading";
