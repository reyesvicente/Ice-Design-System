import * as PopoverPrimitive from "@radix-ui/react-popover";
import { type VariantProps } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { fieldVariants } from "../Input/Input";

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

// --- Date helpers ---

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
const addMonths = (date: Date, months: number) => {
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  // Clamp to the last day of the target month (e.g. Jan 31 → Feb 28)
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  return new Date(target.getFullYear(), target.getMonth(), Math.min(date.getDate(), lastDay));
};
const isSameDay = (a: Date | null | undefined, b: Date | null | undefined) =>
  !!a && !!b && startOfDay(a).getTime() === startOfDay(b).getTime();
const isSameMonth = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
const compareDays = (a: Date, b: Date) => startOfDay(a).getTime() - startOfDay(b).getTime();

// --- Calendar ---

interface CalendarBaseProps {
  /** Month to display (controlled). */
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
  /** 0 = Sunday, 1 = Monday. */
  weekStartsOn?: 0 | 1;
  locale?: string;
  className?: string;
}

interface CalendarSingleProps extends CalendarBaseProps {
  mode?: "single";
  selected?: Date | null;
  onSelect?: (date: Date) => void;
}

interface CalendarRangeProps extends CalendarBaseProps {
  mode: "range";
  selected?: DateRange;
  onSelect?: (range: DateRange) => void;
}

export type CalendarProps = CalendarSingleProps | CalendarRangeProps;

