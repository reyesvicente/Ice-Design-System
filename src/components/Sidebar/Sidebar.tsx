import * as Dialog from "@radix-ui/react-dialog";
import { createContext, forwardRef, useContext, useState } from "react";
import { Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { cn } from "@/lib/cn";

// --- Context ---

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  // True inside the mobile drawer, where the sidebar is never collapsed
  isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  setCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
  isMobile: false,
});

export const useSidebar = () => useContext(SidebarContext);

// --- AppShell ---

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: React.ReactNode;
  header?: React.ReactNode;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

/**
 * Page layout with a left sidebar. On screens below `md` the sidebar moves into a drawer,
 * opened with <AppShellMenuButton />.
 */
export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  (
    {
      className,
      sidebar,
      header,
      defaultCollapsed = false,
      collapsed: collapsedProp,
      onCollapsedChange,
      children,
      ...props
    },
    ref
  ) => {
    const [collapsedState, setCollapsedState] = useState(defaultCollapsed);
    const [mobileOpen, setMobileOpen] = useState(false);
    const collapsed = collapsedProp ?? collapsedState;

    const setCollapsed = (next: boolean) => {
      setCollapsedState(next);
      onCollapsedChange?.(next);
    };

    const value = { collapsed, setCollapsed, mobileOpen, setMobileOpen, isMobile: false };

    return (
      <SidebarContext.Provider value={value}>
        <div
          ref={ref}
          className={cn("flex h-screen w-full bg-neo-offwhite text-neo-black", className)}
          {...props}
        >
          <div className="hidden md:flex shrink-0">{sidebar}</div>

          <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-40 bg-neo-black/70 backdrop-blur-[2px] md:hidden" />
              <Dialog.Content
                aria-describedby={undefined}
                className="fixed inset-y-0 left-0 z-50 flex md:hidden focus:outline-none"
              >
                <Dialog.Title className="sr-only">Navigation</Dialog.Title>
                <SidebarContext.Provider value={{ ...value, collapsed: false, isMobile: true }}>
                  {sidebar}
                </SidebarContext.Provider>
                <Dialog.Close
                  aria-label="Close navigation"
                  className="absolute top-4 -right-12 flex items-center justify-center w-9 h-9 bg-neo-offwhite border-2 border-neo-black rounded-md shadow-brutal-sm"
                >
                  <X className="w-5 h-5" strokeWidth={2.5} />
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <div className="flex flex-1 flex-col min-w-0">
            {header}
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </div>
      </SidebarContext.Provider>
    );
  }
);
AppShell.displayName = "AppShell";

export const AppShellHeader = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "flex h-16 shrink-0 items-center gap-3 px-4 md:px-6",
        "border-b-2 border-neo-black bg-neo-offwhite",
        className
      )}
      {...props}
    />
  )
);
AppShellHeader.displayName = "AppShellHeader";

const iconButtonClass = cn(
  "flex items-center justify-center w-9 h-9 shrink-0",
  "border-2 border-neo-black rounded-md bg-neo-offwhite shadow-brutal-sm",
  "transition-colors duration-150 hover:bg-neo-yellow",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink focus-visible:ring-offset-2 focus-visible:ring-offset-neo-offwhite"
);

/** Opens the mobile navigation drawer. Hidden from `md` up. */
export const AppShellMenuButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { setMobileOpen } = useSidebar();
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Open navigation"
      onClick={(event) => {
        onClick?.(event);
        setMobileOpen(true);
      }}
      className={cn(iconButtonClass, "md:hidden", className)}
      {...props}
    >
      <Menu className="w-5 h-5" strokeWidth={2.5} />
    </button>
  );
});
AppShellMenuButton.displayName = "AppShellMenuButton";

// --- Sidebar ---

