import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Section, type SectionProps } from "../Section/Section";

export interface HeroProps extends Omit<SectionProps, "title"> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Buttons or links, e.g. a primary and a ghost <Button>. */
  actions?: React.ReactNode;
  /** Image, screenshot or illustration. With `align="left"` it sits beside the copy. */
  media?: React.ReactNode;
  /** Small print under the actions, e.g. "No credit card required". */
  footnote?: React.ReactNode;
  align?: "left" | "center";
}

export const Hero = forwardRef<HTMLElement, HeroProps>(
  (
    {
      eyebrow,
      title,
      description,
      actions,
      media,
      footnote,
      align = "center",
      spacing = "lg",
      containerClassName,
      ...props
    },
    ref
  ) => {
    const split = align === "left" && media;

    return (
      <Section
        ref={ref}
        spacing={spacing}
        containerClassName={cn(
          split ? "grid gap-12 lg:grid-cols-2 lg:items-center" : "flex flex-col",
          containerClassName
        )}
        {...props}
      >
        <div
          className={cn(
            "flex flex-col",
            align === "center" ? "items-center text-center max-w-3xl mx-auto" : "items-start text-left"
          )}
        >
          {eyebrow && (
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 text-body-sm font-bold bg-neo-offwhite text-neo-black border-2 border-neo-black rounded-full shadow-brutal-sm">
              {eyebrow}
            </div>
          )}
          <h1 className="font-display text-h2 md:text-h1 lg:text-display">{title}</h1>
          {description && <p className="mt-6 max-w-2xl text-body-lg opacity-80">{description}</p>}
          {actions && (
            <div
              className={cn(
                "mt-10 flex flex-wrap gap-4",
                align === "center" && "justify-center"
              )}
            >
              {actions}
            </div>
          )}
          {footnote && <p className="mt-4 text-body-sm opacity-70">{footnote}</p>}
        </div>
        {media && <div className={cn(!split && "mt-16")}>{media}</div>}
      </Section>
    );
  }
);
Hero.displayName = "Hero";
