import { forwardRef } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/Avatar/Avatar";

export interface TestimonialProps extends React.HTMLAttributes<HTMLElement> {
  quote: React.ReactNode;
  name: string;
  role?: string;
  avatarSrc?: string;
  /** 1–5 stars. */
  rating?: number;
  tone?: "offwhite" | "yellow" | "pink" | "blue" | "green" | "purple";
}

const toneClass = {
  offwhite: "bg-neo-offwhite",
  yellow: "bg-neo-yellow",
  pink: "bg-neo-pink",
  blue: "bg-neo-blue",
  green: "bg-neo-green",
  purple: "bg-neo-purple",
} as const;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const Testimonial = forwardRef<HTMLElement, TestimonialProps>(
  ({ className, quote, name, role, avatarSrc, rating, tone = "offwhite", ...props }, ref) => (
    <figure
      ref={ref}
      className={cn(
        "flex flex-col gap-6 p-6 md:p-8 h-full",
        "text-neo-black border-2 border-neo-black rounded-md shadow-brutal-md",
        toneClass[tone],
        className
      )}
      {...props}
    >
      {rating !== undefined && (
        <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={cn("w-5 h-5", i < rating ? "fill-neo-black" : "fill-transparent")}
              strokeWidth={2}
              aria-hidden="true"
            />
          ))}
        </div>
      )}
      <blockquote className="flex-1 font-display text-h5 leading-snug">
        <p>“{quote}”</p>
      </blockquote>
      <figcaption className="flex items-center gap-3">
        <Avatar size="md">
          {avatarSrc && <AvatarImage src={avatarSrc} alt="" />}
          <AvatarFallback>{initials(name)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-body-sm">{name}</p>
          {role && <p className="text-micro text-neo-black-700">{role}</p>}
        </div>
      </figcaption>
    </figure>
  )
);
Testimonial.displayName = "Testimonial";
