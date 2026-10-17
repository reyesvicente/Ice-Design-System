import { forwardRef } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "../../components/Badge/Badge";
import { Section, SectionHeading, type SectionProps } from "../Section/Section";

export interface PricingFeature {
  label: string;
  included?: boolean;
}

export interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  price: string;
  /** e.g. "/month". */
  period?: string;
  description?: string;
  features: (string | PricingFeature)[];
  /** Usually a full-width <Button>. */
  cta?: React.ReactNode;
  /** Highlights the plan with color, a larger shadow and a badge. */
  featured?: boolean;
  badge?: string;
}

export const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(
  (
    { className, name, price, period, description, features, cta, featured, badge, ...props },
    ref
  ) => {
    const label = badge ?? (featured ? "Most popular" : undefined);
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex flex-col p-6 md:p-8 h-full",
          "text-neo-black border-2 border-neo-black rounded-md",
          featured ? "bg-neo-yellow shadow-brutal-lg lg:-translate-y-3" : "bg-neo-offwhite shadow-brutal-md",
          className
        )}
        {...props}
      >
        {label && (
          <Badge variant={featured ? "new" : "default"} className="absolute -top-3 left-6 shadow-brutal-sm">
            {label}
          </Badge>
        )}
        <h3 className="font-display text-h5">{name}</h3>
        {description && <p className="mt-1 text-body-sm text-neo-black-700">{description}</p>}
        <p className="mt-6 flex items-baseline gap-1">
          <span className="font-display font-bold text-h2">{price}</span>
          {period && <span className="text-body font-semibold text-neo-black-700">{period}</span>}
        </p>
        <ul className="mt-6 mb-8 flex-1 space-y-3">
          {features.map((feature) => {
            const { label: text, included = true } =
              typeof feature === "string" ? { label: feature } : feature;
            return (
              <li
                key={text}
                className={cn("flex items-start gap-2 text-body-sm", !included && "text-neo-black-500")}
              >
                {included ? (
                  <Check className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={3} aria-hidden="true" />
                ) : (
                  <Minus className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={3} aria-hidden="true" />
                )}
                <span>
                  {text}
                  {!included && <span className="sr-only"> (not included)</span>}
                </span>
              </li>
            );
          })}
        </ul>
        {cta}
      </div>
    );
  }
);
PricingCard.displayName = "PricingCard";

export interface PricingTableProps extends Omit<SectionProps, "title"> {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  plans: PricingCardProps[];
  /** Rendered between the heading and the cards, e.g. a monthly/annual ToggleGroup. */
  controls?: React.ReactNode;
  footnote?: React.ReactNode;
}

const columnClass: Record<number, string> = {
  1: "max-w-md mx-auto",
  2: "md:grid-cols-2 max-w-4xl mx-auto",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export const PricingTable = forwardRef<HTMLElement, PricingTableProps>(
  ({ eyebrow, title, description, plans, controls, footnote, ...props }, ref) => (
    <Section ref={ref} {...props}>
      {title && <SectionHeading eyebrow={eyebrow} title={title} description={description} />}
      {controls && <div className="flex justify-center -mt-4 mb-12">{controls}</div>}
      <div className={cn("grid gap-8 grid-cols-1 items-stretch", columnClass[Math.min(plans.length, 4)])}>
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>
      {footnote && <p className="mt-10 text-center text-body-sm opacity-70">{footnote}</p>}
    </Section>
  )
);
PricingTable.displayName = "PricingTable";
