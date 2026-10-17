import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Section, SectionHeading, type SectionProps } from "../Section/Section";

const iconTones = {
  yellow: "bg-neo-yellow",
  pink: "bg-neo-pink",
  blue: "bg-neo-blue",
  green: "bg-neo-green",
  purple: "bg-neo-purple",
} as const;

export interface FeatureCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  iconTone?: keyof typeof iconTones;
  title: React.ReactNode;
  description?: React.ReactNode;
}

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, icon, iconTone = "yellow", title, description, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-4 p-6 h-full",
        "bg-neo-offwhite text-neo-black border-2 border-neo-black rounded-md shadow-brutal-md",
        className
      )}
      {...props}
    >
      {icon && (
        <div
          className={cn(
            "flex w-12 h-12 items-center justify-center rounded-md border-2 border-neo-black shadow-brutal-sm",
            "[&>svg]:w-6 [&>svg]:h-6",
            iconTones[iconTone]
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <div>
        <h3 className="font-display text-h5">{title}</h3>
        {description && <p className="mt-2 text-body text-neo-black-700">{description}</p>}
      </div>
      {children}
    </div>
  )
);
FeatureCard.displayName = "FeatureCard";

export interface FeatureGridProps extends Omit<SectionProps, "title"> {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  features: FeatureCardProps[];
  columns?: 2 | 3 | 4;
}

const columnClass = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

export const FeatureGrid = forwardRef<HTMLElement, FeatureGridProps>(
  ({ eyebrow, title, description, features, columns = 3, ...props }, ref) => (
    <Section ref={ref} {...props}>
      {title && <SectionHeading eyebrow={eyebrow} title={title} description={description} />}
      <div className={cn("grid gap-6 grid-cols-1", columnClass[columns])}>
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </Section>
  )
);
FeatureGrid.displayName = "FeatureGrid";
