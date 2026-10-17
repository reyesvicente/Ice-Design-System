import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useId, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { Shortcut } from "../Kbd/Kbd";

export interface CommandItem {
  id: string;
  label: string;
  group?: string;
  icon?: React.ReactNode;
  /** Shown on the right, e.g. ["⌘", "N"]. Display only — bind the keys yourself. */
  shortcut?: string[];
  /** Extra terms that should match this item. */
  keywords?: string[];
  disabled?: boolean;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  items: CommandItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Key that opens the palette with ⌘/Ctrl. Set to `null` to disable. */
  hotkey?: string | null;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}

export function CommandPalette({
  items,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  hotkey = "k",
  placeholder = "Type a command or search…",
  emptyMessage = "No matching commands.",
  className,
}: CommandPaletteProps) {
  const listId = useId();
  const [openState, setOpenState] = useState(defaultOpen);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const open = openProp ?? openState;

  const setOpen = (next: boolean) => {
    setOpenState(next);
    onOpenChange?.(next);
    if (next) {
      setQuery("");
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    if (!hotkey) return;
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === hotkey.toLowerCase()) {
        event.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const filtered = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return items;
    return items.filter((item) => {
      const haystack = [item.label, item.group, ...(item.keywords ?? [])]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [items, query]);

  // Preserve first-seen group order
  const groups = useMemo(() => {
    const map = new Map<string, { item: CommandItem; index: number }[]>();
    filtered.forEach((item, index) => {
      const key = item.group ?? "";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push({ item, index });
    });
    return [...map.entries()];
  }, [filtered]);

  const run = (item: CommandItem | undefined) => {
    if (!item || item.disabled) return;
    setOpen(false);
    item.onSelect();
  };

  const moveActive = (delta: number) => {
    if (!filtered.length) return;
    let next = activeIndex;
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
      run(filtered[activeIndex]);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-neo-black/70 backdrop-blur-[2px]" />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            "fixed left-1/2 top-[15vh] z-50 -translate-x-1/2",
            "w-[92vw] max-w-xl overflow-hidden",
            "bg-neo-offwhite text-neo-black",
            "border-[3px] border-neo-black rounded-md shadow-brutal-xl",
            "focus:outline-none",
            className
          )}
        >
          <Dialog.Title className="sr-only">Command palette</Dialog.Title>
          <div className="flex items-center gap-3 px-4 border-b-2 border-neo-black">
            <Search className="w-5 h-5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            <input
              autoFocus
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              role="combobox"
              aria-expanded
              aria-controls={listId}
              aria-activedescendant={filtered.length ? `${listId}-${activeIndex}` : undefined}
              aria-autocomplete="list"
              className="w-full py-4 bg-transparent text-body placeholder:text-neo-black/50 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div id={listId} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
            {filtered.length === 0 && (
              <p className="px-3 py-10 text-center text-body-sm text-neo-black-500">
                {emptyMessage}
              </p>
            )}
            {groups.map(([group, entries]) => (
              <div key={group || "ungrouped"} role="group" aria-label={group || undefined}>
                {group && (
                  <p className="px-3 pt-3 pb-1 text-micro font-mono font-semibold uppercase tracking-wider text-neo-black-500">
                    {group}
                  </p>
                )}
                {entries.map(({ item, index }) => (
                  <div
                    key={item.id}
                    id={`${listId}-${index}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    aria-disabled={item.disabled || undefined}
                    onPointerMove={() => !item.disabled && setActiveIndex(index)}
                    onClick={() => run(item)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-sm cursor-pointer select-none",
                      "text-body-sm font-semibold border-2 border-transparent",
                      "aria-selected:bg-neo-yellow aria-selected:border-neo-black",
                      item.disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {item.icon && (
                      <span className="flex w-5 h-5 shrink-0 items-center justify-center [&>svg]:w-4 [&>svg]:h-4">
                        {item.icon}
                      </span>
                    )}
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.shortcut && <Shortcut keys={item.shortcut} size="sm" />}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 px-4 py-2 border-t-2 border-neo-black bg-neo-offwhite-100 text-micro text-neo-black-500">
            <span className="flex items-center gap-1.5">
              <Shortcut keys={["↑", "↓"]} size="sm" /> navigate
            </span>
            <span className="flex items-center gap-1.5">
              <Shortcut keys={["↵"]} size="sm" /> select
            </span>
            <span className="flex items-center gap-1.5">
              <Shortcut keys={["esc"]} size="sm" /> close
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
