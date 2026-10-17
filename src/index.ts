// ─── Existing components ──────────────────────────────────────────────────────
export { Button, buttonVariants, type ButtonProps } from "./components/Button/Button";
export { Badge, badgeVariants, type BadgeProps } from "./components/Badge/Badge";
export {
  Card,
  CardEyebrow,
  CardTitle,
  CardDescription,
  cardVariants,
  type CardProps,
} from "./components/Card/Card";
export {
  Input,
  Textarea,
  Select,
  Label,
  Field,
  fieldVariants,
  type InputProps,
  type TextareaProps,
  type SelectProps,
  type FieldProps,
  type LabelProps,
} from "./components/Input/Input";
export { Alert, type AlertProps } from "./components/Alert/Alert";
export {
  Modal,
  ModalTrigger,
  ModalClose,
  ModalPortal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  type ModalContentProps,
} from "./components/Modal/Modal";
export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./components/Table/Table";

// ─── New components ───────────────────────────────────────────────────────────
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/Accordion/Accordion";

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  avatarVariants,
  type AvatarProps,
  type AvatarFallbackProps,
  type AvatarGroupProps,
} from "./components/Avatar/Avatar";

export {
  Breadcrumb,
  type BreadcrumbProps,
  type BreadcrumbItem,
} from "./components/Breadcrumb/Breadcrumb";

export {
  Checkbox,
  type CheckboxProps,
} from "./components/Checkbox/Checkbox";

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  type DrawerContentProps,
} from "./components/Drawer/Drawer";

export {
  Dropdown,
  DropdownTrigger,
  DropdownGroup,
  DropdownPortal,
  DropdownSub,
  DropdownRadioGroup,
  DropdownSubTrigger,
  DropdownSubContent,
  DropdownContent,
  DropdownItem,
  DropdownCheckboxItem,
  DropdownRadioItem,
  DropdownLabel,
  DropdownSeparator,
} from "./components/Dropdown/Dropdown";

export {
  FileInput,
  fileInputVariants,
  formatFileSize,
  type FileInputProps,
  type FileRejection,
} from "./components/FileInput/FileInput";

export {
  Kbd,
  Shortcut,
  kbdVariants,
  type KbdProps,
  type ShortcutProps,
} from "./components/Kbd/Kbd";

export {
  Navbar,
  NavbarContainer,
  NavbarBrand,
  NavbarNav,
  NavbarLink,
  NavbarActions,
  navbarVariants,
  type NavbarProps,
} from "./components/Navbar/Navbar";

export {
  Pagination,
  PaginationPrev,
  PaginationNext,
  PaginationItem,
  PaginationEllipsis,
  PaginationRoot,
  type PaginationItemProps,
  type PaginationRootProps,
} from "./components/Pagination/Pagination";

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
} from "./components/Popover/Popover";

export {
  Progress,
  progressTrackVariants,
  progressFillVariants,
  type ProgressProps,
} from "./components/Progress/Progress";

export {
  RadioGroup,
  RadioItem,
  type RadioItemProps,
} from "./components/Radio/Radio";

export {
  Separator,
  separatorVariants,
  type SeparatorProps,
} from "./components/Separator/Separator";

export {
  Skeleton,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonText,
  skeletonVariants,
  type SkeletonProps,
} from "./components/Skeleton/Skeleton";

export {
  Slider,
  sliderVariants,
  type SliderProps,
} from "./components/Slider/Slider";

export {
  Spinner,
  LoadingOverlay,
  spinnerVariants,
  type SpinnerProps,
  type LoadingOverlayProps,
} from "./components/Spinner/Spinner";

export {
  Switch,
  switchRootVariants,
  switchThumbVariants,
  type SwitchProps,
} from "./components/Switch/Switch";

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
  type TabsListProps,
  type TabsTriggerProps,
} from "./components/Tabs/Tabs";

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  ToastWithIcon,
  toastVariants,
  type ToastProps,
  type ToastWithIconProps,
} from "./components/Toast/Toast";

export {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  tooltipContentVariants,
  type TooltipContentProps,
  type TooltipProps,
} from "./components/Tooltip/Tooltip";

export {
  EmptyState,
  emptyStateVariants,
  type EmptyStateProps,
} from "./components/EmptyState/EmptyState";

export {
  Stat,
  StatGrid,
  statVariants,
  type StatProps,
  type StatTrend,
} from "./components/Stat/Stat";

// ─── App & data components ────────────────────────────────────────────────────
export {
  AppShell,
  AppShellHeader,
  AppShellMenuButton,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarCollapseButton,
  useSidebar,
  type AppShellProps,
  type SidebarItemProps,
} from "./components/Sidebar/Sidebar";

export {
  DataTable,
  type DataTableProps,
  type DataTableColumn,
  type DataTableSort,
  type DataTableSortDirection,
} from "./components/DataTable/DataTable";

export {
  Combobox,
  type ComboboxProps,
  type ComboboxOption,
} from "./components/Combobox/Combobox";

export {
  Calendar,
  DatePicker,
  DateRangePicker,
  type CalendarProps,
  type DatePickerProps,
  type DateRangePickerProps,
  type DateRange,
  type DateRangePreset,
} from "./components/DatePicker/DatePicker";

export {
  CommandPalette,
  type CommandPaletteProps,
  type CommandItem,
} from "./components/CommandPalette/CommandPalette";

export { InputGroup, type InputGroupProps } from "./components/InputGroup/InputGroup";

export { TagInput, type TagInputProps } from "./components/TagInput/TagInput";

export {
  Stepper,
  type StepperProps,
  type StepperStep,
  type StepStatus,
} from "./components/Stepper/Stepper";

export {
  ToggleGroup,
  ToggleGroupItem,
  toggleGroupVariants,
  toggleGroupItemVariants,
  type ToggleGroupProps,
  type ToggleGroupItemProps,
} from "./components/ToggleGroup/ToggleGroup";

export {
  Banner,
  BannerLink,
  bannerVariants,
  type BannerProps,
} from "./components/Banner/Banner";

// ─── Landing page blocks ──────────────────────────────────────────────────────
export {
  Section,
  SectionHeading,
  sectionVariants,
  type SectionProps,
  type SectionHeadingProps,
} from "./blocks/Section/Section";
export { Hero, type HeroProps } from "./blocks/Hero/Hero";
export {
  FeatureGrid,
  FeatureCard,
  type FeatureGridProps,
  type FeatureCardProps,
} from "./blocks/FeatureGrid/FeatureGrid";
export {
  PricingTable,
  PricingCard,
  type PricingTableProps,
  type PricingCardProps,
  type PricingFeature,
} from "./blocks/Pricing/Pricing";
export { Testimonial, type TestimonialProps } from "./blocks/Testimonial/Testimonial";
export { CTASection, type CTASectionProps } from "./blocks/CTASection/CTASection";
export {
  Footer,
  type FooterProps,
  type FooterColumn,
  type FooterLink,
  type FooterSocialLink,
} from "./blocks/Footer/Footer";

// ─── Utilities & tokens ───────────────────────────────────────────────────────
export { cn } from "./lib/cn";
export * from "./tokens";
