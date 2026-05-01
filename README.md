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

## Setup

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
| **Form** | Input, Textarea, Select, Label, Field, Checkbox, Radio, Switch |
| **Dialog** | Modal, Drawer, Dropdown, Popover |
| **Navigation** | Navbar, Breadcrumb, Tabs, Pagination |
| **Data Display** | Table, Stat, Progress, Slider, Avatar, Accordion |
| **Feedback** | Toast, Tooltip, Spinner, LoadingOverlay, EmptyState |
| **Misc** | Skeleton, Separator, Kbd |

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
