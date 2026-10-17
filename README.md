# ice-ds

A neobrutalist React component library with hard shadows, bold colors, and accessible primitives.

[![npm version](https://img.shields.io/npm/v/ice-ds.svg)](https://www.npmjs.com/package/ice-ds)
[![npm downloads](https://img.shields.io/npm/dm/ice-ds.svg)](https://www.npmjs.com/package/ice-ds)

## Installation

```bash
npm install ice-ds
# or
yarn add ice-ds
# or
pnpm add ice-ds
```

**Peer dependencies** (install separately if not already in your project):

```bash
npm install react react-dom
```

## CDN (jsDelivr)

Use ice-ds directly in any HTML page — no bundler required. React and ReactDOM must be loaded first.

```html
<!-- 1. React -->
<script crossorigin src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- 2. ice-ds styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ice-ds@1.1.0/dist/style.css" />

<!-- 3. ice-ds UMD bundle -->
<script src="https://cdn.jsdelivr.net/npm/ice-ds@1.1.0/dist/ice-ds.umd.js"></script>
```

Components are then available on the `IceDS` global:

```html
<script>
  const { Button, Badge } = IceDS;
  const e = React.createElement;

  ReactDOM.createRoot(document.getElementById('root')).render(
    e(Button, { variant: 'primary' }, 'Hello from ice-ds')
  );
</script>
```

> **Pin to a version** — replace `@1.1.0` with the exact version you tested against so future releases don't break your pages.

---

## Setup (npm)

### 1. Import the stylesheet

Add this once at your app root (e.g., `main.tsx` or `_app.tsx`):

```ts
import 'ice-ds/styles';
```

### 2. Configure Tailwind (optional but recommended)

If your app uses Tailwind CSS, extend your config with the ice-ds tokens so you can use the brand colors, shadows, and typography scale in your own code:

```js
// tailwind.config.js
import { iceTailwindTokens } from 'ice-ds';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      ...iceTailwindTokens,
    },
  },
};
```

---

## Usage

### Button

```tsx
import { Button } from 'ice-ds';

<Button>Click me</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="destructive">Delete</Button>
<Button loading>Saving…</Button>
<Button disabled>Unavailable</Button>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `primary` `secondary` `ghost` `destructive` `success` `accent` `inverse` | `primary` | Visual style |
| `size` | `sm` `md` `lg` `xl` | `md` | Button size |
| `loading` | `boolean` | `false` | Shows spinner, disables interaction |
| `fullWidth` | `boolean` | `false` | Stretches to container width |

### Badge

```tsx
import { Badge } from 'ice-ds';

<Badge>Default</Badge>
<Badge variant="new">New</Badge>
<Badge variant="success">Shipped</Badge>
<Badge variant="error">Failed</Badge>
```

| `variant` | `default` `new` `primary` `success` `info` `premium` `warning` `error` |

### Card

```tsx
import { Card, CardEyebrow, CardTitle, CardDescription } from 'ice-ds';

<Card variant="featured" elevation="lg" interactive>
  <CardEyebrow>Case study</CardEyebrow>
  <CardTitle>2.1x conversion lift</CardTitle>
  <CardDescription>Redesigned onboarding flow reduced drop-off by 40%.</CardDescription>
</Card>
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `default` `featured` `success` `info` `premium` `primary` `inverse` | `default` |
| `elevation` | `none` `sm` `md` `lg` `xl` | `md` |
| `interactive` | `boolean` | `false` |

### Alert

```tsx
import { Alert } from 'ice-ds';

<Alert intent="success" title="Deployed!" onDismiss={() => {}}>
  Your changes are live on production.
</Alert>
```

| `intent` | `info` `success` `warning` `error` `announce` |

---

## Form Components

### Input / Textarea / Select

```tsx
import { Input, Textarea, Select, Label, Field } from 'ice-ds';

// Standalone
<Input placeholder="Email address" size="md" />
<Textarea placeholder="Your message…" />
<Select>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>

// Composed field with label + validation
<Field
  label="Email"
  htmlFor="email"
  required
  error="Please enter a valid email"
  hint="We'll never share your email"
>
  <Input id="email" type="email" />
</Field>
```

### FileInput

```tsx
import { FileInput } from 'ice-ds';

<FileInput
  accept="image/*,.pdf"
  multiple
  maxSize={5 * 1024 * 1024}
  description="PNG, JPG or PDF up to 5 MB"
  onFilesChange={(files) => console.log(files)}
  onReject={(rejections) => console.log(rejections)} // [{ file, reason: 'type' | 'size' }]
/>
```

Drag-and-drop or click to browse. Selected files are listed with remove buttons, and the native input stays in sync so it works in plain `<form>` submits. Pass `aria-invalid` for the error state.

### Checkbox

```tsx
import { Checkbox } from 'ice-ds';

<Checkbox label="Accept terms" description="You agree to our ToS and Privacy Policy" />
```

### Radio

```tsx
import { RadioGroup, RadioItem } from 'ice-ds';

<RadioGroup defaultValue="monthly">
  <RadioItem value="monthly" label="Monthly" description="Billed every month" />
  <RadioItem value="annual" label="Annual" description="Save 20% — billed yearly" />
</RadioGroup>
```

### Switch

```tsx
import { Switch } from 'ice-ds';

<Switch label="Dark mode" size="md" intent="default" />
```

| `size` | `sm` `md` `lg` |
| `intent` | `default` `success` `info` `accent` |

### InputGroup

```tsx
import { InputGroup } from 'ice-ds';
import { Search } from 'lucide-react';

<InputGroup startAddon="https://" endAddon=".com" placeholder="yourbrand" />
<InputGroup startIcon={<Search />} placeholder="Search…" endElement={<ClearButton />} />
```

`startAddon` / `endAddon` are boxed segments; `startIcon` / `endElement` sit inside the field. `className` goes to the `<input>`, `wrapperClassName` to the wrapper.

### Combobox

```tsx
import { Combobox } from 'ice-ds';

const options = [
  { value: 'django', label: 'Django', description: 'Python, batteries included' },
  { value: 'rails', label: 'Ruby on Rails' },
];

<Combobox options={options} value={value} onValueChange={setValue} placeholder="Pick one" />
<Combobox multiple options={options} value={values} onValueChange={setValues} />
```

Searchable select with keyboard navigation (↑ ↓ Enter, Backspace clears). Works with `Field` via `id`.

### TagInput

```tsx
import { TagInput } from 'ice-ds';

<TagInput
  value={emails}
  onValueChange={setEmails}
  maxTags={5}
  validate={(tag) => tag.includes('@')}
  placeholder="name@company.com"
/>
```

Enter or comma adds a tag, Backspace removes the last one, and pasting a comma-separated list adds them all.

### DatePicker / DateRangePicker / Calendar

```tsx
import { DatePicker, DateRangePicker, Calendar } from 'ice-ds';

<DatePicker value={date} onValueChange={setDate} minDate={new Date()} weekStartsOn={1} />

<DateRangePicker
  value={range}             // { from: Date | null, to: Date | null }
  onValueChange={setRange}
  presets={[{ label: 'Last 7 days', range: () => ({ from: daysAgo(6), to: new Date() }) }]}
/>

<Calendar selected={date} onSelect={setDate} />          // inline
```

Dates are formatted with `Intl.DateTimeFormat`; pass `locale` and `formatOptions` to change them. Arrow keys, PageUp/PageDown, Home/End navigate the grid.

### ToggleGroup

```tsx
import { ToggleGroup, ToggleGroupItem } from 'ice-ds';

<ToggleGroup type="single" value={period} onValueChange={(v) => v && setPeriod(v)}>
  <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
  <ToggleGroupItem value="annual">Annual</ToggleGroupItem>
</ToggleGroup>
```

| `variant` | `segmented` `outline` |
| `size` | `sm` `md` `lg` |

### Stepper

```tsx
import { Stepper } from 'ice-ds';

<Stepper
  steps={[{ title: 'Account' }, { title: 'Workspace' }, { title: 'Billing' }]}
  current={1}
  onStepClick={setStep}   // optional: completed steps become clickable
/>
```

| `orientation` | `horizontal` `vertical` |

---

## Dialog Components

### Modal

```tsx
import {
  Modal, ModalTrigger, ModalContent,
  ModalHeader, ModalTitle, ModalDescription, ModalFooter,
  ModalClose
} from 'ice-ds';
import { Button } from 'ice-ds';

<Modal>
  <ModalTrigger asChild>
    <Button>Open modal</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Confirm action</ModalTitle>
      <ModalDescription>This cannot be undone.</ModalDescription>
    </ModalHeader>
    <ModalFooter>
      <ModalClose asChild>
        <Button variant="secondary">Cancel</Button>
      </ModalClose>
      <Button variant="destructive">Delete</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### Drawer

```tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerBody } from 'ice-ds';

<Drawer>
  <DrawerTrigger asChild>
    <Button>Open drawer</Button>
  </DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Settings</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>Your content here</DrawerBody>
  </DrawerContent>
</Drawer>
```

| `side` | `left` `right` `top` `bottom` | Default: `right` |

### Dropdown

```tsx
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from 'ice-ds';

<Dropdown>
  <DropdownTrigger asChild>
    <Button variant="secondary">Options</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem>Edit</DropdownItem>
    <DropdownItem>Duplicate</DropdownItem>
    <DropdownSeparator />
    <DropdownItem destructive>Delete</DropdownItem>
  </DropdownContent>
</Dropdown>
```

### Popover

```tsx
import { Popover, PopoverTrigger, PopoverContent } from 'ice-ds';

<Popover>
  <PopoverTrigger asChild>
    <Button variant="ghost">More info</Button>
  </PopoverTrigger>
  <PopoverContent>Helpful tooltip content goes here.</PopoverContent>
</Popover>
```

### CommandPalette

```tsx
import { CommandPalette } from 'ice-ds';

<CommandPalette
  items={[
    { id: 'new', label: 'New project', group: 'Actions', icon: <FilePlus />, shortcut: ['⌘', 'N'], onSelect: createProject },
    { id: 'billing', label: 'Billing', group: 'Navigate', keywords: ['invoice'], onSelect: () => navigate('/billing') },
  ]}
/>
```

Opens with ⌘K / Ctrl+K by default (`hotkey="k"`, or `null` to disable). Can be controlled with `open` / `onOpenChange`.

---

## Navigation

### Navbar

```tsx
import { Navbar, NavbarContainer, NavbarBrand, NavbarNav, NavbarLink, NavbarActions } from 'ice-ds';

<Navbar variant="default" sticky>
  <NavbarContainer>
    <NavbarBrand>Ice</NavbarBrand>
    <NavbarNav>
      <NavbarLink href="/" active>Home</NavbarLink>
      <NavbarLink href="/work">Work</NavbarLink>
    </NavbarNav>
    <NavbarActions>
      <Button size="sm">Hire me</Button>
    </NavbarActions>
  </NavbarContainer>
</Navbar>
```

| `variant` | `default` `dark` `yellow` `pink` `blue` |

### Breadcrumb

```tsx
import { Breadcrumb } from 'ice-ds';

<Breadcrumb
  items={[
    { label: 'Work', href: '/work' },
    { label: 'Case Study', href: '/work/case-study' },
    { label: 'Metrics' },
  ]}
  showHome
/>
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'ice-ds';

<Tabs defaultValue="overview">
  <TabsList variant="underline">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="details">Details content</TabsContent>
</Tabs>
```

| `variant` (TabsList) | `underline` `pill` `boxed` |

### Pagination

```tsx
import { PaginationRoot } from 'ice-ds';

<PaginationRoot
  page={3}
  totalPages={10}
  onPageChange={(p) => console.log(p)}
  siblings={1}
/>
```

### AppShell / Sidebar

```tsx
import {
  AppShell, AppShellHeader, AppShellMenuButton,
  Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel,
  SidebarItem, SidebarFooter, SidebarCollapseButton,
} from 'ice-ds';

<AppShell
  sidebar={
    <Sidebar>
      <SidebarHeader>Brand</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarItem href="/" icon={<Home />} active>Dashboard</SidebarItem>
          <SidebarItem href="/projects" icon={<Folder />}>Projects</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter><SidebarCollapseButton /></SidebarFooter>
    </Sidebar>
  }
  header={<AppShellHeader><AppShellMenuButton /> Dashboard</AppShellHeader>}
>
  {page}
</AppShell>
```

Below `md` the sidebar moves into a drawer opened by `AppShellMenuButton`. `SidebarCollapseButton` switches the desktop sidebar to icon-only (`collapsed` / `onCollapsedChange` to control it). Use `useSidebar()` to read the state.

---

## Data Display

### Table

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from 'ice-ds';

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Project Alpha</TableCell>
      <TableCell><Badge variant="success">Shipped</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### DataTable

```tsx
import { DataTable, type DataTableColumn } from 'ice-ds';

const columns: DataTableColumn<Invoice>[] = [
  { id: 'client', header: 'Client', accessor: (r) => r.client, sortable: true },
  { id: 'status', header: 'Status', accessor: (r) => r.status, cell: (r) => <Badge>{r.status}</Badge> },
  { id: 'amount', header: 'Amount', accessor: (r) => r.amount, sortable: true, align: 'right' },
];

// Client-side sorting + pagination
<DataTable data={invoices} columns={columns} getRowId={(r) => r.id} pageSize={10} selectable />

// Server-side (DRF): pass the current page and let the API sort
<DataTable
  data={results}
  columns={columns}
  getRowId={(r) => r.id}
  page={page} totalPages={Math.ceil(count / 20)} onPageChange={setPage}
  manualSorting sort={sort} onSortChange={setSort}
  loading={isFetching}
  toolbar={<Input placeholder="Search…" />}
/>
```

### Stat

```tsx
import { Stat, StatGrid } from 'ice-ds';

<StatGrid>
  <Stat label="Revenue" value="$48,200" trend="up" trendValue="+12%" accent="yellow" />
  <Stat label="Churn" value="2.4%" trend="down" trendValue="-0.3%" accent="green" />
</StatGrid>
```

### Progress

```tsx
import { Progress } from 'ice-ds';

<Progress value={72} intent="success" size="md" showValue label="Upload" />
```

### Slider

```tsx
import { Slider } from 'ice-ds';

<Slider defaultValue={[40]} intent="default" label="Volume" showValue />
```

### Avatar

```tsx
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from 'ice-ds';

<Avatar size="md" shape="circle">
  <AvatarImage src="/avatar.jpg" alt="Vicente" />
  <AvatarFallback colorIndex={0}>VR</AvatarFallback>
</Avatar>

// Stacked group
<AvatarGroup max={4}>
  {users.map((u) => (
    <Avatar key={u.id}>
      <AvatarImage src={u.avatar} alt={u.name} />
      <AvatarFallback>{u.initials}</AvatarFallback>
    </Avatar>
  ))}
</AvatarGroup>
```

### Accordion

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'ice-ds';

<Accordion type="single" collapsible>
  <AccordionItem value="q1">
    <AccordionTrigger>What is ice-ds?</AccordionTrigger>
    <AccordionContent>A neobrutalist React component library.</AccordionContent>
  </AccordionItem>
</Accordion>
```

---

## Feedback

### Toast

```tsx
import { ToastProvider, ToastViewport, Toast, ToastWithIcon, ToastTitle, ToastDescription } from 'ice-ds';

// Wrap your app
<ToastProvider>
  <App />
  <ToastViewport />
</ToastProvider>

// Trigger a toast
<ToastWithIcon intent="success">
  <ToastTitle>Saved!</ToastTitle>
  <ToastDescription>Your changes have been saved.</ToastDescription>
</ToastWithIcon>
```

### Tooltip

```tsx
import { Tooltip, TooltipProvider } from 'ice-ds';

<TooltipProvider>
  <Tooltip content="This is a tooltip" variant="default" side="top">
    <Button variant="ghost">Hover me</Button>
  </Tooltip>
</TooltipProvider>
```

| `variant` | `default` `light` `yellow` |

### Spinner

```tsx
import { Spinner } from 'ice-ds';

<Spinner size="md" intent="primary" label="Loading…" />
```

### EmptyState

```tsx
import { EmptyState } from 'ice-ds';
import { FolderOpen } from 'lucide-react';

<EmptyState
  icon={FolderOpen}
  title="No projects yet"
  description="Create your first project to get started."
  action={<Button>New project</Button>}
  size="md"
/>
```

### Banner

```tsx
import { Banner, BannerLink } from 'ice-ds';

<Banner intent="announce" action={<BannerLink href="/changelog">Read more →</BannerLink>}>
  v2.0 is out.
</Banner>
<Banner intent="dark" sticky onDismiss={hide}>Your trial ends in 3 days.</Banner>
```

| `intent` | `announce` `info` `success` `warning` `error` `dark` |

A full-width bar for site-wide notices. Use `Alert` for messages inside page content.

---

## Miscellaneous

### Skeleton

```tsx
import { Skeleton, SkeletonCard, SkeletonAvatar, SkeletonText } from 'ice-ds';

<SkeletonCard />
<SkeletonAvatar />
<SkeletonText lines={3} />
<Skeleton variant="default" className="h-10 w-40" />
```

### Separator

```tsx
import { Separator } from 'ice-ds';

<Separator />
<Separator dashed />
<Separator label="OR" />
<Separator orientation="vertical" />
```

### Kbd

```tsx
import { Kbd, Shortcut } from 'ice-ds';

<Kbd size="md">⌘</Kbd>
<Shortcut keys={['⌘', 'K']} />
```

---

## Landing Page Blocks

Composed sections for marketing pages. They're built from the components above and accept any `<section>` props.

```tsx
import { Hero, FeatureGrid, PricingTable, Testimonial, CTASection, Footer, Section, SectionHeading } from 'ice-ds';

<Hero
  tone="yellow"
  eyebrow="New: command palette"
  title="Ship client work without the busywork."
  description="Invoices, proposals and project tracking in one place."
  actions={<Button size="lg">Start free trial</Button>}
  media={<img src="/screenshot.png" alt="" />}
  align="left"                   // copy beside media
/>

<FeatureGrid
  title="Everything you need"
  columns={3}
  features={[{ icon: <Receipt />, iconTone: 'pink', title: 'Invoicing', description: '…' }]}
/>

<PricingTable
  title="Simple pricing"
  controls={<ToggleGroup …/>}     // e.g. monthly / annual
  plans={[
    { name: 'Solo', price: '$12', period: '/month', features: ['3 clients', { label: 'Portal', included: false }], cta: <Button fullWidth>Start</Button> },
    { name: 'Studio', price: '$29', period: '/month', featured: true, features: ['Unlimited clients'], cta: <Button fullWidth>Start</Button> },
  ]}
/>

<Section tone="blue" bordered>
  <SectionHeading title="Loved by tiny teams" />
  <Testimonial quote="We replaced three tools." name="Maria Santos" role="Founder" rating={5} />
</Section>

<CTASection tone="dark" title="Ready to start?" actions={<Button>Start free trial</Button>} />

<Footer brand="Studio" columns={[{ title: 'Product', links: [{ label: 'Pricing', href: '/pricing' }] }]} legal="© 2026 Studio" />
```

| Block | Key props |
|---|---|
| `Section` | `tone` (`offwhite` `yellow` `pink` `blue` `green` `purple` `dark`), `spacing` (`sm` `md` `lg`), `bordered` |
| `Hero` | `eyebrow`, `title`, `description`, `actions`, `media`, `footnote`, `align` |
| `FeatureGrid` / `FeatureCard` | `features`, `columns` (`2` `3` `4`) |
| `PricingTable` / `PricingCard` | `plans`, `controls`, `featured`, `badge` |
| `Testimonial` | `quote`, `name`, `role`, `avatarSrc`, `rating`, `tone` |
| `CTASection` | `layout` (`boxed` `banded`), `tone` |
| `Footer` | `columns`, `socials`, `legal`, `legalLinks`, `tone` (`dark` `offwhite` `yellow`) |

---

## Design Tokens

Tokens are exported as TypeScript constants and also wired into Tailwind via the config extension above.

```ts
import { colors, shadows, typography } from 'ice-ds';

// Brand colors
colors['neo-yellow']   // #FFDE59 — primary CTA
colors['neo-green']    // #7ED957 — success
colors['neo-pink']     // #FF66C4 — accent / featured
colors['neo-blue']     // #5CE1E6 — info
colors['neo-purple']   // #C678DD — premium
colors['neo-black']    // #0F0F0F — all text, borders
colors['neo-offwhite'] // #FFFDF5 — default background
colors['neo-red']      // #EF4444 — error
colors['neo-amber']    // #F59E0B — warning
```

**Tailwind shadow tokens** (hard offset, no blur — the neobrutalist signature):

```
shadow-brutal-sm   →  3px 3px 0 0 #0F0F0F
shadow-brutal      →  4px 4px 0 0 #0F0F0F
shadow-brutal-md   →  6px 6px 0 0 #0F0F0F
shadow-brutal-lg   →  10px 10px 0 0 #0F0F0F
shadow-brutal-xl   →  14px 14px 0 0 #0F0F0F
```

---

## Full Component List

| Category | Components |
|---|---|
| **Basic** | Button, Badge, Card, Alert |
| **Form** | Input, Textarea, Select, Label, Field, InputGroup, FileInput, Combobox, TagInput, DatePicker, DateRangePicker, Calendar, Checkbox, Radio, Switch, ToggleGroup |
| **Dialog** | Modal, Drawer, Dropdown, Popover, CommandPalette |
| **Navigation** | AppShell, Sidebar, Navbar, Breadcrumb, Tabs, Pagination, Stepper |
| **Data Display** | Table, DataTable, Stat, Progress, Slider, Avatar, Accordion |
| **Feedback** | Toast, Tooltip, Spinner, LoadingOverlay, EmptyState, Banner |
| **Misc** | Skeleton, Separator, Kbd |
| **Blocks** | Section, SectionHeading, Hero, FeatureGrid, FeatureCard, PricingTable, PricingCard, Testimonial, CTASection, Footer |

---

## Design Rules

- `neo-black` text on every colored surface — no exceptions.
- `neo-yellow` is the only primary CTA color.
- `neo-pink` and `neo-purple` are decorative — never semantic.
- Hard offset shadows only (`shadow-brutal-*` tokens).
- Hover = translate -2/-2 + shadow grows. Active = both collapse to 0.
- No italics. Bold for emphasis.

---

## Contributing / Local Development

```bash
git clone https://github.com/highcenburg/ice-ds.git
cd ice-ds
npm install
npm run storybook    # http://localhost:6006
npm run build        # outputs to dist/
npm run type-check   # TypeScript validation
```

Live docs + component playground run in Storybook. Every component has per-variant stories and an `AllVariants` overview. Run the a11y panel and verify AA compliance before shipping a new component.

---

## License

MIT