export function Calendar(props: CalendarProps) {
  const {
    month: monthProp,
    defaultMonth,
    onMonthChange,
    minDate,
    maxDate,
    isDateDisabled,
    weekStartsOn = 0,
    locale,
    className,
  } = props;

  const range = props.mode === "range" ? props.selected : undefined;
  const single = props.mode !== "range" ? props.selected : undefined;
  const anchor = single ?? range?.from ?? null;

  const [monthState, setMonthState] = useState(() => startOfDay(defaultMonth ?? anchor ?? new Date()));
  const month = monthProp ?? monthState;
  const [focusedDate, setFocusedDate] = useState<Date>(() => anchor ?? startOfDay(new Date()));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(false);

  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.focus();
  }, [focusedDate]);

  const setMonth = (next: Date) => {
    const first = new Date(next.getFullYear(), next.getMonth(), 1);
    setMonthState(first);
    onMonthChange?.(first);
  };

  const isDisabled = (date: Date) =>
    (minDate !== undefined && compareDays(date, minDate) < 0) ||
    (maxDate !== undefined && compareDays(date, maxDate) > 0) ||
    (isDateDisabled?.(date) ?? false);

  const today = startOfDay(new Date());
  const firstOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const gridStart = addDays(firstOfMonth, -((firstOfMonth.getDay() - weekStartsOn + 7) % 7));
  const days = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));

  const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const weekdays = days.slice(0, 7).map((d) => weekdayFormatter.format(d).slice(0, 2));
  const monthLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(
    month
  );
  const dayLabel = new Intl.DateTimeFormat(locale, { dateStyle: "full" });

  // Focus target must be visible in the current grid
  const tabbableDate = isSameMonth(focusedDate, month) ? focusedDate : firstOfMonth;

  const selectDate = (date: Date) => {
    if (isDisabled(date)) return;
    setFocusedDate(date);
    if (props.mode === "range") {
      const current = props.selected ?? { from: null, to: null };
      if (!current.from || current.to || compareDays(date, current.from) < 0) {
        props.onSelect?.({ from: date, to: null });
      } else {
        props.onSelect?.({ from: current.from, to: date });
      }
    } else {
      props.onSelect?.(date);
    }
  };

  const moveFocus = (next: Date) => {
    shouldFocus.current = true;
    setFocusedDate(next);
    if (!isSameMonth(next, month)) setMonth(next);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, date: Date) => {
    const keyMoves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(date, -1),
      ArrowRight: () => addDays(date, 1),
      ArrowUp: () => addDays(date, -7),
      ArrowDown: () => addDays(date, 7),
      PageUp: () => addMonths(date, -1),
      PageDown: () => addMonths(date, 1),
      Home: () => addDays(date, -((date.getDay() - weekStartsOn + 7) % 7)),
      End: () => addDays(date, 6 - ((date.getDay() - weekStartsOn + 7) % 7)),
    };
    const move = keyMoves[event.key];
    if (move) {
      event.preventDefault();
      moveFocus(move());
    }
  };

  // Tentative range end while choosing the second date
  const rangeEnd = range?.to ?? (range?.from && hoverDate ? hoverDate : null);
  const [rangeStart, rangeStop] =
    range?.from && rangeEnd
      ? compareDays(range.from, rangeEnd) <= 0
        ? [range.from, rangeEnd]
        : [rangeEnd, range.from]
      : [null, null];

  const navButton = cn(
    "flex items-center justify-center w-8 h-8",
    "border-2 border-neo-black rounded-md bg-neo-offwhite shadow-brutal-sm",
    "hover:bg-neo-yellow transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink"
  );

  return (
    <div className={cn("w-[296px] p-3 bg-neo-offwhite text-neo-black", className)}>
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => setMonth(addMonths(month, -1))}
          className={navButton}
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
        </button>
        <p className="font-display font-bold text-body" aria-live="polite">
          {monthLabel}
        </p>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setMonth(addMonths(month, 1))}
          className={navButton}
        >
          <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>

      <div role="grid" aria-label={monthLabel} ref={gridRef}>
        <div role="row" className="grid grid-cols-7 mb-1">
          {weekdays.map((weekday, i) => (
            <span
              key={i}
              role="columnheader"
              className="text-center text-micro font-mono font-semibold uppercase text-neo-black-500"
            >
              {weekday}
            </span>
          ))}
        </div>
        {Array.from({ length: 6 }, (_, week) => (
          <div role="row" key={week} className="grid grid-cols-7">
            {days.slice(week * 7, week * 7 + 7).map((date) => {
              const disabled = isDisabled(date);
              const outside = !isSameMonth(date, month);
              const isEndpoint =
                isSameDay(date, single) || isSameDay(date, range?.from) || isSameDay(date, range?.to);
              const inRange =
                rangeStart &&
                rangeStop &&
                compareDays(date, rangeStart) >= 0 &&
                compareDays(date, rangeStop) <= 0;
              return (
                <div role="gridcell" key={date.toISOString()} className="p-0.5">
                  <button
                    type="button"
                    tabIndex={isSameDay(date, tabbableDate) ? 0 : -1}
                    disabled={disabled}
                    aria-label={dayLabel.format(date)}
                    aria-pressed={isEndpoint}
                    aria-current={isSameDay(date, today) ? "date" : undefined}
                    onClick={() => selectDate(date)}
                    onKeyDown={(event) => handleKeyDown(event, date)}
                    onFocus={() => setFocusedDate(date)}
                    onPointerEnter={() => setHoverDate(date)}
                    onPointerLeave={() => setHoverDate(null)}
                    className={cn(
                      "w-full aspect-square rounded-sm text-body-sm font-semibold tabular-nums",
                      "border-2 border-transparent transition-colors duration-100",
                      "hover:border-neo-black",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink",
                      outside && "text-neo-black-300",
                      isSameDay(date, today) && !isEndpoint && "border-neo-black border-dashed",
                      inRange && !isEndpoint && "bg-neo-yellow-100",
                      isEndpoint && "bg-neo-yellow border-neo-black shadow-[2px_2px_0_0_#0F0F0F]",
                      disabled && "opacity-30 cursor-not-allowed line-through hover:border-transparent"
                    )}
                  >
                    {date.getDate()}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Shared trigger ---

interface PickerBaseProps extends VariantProps<typeof fieldVariants> {
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
  weekStartsOn?: 0 | 1;
  locale?: string;
  formatOptions?: Intl.DateTimeFormatOptions;
  clearable?: boolean;
  "aria-invalid"?: boolean;
  "aria-label"?: string;
}

interface PickerShellProps extends PickerBaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: string | null;
  onClear: () => void;
  children: React.ReactNode;
}

function PickerShell({
  open,
  onOpenChange,
  label,
  onClear,
  placeholder,
  disabled,
  id,
  className,
  size,
  clearable = true,
  children,
  ...aria
}: PickerShellProps) {
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-invalid={aria["aria-invalid"]}
        aria-label={aria["aria-label"]}
        className={cn(
          fieldVariants({ size }),
          "flex items-center gap-2 text-left",
          "data-[state=open]:shadow-brutal-pink data-[state=open]:-translate-x-0.5 data-[state=open]:-translate-y-0.5",
          className
        )}
      >
        <CalendarDays className="w-4 h-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
        <span className={cn("flex-1 truncate", !label && "text-neo-black/50")}>
          {label ?? placeholder}
        </span>
        {clearable && label && !disabled && (
          <span
            role="button"
            tabIndex={-1}
            aria-label="Clear date"
            onPointerDown={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onClear();
            }}
            className="p-0.5 rounded-sm hover:bg-neo-pink"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </span>
        )}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={8}
          className="z-50 flex border-2 border-neo-black rounded-md shadow-brutal-md bg-neo-offwhite outline-none overflow-hidden"
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

// --- DatePicker ---

export interface DatePickerProps extends PickerBaseProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (date: Date | null) => void;
}

export function DatePicker({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  placeholder = "Pick a date",
  locale,
  formatOptions = { dateStyle: "medium" },
  minDate,
  maxDate,
  isDateDisabled,
  weekStartsOn,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [valueState, setValueState] = useState<Date | null>(defaultValue);
  const value = valueProp !== undefined ? valueProp : valueState;

  const commit = (next: Date | null) => {
    setValueState(next);
    onValueChange?.(next);
  };

  const formatter = new Intl.DateTimeFormat(locale, formatOptions);

  return (
    <PickerShell
      {...props}
      open={open}
      onOpenChange={setOpen}
      placeholder={placeholder}
      label={value ? formatter.format(value) : null}
      onClear={() => commit(null)}
    >
      <Calendar
        selected={value}
        onSelect={(date) => {
          commit(date);
          setOpen(false);
        }}
        minDate={minDate}
        maxDate={maxDate}
        isDateDisabled={isDateDisabled}
        weekStartsOn={weekStartsOn}
        locale={locale}
      />
    </PickerShell>
  );
}

// --- DateRangePicker ---

export interface DateRangePreset {
  label: string;
  range: () => DateRange;
}

export interface DateRangePickerProps extends PickerBaseProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange) => void;
  /** Quick picks shown beside the calendar, e.g. "Last 7 days". */
  presets?: DateRangePreset[];
}

const emptyRange: DateRange = { from: null, to: null };

export function DateRangePicker({
  value: valueProp,
  defaultValue = emptyRange,
  onValueChange,
  presets,
  placeholder = "Pick a date range",
  locale,
  formatOptions = { dateStyle: "medium" },
  minDate,
  maxDate,
  isDateDisabled,
  weekStartsOn,
  ...props
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [valueState, setValueState] = useState<DateRange>(defaultValue);
  const value = valueProp ?? valueState;

  const commit = (next: DateRange) => {
    setValueState(next);
    onValueChange?.(next);
  };

  const formatter = new Intl.DateTimeFormat(locale, formatOptions);
  const label = value.from
    ? `${formatter.format(value.from)} – ${value.to ? formatter.format(value.to) : "…"}`
    : null;

  return (
    <PickerShell
      {...props}
      open={open}
      onOpenChange={setOpen}
      placeholder={placeholder}
      label={label}
      onClear={() => commit(emptyRange)}
    >
      {presets && presets.length > 0 && (
        <div className="flex flex-col gap-1 p-2 border-r-2 border-neo-black min-w-[140px]">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                commit(preset.range());
                setOpen(false);
              }}
              className="px-3 py-1.5 text-left text-body-sm font-semibold rounded-sm border-2 border-transparent hover:bg-neo-yellow hover:border-neo-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink"
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
      <Calendar
        mode="range"
        selected={value}
        onSelect={(next) => {
          commit(next);
          if (next.from && next.to) setOpen(false);
        }}
        minDate={minDate}
        maxDate={maxDate}
        isDateDisabled={isDateDisabled}
        weekStartsOn={weekStartsOn}
        locale={locale}
      />
    </PickerShell>
  );
}