export const Sidebar = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    const { collapsed } = useSidebar();
    return (
      <aside
        ref={ref}
        data-collapsed={collapsed || undefined}
        className={cn(
          "group/sidebar flex h-full flex-col",
          "bg-neo-offwhite text-neo-black border-r-2 border-neo-black",
          "transition-[width] duration-200",
          collapsed ? "w-16" : "w-64",
          className
        )}
        {...props}
      />
    );
  }
);
Sidebar.displayName = "Sidebar";

export const SidebarHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-16 shrink-0 items-center gap-2 px-3 border-b-2 border-neo-black",
        "group-data-[collapsed]/sidebar:justify-center",
        className
      )}
      {...props}
    />
  )
);
SidebarHeader.displayName = "SidebarHeader";

export const SidebarContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-1 flex-col gap-4 overflow-y-auto px-3 py-4", className)}
      {...props}
    />
  )
);
SidebarContent.displayName = "SidebarContent";

export const SidebarFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("shrink-0 px-3 py-3 border-t-2 border-neo-black", className)}
      {...props}
    />
  )
);
SidebarFooter.displayName = "SidebarFooter";

export const SidebarGroup = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="group" className={cn("flex flex-col gap-1", className)} {...props} />
  )
);
SidebarGroup.displayName = "SidebarGroup";

export const SidebarGroupLabel = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { collapsed } = useSidebar();
  if (collapsed) return null;
  return (
    <p
      ref={ref}
      className={cn(
        "px-3 pb-1 text-micro font-mono font-semibold uppercase tracking-wider text-neo-black-500",
        className
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

export interface SidebarItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
  /** Render as a <button> instead of a link. */
  asButton?: boolean;
}

export const SidebarItem = forwardRef<HTMLAnchorElement, SidebarItemProps>(
  ({ className, icon, active, badge, asButton, children, title, onClick, ...props }, ref) => {
    const { collapsed, isMobile, setMobileOpen } = useSidebar();
    const label = typeof children === "string" ? children : undefined;

    const classes = cn(
      "flex w-full items-center gap-3 px-3 py-2 rounded-md",
      "text-body-sm font-bold text-left",
      "border-2 border-transparent transition-colors duration-150",
      active
        ? "bg-neo-yellow border-neo-black shadow-brutal-sm"
        : "hover:bg-neo-yellow-50 hover:border-neo-black",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neo-pink",
      collapsed && "justify-center px-0",
      className
    );

    const content = (
      <>
        {icon && (
          <span className="flex w-5 h-5 shrink-0 items-center justify-center [&>svg]:w-5 [&>svg]:h-5">
            {icon}
          </span>
        )}
        {!collapsed && <span className="flex-1 truncate">{children}</span>}
        {!collapsed && badge}
      </>
    );

    // Close the mobile drawer once a destination is chosen
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement & HTMLButtonElement>) => {
      onClick?.(event);
      if (isMobile) setMobileOpen(false);
    };

    if (asButton) {
      return (
        <button
          type="button"
          className={classes}
          title={title ?? (collapsed ? label : undefined)}
          aria-current={active ? "page" : undefined}
          onClick={handleClick}
        >
          {content}
        </button>
      );
    }

    return (
      <a
        ref={ref}
        className={classes}
        title={title ?? (collapsed ? label : undefined)}
        aria-current={active ? "page" : undefined}
        onClick={handleClick}
        {...props}
      >
        {content}
      </a>
    );
  }
);
SidebarItem.displayName = "SidebarItem";

/** Toggles the desktop sidebar between full and icon-only widths. */
export const SidebarCollapseButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { collapsed, setCollapsed, isMobile } = useSidebar();
  if (isMobile) return null;
  const Icon = collapsed ? PanelLeftOpen : PanelLeftClose;
  return (
    <button
      ref={ref}
      type="button"
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      aria-expanded={!collapsed}
      onClick={(event) => {
        onClick?.(event);
        setCollapsed(!collapsed);
      }}
      className={cn(iconButtonClass, className)}
      {...props}
    >
      <Icon className="w-5 h-5" strokeWidth={2.5} />
    </button>
  );
});
SidebarCollapseButton.displayName = "SidebarCollapseButton";
