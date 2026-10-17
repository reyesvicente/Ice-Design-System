import { type VariantProps } from "class-variance-authority";
import { forwardRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";
import { badgeVariants } from "../Badge/Badge";
import { fieldVariants } from "../Input/Input";

export interface TagInputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "value" | "defaultValue" | "onChange"
    >,
    VariantProps<typeof fieldVariants> {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (tags: string[]) => void;
  maxTags?: number;
  allowDuplicates?: boolean;
  /** Return false to reject a tag, e.g. for email validation. */
  validate?: (tag: string) => boolean;
  tagVariant?: VariantProps<typeof badgeVariants>["variant"];
  wrapperClassName?: string;
}

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  (
    {
      className,
      wrapperClassName,
      size,
      value: valueProp,
      defaultValue = [],
      onValueChange,
      maxTags,
      allowDuplicates = false,
      validate,
      tagVariant = "primary",
      disabled,
      placeholder,
      onKeyDown,
      onBlur,
      onPaste,
      ...props
    },
    ref
  ) => {
    const [valueState, setValueState] = useState<string[]>(defaultValue);
    const [draft, setDraft] = useState("");
    const tags = valueProp ?? valueState;
    const atLimit = maxTags !== undefined && tags.length >= maxTags;

    const commit = (next: string[]) => {
      setValueState(next);
      onValueChange?.(next);
    };

    // Returns the tags that were not accepted
    const addTags = (raw: string[]): string[] => {
      const next = [...tags];
      const rejected: string[] = [];
      raw
        .map((tag) => tag.trim())
        .filter(Boolean)
        .forEach((tag) => {
          const duplicate = !allowDuplicates && next.includes(tag);
          const full = maxTags !== undefined && next.length >= maxTags;
          if (duplicate || full || (validate && !validate(tag))) rejected.push(tag);
          else next.push(tag);
        });
      if (next.length !== tags.length) commit(next);
      return rejected;
    };

    const removeTag = (index: number) => commit(tags.filter((_, i) => i !== index));

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      if ((event.key === "Enter" || event.key === ",") && draft.trim()) {
        event.preventDefault();
        // Keep invalid input in the field so it can be corrected
        setDraft(addTags([draft]).join(", "));
      } else if (event.key === "Backspace" && !draft && tags.length) {
        removeTag(tags.length - 1);
      }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
      onPaste?.(event);
      const text = event.clipboardData.getData("text");
      if (!/[,\n]/.test(text)) return;
      event.preventDefault();
      setDraft(addTags(text.split(/[,\n]/)).join(", "));
    };

    return (
      <div
        data-disabled={disabled || undefined}
        className={cn(
          fieldVariants({ size }),
          "flex flex-wrap items-center gap-1.5 cursor-text",
          size === "sm" ? "py-1.5" : size === "lg" ? "py-2.5" : "py-2",
          "focus-within:shadow-brutal-pink focus-within:-translate-x-0.5 focus-within:-translate-y-0.5",
          "has-[input[aria-invalid=true]]:border-neo-red has-[input[aria-invalid=true]]:shadow-brutal-red",
          "data-[disabled]:bg-neo-offwhite-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70",
          wrapperClassName
        )}
        onClick={(event) => event.currentTarget.querySelector("input")?.focus()}
      >
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className={cn(badgeVariants({ variant: tagVariant }), "normal-case tracking-normal text-body-sm gap-1 pr-1")}
          >
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              disabled={disabled}
              onClick={(event) => {
                event.stopPropagation();
                removeTag(index);
              }}
              className="rounded-sm hover:bg-neo-black hover:text-neo-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink"
            >
              <X className="w-3.5 h-3.5" strokeWidth={3} />
            </button>
          </span>
        ))}
        <input
          ref={ref}
          value={draft}
          disabled={disabled}
          placeholder={tags.length ? undefined : placeholder}
          aria-description={atLimit ? `Maximum of ${maxTags} reached` : undefined}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={(event) => {
            onBlur?.(event);
            if (draft.trim()) setDraft(addTags([draft]).join(", "));
          }}
          className={cn(
            "flex-1 min-w-[8rem] py-1 bg-transparent placeholder:text-neo-black/50",
            "focus:outline-none disabled:cursor-not-allowed focus-visible:ring-0 focus-visible:ring-offset-0",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
TagInput.displayName = "TagInput";
