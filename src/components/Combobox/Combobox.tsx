import * as PopoverPrimitive from "@radix-ui/react-popover";
import { type VariantProps } from "class-variance-authority";
import { useId, useMemo, useRef, useState } from "react";
import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { fieldVariants } from "../Input/Input";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface ComboboxBaseProps extends VariantProps<typeof fieldVariants> {
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  "aria-invalid"?: boolean;
  "aria-label"?: string;
}

interface ComboboxSingleProps extends ComboboxBaseProps {
  multiple?: false;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
}

interface ComboboxMultipleProps extends ComboboxBaseProps {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  /** Max selected labels shown in the trigger before it switches to "N selected". */
  maxDisplayed?: number;
}

export type ComboboxProps = ComboboxSingleProps | ComboboxMultipleProps;

function toArray(value: string | string[] | null | undefined): string[] | undefined {
  if (value === undefined) return undefined;
  if (value === null) return [];
  return Array.isArray(value) ? value : [value];
}

export function Combobox(props: ComboboxProps) {
  const {
    options,
    placeholder = "Select…",
    searchPlaceholder = "Search…",
    emptyMessage = "No results.",
    disabled,
    id,
    className,
    size,
  } = props;
  const multiple = props.multiple === true;

  const listId = useId();
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedState, setSelectedState] = useState<string[]>(
    toArray(props.defaultValue) ?? []
  );
  const selected = toArray(props.value) ?? selectedState;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(q) ||
        option.description?.toLowerCase().includes(q)
    );
  }, [options, query]);

  const commit = (next: string[]) => {
    setSelectedState(next);
    if (props.multiple === true) props.onValueChange?.(next);
    else props.onValueChange?.(next[0] ?? null);
  };

  const selectOption = (option: ComboboxOption) => {
    if (option.disabled) return;
    if (multiple) {
      commit(
        selected.includes(option.value)
          ? selected.filter((v) => v !== option.value)
          : [...selected, option.value]
      );
    } else {
      commit(selected[0] === option.value ? [] : [option.value]);
      setOpen(false);
    }
  };

  const moveActive = (delta: number) => {
    if (!filtered.length) return;
    let next = activeIndex;
    // Skip disabled options
    for (let i = 0; i < filtered.length; i++) {
      next = (next + delta + filtered.length) % filtered.length;
      if (!filtered[next].disabled) break;
    }
    setActiveIndex(next);
    document.getElementById(`${listId}-${next}`)?.scrollIntoView({ block: "nearest" });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(-1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const option = filtered[activeIndex];
      if (option) selectOption(option);
    }
  };

  const selectedOptions = options.filter((option) => selected.includes(option.value));
  const maxDisplayed = props.multiple === true ? (props.maxDisplayed ?? 2) : 1;

  let triggerLabel: React.ReactNode = (
    <span className="text-neo-black/50 truncate">{placeholder}</span>
  );
  if (selectedOptions.length > 0) {
    triggerLabel =
      multiple && selectedOptions.length > maxDisplayed ? (
        <span className="truncate">{selectedOptions.length} selected</span>
      ) : multiple ? (
        <span className="flex flex-wrap gap-1 min-w-0">
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              className="px-1.5 text-body-sm font-semibold bg-neo-yellow border-2 border-neo-black rounded-sm truncate"
            >
              {option.label}
            </span>
          ))}
        </span>
      ) : (
        <span className="truncate">{selectedOptions[0].label}</span>
      );
  }

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          setQuery("");
          const firstSelected = options.findIndex((o) => selected.includes(o.value));
          setActiveIndex(Math.max(0, firstSelected));
        }
      }}
    >
      <PopoverPrimitive.Trigger
        id={id}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        aria-invalid={props["aria-invalid"]}
        aria-label={props["aria-label"]}
        disabled={disabled}
        onKeyDown={(event) => {
          // Keyboard equivalent of the clear button
          if ((event.key === "Backspace" || event.key === "Delete") && selected.length) {
            commit([]);
          }
        }}
        className={cn(
          fieldVariants({ size }),
          "flex items-center justify-between gap-2 text-left",
          "data-[state=open]:shadow-brutal-pink data-[state=open]:-translate-x-0.5 data-[state=open]:-translate-y-0.5",
          className
        )}
      >
        {triggerLabel}
        <span className="flex items-center gap-1 shrink-0">
          {selected.length > 0 && !disabled && (
            <span
              role="button"
              tabIndex={-1}
              aria-label="Clear selection"
              onPointerDown={(event) => {
                // Prevent the popover from toggling
                event.preventDefault();
                event.stopPropagation();
                commit([]);
              }}
              className="p-0.5 rounded-sm hover:bg-neo-pink"
            >
              <X className="w-4 h-4" strokeWidth={2.5} />
            </span>
          )}
          <ChevronsUpDown className="w-4 h-4" strokeWidth={2.5} aria-hidden="true" />
        </span>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={8}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            searchRef.current?.focus();
          }}
          className={cn(
            "z-50 w-[var(--radix-popover-trigger-width)] min-w-[12rem]",
            "bg-neo-offwhite text-neo-black",
            "border-2 border-neo-black rounded-md shadow-brutal-md",
            "outline-none overflow-hidden"
          )}
        >
          <div className="flex items-center gap-2 px-3 border-b-2 border-neo-black">
            <Search className="w-4 h-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={searchPlaceholder}
              aria-controls={listId}
              aria-activedescendant={filtered.length ? `${listId}-${activeIndex}` : undefined}
              aria-autocomplete="list"
              className="w-full py-2.5 bg-transparent text-body-sm placeholder:text-neo-black/50 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <ul
            id={listId}
            role="listbox"
            aria-multiselectable={multiple || undefined}
            className="max-h-64 overflow-y-auto p-1"
          >
            {filtered.length === 0 && (
              <li className="px-3 py-6 text-center text-body-sm text-neo-black-500">
                {emptyMessage}
              </li>
            )}
            {filtered.map((option, index) => {
              const isSelected = selected.includes(option.value);
              return (
                <li
                  key={option.value}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled || undefined}
                  data-active={index === activeIndex || undefined}
                  onPointerMove={() => !option.disabled && setActiveIndex(index)}
                  onClick={() => selectOption(option)}
                  className={cn(
                    "flex items-start gap-2 px-3 py-2 rounded-sm cursor-pointer select-none",
                    "text-body-sm",
                    "data-[active]:bg-neo-yellow",
                    option.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Check
                    className={cn("w-4 h-4 mt-0.5 shrink-0", !isSelected && "invisible")}
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                  <span className="flex flex-col min-w-0">
                    <span className="font-semibold truncate">{option.label}</span>
                    {option.description && (
                      <span className="text-micro text-neo-black-500">{option.description}</span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
