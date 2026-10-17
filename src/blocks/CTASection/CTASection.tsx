import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Section, type SectionProps } from "../Section/Section";

export interface CTASectionProps extends Omit<SectionProps, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  /** `banded` fills the section; `boxed` puts the CTA in a card on a plain background. */
  layout?: "banded" | "boxed";
}

export const CTASection = forwardRef<HTMLElement, CTASectionProps>(
  ({ title, description, actions, layout = "boxed", tone = "yellow", ...props }, ref) => {
    const content = (
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        <h2 className="font-display text-h3 md:text-h2">{title}</h2>
        {description && <p className="mt-4 text-body-lg opacity-80">{description}</p>}
        {actions && <div className="mt-8 flex flex-wrap justify-center gap-4">{actions}</div>}
      </div>
    );

    if (layout === "banded") {
      return (
        <Section ref={ref} tone={tone} bordered {...props}>
          {content}
        </Section>
      );
    }

    const boxTone = {
      offwhite: "bg-neo-offwhite text-neo-black",
      yellow: "bg-neo-yellow text-neo-black",
      pink: "bg-neo-pink text-neo-black",
      blue: "bg-neo-blue text-neo-black",
      green: "bg-neo-green text-neo-black",
      purple: "bg-neo-purple text-neo-black",
      dark: "bg-neo-black text-neo-offwhite shadow-[10px_10px_0_0_#FFDE59]",
    }[tone ?? "yellow"];

    return (
      <Section ref={ref} {...props}>
        <div
          className={cn(
            "px-6 py-12 md:px-12 md:py-16 border-2 border-neo-black rounded-md shadow-brutal-lg",
            boxTone
          )}
        >
          {content}
        </div>
      </Section>
    );
  }
);
CTASection.displayName = "CTASection";
